"use client"

import { useActionState } from "react"
import { subscribeToEventUpdates } from "@/actions/event-optin"
import { type EventConfig } from "@/lib/data/events"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EventEmailOptin({ event }: { event: EventConfig }) {
  const [state, action, isPending] = useActionState(subscribeToEventUpdates, {
    success: false,
    message: "",
  })

  return (
    <section className="bg-muted/40 py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-xl mx-auto text-center">
        {/* Header */}
        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Stay in the Loop
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Be the First to Know About {event.title.includes("Devon") ? event.title : "Devon"} Events
        </h2>
        <p className="text-gray-600 mb-8">
          Get updates when new Satsang and Kirtan dates are announced.
        </p>

        {/* Success state */}
        {state.success ? (
          <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
            <p className="text-green-800 font-semibold">{state.message}</p>
          </div>
        ) : (
          <form action={action} className="space-y-4 text-left">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="optin-name">Name</Label>
              <Input
                id="optin-name"
                name="name"
                placeholder="Your name"
                required
              />
              {state.errors?.name && (
                <p className="text-sm text-red-600 mt-1">{state.errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="optin-email">Email</Label>
              <Input
                id="optin-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
              {state.errors?.email && (
                <p className="text-sm text-red-600 mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            {/* GDPR consent */}
            <div className="flex items-start gap-3 text-left">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                className="mt-1 h-4 w-4 accent-primary"
                required
              />
              <label htmlFor="consent" className="text-sm text-gray-600">
                I agree to receive event updates from Art of Living Devon/Southwest. See our{" "}
                <a href="/privacy-policy" className="underline hover:text-primary">
                  privacy policy
                </a>
                .
              </label>
            </div>
            {state.errors?.consent && (
              <p className="text-sm text-red-600 mt-1">{state.errors.consent[0]}</p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Sending..." : "Get Event Updates"}
            </Button>

            {/* General message (non-field errors) */}
            {state.message && !state.success && (
              <p className="text-sm text-center text-red-600" aria-live="polite">
                {state.message}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
