import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[65vh] sm:min-h-[75vh] flex items-center">
      {/* Background image — breathing-session.jpg for hero quality */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro/breathing-session.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      {/* Gradient overlay — dark to allow white text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/65" />
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center w-full">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 mb-6">
          <span className="text-sm font-medium text-white">Devon &amp; Southwest</span>
        </div>
        {/* Headline */}
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl mb-4">
          Breathe. Meditate.<br />
          <span className="text-primary">Transform.</span>
        </h1>
        {/* Subheadline */}
        <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto">
          Join your local Art of Living community in Devon and Southwest England.
          Free intro talks, science-backed meditation courses, and community events.
        </p>
        {/* CTAs */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/intro">
            <Button size="lg" className="w-full sm:w-auto text-base px-8">
              Register for a Free Intro Talk
            </Button>
          </Link>
          <Link href="/happiness-program">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base px-8 border-white/70 text-white hover:bg-white/10 hover:text-white"
            >
              Explore Our Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
