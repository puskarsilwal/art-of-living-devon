import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const trustSignals = [
  "No prior experience needed",
  "Online and In-Person options",
  "44 years, 180 countries",
]

export function FooterCta() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      {/* Main gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-[oklch(0.72_0.19_50)] to-[oklch(0.65_0.20_45)]" />

      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/course/footer-graduates.jpg"
          alt=""
          fill
          className="object-cover opacity-15 mix-blend-overlay"
        />
      </div>

      {/* Radial gradient highlight */}
      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.18_55/0.3),transparent_70%)]"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl mb-4 text-primary-foreground">
          Ready to Transform Your Life?
        </h2>
        <p className="text-lg text-primary-foreground/85 mb-8 max-w-xl mx-auto">
          Join thousands of people who have discovered the power of SKY Breath Meditation.
          3 days could change everything.
        </p>

        <a
          href="https://www.artofliving.org/gb-en/courses/art-of-living-part-one"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto h-14 text-lg font-semibold px-10 shadow-2xl shadow-black/20 hover:scale-[1.02] transition-transform"
          >
            Register Now
          </Button>
        </a>

        <p className="mt-6 text-sm text-primary-foreground/70">
          Free to register &bull; No experience needed &bull; Online &amp; In-Person available
        </p>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-6 text-sm text-primary-foreground/60">
          {trustSignals.map((signal) => (
            <span key={signal} className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 shrink-0" />
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
