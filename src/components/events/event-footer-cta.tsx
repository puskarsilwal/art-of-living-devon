import { Button } from "@/components/ui/button"
import { type EventConfig } from "@/lib/data/events"

export function EventFooterCta({ event }: { event: EventConfig }) {
  return (
    <section className="bg-primary py-16 sm:py-20 px-4 sm:px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          {event.title} — Join Us
        </h2>
        <p className="text-white/80 text-lg mb-2">
          {event.date} · {event.time} {event.timezone}
        </p>
        <p className="text-white/70 mb-8">{event.location}</p>
        {event.price && (
          <p className="text-white/60 text-sm mb-8">{event.price}</p>
        )}
        <a
          href={event.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" size="lg">
            Reserve Your Place
          </Button>
        </a>
      </div>
    </section>
  )
}
