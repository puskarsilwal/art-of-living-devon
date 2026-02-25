import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { OfferingsSection } from "@/components/home/offerings-section"
import { AboutSection } from "@/components/home/about-section"
import { LocalGuidesSection } from "@/components/home/local-guides-section"
import { FooterCta } from "@/components/home/footer-cta"

export const metadata: Metadata = {
  // Title omitted — root layout default "Art of Living Devon & Southwest" applies
  // (avoids "Art of Living Devon & Southwest | Art of Living Devon & Southwest" duplication)
  description:
    "Join free intro talks and meditation courses in Devon and Southwest England. Discover SKY Breath Meditation, pranayama, and yoga with certified Art of Living teachers.",
  robots: { index: true, follow: true },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OfferingsSection />
      <AboutSection />
      <LocalGuidesSection />
      <FooterCta />
    </>
  )
}
