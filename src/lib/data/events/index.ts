export type EventTestimonial = {
  name: string
  quote: string
  highlight?: string
}

export type EventConfig = {
  slug: string
  title: string
  subtitle?: string
  eventType: "satsang" | "kirtan" | "community" | "special"
  date: string // "Saturday 15 March 2026"
  dateISO: string // ISO 8601: "2026-03-15T19:00:00Z"
  time: string // "7:00 PM"
  timezone: string // "GMT" | "BST"
  duration: string // "2 hours"
  location: string
  locationMapUrl?: string // Google Maps URL
  description: string // Short marketing description (1-2 sentences)
  longDescription?: string
  price: string | null // "£8" | "Free" | null means "contact us"
  registrationUrl: string // External link — NOT a Next.js route
  heroImage: string
  experienceImage?: string // Optional second image for the "What does it feel like" section
  videoUrl?: string // youtube-nocookie.com embed URL (no autoplay)
  testimonials?: EventTestimonial[]
  brevoListId?: number // Reserved for Phase 9 — leave undefined in Phase 7
  seoTitle?: string
  seoDescription?: string
  robots?: { index: boolean; follow: boolean }
}

export const events: EventConfig[] = [
  {
    slug: "satsang-2026-march",
    title: "Satsang Evening",
    subtitle: "Meditation, chanting, and collective silence",
    eventType: "satsang",
    date: "Saturday 15 March 2026",
    dateISO: "2026-03-15T19:00:00Z",
    time: "7:00 PM",
    timezone: "GMT",
    duration: "2 hours",
    location: "Exeter, Devon",
    description:
      "An evening of guided meditation, kirtan chanting, and deep silence with the Art of Living Devon community.",
    price: "Free — donations welcome",
    // TODO: PLACEHOLDER — replace with real event URL before go-live
    registrationUrl: "https://www.artofliving.org/gb-en/events",
    // stock placeholder — see Task 2 in plan 02 for image sourcing
    heroImage: "/images/events/kirtan-evening.jpg",
    experienceImage: "/images/events/satsang-experience.jpg",
    testimonials: [
      {
        name: "Sarah, Exeter",
        quote:
          "The chanting completely transported me — I left feeling lighter than I have in months.",
        highlight: "lighter than I have in months",
      },
      {
        name: "James, Devon",
        quote:
          "I came not knowing what to expect and left with a real sense of peace. The collective silence at the end was profound.",
        highlight: "real sense of peace",
      },
      {
        name: "Priya, Taunton",
        quote:
          "Being in a room full of people all breathing and chanting together — it is unlike anything else. I always come away feeling completely renewed.",
        highlight: "completely renewed",
      },
    ],
  },
]

export function getEventBySlug(slug: string): EventConfig | undefined {
  return events.find((e) => e.slug === slug)
}

export function getAllEvents(): EventConfig[] {
  return events
}
