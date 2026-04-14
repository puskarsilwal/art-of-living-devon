import { NextResponse } from "next/server"

export const runtime = "nodejs"

// Brevo's list contacts endpoint only returns built-in attributes (FIRSTNAME etc).
// Custom attributes (SEQUENCE, SEQ_STEP etc) require fetching each contact individually.
async function fetchContactDetail(
  email: string
): Promise<Record<string, string | number>> {
  const res = await fetch(
    `https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`,
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
    }
  )
  if (!res.ok) return {}
  const data = await res.json()
  return data.attributes ?? {}
}

export async function GET(request: Request) {
  const adminSecret = process.env.ADMIN_SECRET
  const auth = request.headers.get("x-admin-key")

  if (!adminSecret || auth !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const listId = searchParams.get("listId")

  if (!listId) {
    return NextResponse.json({ error: "Missing listId" }, { status: 400 })
  }

  const res = await fetch(
    `https://api.brevo.com/v3/contacts/lists/${listId}/contacts?limit=500`,
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
    }
  )

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch contacts from Brevo" }, { status: 500 })
  }

  const data = await res.json()
  const contacts: Array<{ email: string; attributes: Record<string, string> }> =
    data.contacts ?? []

  // Fetch full attributes for all contacts in parallel to get custom fields
  const detailedAttrs = await Promise.all(
    contacts.map(c => fetchContactDetail(c.email))
  )

  return NextResponse.json({
    count: contacts.length,
    contacts: contacts.map((c, i) => {
      const attrs = detailedAttrs[i]
      return {
        email: c.email,
        name: String(attrs?.FIRSTNAME || c.attributes?.FIRSTNAME || ""),
        sequence: String(attrs?.SEQUENCE || ""),
        seqStep: attrs?.SEQ_STEP != null ? Number(attrs.SEQ_STEP) : undefined,
        seqStart: String(attrs?.SEQ_START || ""),
      }
    }),
  })
}
