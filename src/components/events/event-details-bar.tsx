import Image from "next/image"
import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import type { EventConfig } from "@/lib/data/events"

interface EventDetailsBarProps {
  event: EventConfig
}

export function EventDetailsBar({ event }: EventDetailsBarProps) {
  const isFree = event.price?.toLowerCase().startsWith("free") ?? false

  const details = [
    { icon: MapPin, label: "Where", value: event.location },
    { icon: Calendar, label: "Date", value: event.date },
    { icon: Clock, label: "Duration", value: event.duration },
    { icon: Ticket, label: "Price", value: event.price ?? "Free" },
  ]

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={event.heroImage}
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ background: "rgba(10,9,30,0.82)" }}
      />

      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <h2
          className="text-white font-light mb-12"
          style={{
            fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
          }}
        >
          Reserve Your Spot Now
        </h2>

        {/* Detail pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-11">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl px-4 py-5 flex flex-col items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="text-[10px] uppercase font-medium"
                style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.22em" }}
              >
                {label}
              </span>
              <Icon className="h-4 w-4 my-0.5" style={{ color: "#C8386A" }} />
              <span className="text-white text-sm font-medium leading-snug text-center">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
          <button
            className="font-semibold px-12 py-4 rounded-full text-white text-base transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "#C8386A",
              boxShadow: "0 8px 40px rgba(200,56,106,0.5)",
            }}
          >
            {isFree ? "Register Now — It's Free" : "Register Now"}
          </button>
        </a>
      </div>
    </section>
  )
}
