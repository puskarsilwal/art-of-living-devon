import { TrendingUp, TrendingDown } from "lucide-react"
import { courseStats } from "@/lib/data/course-stats"

export function ResearchStatsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 via-orange-50/50 to-white py-20 px-4 sm:px-6">
      {/* Decorative radial glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden
      >
        <div className="w-[700px] h-[400px] rounded-full bg-primary/8 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-foreground">
          Backed by 100+ Independent Studies
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mb-12">
          Peer-reviewed research from Yale, Harvard, AIIMS, and leading
          universities worldwide
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {courseStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-orange-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
            >
              {/* Percentage + icon on same row */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-primary">
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
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.timeframe}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          Source: peer-reviewed journals including NIMHANS, Yale, AIIMS
        </p>
      </div>
    </section>
  )
}
