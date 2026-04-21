import { NextResponse } from "next/server"
import { getEmailContent } from "@/lib/emails/post-intro-templates"

export const runtime = "nodejs"

export type SequenceType = "attended" | "missed" | "cold"

// Ensure custom Brevo attributes exist.
// Correct endpoint: POST /v3/contacts/attributes/normal/{attributeName}
// Brevo returns 400 if the attribute already exists - that is fine, we ignore it.
async function ensureBrevoAttributes() {
  const attrs: Array<{ name: string; type: "text" | "float" }> = [
    { name: "SEQUENCE", type: "text" },
    { name: "SEQ_START", type: "text" },
    { name: "SEQ_STEP", type: "float" },
    { name: "SEQ_LAST_SENT", type: "text" },
    { name: "PHONE", type: "text" },
  ]

  for (const attr of attrs) {
    await fetch(
      `https://api.brevo.com/v3/contacts/attributes/normal/${attr.name}`,
      {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: attr.type }),
      }
    )
    // Ignore errors - attribute may already exist
  }
}

function formatForSms(phone: string): string | null {
  // Remove spaces and non-digit characters except '+'
  const clean = phone.replace(/[^\d+]/g, "")
  if (!clean) return null

  // Handle common UK formats
  if (clean.startsWith("07") && clean.length === 11) return "+44" + clean.slice(1)
  if (clean.startsWith("+07")) return "+44" + clean.slice(2)
  if (clean.startsWith("+44")) return clean
  if (clean.startsWith("44") && !clean.startsWith("+")) return "+" + clean
  
  // If it starts with + and looks like it has a country code, return as is
  if (clean.startsWith("+") && clean.length > 8) return clean

  return null // Return null if we can't be sure it's a valid international mobile
}

async function enrollContact(email: string, name: string, phone: string, sequence: SequenceType, today: string) {
  // Try to parse first name and last name
  const nameParts = (name || "").trim().split(/\s+/)
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ")

  let initialStep = 0
  let lastSent = ""

  // If attended, we immediately send the first email rather than wait for the cron
  if (sequence === "attended") {
    const { subject, htmlContent } = getEmailContent("attended-1-welcome", firstName || email.split("@")[0])
    
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Art of Living Devon", email: "puskarsilwal001@gmail.com" },
        to: [{ email, name: firstName }],
        subject,
        htmlContent,
      }),
    })
    
    if (emailRes.ok) {
      initialStep = 1
      lastSent = today
    }
  }

  const attributes: Record<string, any> = {
    SEQUENCE: sequence,
    SEQ_START: today,
    SEQ_STEP: initialStep,
    SEQ_LAST_SENT: lastSent,
  }

  if (firstName) attributes.FIRSTNAME = firstName
  if (lastName) attributes.LASTNAME = lastName
  if (phone) {
    attributes.PHONE = phone
    const smsFormatted = formatForSms(phone)
    if (smsFormatted) {
      attributes.SMS = smsFormatted
    }
  }

  const res = await fetch(`https://api.brevo.com/v3/contacts`, {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      attributes,
      updateEnabled: true,
    }),
  })
  return res.ok
}

export async function POST(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET
  const auth = request.headers.get("x-admin-key")

  if (!adminSecret || auth !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { contacts, sequence, startDate } = body as {
    contacts: Array<{ email: string; name: string; phone?: string }>
    sequence: SequenceType
    startDate?: string
  }

  if (!contacts?.length || !sequence) {
    return NextResponse.json({ error: "Missing contacts or sequence" }, { status: 400 })
  }

  if (!["attended", "missed", "cold"].includes(sequence)) {
    return NextResponse.json({ error: "Invalid sequence type" }, { status: 400 })
  }

  // Ensure attributes exist in Brevo (no-op if already created)
  await ensureBrevoAttributes()

  // Use provided startDate so late enrollments stay on schedule.
  // Falls back to today if not supplied.
  const today = (startDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate))
    ? startDate
    : new Date().toISOString().slice(0, 10)

  let enrolled = 0
  const errors: string[] = []

  for (const contact of contacts) {
    const ok = await enrollContact(contact.email, contact.name || "", contact.phone || "", sequence, today)
    if (ok) {
      enrolled++
    } else {
      errors.push(contact.email)
    }
  }

  return NextResponse.json({
    enrolled,
    total: contacts.length,
    errors: errors.length > 0 ? errors : undefined,
  })
}
