import { Calendar, Clock, MapPin, Ticket } from "lucide-react"
import type { EventConfig } from "@/lib/data/events"

interface EventDetailsBarProps {
  event: EventConfig
}

export function EventDetailsBar({ event }: EventDetailsBarProps) {
  return (
    <section className="bg-zinc-950 text-white py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
        {/* Date */}
        <div className="flex flex-col items-center text-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          <span className="text-xs text-white/50 uppercase tracking-widest">
            Date
          </span>
          <span className="text-sm font-medium">{event.date}</span>
        </div>

        {/* Time */}
        <div className="flex flex-col items-center text-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <span className="text-xs text-white/50 uppercase tracking-widest">
            Time
          </span>
          <span className="text-sm font-medium">
            {event.time} {event.timezone} &middot; {event.duration}
          </span>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center text-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xs text-white/50 uppercase tracking-widest">
            Location
          </span>
          {event.locationMapUrl ? (
            <a
              href={event.locationMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {event.location}
            </a>
          ) : (
            <span className="text-sm font-medium">{event.location}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col items-center text-center gap-2">
          <Ticket className="h-6 w-6 text-primary" />
          <span className="text-xs text-white/50 uppercase tracking-widest">
            Price
          </span>
          <span className="text-sm font-medium">
            {event.price ?? "Contact us"}
          </span>
        </div>
      </div>
    </section>
  )
}
