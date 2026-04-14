import { NextResponse } from "next/server"

export const runtime = "nodejs"

async function clearSequence(email: string): Promise<boolean> {
  const res = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
    {
      method: "PUT",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attributes: {
          SEQUENCE: "",
          SEQ_START: "",
          SEQ_STEP: 0,
          SEQ_LAST_SENT: "",
        },
      }),
    }
  )
  return res.ok
}

export async function POST(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET
  const auth = request.headers.get("x-admin-key")

  if (!adminSecret || auth !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { contacts } = body as { contacts: Array<{ email: string; name: string }> }

  if (!contacts?.length) {
    return NextResponse.json({ error: "Missing contacts" }, { status: 400 })
  }

  let cancelled = 0
  const errors: string[] = []

  for (const contact of contacts) {
    const ok = await clearSequence(contact.email)
    if (ok) {
      cancelled++
    } else {
      errors.push(contact.email)
    }
  }

  return NextResponse.json({
    cancelled,
    total: contacts.length,
    errors: errors.length > 0 ? errors : undefined,
  })
}
