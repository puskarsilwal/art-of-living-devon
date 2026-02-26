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
    `${event.description} Come with an open heart and leave with a stillness that lingers. Whether you have meditated before or never closed your eyes in silence, the collective energy of the room holds you.`

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text content */}
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              The Experience
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              What Does {event.title} Feel Like?
            </h2>

            <blockquote className="border-l-4 border-primary pl-6 mb-6">
              <p className="text-gray-700 text-lg italic leading-relaxed">
                &ldquo;{pullQuote}&rdquo;
              </p>
            </blockquote>

            <p className="text-gray-600 leading-relaxed mb-8">{bodyText}</p>

            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-primary text-primary font-semibold px-8 py-3 text-base hover:bg-primary/5 transition-colors"
            >
              Join Us &mdash; {event.date}
            </a>
          </div>

          {/* Right: image */}
          <div className="relative h-64 sm:h-80 lg:h-full min-h-[300px] rounded-2xl overflow-hidden">
            <Image
              src={event.heroImage}
              alt={`${event.title} atmosphere`}
              fill
              className="object-cover"
            />
            {/* Subtle bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
