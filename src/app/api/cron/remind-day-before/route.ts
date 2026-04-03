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
      ? `Reminder: Your Art of Living intro talk is tomorrow (${session.date})`
      : `Starting in 1 hour: Your Art of Living intro talk today at ${session.time} ${session.timezone}`
  const htmlContent =
    type === "day-before"
      ? `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${firstName},</p>
  <p>Just a reminder that your free Art of Living intro talk is <strong>tomorrow, ${session.date} at ${session.time} ${session.timezone}</strong>.</p>
  <p>In 60 minutes you'll experience:</p>
  <ul style="padding-left: 20px; line-height: 1.8;">
    <li><strong>SKY Breath Meditation</strong>, practised by 800M+ people across 180 countries</li>
    <li><strong>Calming breathwork</strong> you can feel working immediately, no experience needed</li>
    <li><strong>Guided meditation</strong>: a gentle teacher-led practice, like a reset for the mind</li>
    <li><strong>Deep rest</strong> that settles the nervous system and restores natural energy</li>
  </ul>
  <blockquote style="border-left: 3px solid #f97316; padding-left: 16px; margin: 20px 0; color: #555; font-style: italic;">
    "About 30 days after doing the techniques very regularly, I just got so happy for no reason. And I hadn't experienced that in a long time." - Phillip Mertz, Investment Manager
  </blockquote>
  <p>The session is completely free and runs online via Google Meet. Just show up, no preparation needed.</p>
  <p style="font-size: 14px; color: #666; margin-top: 24px;">Join link for tomorrow: <a href="${session.meetUrl}">${session.meetUrl}</a></p>
  <p>See you tomorrow,<br>The Art of Living Devon Team</p>
</body>
</html>`
      : `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${firstName},</p>
  <p>Your free Art of Living intro talk starts in <strong>1 hour</strong>, today at ${session.time} ${session.timezone}.</p>
  <p>Here's what to know before you join:</p>
  <ul style="padding-left: 20px; line-height: 1.8;">
    <li>The session is 60 minutes and runs entirely online</li>
    <li>No preparation needed, just show up as you are</li>
    <li>You'll try a breathing technique you can feel working immediately</li>
    <li>Certified teachers will guide you through every step</li>
  </ul>
  <p style="margin-top: 20px;"><a href="${session.meetUrl}" style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Join Google Meet Now →</a></p>
  <p style="font-size: 13px; color: #666; margin-top: 12px;">Or paste this link: ${session.meetUrl}</p>
  <p>See you in an hour,<br>The Art of Living Devon Team</p>
</body>
</html>`

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
