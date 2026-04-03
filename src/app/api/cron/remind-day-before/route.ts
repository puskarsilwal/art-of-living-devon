// Invoked by Vercel cron at 9:00 UTC daily (see vercel.json). Secured via CRON_SECRET env var.
import { NextResponse } from "next/server"
import { introTalkSessions, IntroTalkSession } from "@/lib/data/intro-talks"

export const runtime = "nodejs"

const CRON_SECRET = process.env.CRON_SECRET

async function fetchBrevoListContacts(
  listId: number
): Promise<Array<{ email: string; attributes: Record<string, string> }>> {
  const res = await fetch(
    `https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=500`,
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
    }
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.contacts ?? []
}

async function sendReminderEmail(
  contact: { email: string; attributes: Record<string, string> },
  session: IntroTalkSession,
  type: "day-before" | "hour-before"
) {
  const firstName = contact.attributes.FIRSTNAME || contact.email.split("@")[0]
  const subject =
    type === "day-before"
      ? `Reminder — Your Art of Living intro talk is tomorrow (${session.date})`
      : `Starting in 1 hour — Your Art of Living intro talk today at ${session.time} ${session.timezone}`
  const htmlContent =
    type === "day-before"
      ? `<p>Hi ${firstName},</p><p>Just a reminder that your free Art of Living intro talk is <strong>tomorrow, ${session.date} at ${session.time} ${session.timezone}</strong>.</p><p>Join via Google Meet: <a href="${session.meetUrl}">${session.meetUrl}</a></p><p>See you tomorrow,<br>The Art of Living Devon Team</p>`
      : `<p>Hi ${firstName},</p><p>Your free Art of Living intro talk starts in <strong>1 hour</strong> — today at ${session.time} ${session.timezone}.</p><p>Join now via Google Meet: <a href="${session.meetUrl}">${session.meetUrl}</a></p><p>See you soon,<br>The Art of Living Devon Team</p>`

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Art of Living Devon", email: "puskarsilwal001@gmail.com" },
      to: [{ email: contact.email, name: firstName }],
      subject,
      htmlContent,
    }),
  })
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization")
  if (!CRON_SECRET || auth !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Compute tomorrow's date in UTC
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)

  let sent = 0

  for (const session of introTalkSessions) {
    const sessionDate = new Date(session.dateISO)
    if (
      sessionDate.toDateString() === tomorrow.toDateString() &&
      session.brevoListId !== undefined
    ) {
      const contacts = await fetchBrevoListContacts(session.brevoListId)
      for (const contact of contacts) {
        await sendReminderEmail(contact, session, "day-before")
        sent++
      }
    }
  }

  if (sent === 0) {
    console.log("Day-before reminders: No sessions tomorrow")
  } else {
    console.log(`Day-before reminders sent: ${sent}`)
  }

  return NextResponse.json({ sent })
}
