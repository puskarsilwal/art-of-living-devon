import { Wind, Moon, Users, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: Wind,
    title: "SKY Breath Meditation",
    description:
      "A powerful technique backed by Yale and Harvard research — calm your mind in minutes",
  },
  {
    icon: Moon,
    title: "Better Sleep & Energy",
    description:
      "Simple practices that reduce stress, deepen sleep, and restore natural vitality",
  },
  {
    icon: Users,
    title: "Welcoming Community",
    description:
      "Connect with like-minded people in Devon & Southwest on the same journey",
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description:
      "Guided by an experienced, certified Art of Living teacher in every session",
  },
]

export function BenefitsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-8">
          What You&apos;ll Experience
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <Card
                key={benefit.title}
                className="h-full border-0 shadow-sm bg-gradient-to-br from-background to-primary/5 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <a href="#register">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto h-14 text-lg font-semibold px-8"
            >
              Save My Seat — It&apos;s Free
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
