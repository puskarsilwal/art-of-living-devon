import { NextResponse } from "next/server"

export const runtime = "nodejs"

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

  return NextResponse.json({
    count: contacts.length,
    contacts: contacts.map(c => ({
      email: c.email,
      name: c.attributes?.FIRSTNAME || "",
    })),
  })
}
