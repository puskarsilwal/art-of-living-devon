import type { Metadata } from "next"
import { HeroSection } from "@/components/course/hero-section"
import { ProgramOverviewSection } from "@/components/course/program-overview-section"
import { ResearchStatsSection } from "@/components/course/research-stats-section"
import { MediaLogosSection } from "@/components/course/media-logos-section"
import { CourseContentSection } from "@/components/course/course-content-section"
import { UpcomingDatesSection } from "@/components/course/upcoming-dates-section"
import { FounderSection } from "@/components/course/founder-section"
import { TestimonialsSection } from "@/components/course/testimonials-section"
import { NumbersSection } from "@/components/course/numbers-section"
import { FaqSection } from "@/components/course/faq-section"
import { FooterCta } from "@/components/course/footer-cta"

export const metadata: Metadata = {
  title: "Happiness Program | Art of Living Devon & Southwest",
  description:
    "Transform stress into calm in 3 days. Learn Sudarshan Kriya (SKY Breath Meditation), pranayama, and yoga — backed by 100+ peer-reviewed studies. Available in Exeter, Devon and online.",
  robots: { index: true, follow: true },
}

export default function HappinessProgramPage() {
  return (
    <>
      {/*
        Trust-building funnel order:
        1. Hero — hook with transformation promise
        2. Program Overview — 3-step journey at a glance
        3. Research Stats — scientific credibility
        4. Media Logos — press validation
        5. Course Content — what you'll learn
        6. Upcoming Dates — specific sessions with CTAs
        7. Founder — organisational trust & mission
        8. Testimonials — real student results
        9. Numbers — global impact at scale
        10. FAQ — remove remaining objections
        11. Footer CTA — final conversion nudge
      */}
      <HeroSection />
      <ProgramOverviewSection />
      <ResearchStatsSection />
      <MediaLogosSection />
      <CourseContentSection />
      <UpcomingDatesSection />
      <FounderSection />
      <TestimonialsSection />
      <NumbersSection />
      <FaqSection />
      <FooterCta />
    </>
  )
}
