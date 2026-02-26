import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FooterCta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro/break-free.webp"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      {/* Dark base + warm brand tint — lets the photo show through */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-orange-900/50 via-primary/30 to-amber-800/40" />

      <div className="relative z-20 max-w-3xl mx-auto px-6 sm:px-10 text-center">
        <p className="text-white/70 font-semibold text-sm uppercase tracking-widest mb-5">
          Free · No experience needed · Devon &amp; Southwest
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          One breath can
          <br />
          change everything.
        </h2>
        <p className="text-white/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
          Join a free 60-minute intro talk and experience the SKY Breath Meditation technique that
          has transformed millions of lives.
        </p>
        <Link href="/intro">
          <Button
            size="lg"
            variant="secondary"
            className="group text-base px-10 py-6 shadow-2xl"
          >
            Register for a Free Intro Talk
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
