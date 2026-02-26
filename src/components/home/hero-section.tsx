import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center">
      {/* Background image — fills full viewport */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro/breathing-session.jpg"
          alt=""
          fill
          className="object-cover object-center scale-[1.02]"
          priority
        />
      </div>

      {/* Gradient — left-anchored for text readability, right stays photographic */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      {/* Bottom fade to white for a smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Content — left-aligned for a magazine feel */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 py-24 sm:py-32">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-sm font-medium text-white/90 tracking-wide">
              Devon &amp; Southwest England
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            Find your
            <br />
            <span className="text-primary">calm</span> in
            <br />
            the chaos.
          </h1>

          {/* Emotional subheadline */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-lg">
            SKY Breath Meditation has helped over 500 million people release stress, sleep
            deeper, and feel genuinely alive. Your first session is free.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/intro">
              <Button size="lg" className="group w-full sm:w-auto text-base px-8 py-6 shadow-lg shadow-primary/30">
                Register for a Free Intro Talk
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/happiness-program">
              <Button
                size="lg"
                variant="ghost"
                className="w-full sm:w-auto text-base px-8 py-6 text-white hover:bg-white/15 hover:text-white border border-white/25"
              >
                Explore Our Courses
              </Button>
            </Link>
          </div>

          {/* Social proof micro-stat */}
          <p className="mt-8 text-sm text-white/50">
            Taught in 180+ countries · 500M+ lives touched · Completely free to start
          </p>
        </div>
      </div>
    </section>
  )
}
