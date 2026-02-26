import Image from "next/image"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: 1,
    title: "Clear Stress",
    description:
      "Release accumulated stress through guided breathing techniques that reset your nervous system.",
  },
  {
    number: 2,
    title: "Experience Meditation",
    description:
      "Access deep states of rest and clarity, effortlessly, even if you have never meditated before.",
  },
  {
    number: 3,
    title: "Connect to Inner Peace",
    description:
      "Build lasting tools for everyday well-being that you can use for the rest of your life.",
  },
]

export function ProgramOverviewSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background py-24 px-4 sm:px-6">
      {/* Decorative blurred circle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          What is the Art of Living Part 1?
        </h2>

        <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
          <p>
            Art of Living Part 1 is a transformative
            3-day course, offered 3 hours per day, by the Art of Living
            Foundation, founded by Sri Sri Ravi Shankar in 1982. Over 40
            million people in 180 countries have taken this course.
          </p>
          <p>
            Each session combines Sudarshan Kriya (SKY Breath Meditation),
            pranayama breathing exercises, guided yoga, and meditation, giving
            you a complete toolkit for managing stress, improving sleep, and
            building inner resilience.
          </p>
        </div>

        {/* Atmospheric photo */}
        <div className="relative rounded-2xl overflow-hidden h-56 sm:h-72 mb-12 shadow-lg">
          <Image
            src="/images/intro/hero-breathwork.jpg"
            alt="Participants in a breathing session"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* 3-step flow — elevated cards with decorative numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-background border border-border/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="text-6xl font-black text-primary/15 leading-none mb-2 select-none">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <a href="#upcoming-dates">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
            View Upcoming Dates
          </Button>
        </a>
      </div>
    </section>
  )
}
