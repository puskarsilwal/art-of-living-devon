"use client"

import { useState } from "react"
import { IntroTalkSession } from "@/lib/data/intro-talks"
import { EmailType, EMAIL_TYPE_LABELS, EMAIL_GROUPS } from "@/lib/emails/post-intro-templates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Contact {
  email: string
  name: string
}

interface SessionState {
  contacts: Contact[] | null
  selected: Set<string>
  loading: boolean
  sending: EmailType | null
  result: { sent: number; total: number; errors?: string[] } | null
}

const GROUP_COLORS = [
  { btn: "bg-green-50 border-green-200 text-green-800 hover:bg-green-100",   header: "bg-green-50 border-green-200"   },
  { btn: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100",   header: "bg-amber-50 border-amber-200"   },
  { btn: "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100",       header: "bg-blue-50 border-blue-200"     },
  { btn: "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100", header: "bg-purple-50 border-purple-200" },
  { btn: "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100",   header: "bg-slate-50 border-slate-200"   },
]

export default function EmailDashboard({
  sessions,
  adminKey,
}: {
  sessions: IntroTalkSession[]
  adminKey: string
}) {
  const [states, setStates] = useState<Record<string, SessionState>>(
    Object.fromEntries(
      sessions.map(s => [s.id, { contacts: null, selected: new Set(), loading: false, sending: null, result: null }])
    )
  )

  function updateState(sessionId: string, update: Partial<SessionState>) {
    setStates(prev => ({ ...prev, [sessionId]: { ...prev[sessionId], ...update } }))
  }

  async function loadContacts(session: IntroTalkSession) {
    if (!session.brevoListId) return
    updateState(session.id, { loading: true, result: null })
    try {
      const res = await fetch(`/api/admin/contacts?listId=${session.brevoListId}`, {
        headers: { "x-admin-key": adminKey },
      })
      const data = await res.json()
      const contacts: Contact[] = data.contacts ?? []
      updateState(session.id, {
        contacts,
        selected: new Set(contacts.map((c: Contact) => c.email)),
        loading: false,
      })
    } catch {
      updateState(session.id, { loading: false })
    }
  }

  function toggleContact(sessionId: string, email: string) {
    setStates(prev => {
      const next = new Set(prev[sessionId].selected)
      next.has(email) ? next.delete(email) : next.add(email)
      return { ...prev, [sessionId]: { ...prev[sessionId], selected: next, result: null } }
    })
  }

  function toggleAll(sessionId: string, contacts: Contact[]) {
    setStates(prev => {
      const allSelected = contacts.every(c => prev[sessionId].selected.has(c.email))
      return {
        ...prev,
        [sessionId]: {
          ...prev[sessionId],
          selected: allSelected ? new Set() : new Set(contacts.map(c => c.email)),
          result: null,
        },
      }
    })
  }

  async function sendEmail(session: IntroTalkSession, emailType: EmailType) {
    const state = states[session.id]
    const selectedContacts = (state.contacts ?? []).filter((c: Contact) => state.selected.has(c.email))

    if (selectedContacts.length === 0) {
      alert("No contacts selected.")
      return
    }

    const confirmed = window.confirm(
      `Send "${EMAIL_TYPE_LABELS[emailType]}" to ${selectedContacts.length} selected contact${selectedContacts.length !== 1 ? "s" : ""}?`
    )
    if (!confirmed) return

    updateState(session.id, { sending: emailType, result: null })
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ contacts: selectedContacts, emailType }),
      })
      const data = await res.json()
      updateState(session.id, { sending: null, result: data })
    } catch {
      updateState(session.id, { sending: null })
    }
  }

  return (
    <div className="space-y-6">
      {sessions.map(session => {
        const state = states[session.id]
        const hasListId = !!session.brevoListId
        const contacts = state.contacts ?? []
        const allSelected = contacts.length > 0 && contacts.every(c => state.selected.has(c.email))
        const someSelected = contacts.some(c => state.selected.has(c.email))
        const selectedCount = state.selected.size

        return (
          <Card key={session.id} className="border border-border">
            <CardContent className="pt-6 space-y-5">

              {/* Session header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">{session.date}</h2>
                    {session.badge && <Badge variant="secondary">{session.badge}</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.time} {session.timezone} · {session.location}
                  </p>
                </div>
                {hasListId ? (
                  <Button variant="outline" size="sm" onClick={() => loadContacts(session)} disabled={state.loading}>
                    {state.loading ? "Loading..." : state.contacts !== null ? "Refresh" : "Load contacts"}
                  </Button>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">No Brevo list configured</Badge>
                )}
              </div>

              {/* Contact list with checkboxes */}
              {contacts.length > 0 && (
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b border-border">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={el => { if (el) el.indeterminate = !allSelected && someSelected }}
                        onChange={() => toggleAll(session.id, contacts)}
                        className="h-4 w-4 accent-primary cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {allSelected ? "Deselect all" : "Select all"} ({contacts.length})
                      </span>
                    </label>
                    {selectedCount > 0 && (
                      <span className="text-xs font-medium text-primary">{selectedCount} selected</span>
                    )}
                  </div>
                  <div className="max-h-52 overflow-y-auto divide-y divide-border/50">
                    {contacts.map(c => {
                      const isSelected = state.selected.has(c.email)
                      return (
                        <label
                          key={c.email}
                          className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${isSelected ? "bg-primary/5" : "hover:bg-muted/30"}`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleContact(session.id, c.email)}
                            className="h-4 w-4 accent-primary cursor-pointer shrink-0"
                          />
                          <span className="text-sm font-medium min-w-[100px]">{c.name || "—"}</span>
                          <span className="text-sm text-muted-foreground">{c.email}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {state.contacts?.length === 0 && (
                <p className="text-sm text-muted-foreground">No contacts in this list yet.</p>
              )}

              {/* Email groups - only show after contacts loaded */}
              {contacts.length > 0 && (
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Send to {selectedCount} selected contact{selectedCount !== 1 ? "s" : ""}
                  </p>
                  {EMAIL_GROUPS.map((group, gi) => (
                    <div key={group.label} className={`rounded-lg border p-4 space-y-3 ${GROUP_COLORS[gi].header}`}>
                      <div>
                        <p className="text-sm font-semibold">{group.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {group.types.map(type => (
                          <button
                            key={type}
                            onClick={() => sendEmail(session, type)}
                            disabled={state.sending !== null || selectedCount === 0}
                            className={`text-left text-sm px-3 py-2 rounded-md border font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${GROUP_COLORS[gi].btn}`}
                          >
                            {state.sending === type ? "Sending..." : EMAIL_TYPE_LABELS[type]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Result banner */}
              {state.result && (
                <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  state.result.errors
                    ? "bg-amber-50 text-amber-800 border border-amber-200"
                    : "bg-green-50 text-green-800 border border-green-200"
                }`}>
                  {state.result.errors
                    ? `Sent ${state.result.sent} of ${state.result.total}. Failed: ${state.result.errors.join(", ")}`
                    : `Sent to ${state.result.sent} contact${state.result.sent !== 1 ? "s" : ""}. Done.`}
                </div>
              )}

            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
