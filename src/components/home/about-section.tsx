import Image from "next/image"
import { credibilityStats } from "@/lib/data/credibility-stats"

export function AboutSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background image — creates depth and warmth */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home/about-community.jpg"
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
      {/* Dark overlay — enough to read, not enough to lose the photo */}
      <div className="absolute inset-0 z-10 bg-zinc-950/80" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Stats — the headline act */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {credibilityStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className={`font-extrabold text-white ${
                  stat.isText
                    ? "text-2xl sm:text-3xl"
                    : "text-5xl sm:text-6xl"
                }`}
              >
                <span className="text-primary">{stat.number}</span>
              </p>
              <p className="text-white/50 text-sm mt-2 leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Two-column story */}
        <div className="grid md:grid-cols-2 gap-12 items-start border-t border-white/10 pt-16">
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              A global movement
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Ancient wisdom.
              <br />
              Modern science.
            </h2>
          </div>
          <div className="space-y-5 text-white/65 text-base leading-relaxed">
            <p>
              Founded in 1981 by Sri Sri Ravi Shankar (known to millions as Gurudev), Art of
              Living is a global non-profit with one mission: a stress-free, violence-free world.
            </p>
            <p>
              Every practice we teach has been validated by peer-reviewed research at institutions
              including Yale and Harvard. The results speak for themselves: deeper sleep, lower
              anxiety, and an enduring sense of wellbeing.
            </p>
            <p className="text-white/90 italic border-l-2 border-primary pl-4">
              &ldquo;When the breath is still, the mind is still.&rdquo;
              <span className="not-italic text-white/50 text-sm block mt-1">
                Sri Sri Ravi Shankar
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
