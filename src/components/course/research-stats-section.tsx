import { TrendingUp, TrendingDown } from "lucide-react"
import { courseStats } from "@/lib/data/course-stats"

export function ResearchStatsSection() {
  return (
    <section className="bg-muted/30 py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Backed by 100+ Independent Studies
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-12">
          Peer-reviewed research from Yale, Harvard, AIIMS, and leading
          universities worldwide
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {courseStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              {/* Percentage + icon on same row */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-primary">
                  {stat.percentage}
                </span>
                {stat.direction === "up" ? (
                  <TrendingUp className="h-6 w-6 text-primary" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-primary" />
                )}
              </div>

              {/* Label */}
              <p className="text-sm font-medium text-foreground leading-snug">
                {stat.label}
              </p>

              {/* Timeframe (only if non-empty) */}
              {stat.timeframe && (
                <p className="text-xs text-muted-foreground">
                  {stat.timeframe}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
