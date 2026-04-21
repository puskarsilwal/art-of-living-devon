"use client"

import { useState } from "react"
import { IntroTalkSession } from "@/lib/data/intro-talks"
import { EmailType, EMAIL_TYPE_LABELS, EMAIL_GROUPS } from "@/lib/emails/post-intro-templates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type SequenceType = "attended" | "missed" | "cold"

interface Contact {
  email: string
  name: string
  phone?: string
  sequence?: string
  seqStep?: number
  seqStart?: string
}

interface SessionState {
  contacts: Contact[] | null
  selected: Set<string>
  loading: boolean
  sending: EmailType | null
  enrolling: boolean
  cancelling: boolean
  enrollSequence: SequenceType
  enrollStartDate: string
  result: { sent: number; total: number; errors?: string[] } | null
  enrollResult: { enrolled: number; total: number; errors?: string[] } | null
  cancelResult: { cancelled: number; total: number; errors?: string[] } | null
  showOneOff: boolean
}

const GROUP_COLORS = [
  { btn: "bg-green-50 border-green-200 text-green-800 hover:bg-green-100",   header: "bg-green-50 border-green-200"   },
  { btn: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100",   header: "bg-amber-50 border-amber-200"   },
  { btn: "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100",       header: "bg-blue-50 border-blue-200"     },
  { btn: "bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100", header: "bg-purple-50 border-purple-200" },
  { btn: "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100",   header: "bg-slate-50 border-slate-200"   },
]

const SEQUENCE_LABELS: Record<SequenceType, string> = {
  attended: "Attended - 5 emails over 24 days",
  missed:   "Missed - 4 emails over 5 days",
  cold:     "Cold - 6 emails over 26 days",
}

const SEQUENCE_LENGTHS: Record<SequenceType, number> = {
  attended: 5,
  missed:   4,
  cold:     6,
}

function seqStatusLabel(contact: Contact): { label: string; color: string } {
  const seq = contact.sequence
  if (!seq) return { label: "None", color: "text-muted-foreground" }

  const step = contact.seqStep ?? 0
  const total = SEQUENCE_LENGTHS[seq as SequenceType] ?? 0
  const seqLabel = seq.charAt(0).toUpperCase() + seq.slice(1)

  if (step >= total) return { label: `${seqLabel} - Done`, color: "text-green-700" }
  return { label: `${seqLabel} - step ${step}/${total}`, color: "text-orange-700" }
}

export default function EmailDashboard({
  sessions,
  adminKey,
}: {
  sessions: IntroTalkSession[]
  adminKey: string
}) {
  const [states, setStates] = useState<Record<string, SessionState>>(
    Object.fromEntries(
      sessions.map(s => [s.id, {
        contacts: null,
        selected: new Set(),
        loading: false,
        sending: null,
        enrolling: false,
        cancelling: false,
        enrollSequence: "attended",
        enrollStartDate: new Date(s.dateISO).toISOString().slice(0, 10),
        result: null,
        enrollResult: null,
        cancelResult: null,
        showOneOff: false,
      }])
    )
  )

  function updateState(sessionId: string, update: Partial<SessionState>) {
    setStates(prev => ({ ...prev, [sessionId]: { ...prev[sessionId], ...update } }))
  }

  async function loadContacts(session: IntroTalkSession, silent = false) {
    if (!session.brevoListId) return
    if (!silent) updateState(session.id, { loading: true, result: null, enrollResult: null })
    try {
      const res = await fetch(`/api/admin/contacts?listId=${session.brevoListId}`, {
        headers: { "x-admin-key": adminKey },
      })
      const data = await res.json()
      const contacts: Contact[] = data.contacts ?? []

      // Pre-select the enroll dropdown to match whatever sequence most contacts are already in
      const seqCounts: Record<string, number> = {}
      for (const c of contacts) {
        if (c.sequence) seqCounts[c.sequence] = (seqCounts[c.sequence] ?? 0) + 1
      }
      const dominantSeq = Object.entries(seqCounts).sort((a, b) => b[1] - a[1])[0]?.[0] as SequenceType | undefined

      updateState(session.id, {
        contacts,
        selected: new Set(contacts.map((c: Contact) => c.email)),
        loading: false,
        ...(dominantSeq ? { enrollSequence: dominantSeq } : {}),
      })
    } catch {
      updateState(session.id, { loading: false })
    }
  }

  function toggleContact(sessionId: string, email: string) {
    setStates(prev => {
      const next = new Set(prev[sessionId].selected)
      next.has(email) ? next.delete(email) : next.add(email)
      return { ...prev, [sessionId]: { ...prev[sessionId], selected: next, result: null, enrollResult: null } }
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
          enrollResult: null,
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

  async function enrollContacts(session: IntroTalkSession) {
    const state = states[session.id]
    const selectedContacts = (state.contacts ?? []).filter((c: Contact) => state.selected.has(c.email))

    if (selectedContacts.length === 0) {
      alert("No contacts selected.")
      return
    }

    const seqLabel = SEQUENCE_LABELS[state.enrollSequence]
    const confirmed = window.confirm(
      `Enroll ${selectedContacts.length} contact${selectedContacts.length !== 1 ? "s" : ""} in: ${seqLabel}\nSequence starts from: ${state.enrollStartDate}\n\nOverdue emails send at the next 9 AM UTC cron run.`
    )
    if (!confirmed) return

    updateState(session.id, { enrolling: true, enrollResult: null })
    try {
      const res = await fetch("/api/admin/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ contacts: selectedContacts, sequence: state.enrollSequence, startDate: state.enrollStartDate }),
      })
      const data = await res.json()
      updateState(session.id, { enrolling: false, enrollResult: data })
      // Refresh contact list so sequence status columns update immediately
      if (data.enrolled > 0) await loadContacts(session, true)
    } catch {
      updateState(session.id, { enrolling: false })
    }
  }

  async function cancelSequence(session: IntroTalkSession) {
    const state = states[session.id]
    const selectedContacts = (state.contacts ?? []).filter((c: Contact) => state.selected.has(c.email))
    const enrolled = selectedContacts.filter(c => c.sequence)

    if (enrolled.length === 0) {
      alert("None of the selected contacts are enrolled in a sequence.")
      return
    }

    const confirmed = window.confirm(
      `Cancel sequence for ${enrolled.length} contact${enrolled.length !== 1 ? "s" : ""}? They will stop receiving automated emails.`
    )
    if (!confirmed) return

    updateState(session.id, { cancelling: true, cancelResult: null })
    try {
      const res = await fetch("/api/admin/unenroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ contacts: enrolled }),
      })
      const data = await res.json()
      updateState(session.id, { cancelling: false, cancelResult: data })
      if (data.cancelled > 0) await loadContacts(session, true)
    } catch {
      updateState(session.id, { cancelling: false })
    }
  }

  function exportContactsToCsv(contacts: Contact[], sessionDate: string) {
    if (!contacts || contacts.length === 0) return
    const headers = ["Name", "Email", "Phone", "Sequence", "Step", "Start Date"]
    const rows = contacts.map(c => [
      c.name || "",
      c.email,
      c.phone || "",
      c.sequence || "None",
      c.seqStep?.toString() || "0",
      c.seqStart || ""
    ])
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(v => `"${v.replace(/"/g, '""')}"`).join(","))
    ].join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `contacts-${sessionDate.replace(/\W+/g, "-").toLowerCase()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function exportAllLoadedContactsToCsv() {
    const allContacts: Contact[] = []
    Object.values(states).forEach(state => {
      if (state.contacts) {
        allContacts.push(...state.contacts)
      }
    })
    
    if (allContacts.length === 0) {
      alert("No contacts loaded to export. Please click 'Load contacts' on at least one session.")
      return
    }
    
    const uniqueContacts = Array.from(new Map(allContacts.map(c => [c.email, c])).values())
    exportContactsToCsv(uniqueContacts, "all-sessions-master")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end border-b border-border pb-4">
        <Button variant="default" onClick={exportAllLoadedContactsToCsv}>
          Export Master List (All Loaded Sessions)
        </Button>
      </div>
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
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => loadContacts(session)} disabled={state.loading}>
                      {state.loading ? "Loading..." : state.contacts !== null ? "Refresh" : "Load contacts"}
                    </Button>
                    {state.contacts !== null && state.contacts.length > 0 && (
                      <Button variant="outline" size="sm" onClick={() => exportContactsToCsv(state.contacts!, session.date)}>
                        Export CSV
                      </Button>
                    )}
                  </div>
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
                      const status = seqStatusLabel(c)
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
                          <span className="text-sm font-medium min-w-[100px]">{c.name || "-"}</span>
                          <span className="text-sm text-muted-foreground flex-1">{c.email}</span>
                          <span className={`text-xs font-medium ${status.color} shrink-0`}>{status.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              )}

              {state.contacts?.length === 0 && (
                <p className="text-sm text-muted-foreground">No contacts in this list yet.</p>
              )}

              {/* Enroll in sequence - only show after contacts loaded */}
              {contacts.length > 0 && (
                <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
                  <p className="text-sm font-semibold">Enroll in automated sequence</p>
                  <p className="text-xs text-muted-foreground">
                    The cron runs daily at 9 AM UTC. Set the start date to the session date so
                    email timing stays on track even if you enroll late.
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <select
                      value={state.enrollSequence}
                      onChange={e => updateState(session.id, { enrollSequence: e.target.value as SequenceType })}
                      className="text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                    >
                      {(Object.keys(SEQUENCE_LABELS) as SequenceType[]).map(seq => (
                        <option key={seq} value={seq}>{SEQUENCE_LABELS[seq]}</option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">Start from:</label>
                      <input
                        type="date"
                        value={state.enrollStartDate}
                        onChange={e => updateState(session.id, { enrollStartDate: e.target.value })}
                        className="text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => enrollContacts(session)}
                      disabled={state.enrolling || state.cancelling || selectedCount === 0}
                    >
                      {state.enrolling
                        ? "Enrolling..."
                        : `Enroll ${selectedCount} contact${selectedCount !== 1 ? "s" : ""}`}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => cancelSequence(session)}
                      disabled={state.cancelling || state.enrolling || selectedCount === 0}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      {state.cancelling ? "Cancelling..." : "Cancel sequence"}
                    </Button>
                  </div>
                  {state.enrollResult && (
                    <div className={`rounded-md px-3 py-2 text-sm font-medium ${
                      state.enrollResult.errors
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-green-50 text-green-800 border border-green-200"
                    }`}>
                      {state.enrollResult.errors
                        ? `Enrolled ${state.enrollResult.enrolled} of ${state.enrollResult.total}. Failed: ${state.enrollResult.errors.join(", ")}`
                        : `Enrolled ${state.enrollResult.enrolled} contact${state.enrollResult.enrolled !== 1 ? "s" : ""}. First email sends at next 9 AM UTC cron run.`}
                    </div>
                  )}
                  {state.cancelResult && (
                    <div className={`rounded-md px-3 py-2 text-sm font-medium ${
                      state.cancelResult.errors
                        ? "bg-amber-50 text-amber-800 border border-amber-200"
                        : "bg-green-50 text-green-800 border border-green-200"
                    }`}>
                      {state.cancelResult.errors
                        ? `Cancelled ${state.cancelResult.cancelled} of ${state.cancelResult.total}. Failed: ${state.cancelResult.errors.join(", ")}`
                        : `Cancelled sequence for ${state.cancelResult.cancelled} contact${state.cancelResult.cancelled !== 1 ? "s" : ""}.`}
                    </div>
                  )}
                </div>
              )}

              {/* One-off sends - collapsible */}
              {contacts.length > 0 && (
                <div className="space-y-3">
                  <button
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1"
                    onClick={() => updateState(session.id, { showOneOff: !state.showOneOff })}
                  >
                    <span>{state.showOneOff ? "▾" : "▸"}</span>
                    One-off sends
                  </button>
                  {state.showOneOff && (
                    <div className="space-y-4">
                      <p className="text-xs text-muted-foreground">
                        Send a single email immediately to {selectedCount} selected contact{selectedCount !== 1 ? "s" : ""}. Does not affect sequence enrollment.
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
                </div>
              )}

              {/* One-off send result banner */}
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
