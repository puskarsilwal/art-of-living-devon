"use client"

import { useActionState } from "react"
import { registerForIntroTalk, type RegistrationState } from "@/actions/register"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const initialState: RegistrationState = {
  success: false,
  message: "",
}

export function RegistrationForm() {
  const [state, formAction, pending] = useActionState(
    registerForIntroTalk,
    initialState
  )

  return (
    <section id="register" className="scroll-mt-8 px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-gradient-to-b from-primary/5 via-primary/[0.03] to-background">
      <div className="max-w-md mx-auto">
        {/* Social proof trust badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex -space-x-2">
            {["C", "P", "S", "R"].map((initial) => (
              <div
                key={initial}
                className="h-8 w-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-semibold text-primary"
              >
                {initial}
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">500M+</span> lives transformed worldwide
          </p>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center">
              Reserve Your Free Seat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  required
                  className="h-12 text-base"
                />
                {state.errors?.name && (
                  <p className="text-sm text-destructive">{state.errors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="h-12 text-base"
                />
                {state.errors?.email && (
                  <p className="text-sm text-destructive">{state.errors.email[0]}</p>
                )}
              </div>

              {/* Phone (optional) */}
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="07xxx xxxxxx"
                  className="h-12 text-base"
                />
                {state.errors?.phone && (
                  <p className="text-sm text-destructive">{state.errors.phone[0]}</p>
                )}
              </div>

              {/* GDPR Consent */}
              <div className="flex items-start gap-3">
                <Checkbox id="consent" name="consent" required className="mt-1" />
                <Label htmlFor="consent" className="text-sm leading-relaxed font-normal">
                  I agree to receive event details and reminders by email. See
                  our{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="underline text-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>
              {state.errors?.consent && (
                <p className="text-sm text-destructive">{state.errors.consent[0]}</p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-semibold"
                disabled={pending}
              >
                {pending ? "Saving your seat..." : "Save My Seat"}
              </Button>

              {/* Server response */}
              {state.message && (
                <p
                  className={`text-sm text-center ${
                    state.success ? "text-green-600" : "text-destructive"
                  }`}
                  aria-live="polite"
                >
                  {state.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
