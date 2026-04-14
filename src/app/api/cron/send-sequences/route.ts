// Invoked by Vercel cron at 9:00 UTC daily (see vercel.json). Secured via CRON_SECRET env var.
// Processes enrolled contacts and sends the next email in their sequence.
import { NextResponse } from "next/server"
import { introTalkSessions } from "@/lib/data/intro-talks"
import { EmailType, getEmailContent } from "@/lib/emails/post-intro-templates"

export const runtime = "nodejs"

type SequenceType = "attended" | "missed" | "cold"

const SEQUENCES: Record<SequenceType, { schedule: number[]; emails: EmailType[] }> = {
  attended: {
    schedule: [0, 4, 10, 17, 24],
    emails: [
      "attended-1-welcome",
      "attended-2-science",
      "attended-3-transformation",
      "attended-4-social-proof",
      "attended-5-final-push",
    ],
  },
  missed: {
    schedule: [0, 2, 4, 5],
    emails: [
      "missed-1-invite",
      "missed-2-three-day",
      "missed-3-day-before",
      "missed-4-day-of",
    ],
  },
  cold: {
    schedule: [0, 5, 10, 15, 20, 26],
    emails: [
      "cold-1-what-is-it",
      "cold-2-science",
      "cold-3-course-details",
      "cold-4-stories",
      "cold-5-urgency",
      "cold-6-final",
    ],
  },
}

interface BrevoContact {
  email: string
  attributes: Record<string, string | number>
}

async function fetchListContacts(listId: number): Promise<BrevoContact[]> {
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

function daysBetween(startDateStr: string, today: Date): number {
  const start = new Date(startDateStr + "T00:00:00Z")
  const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  return Math.floor((todayUTC.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

async function sendSequenceEmail(contact: BrevoContact, emailType: EmailType): Promise<boolean> {
  const firstName = String(contact.attributes?.FIRSTNAME || contact.email.split("@")[0])
  const { subject, htmlContent } = getEmailContent(emailType, firstName)

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
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

  return res.ok
}

async function updateContactStep(email: string, nextStep: number, today: string) {
  await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
    {
      method: "PUT",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attributes: {
          SEQ_STEP: nextStep,
          SEQ_LAST_SENT: today,
        },
      }),
    }
  )
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Gather all contacts from all session lists, deduplicating by email
  const contactMap = new Map<string, BrevoContact>()
  for (const session of introTalkSessions) {
    if (!session.brevoListId) continue
    const contacts = await fetchListContacts(session.brevoListId)
    for (const c of contacts) {
      if (!contactMap.has(c.email)) {
        contactMap.set(c.email, c)
      }
    }
  }

  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10)

  let sent = 0
  let skipped = 0
  const errors: string[] = []

  for (const contact of contactMap.values()) {
    const sequence = String(contact.attributes?.SEQUENCE || "").trim() as SequenceType
    if (!sequence || !SEQUENCES[sequence]) {
      skipped++
      continue
    }

    const seqConfig = SEQUENCES[sequence]
    const seqStep = Number(contact.attributes?.SEQ_STEP ?? 0)

    // Sequence complete - nothing left to send
    if (seqStep >= seqConfig.schedule.length) {
      skipped++
      continue
    }

    const seqStart = String(contact.attributes?.SEQ_START || "")
    if (!seqStart) {
      skipped++
      continue
    }

    const daysSinceStart = daysBetween(seqStart, today)
    const daysUntilNextEmail = seqConfig.schedule[seqStep]

    if (daysSinceStart < daysUntilNextEmail) {
      skipped++
      continue
    }

    // Send the next email in the sequence
    const emailType = seqConfig.emails[seqStep]
    const ok = await sendSequenceEmail(contact, emailType)

    if (ok) {
      await updateContactStep(contact.email, seqStep + 1, todayStr)
      sent++
    } else {
      errors.push(contact.email)
    }
  }

  console.log(`Sequences: sent=${sent} skipped=${skipped} errors=${errors.length}`)
  return NextResponse.json({ sent, skipped, errors: errors.length > 0 ? errors : undefined })
}
