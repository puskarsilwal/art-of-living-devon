import Image from "next/image"
import { Calendar, MapPin, Clock } from "lucide-react"
import type { EventConfig } from "@/lib/data/events"

const mediaLogos = [
  { name: "CNN", src: "/images/course/cnn.svg", width: 56, height: 28 },
  { name: "Harvard Health", src: "/images/course/harvard.webp", width: 88, height: 22 },
  { name: "Washington Post", src: "/images/course/washington-post.webp", width: 150, height: 26 },
  { name: "Yoga Journal", src: "/images/course/yoga-journal.webp", width: 110, height: 30 },
]

function isFreeEvent(price: string | null): boolean {
  if (!price) return false
  return price.toLowerCase().startsWith("free")
}

interface EventHeroSectionProps {
  event: EventConfig
}

export function EventHeroSection({ event }: EventHeroSectionProps) {
  const ctaText = isFreeEvent(event.price) ? "Register Now — It's Free" : "Register Now"

  return (
    <section className="relative overflow-hidden flex flex-col" style={{ minHeight: "90vh" }}>
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={event.heroImage}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Multi-layer gradients for depth — left side dark for text, right side lets photo breathe */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(115deg, rgba(10,9,30,0.78) 0%, rgba(10,9,30,0.55) 40%, rgba(10,9,30,0.20) 70%, rgba(10,9,30,0.05) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to top, rgba(10,9,30,0.60) 0%, transparent 45%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-20 flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-28 sm:py-36">
          {/* Eyebrow line */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10" style={{ background: "#C8386A" }} />
            <span
              className="text-white/55 text-xs font-medium uppercase"
              style={{ letterSpacing: "0.28em" }}
            >
              Art of Living · Devon &amp; Southwest
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-white font-light leading-[1.0] mb-5"
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
              fontSize: "clamp(3.8rem, 9vw, 7.5rem)",
            }}
          >
            {event.title}
          </h1>

          {/* Subtitle */}
          {event.subtitle && (
            <p
              className="font-light italic mb-9"
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond", Georgia, serif)',
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {event.subtitle}
            </p>
          )}

          {/* Event meta row */}
          <div className="flex flex-wrap gap-6 mb-11">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: "#C8386A" }} />
              <span className="text-white/70 text-sm">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" style={{ color: "#C8386A" }} />
              <span className="text-white/70 text-sm">
                {event.time} {event.timezone} · {event.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" style={{ color: "#C8386A" }} />
              <span className="text-white/70 text-sm">{event.location}</span>
            </div>
          </div>

          {/* CTA button */}
          <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
            <button
              className="font-semibold px-10 py-4 rounded-full text-white text-base transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: "#C8386A",
                boxShadow: "0 8px 40px rgba(200,56,106,0.45)",
              }}
            >
              {ctaText}
            </button>
          </a>
        </div>
      </div>

      {/* Media logos strip */}
      <div
        className="relative z-20 py-5 px-6 border-t"
        style={{
          background: "rgba(10,9,30,0.65)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span
              className="text-white/30 text-[10px] uppercase"
              style={{ letterSpacing: "0.28em" }}
            >
              As seen in
            </span>
            {mediaLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="object-contain brightness-0 invert opacity-45 hover:opacity-75 transition-opacity"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
