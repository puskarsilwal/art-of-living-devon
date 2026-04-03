"use server"

import { redirect } from "next/navigation"
import { registrationSchema } from "@/lib/schemas/registration"
import { introTalkSessions } from "@/lib/data/intro-talks"
import { createEvent } from "ics"

export type RegistrationState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

async function sendBrevoConfirmation(data: {
  name: string
  email: string
  phone: string
  sessionId: string
}): Promise<void> {
  const session = introTalkSessions.find(s => s.id === data.sessionId)
  if (!session) return

  const firstName = data.name.split(" ")[0]
  const apiKey = process.env.BREVO_API_KEY!
  const headers = {
    "api-key": apiKey,
    "Content-Type": "application/json",
  }

  try {
    // Upsert contact
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: data.email,
        updateEnabled: true,
        attributes: {
          FIRSTNAME: firstName,
          EMAIL: data.email,
          PHONE: data.phone || "",
          SESSION_ID: data.sessionId,
          SESSION_DATE: session.date,
        },
      }),
    })
    if (!contactRes.ok) {
      const err = await contactRes.text()
      console.error("Brevo contact error:", contactRes.status, err)
    }

    // Generate ICS attachment
    const start = new Date(session.dateISO)
    const { value: icsValue } = createEvent({
      title: session.title,
      start: [start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate(), start.getUTCHours(), start.getUTCMinutes()],
      startInputType: "utc",
      duration: { hours: 1 },
      description: `Join via Google Meet: ${session.meetUrl}\n\nA free 60-minute introduction to SKY Breath Meditation and the Art of Living. No experience needed.`,
      location: session.meetUrl,
      url: session.meetUrl,
      status: "CONFIRMED",
      busyStatus: "BUSY",
    })

    // Send transactional confirmation email with ICS attachment
    const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${firstName},</p>
  <p>You're registered for the free Art of Living intro talk on <strong>${session.date}</strong> at <strong>${session.time} ${session.timezone}</strong>.</p>
  <p>The calendar invite is attached — open it to save the event and get your Google Meet link.</p>
  <p style="font-size: 14px; color: #666; margin-top: 24px;">
    Join directly on the day: <a href="${session.meetUrl}">${session.meetUrl}</a>
  </p>
  <p>See you there,<br>The Art of Living Devon Team</p>
</body>
</html>
    `.trim()

    const emailPayload: Record<string, unknown> = {
      sender: { name: "Art of Living Devon", email: "puskarsilwal001@gmail.com" },
      to: [{ email: data.email, name: data.name }],
      subject: `You're registered — Free Intro Talk on ${session.date}`,
      htmlContent,
    }
    if (icsValue) {
      emailPayload.attachment = [{
        name: `art-of-living-intro-${session.id}.ics`,
        content: Buffer.from(icsValue).toString("base64"),
      }]
    }

    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify(emailPayload),
    })
    if (!emailRes.ok) {
      const err = await emailRes.text()
      console.error("Brevo email error:", emailRes.status, err)
    } else {
      console.log("Brevo confirmation email sent OK")
    }

    // Notify organiser of new registration
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: "Art of Living Devon", email: "puskarsilwal001@gmail.com" },
        to: [{ email: "puskarsilwal001@gmail.com", name: "Puskar" }],
        subject: `New registration — ${data.name} (${session.date})`,
        htmlContent: `
<p><strong>New registration received</strong></p>
<p><strong>Name:</strong> ${data.name}<br>
<strong>Email:</strong> ${data.email}<br>
<strong>Phone:</strong> ${data.phone || "—"}<br>
<strong>Session:</strong> ${session.date} at ${session.time} ${session.timezone}</p>
        `.trim(),
      }),
    })
  } catch (err) {
    console.error("Brevo error:", err)
  }
}

export async function registerForIntroTalk(
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || "",
    consent: formData.get("consent") === "on",
    sessionId: formData.get("sessionId") as string,
  }

  const result = registrationSchema.safeParse(raw)

  if (!result.success) {
    return {
      success: false,
      message: "Please check the form for errors.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  // Best-effort: send Brevo confirmation (non-blocking, errors swallowed inside)
  await sendBrevoConfirmation({
    name: result.data.name,
    email: result.data.email,
    phone: result.data.phone ?? "",
    sessionId: result.data.sessionId,
  })

  // redirect() must be outside try/catch - it throws a NEXT_REDIRECT control-flow exception
  redirect(`/intro/confirmation?session=${encodeURIComponent(result.data.sessionId)}`)
}
