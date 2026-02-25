import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

const sessionPoints = [
  "A guided SKY Breath Meditation experience — the same technique practiced by over 500 million people worldwide",
  "Simple, practical tools to calm the nervous system and clear mental noise — no prior experience needed",
  "An introduction to the Art of Living community and the science behind our breathing practices",
  "Space to ask questions and explore what a regular practice could look like for you",
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
              In 60 minutes, you&apos;ll move from wherever you are right now — stressed, curious, or simply looking for something that works — to a place of genuine calm. No philosophy. No sitting in silence for an hour. Just a breathing practice that actually does what it says.
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
