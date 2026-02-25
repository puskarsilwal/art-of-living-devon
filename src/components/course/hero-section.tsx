import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const REGISTER_URL =
  "https://www.artofliving.org/gb-en/courses/art-of-living-part-one"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
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

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center w-full text-white">
        <Badge
          variant="secondary"
          className="mb-4 text-sm bg-white/20 text-white border-white/30 backdrop-blur-sm"
        >
          Art of Living Part 1 Course
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
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
            className="w-full sm:w-auto h-14 text-lg font-semibold px-10 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
          >
            Register Now
          </Button>
        </a>

        <p className="mt-3 text-sm text-white/70">
          Free to register &bull; Devon &amp; Southwest &bull; Online &amp; In-Person
        </p>
      </div>
    </section>
  )
}
