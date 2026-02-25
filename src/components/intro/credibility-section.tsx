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
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-8">
          Backed by Science, Embraced by Millions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {credibilityStats.map((stat) => {
            const Icon = iconMap[stat.icon]
            return (
              <div
                key={stat.label}
                className="text-center rounded-xl bg-background p-4 sm:p-6 shadow-sm"
              >
                {Icon && (
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                )}
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          {researchHighlights.map((research) => (
            <div
              key={research.institution}
              className="flex items-start gap-3 rounded-lg border bg-background p-4"
            >
              <FlaskConical className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <Badge variant="secondary" className="mb-1 text-xs">
                  {research.institution}
                </Badge>
                <p className="text-sm text-muted-foreground leading-snug">
                  {research.finding}
                </p>
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
