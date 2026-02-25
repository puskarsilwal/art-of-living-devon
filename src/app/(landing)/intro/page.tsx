import type { Metadata } from "next"
import { HeroSection } from "@/components/intro/hero-section"
import { BenefitsSection } from "@/components/intro/benefits-section"
import { SocialProofSection } from "@/components/intro/social-proof-section"
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
      <HeroSection />
      <BenefitsSection />
      <SocialProofSection />
      <RegistrationForm />
      <FooterCTA />
    </>
  )
}
