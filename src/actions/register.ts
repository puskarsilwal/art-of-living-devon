"use server"

import { redirect } from "next/navigation"
import { registrationSchema } from "@/lib/schemas/registration"
import { introTalkSessions } from "@/lib/data/intro-talks"

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

    // Send transactional confirmation email
    const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <p>Hi ${firstName},</p>
  <p>You're all set for the free Art of Living intro talk on <strong>${session.date}</strong> at <strong>${session.time} ${session.timezone}</strong>.</p>
  <p style="margin: 24px 0;">
    <a href="${session.meetUrl}"
       style="background-color: #f97316; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
      Join via Google Meet
    </a>
  </p>
  <p style="font-size: 14px; color: #666;">
    Add to Google Calendar: <a href="${session.calendarLink}">${session.calendarLink}</a>
  </p>
  <p>See you there,<br>The Art of Living UK Team</p>
</body>
</html>
    `.trim()

    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: "Art of Living Devon", email: "puskarsilwal001@gmail.com" },
        to: [{ email: data.email, name: data.name }],
        subject: `You're registered — Free Intro Talk on ${session.date}`,
        htmlContent,
      }),
    })
    if (!emailRes.ok) {
      const err = await emailRes.text()
      console.error("Brevo email error:", emailRes.status, err)
    } else {
      console.log("Brevo email sent OK")
    }
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
