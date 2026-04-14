import { NextResponse } from "next/server"
import { EmailType, getEmailContent } from "@/lib/emails/post-intro-templates"

export const runtime = "nodejs"

async function fetchBrevoContacts(
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

export async function POST(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET
  const auth = request.headers.get("x-admin-key")

  if (!adminSecret || auth !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { listId, emailType } = body as { listId: number; emailType: EmailType }

  if (!listId || !emailType) {
    return NextResponse.json({ error: "Missing listId or emailType" }, { status: 400 })
  }

  const contacts = await fetchBrevoContacts(listId)

  if (contacts.length === 0) {
    return NextResponse.json({ sent: 0, message: "No contacts found in list" })
  }

  let sent = 0
  const errors: string[] = []

  for (const contact of contacts) {
    const firstName = contact.attributes?.FIRSTNAME || contact.email.split("@")[0]
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

    if (res.ok) {
      sent++
    } else {
      errors.push(contact.email)
    }
  }

  return NextResponse.json({
    sent,
    total: contacts.length,
    errors: errors.length > 0 ? errors : undefined,
  })
}
