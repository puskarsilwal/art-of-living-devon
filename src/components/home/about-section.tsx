import { credibilityStats } from "@/lib/data/credibility-stats"

export function AboutSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-3">
            A Global Movement Rooted in Ancient Wisdom
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">About Art of Living</h2>
        </div>

        {/* Mission statement */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Founded in 1981 by Sri Sri Ravi Shankar, Art of Living is a global non-profit dedicated
            to stress-free, violence-free societies through breath-based practices, yoga, and
            service.
          </p>
        </div>

        {/* Gurudev mention */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-muted-foreground text-base leading-relaxed">
            Our teacher and founder, Sri Sri Ravi Shankar (affectionately known as Gurudev), has
            guided over 500 million people across 180 countries.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 max-w-4xl mx-auto">
          {credibilityStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className={`font-bold text-primary ${
                  stat.isText ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"
                }`}
              >
                {stat.number}
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
