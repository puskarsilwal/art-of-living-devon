import type { Metadata } from "next"
import { HeroSection } from "@/components/intro/hero-section"
import { SessionIntroSection } from "@/components/intro/session-intro-section"
import { BenefitsSection } from "@/components/intro/benefits-section"
import { CredibilitySection } from "@/components/intro/credibility-section"
import { MediaLogosSection } from "@/components/intro/media-logos-section"
import { TestimonialsSection } from "@/components/intro/testimonials-section"
import { WhatToExpectSection } from "@/components/intro/what-to-expect-section"
import { TeacherSection } from "@/components/intro/teacher-section"
import { ObjectionsSection } from "@/components/intro/objections-section"
import { RegistrationForm } from "@/components/intro/registration-form"
import { FooterCTA } from "@/components/intro/footer-cta"

export const metadata: Metadata = {
  title: "Free Intro Talk — Art of Living Devon & Southwest",
  description:
    "Join a free 60-minute online intro to the Art of Living. Learn a powerful breathing technique used by millions worldwide. Reserve your seat today.",
}

export default function IntroPage() {
  return (
    <>
      {/*
        Trust-building funnel order:
        1. Hero — hook with specific learning bullets
        2. Session Intro — narrative bridge: what is this session?
        3. Benefits — what you'll experience
        4. Credibility — quick stats (500M+ lives, Yale/Harvard research)
        5. Media Logos — external press validation
        6. Testimonials — real people confirm it works
        7. What-to-Expect — reduce uncertainty about the session
        8. Teacher — human connection before asking for registration
        9. Objections — remove last barriers right before the form
        10. Registration — the ask
        11. Footer CTA — final nudge
      */}
      <HeroSection />
      <SessionIntroSection />
      <BenefitsSection />
      <CredibilitySection />
      <MediaLogosSection />
      <TestimonialsSection />
      <WhatToExpectSection />
      <TeacherSection />
      <ObjectionsSection />
      <RegistrationForm />
      <FooterCTA />
    </>
  )
}
