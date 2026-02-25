import type { Metadata } from "next"
import { HeroSection } from "@/components/intro/hero-section"
import { BenefitsSection } from "@/components/intro/benefits-section"
import { CredibilitySection } from "@/components/intro/credibility-section"
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
        1. Hero — hook with value proposition
        2. Benefits — what you'll gain
        3. Credibility — quick stats (500M+ lives, Yale/Harvard research)
        4. Testimonials — real people confirm it works
        5. What-to-Expect — reduce uncertainty about the session
        6. Teacher — human connection before asking for registration
        7. Objections — remove last barriers right before the form
        8. Registration — the ask
        9. Footer CTA — final nudge
      */}
      <HeroSection />
      <BenefitsSection />
      <CredibilitySection />
      <TestimonialsSection />
      <WhatToExpectSection />
      <TeacherSection />
      <ObjectionsSection />
      <RegistrationForm />
      <FooterCTA />
    </>
  )
}
