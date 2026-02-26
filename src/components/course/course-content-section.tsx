import Image from "next/image"
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
      "Interactive sessions on practical tools for handling everyday challenges: relationships, emotions, and finding inner peace.",
  },
]

export function CourseContentSection() {
  return (
    <section className="bg-background py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            The Course
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3">
            What You&apos;ll Learn in 3 Days
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            3 sessions &times; 3 hours. A complete transformation toolkit.
          </p>
        </div>

        {/* Photo strip — two atmospheric images side by side */}
        <div className="grid grid-cols-2 gap-3 mb-10 rounded-2xl overflow-hidden h-52 sm:h-72">
          <div className="relative overflow-hidden">
            <Image
              src="/images/course/teacher-class.jpg"
              alt="Teacher guiding a breathing session"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src="/images/course/group-breathwork.jpg"
              alt="Group meditation session"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>

        {/* Learning modules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {learningModules.map((module) => {
            const Icon = module.icon
            return (
              <Card
                key={module.title}
                className="group border border-border/60 bg-gradient-to-br from-background to-muted/30 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <CardContent className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 p-3.5 ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1.5">{module.title}</h3>
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
