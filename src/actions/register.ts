"use server"

import { redirect } from "next/navigation"
import { registrationSchema } from "@/lib/schemas/registration"

export type RegistrationState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
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

  // TODO: Brevo integration in Phase 9
  console.log("New registration:", result.data)

  // redirect() must be outside try/catch — it throws a NEXT_REDIRECT control-flow exception
  redirect(`/intro/confirmation?session=${encodeURIComponent(result.data.sessionId)}`)
}
