import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const sessionPoints = [
  "A guided SKY Breath Meditation — the technique used by 500M+ people worldwide",
  "Practical tools to calm your nervous system instantly — no experience needed",
  "The science behind why breathing changes everything",
  "Live Q&A with your certified teacher",
]

export function SessionIntroSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: lifestyle photo */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-2 lg:order-1">
            <Image
              src="/images/intro/breathing-session.jpg"
              alt="Participants in a guided breathing session"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Subtle warm tint overlay to unify with brand palette */}
            <div className="absolute inset-0 bg-primary/10" />
          </div>

          {/* Right: narrative text */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              What Happens in the Session
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4">
              Breathe More,{" "}
              <span className="text-primary">Stress Less</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
              In 60 minutes, you&apos;ll go from stressed and scattered to genuinely calm. No philosophy, no prior experience — just a breathing technique that actually works.
            </p>

            <ul className="space-y-3">
              {sessionPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-foreground leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
