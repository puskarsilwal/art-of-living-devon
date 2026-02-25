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
      "Access deep states of rest and clarity — effortlessly, even if you have never meditated before.",
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
    <section className="bg-background py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          What is the Happiness Program?
        </h2>

        <div className="space-y-4 text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
          <p>
            The Happiness Program (Art of Living Part 1) is a transformative
            3-day course, offered 3 hours per day, by the Art of Living
            Foundation — founded by Sri Sri Ravi Shankar in 1982. Over 40
            million people in 180 countries have taken this course.
          </p>
          <p>
            Each session combines Sudarshan Kriya (SKY Breath Meditation),
            pranayama breathing exercises, guided yoga, and meditation — giving
            you a complete toolkit for managing stress, improving sleep, and
            building inner resilience.
          </p>
        </div>

        {/* 3-step flow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-lg font-bold shrink-0">
                {step.number}
              </div>
              <h3 className="font-semibold text-foreground text-lg">
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
