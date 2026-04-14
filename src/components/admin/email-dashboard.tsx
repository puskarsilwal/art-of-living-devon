"use client"

import { useState } from "react"
import { IntroTalkSession } from "@/lib/data/intro-talks"
import { EmailType, EMAIL_TYPE_LABELS } from "@/lib/emails/post-intro-templates"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Contact {
  email: string
  name: string
}

interface SessionState {
  contacts: Contact[] | null
  loading: boolean
  sending: EmailType | null
  result: { sent: number; total: number; errors?: string[] } | null
}

const EMAIL_TYPES: EmailType[] = ["attended", "missed", "nurture-1", "nurture-2", "nurture-3"]

const TYPE_COLORS: Record<EmailType, string> = {
  attended: "bg-green-50 border-green-200 text-green-800 hover:bg-green-100",
  missed: "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100",
  "nurture-1": "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100",
  "nurture-2": "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100",
  "nurture-3": "bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100",
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
      sessions.map(s => [s.id, { contacts: null, loading: false, sending: null, result: null }])
    )
  )

  function updateState(sessionId: string, update: Partial<SessionState>) {
    setStates(prev => ({ ...prev, [sessionId]: { ...prev[sessionId], ...update } }))
  }

  async function loadContacts(session: IntroTalkSession) {
    if (!session.brevoListId) return
    updateState(session.id, { loading: true })
    try {
      const res = await fetch(`/api/admin/contacts?listId=${session.brevoListId}`, {
        headers: { "x-admin-key": adminKey },
      })
      const data = await res.json()
      updateState(session.id, { contacts: data.contacts ?? [], loading: false })
    } catch {
      updateState(session.id, { loading: false })
    }
  }

  async function sendEmail(session: IntroTalkSession, emailType: EmailType) {
    if (!session.brevoListId) return
    const confirmed = window.confirm(
      `Send "${EMAIL_TYPE_LABELS[emailType]}" to ${states[session.id].contacts?.length ?? "all"} contacts on the ${session.date} list?`
    )
    if (!confirmed) return

    updateState(session.id, { sending: emailType, result: null })
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ listId: session.brevoListId, emailType }),
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

        return (
          <Card key={session.id} className="border border-border">
            <CardContent className="pt-6 space-y-5">
              {/* Session header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">{session.date}</h2>
                    {session.badge && (
                      <Badge variant="secondary">{session.badge}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.time} {session.timezone} · {session.location}
                  </p>
                </div>

                {hasListId ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => loadContacts(session)}
                    disabled={state.loading}
                  >
                    {state.loading
                      ? "Loading..."
                      : state.contacts !== null
                      ? `${state.contacts.length} contacts`
                      : "Load contacts"}
                  </Button>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    No Brevo list configured
                  </Badge>
                )}
              </div>

              {/* Contact list preview */}
              {state.contacts && state.contacts.length > 0 && (
                <div className="bg-muted/40 rounded-lg p-3 space-y-1 max-h-40 overflow-y-auto">
                  {state.contacts.map(c => (
                    <div key={c.email} className="text-sm flex gap-2">
                      <span className="font-medium">{c.name || "—"}</span>
                      <span className="text-muted-foreground">{c.email}</span>
                    </div>
                  ))}
                </div>
              )}

              {state.contacts?.length === 0 && (
                <p className="text-sm text-muted-foreground">No contacts in this list yet.</p>
              )}

              {/* Send buttons */}
              {hasListId && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Send email to this list
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {EMAIL_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => sendEmail(session, type)}
                        disabled={state.sending !== null}
                        className={`text-sm px-3 py-1.5 rounded-md border font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${TYPE_COLORS[type]}`}
                      >
                        {state.sending === type
                          ? "Sending..."
                          : EMAIL_TYPE_LABELS[type]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Result banner */}
              {state.result && (
                <div
                  className={`rounded-lg px-4 py-3 text-sm font-medium ${
                    state.result.errors
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-green-50 text-green-800 border border-green-200"
                  }`}
                >
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
