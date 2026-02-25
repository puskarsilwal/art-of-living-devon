import {
  Users,
  Globe,
  BookOpen,
  GraduationCap,
  FlaskConical,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  credibilityStats,
  researchHighlights,
} from "@/lib/data/credibility-stats"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Globe,
  BookOpen,
  GraduationCap,
}

export function CredibilitySection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-4" />
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Backed by Science, Embraced by Millions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {credibilityStats.map((stat) => {
            const Icon = iconMap[stat.icon]
            return (
              <div
                key={stat.label}
                className="text-center rounded-xl bg-gradient-to-b from-background to-primary/5 p-4 sm:p-6 shadow-sm hover:scale-105 transition-transform"
              >
                {Icon && (
                  <div className="relative mx-auto mb-3 w-fit">
                    <div className="absolute inset-0 rounded-full bg-primary/10 scale-150 blur-sm" />
                    <Icon className="relative h-8 w-8 text-primary" />
                  </div>
                )}
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl bg-gradient-to-br from-primary/[0.03] to-transparent p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {researchHighlights.map((research) => (
              <div
                key={research.institution}
                className="flex items-center gap-3 rounded-lg border border-primary/10 bg-background p-4"
              >
                <FlaskConical className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <Badge
                    variant="secondary"
                    className="mb-1 text-xs border border-primary/20"
                  >
                    {research.institution}
                  </Badge>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {research.finding}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
