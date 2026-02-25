import Image from "next/image"
import { credibilityStats, researchHighlights } from "@/lib/data/credibility-stats"

export function CredibilitySection() {
  return (
    <section className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

          {/* Left column: lifestyle image with bold overlay headline */}
          <div className="relative min-h-[280px] lg:min-h-full overflow-hidden">
            <Image
              src="/images/intro/meditation-group.jpg"
              alt="Group meditating in an Art of Living session"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Dark gradient to make text legible */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-950/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-gray-950/20 lg:to-gray-950/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent" />

            {/* Overlay headline */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
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
                  <div className="text-xs sm:text-sm text-gray-400 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 mb-6" />

            {/* Research highlights narrative */}
            <div className="space-y-4">
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Universities including Yale, Harvard, and Stanford have published independent research confirming that SKY Breath Meditation significantly reduces:
              </p>
              <ul className="space-y-2">
                {researchHighlights.map((research) => (
                  <li key={research.institution} className="flex items-start gap-2">
                    <span className="text-primary shrink-0 mt-0.5">&#9658;</span>
                    <span className="text-gray-300 text-sm leading-snug">
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
                <button className="w-full sm:w-auto px-8 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-colors">
                  Experience It For Free
                </button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
