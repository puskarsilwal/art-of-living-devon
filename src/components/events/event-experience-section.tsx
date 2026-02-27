import Image from "next/image"
import type { EventConfig } from "@/lib/data/events"

const FALLBACK_QUOTE =
  "Ninety minutes that felt like a moment — and I carried that stillness with me for days."

interface EventExperienceSectionProps {
  event: EventConfig
}

export function EventExperienceSection({ event }: EventExperienceSectionProps) {
  const pullQuote =
    event.testimonials?.[0]?.highlight ??
    event.testimonials?.[0]?.quote ??
    FALLBACK_QUOTE

  const bodyText =
    event.longDescription ??
    `${event.description} Come with an open heart and leave with a stillness that lingers. Whether you have meditated before or never closed your eyes in silence, the collective energy of the room holds you. Satsang has been practised for thousands of years — a gathering in truth, where the ordinary falls away and something deeper is touched.`

  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #C8386A 0%, #8B2252 40%, #C84060 80%, #A02050 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: text */}
          <div>
            <p
              className="text-xs font-semibold uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.28em" }}
            >
              What is Satsang
            </p>

            <h2
              className="text-white font-light leading-tight mb-7"
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              }}
            >
              What Does {event.title} Feel Like?
            </h2>

            {/* Pull quote */}
            <blockquote className="mb-7 pl-5 border-l-2 border-white/30">
              <p
                className="italic font-light text-white/90"
                style={{
                  fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                  fontSize: "clamp(1.15rem, 2vw, 1.45rem)",
                }}
              >
                &ldquo;{pullQuote}&rdquo;
              </p>
            </blockquote>

            <p className="text-white/70 leading-relaxed mb-9 text-[0.95rem]">
              {bodyText}
            </p>

            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="font-semibold px-9 py-3.5 rounded-full text-white text-sm transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Join Us &mdash; {event.date}
              </button>
            </a>
          </div>

          {/* Right: image */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{ height: "clamp(320px, 45vw, 520px)" }}
          >
            <Image
              src={event.experienceImage ?? event.heroImage}
              alt={`${event.title} atmosphere`}
              fill
              className="object-cover"
            />
            {/* Subtle vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom right, transparent 50%, rgba(139,34,82,0.4) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
