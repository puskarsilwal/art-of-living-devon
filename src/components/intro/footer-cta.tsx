import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function FooterCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro/meditation-group.jpg"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      {/* Deep gradient overlay - rich, not flat orange */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/90 via-primary/80 to-orange-700/90" />

      {/* Content */}
      <div className="relative z-20 px-4 py-16 sm:px-6 sm:py-20 lg:py-24 text-center text-primary-foreground max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 opacity-80" />
          <span className="text-sm font-medium opacity-80 uppercase tracking-wider">Practised in 180+ countries</span>
          <Sparkles className="h-5 w-5 opacity-80" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
          Your Transformation Starts Here
        </h2>
        <p className="text-base sm:text-lg opacity-90 mb-8 max-w-xl mx-auto">
          One free session. Decades of independent research behind it. A community ready to welcome you.
        </p>

        {/* CTA - white style for contrast against image background (distinct from other CTAs) */}
        <a href="#register">
          <Button
            size="lg"
            className="w-full sm:w-auto h-14 text-lg font-semibold px-10 bg-white text-primary hover:bg-white/95 border-2 border-white shadow-lg shadow-black/20"
          >
            Claim Your Free Seat Now
          </Button>
        </a>
        <p className="mt-4 text-sm opacity-70">Free forever • No credit card • Camera optional</p>
      </div>
    </section>
  )
}
