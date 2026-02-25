import { z } from "zod"

export const registrationSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter your name")
    .max(100),
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  phone: z
    .union([z.string().max(20), z.literal("")])
    .optional(),
  consent: z
    .literal(true, {
      message: "You must agree to receive event communications",
    }),
  sessionId: z.string().min(1, "Please select a session"),
})

export type RegistrationInput = z.infer<typeof registrationSchema>
