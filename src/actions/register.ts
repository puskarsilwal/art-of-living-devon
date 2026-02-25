"use server"

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

  return {
    success: true,
    message: "You're registered! We'll send you the Zoom details by email.",
  }
}
