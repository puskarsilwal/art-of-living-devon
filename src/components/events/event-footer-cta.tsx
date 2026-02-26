import Image from "next/image"
import { type EventConfig } from "@/lib/data/events"

export function EventFooterCta({ event }: { event: EventConfig }) {
  const isFree = event.price?.toLowerCase().startsWith("free") ?? false

  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 text-center overflow-hidden">
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
        style={{ background: "rgba(10,9,30,0.78)" }}
      />

      <div className="relative z-20 max-w-2xl mx-auto">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12" style={{ background: "rgba(200,56,106,0.5)" }} />
          <div className="h-1.5 w-1.5 rounded-full" style={{ background: "#C8386A" }} />
          <div className="h-px w-12" style={{ background: "rgba(200,56,106,0.5)" }} />
        </div>

        <h2
          className="text-white font-light leading-tight mb-4"
          style={{
            fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
            fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
          }}
        >
          {event.title}
        </h2>

        <p className="text-white/50 text-sm mb-1">
          {event.date} · {event.time} {event.timezone}
        </p>
        <p className="text-white/40 text-sm mb-2">{event.location}</p>

        {event.price && (
          <p className="text-sm font-medium mb-9" style={{ color: "#C8386A" }}>
            {event.price}
          </p>
        )}

        <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
          <button
            className="font-semibold px-12 py-4 rounded-full text-white text-base transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "#C8386A",
              boxShadow: "0 8px 40px rgba(200,56,106,0.45)",
            }}
          >
            {isFree ? "Reserve Your Place — Free" : "Reserve Your Place"}
          </button>
        </a>
      </div>
    </section>
  )
}
