import { notFound } from "next/navigation"
import { getAllEvents, getEventBySlug } from "@/lib/data/events"
import type { Metadata } from "next"
import { Cormorant_Garamond } from "next/font/google"

import { EventHeroSection } from "@/components/events/event-hero-section"
import { EventDetailsBar } from "@/components/events/event-details-bar"
import { EventExperienceSection } from "@/components/events/event-experience-section"
import { EventExplainerSection } from "@/components/events/event-explainer-section"
import { EventVideoSection } from "@/components/events/event-video-section"
import { EventSocialProof } from "@/components/events/event-social-proof"
import { EventEmailOptin } from "@/components/events/event-email-optin"
import { EventFooterCta } from "@/components/events/event-footer-cta"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

export async function generateStaticParams() {
  return getAllEvents().map((event) => ({ slug: event.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) return {}
  return {
    title: event.seoTitle ?? `${event.title} | Art of Living Devon`,
    description: event.seoDescription ?? event.description,
    robots: event.robots ?? { index: true, follow: true },
  }
}

export default async function EventPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const event = getEventBySlug(slug)
  if (!event) notFound()

  return (
    <main className={cormorant.variable}>
      {/* 1. Hero — photo, title, CTA, media logos */}
      <EventHeroSection event={event} />
      {/* 2. "What You'll Experience" — 3 circular feature tiles */}
      <EventExplainerSection event={event} />
      {/* 3. "Reserve Your Spot Now!" — dark navy detail strip */}
      <EventDetailsBar event={event} />
      {/* 4. "What is Satsang" — coral gradient, narrative + image */}
      <EventExperienceSection event={event} />
      {/* 5. Video (conditional) */}
      {event.videoUrl && <EventVideoSection videoUrl={event.videoUrl} />}
      {/* 6. Email opt-in */}
      <EventEmailOptin event={event} />
      {/* 8. Final CTA */}
      <EventFooterCta event={event} />
    </main>
  )
}
