import Image from "next/image"
import { TrendingUp, TrendingDown } from "lucide-react"
import { courseStats } from "@/lib/data/course-stats"

export function ResearchStatsSection() {
  return (
    <section className="relative overflow-hidden bg-gray-950 py-20 px-4 sm:px-6">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/course/sudarshan-kriya.webp"
          alt=""
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950/90" />

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">
          Backed by 100+ Independent Studies
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-12">
          Peer-reviewed research from Yale, Harvard, AIIMS, and leading
          universities worldwide
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {courseStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-white/10 rounded-xl p-5 bg-white/5 backdrop-blur-sm flex flex-col items-center"
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
              <p className="text-sm font-medium text-gray-300 leading-snug">
                {stat.label}
              </p>

              {/* Timeframe (only if non-empty) */}
              {stat.timeframe && (
                <p className="text-xs text-gray-500 mt-1">
                  {stat.timeframe}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-gray-500">
          Source: peer-reviewed journals including NIMHANS, Yale, AIIMS
        </p>
      </div>
    </section>
  )
}
