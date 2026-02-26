import Link from "next/link"
import Image from "next/image"
import { getAllEvents } from "@/lib/data/events"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events | Art of Living Devon & Southwest",
  description: "Upcoming Satsang, Kirtan, and community events in Devon and Southwest. Free and open to all.",
}

export default function EventsPage() {
  const events = getAllEvents()

  return (
    <main className="min-h-screen bg-white">
      {/* Page header */}
      <section className="bg-muted/30 py-16 sm:py-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Community Events</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-gray-600 text-lg">Satsang evenings, Kirtan gatherings, and community events in Devon and Southwest.</p>
        </div>
      </section>

      {/* Events grid */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {events.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-12">No upcoming events scheduled. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <article key={event.slug} className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  {/* Card image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.heroImage}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs">
                      {event.eventType === "satsang" ? "Satsang" :
                       event.eventType === "kirtan" ? "Kirtan" : "Event"}
                    </Badge>
                  </div>
                  {/* Card content */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">{event.title}</h2>
                    {event.subtitle && (
                      <p className="text-sm text-gray-500 italic mb-3">{event.subtitle}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{event.date} · {event.time} {event.timezone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    {event.price && (
                      <p className="text-sm font-medium text-primary mb-4">{event.price}</p>
                    )}
                    <Link href={`/events/${event.slug}`}>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
