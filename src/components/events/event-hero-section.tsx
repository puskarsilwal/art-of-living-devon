import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { EventConfig } from "@/lib/data/events"

const eventTypeLabels: Record<EventConfig["eventType"], string> = {
  satsang: "Community Satsang",
  kirtan: "Kirtan Evening",
  community: "Community Event",
  special: "Special Event",
}

function isFreeEvent(price: string | null): boolean {
  if (!price) return false
  return price.toLowerCase().startsWith("free")
}

interface EventHeroSectionProps {
  event: EventConfig
}

export function EventHeroSection({ event }: EventHeroSectionProps) {
  const label = eventTypeLabels[event.eventType] ?? "Community Event"
  const ctaText = isFreeEvent(event.price)
    ? "Register Now — It's Free"
    : "Register Now"

  return (
    <section className="relative overflow-hidden min-h-[75vh] sm:min-h-[85vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={event.heroImage}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center w-full">
        <Badge
          variant="secondary"
          className="mb-4 text-sm bg-white/20 text-white border-white/30 backdrop-blur-sm"
        >
          {label}
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          {event.title}
        </h1>

        {event.subtitle && (
          <p className="text-white/80 text-xl sm:text-2xl mb-4 italic">
            {event.subtitle}
          </p>
        )}

        <p className="text-white/70 text-base sm:text-lg mb-10">
          {event.date} &middot; {event.time} {event.timezone}
        </p>

        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="h-14 text-lg font-semibold px-10 shadow-lg shadow-primary/30"
          >
            {ctaText}
          </Button>
        </a>
      </div>
    </section>
  )
}
