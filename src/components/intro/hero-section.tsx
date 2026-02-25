import Image from "next/image"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { nextIntroTalk } from "@/lib/data/intro-talks"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro/breathing-session.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center w-full">
        <Badge
          variant="secondary"
          className="mb-3 text-sm bg-white/20 text-white border-white/30 backdrop-blur-sm"
        >
          Free Online Event
        </Badge>

        <h1 className="text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3 text-white">
          Discover the Breath That{" "}
          <span className="text-primary">Changes Everything</span>
        </h1>

        <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto mb-5">
          Join a free 60-minute intro to the Art of Living. Learn a powerful
          breathing technique used by millions worldwide.
        </p>

        <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-medium mb-6 text-white/90">
          <Clock className="h-5 w-5 text-white/90 shrink-0" />
          <span>
            {nextIntroTalk.date}, {nextIntroTalk.time} {nextIntroTalk.timezone}
          </span>
        </div>

        <a href="#register">
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 text-lg font-semibold px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            Save My Seat — It&apos;s Free
          </Button>
        </a>
        <p className="mt-3 text-sm text-white/70">
          Free &bull; No credit card &bull; Spots limited
        </p>
      </div>
    </section>
  )
}
