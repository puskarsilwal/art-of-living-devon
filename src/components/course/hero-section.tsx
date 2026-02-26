import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const REGISTER_URL =
  "https://www.artofliving.org/gb-en/courses/art-of-living-part-one"

const trustSignals = [
  "100+ peer-reviewed studies",
  "800M+ people taught",
  "44 years of teaching",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/course/break-free.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Layer 1: Bottom-left darkness */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />

      {/* Layer 2: Top vignette */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Layer 3: Radial orange highlight */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_60%_40%,oklch(0.75_0.18_55/0.15),transparent_60%)]" aria-hidden />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center w-full text-white">
        <Badge
          variant="secondary"
          className="mb-6 text-sm bg-white/20 text-white border-white/30 backdrop-blur-sm"
        >
          Art of Living Part 1 Course
        </Badge>

        {/* Decorative accent bar */}
        <div className="w-16 h-1 rounded-full bg-primary mx-auto mb-6" />

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 leading-[1.05]">
          Breathe Out Stress From Day One
        </h1>

        <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto mb-8">
          Learn Sudarshan Kriya (SKY Breath Meditation), a powerful breathing
          technique backed by 100+ peer-reviewed studies. 3 days. Life-changing
          results.
        </p>

        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 text-lg font-semibold px-10 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 transition-shadow"
          >
            Register Now
          </Button>
        </a>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-white/70">
          {trustSignals.map((signal) => (
            <span key={signal} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-primary shrink-0" />
              {signal}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm text-white/60">
          Free to register &bull; Devon &amp; Southwest &bull; Online &amp; In-Person
        </p>
      </div>
    </section>
  )
}
