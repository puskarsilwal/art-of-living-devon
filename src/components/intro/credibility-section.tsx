import Image from "next/image"
import { credibilityStats, researchHighlights } from "@/lib/data/credibility-stats"
import { Button } from "@/components/ui/button"

export function CredibilitySection() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Full-section background image */}
      <Image
        src="/images/course/group-breathwork.jpg"
        alt="Group meditating in an Art of Living session"
        fill
        className="object-cover opacity-50"
        sizes="100vw"
      />
      {/* Single smooth overlay — dark everywhere, slightly lighter on left where image is focal */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/50 via-gray-950/65 to-gray-950/85" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

          {/* Left column: overlay headline */}
          <div className="relative min-h-[280px] lg:min-h-full flex flex-col justify-end">
            <div className="relative p-6 sm:p-8 lg:p-10">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                Science-Backed. Globally Practised.
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                Backed by 100+ independent peer-reviewed journals
              </h2>
            </div>
          </div>

          {/* Right column: stats + research narrative */}
          <div className="px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 flex flex-col justify-center">
            {/* Large stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {credibilityStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className={`font-bold text-primary mb-1 ${
                      stat.isText ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl lg:text-5xl"
                    }`}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 mb-6" />

            {/* Research highlights narrative */}
            <div className="space-y-4">
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Leading universities have independently confirmed SKY Breath Meditation&apos;s impact:
              </p>
              <ul className="space-y-2">
                {researchHighlights.map((research) => (
                  <li key={research.institution} className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">&#9658;</span>
                    <span className="text-white/80 text-sm leading-snug">
                      <strong className="text-white">{research.institution}:</strong>{" "}
                      {research.finding}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <a href="#register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 text-base font-semibold px-8"
                >
                  Experience It Yourself →
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
