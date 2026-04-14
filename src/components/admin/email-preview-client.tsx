"use client"

import { useState } from "react"
import { EmailType, EMAIL_TYPE_LABELS, EMAIL_GROUPS, getEmailContent } from "@/lib/emails/post-intro-templates"

const PREVIEW_NAME = "Alex"

const GROUP_COLORS: Record<number, { dot: string; badge: string }> = {
  0: { dot: "bg-green-500",  badge: "bg-green-100 text-green-800" },
  1: { dot: "bg-amber-500",  badge: "bg-amber-100 text-amber-800" },
  2: { dot: "bg-purple-500", badge: "bg-purple-100 text-purple-800" },
  3: { dot: "bg-slate-400",  badge: "bg-slate-100 text-slate-700" },
}

export default function EmailPreviewClient({ adminKey }: { adminKey: string }) {
  const [selected, setSelected] = useState<EmailType>("attended-1-welcome")
  const [sendTo, setSendTo] = useState("")
  const [sending, setSending] = useState(false)
  const [sendResult, setSendResult] = useState<string | null>(null)

  const { subject, htmlContent } = getEmailContent(selected, PREVIEW_NAME)

  // Find which group index this email belongs to
  const groupIndex = EMAIL_GROUPS.findIndex(g => g.types.includes(selected))
  const colors = GROUP_COLORS[groupIndex] ?? GROUP_COLORS[3]

  async function sendTest() {
    if (!sendTo.trim()) return
    setSending(true)
    setSendResult(null)
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({
          contacts: [{ email: sendTo.trim(), name: PREVIEW_NAME }],
          emailType: selected,
        }),
      })
      const data = await res.json()
      setSendResult(data.sent === 1 ? "Sent." : `Error: ${data.errors?.join(", ")}`)
    } catch {
      setSendResult("Request failed.")
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-semibold text-base">Email Preview</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Previewed as <strong>{PREVIEW_NAME}</strong> ·{" "}
            <a href={`/admin?key=${adminKey}`} className="text-primary underline-offset-2 hover:underline">
              Back to dashboard
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="email"
            placeholder="Send test to email..."
            value={sendTo}
            onChange={e => { setSendTo(e.target.value); setSendResult(null) }}
            className="text-sm border border-border rounded-md px-3 py-1.5 w-56 bg-background"
          />
          <button
            onClick={sendTest}
            disabled={sending || !sendTo.trim()}
            className="text-sm px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-medium disabled:opacity-40"
          >
            {sending ? "Sending..." : "Send test"}
          </button>
          {sendResult && (
            <span className={`text-xs font-medium ${sendResult === "Sent." ? "text-green-700" : "text-red-600"}`}>
              {sendResult}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r border-border overflow-y-auto">
          {EMAIL_GROUPS.map((group, gi) => (
            <div key={group.label}>
              <div className="px-4 py-3 border-b border-border bg-muted/40">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${GROUP_COLORS[gi].dot}`} />
                  <p className="text-xs font-semibold text-foreground leading-tight">{group.label}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1 pl-4">{group.description}</p>
              </div>
              {group.types.map((type, ti) => (
                <button
                  key={type}
                  onClick={() => { setSelected(type); setSendResult(null) }}
                  className={`w-full text-left px-4 py-2.5 text-sm border-b border-border/60 transition-colors flex items-start gap-2 ${
                    selected === type ? "bg-primary/8 text-primary font-medium" : "hover:bg-muted/40"
                  }`}
                >
                  <span className={`mt-0.5 text-xs font-bold shrink-0 w-4 ${GROUP_COLORS[gi].badge.split(" ")[1]}`}>
                    {ti + 1}.
                  </span>
                  <span className="leading-snug">{EMAIL_TYPE_LABELS[type].replace(/\s*\(.*?\)/, "")}</span>
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* Preview pane */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Subject + metadata bar */}
          <div className="px-6 py-3 border-b border-border bg-muted/20 flex items-center gap-3 flex-wrap">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>
              {EMAIL_GROUPS[groupIndex]?.label ?? ""}
            </span>
            <span className="text-sm font-medium text-foreground">Subject: {subject}</span>
          </div>
          {/* Rendered email */}
          <iframe
            key={selected}
            srcDoc={htmlContent}
            className="flex-1 w-full border-0 bg-white"
            title="Email preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </main>
  )
}
