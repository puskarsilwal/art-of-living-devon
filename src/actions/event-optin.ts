"use server"

import { z } from "zod"

export type OptinState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    consent?: string[]
  }
}

const optinSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  consent: z.literal("on", { message: "Please tick the consent checkbox to continue" }),
})

export async function subscribeToEventUpdates(
  _prev: OptinState,
  formData: FormData
): Promise<OptinState> {
  const result = optinSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    consent: formData.get("consent"),
  })

  if (!result.success) {
    return {
      success: false,
      message: "Please check the fields below.",
      errors: result.error.flatten().fieldErrors,
    }
  }

  // TODO Phase 9: Wire to Brevo API with per-event brevoListId
  console.log("[Phase 7 stub] Event opt-in:", {
    name: result.data.name,
    email: result.data.email,
  })

  return {
    success: true,
    message: "You're on the list! We'll send event updates to your inbox.",
  }
}
