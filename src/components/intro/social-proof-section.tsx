import { Button } from "@/components/ui/button"

const stats = [
  { number: "180+", label: "Countries" },
  { number: "Millions", label: "Of practitioners worldwide" },
  { number: "50+", label: "Years of impact" },
]

export function SocialProofSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-8">
          Trusted Around the World
        </h2>

        {/* Phase 3 will add: testimonials, teacher profile, detailed credibility */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-4xl font-bold text-primary mb-1">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                {stat.label}
              </div>
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
