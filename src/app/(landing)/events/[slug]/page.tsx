import { notFound } from "next/navigation"
import { getAllEvents, getEventBySlug } from "@/lib/data/events"
import type { Metadata } from "next"

// Import all 8 section components
import { EventHeroSection } from "@/components/events/event-hero-section"
import { EventDetailsBar } from "@/components/events/event-details-bar"
import { EventExperienceSection } from "@/components/events/event-experience-section"
import { EventExplainerSection } from "@/components/events/event-explainer-section"
import { EventVideoSection } from "@/components/events/event-video-section"
import { EventSocialProof } from "@/components/events/event-social-proof"
import { EventEmailOptin } from "@/components/events/event-email-optin"
import { EventFooterCta } from "@/components/events/event-footer-cta"

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
    <main>
      {/* Conversion funnel order (per RESEARCH.md section order recommendation):
          1. Hero — event name, date, primary CTA
          2. Details bar — where/when/duration/price at a glance
          3. Experience — "what it feels like" narrative + pull quote
          4. Explainer — what is Satsang/Kirtan? removes uncertainty
          5. Video — past event footage (conditional: only if videoUrl set)
          6. Social proof — credibility logos + local testimonials
          7. Email opt-in — lead capture (Brevo wired Phase 9)
          8. Footer CTA — final register push
      */}
      <EventHeroSection event={event} />
      <EventDetailsBar event={event} />
      <EventExperienceSection event={event} />
      <EventExplainerSection event={event} />
      {event.videoUrl && <EventVideoSection videoUrl={event.videoUrl} />}
      <EventSocialProof testimonials={event.testimonials} />
      <EventEmailOptin event={event} />
      <EventFooterCta event={event} />
    </main>
  )
}
