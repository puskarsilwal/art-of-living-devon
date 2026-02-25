import { Waves, Heart, Sun, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const learningModules = [
  {
    icon: Waves,
    title: "Sudarshan Kriya (SKY Breath)",
    description:
      "The signature Art of Living breathing technique. Clinically researched rhythm of breath that releases stress at the cellular level.",
  },
  {
    icon: Heart,
    title: "Pranayama (Breathing Exercises)",
    description:
      "Ancient yogic breathing practices to energize, calm, and balance the nervous system. Includes Bhastrika, Ujjayi, and Nadi Shodhana.",
  },
  {
    icon: Sun,
    title: "Yoga & Meditation",
    description:
      "Gentle yoga sequences combined with guided meditation to quiet the mind and re-energize the body. No prior yoga experience needed.",
  },
  {
    icon: BookOpen,
    title: "Wisdom for Daily Life",
    description:
      "Interactive sessions on practical tools for handling everyday challenges — relationships, emotions, and finding inner peace.",
  },
]

export function CourseContentSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            The Course
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
            What You&apos;ll Learn in 3 Days
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            3 sessions &times; 3 hours &mdash; a complete transformation toolkit
          </p>
        </div>

        {/* Learning modules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {learningModules.map((module) => {
            const Icon = module.icon
            return (
              <Card key={module.title} className="border border-border/50 bg-background shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-lg bg-primary/10 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-1.5">{module.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://www.artofliving.org/gb-en/courses/art-of-living-part-one"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  )
}
