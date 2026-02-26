"use client"

import { useActionState } from "react"
import { subscribeToEventUpdates } from "@/actions/event-optin"
import { type EventConfig } from "@/lib/data/events"

export function EventEmailOptin({ event }: { event: EventConfig }) {
  const [state, action, isPending] = useActionState(subscribeToEventUpdates, {
    success: false,
    message: "",
  })

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto text-center">
        {/* Header */}
        <p
          className="text-xs font-semibold uppercase mb-3"
          style={{ color: "#C8386A", letterSpacing: "0.28em" }}
        >
          Stay Connected
        </p>
        <h2
          className="font-light text-gray-900 mb-2"
          style={{
            fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
          }}
        >
          Be the First to Know
        </h2>
        <p className="text-gray-500 text-sm mb-9">
          Get updates when new Satsang and Kirtan dates are announced.
        </p>

        {state.success ? (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ background: "#FEF0F5", border: "1px solid rgba(200,56,106,0.2)" }}
          >
            <p style={{ color: "#C8386A" }} className="font-medium">
              {state.message}
            </p>
          </div>
        ) : (
          <form action={action} className="space-y-4 text-left">
            {/* Name */}
            <div>
              <label
                htmlFor="optin-name"
                className="block text-xs font-medium text-gray-500 mb-1.5 uppercase"
                style={{ letterSpacing: "0.12em" }}
              >
                Name
              </label>
              <input
                id="optin-name"
                name="name"
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-shadow"
                style={{ focusRingColor: "#C8386A" } as React.CSSProperties}
              />
              {state.errors?.name && (
                <p className="text-xs text-red-500 mt-1">{state.errors.name[0]}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="optin-email"
                className="block text-xs font-medium text-gray-500 mb-1.5 uppercase"
                style={{ letterSpacing: "0.12em" }}
              >
                Email
              </label>
              <input
                id="optin-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-shadow"
              />
              {state.errors?.email && (
                <p className="text-xs text-red-500 mt-1">{state.errors.email[0]}</p>
              )}
            </div>

            {/* GDPR */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="consent"
                id="consent"
                className="mt-0.5 h-4 w-4 rounded"
                style={{ accentColor: "#C8386A" }}
                required
              />
              <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed">
                I agree to receive event updates from Art of Living Devon/Southwest. See our{" "}
                <a href="/privacy-policy" className="underline hover:text-gray-700">
                  privacy policy
                </a>
                .
              </label>
            </div>
            {state.errors?.consent && (
              <p className="text-xs text-red-500 mt-1">{state.errors.consent[0]}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full font-semibold py-4 rounded-full text-white text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: "#C8386A" }}
            >
              {isPending ? "Sending…" : "Get Event Updates"}
            </button>

            {state.message && !state.success && (
              <p className="text-xs text-center text-red-500 mt-1" aria-live="polite">
                {state.message}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
