import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  "Learn SKY Breath Meditation — a powerful technique backed by Yale and Harvard research",
  "Simple practices for reducing stress, improving sleep, and boosting energy",
  "Connect with a welcoming community in Devon & Southwest",
  "Guided by an experienced Art of Living teacher",
]

export function BenefitsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-8">
          What You&apos;ll Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex gap-3 items-start">
              <CheckCircle className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <p className="text-base sm:text-lg">{benefit}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#register">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 text-lg font-semibold px-8"
            >
              Save My Seat — It&apos;s Free
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
