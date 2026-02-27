import Image from "next/image"

const organizationFacts = [
  { number: "1981", label: "Year founded" },
  { number: "40+", label: "Years of teaching" },
  { number: "1M+", label: "Volunteers globally" },
  { number: "10,000+", label: "Certified teachers" },
]

export function AboutSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: text content */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              About the Art of Living
            </p>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4">
              40 Years of Bringing{" "}
              <span className="text-primary">Peace to the World</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-4">
              Founded in 1981 by Gurudev Sri Sri Ravi Shankar, the Art of Living Foundation has grown from a small breathing programme into one of the world&apos;s largest volunteer-run non-profits.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Today it is one of the world&apos;s largest volunteer-run humanitarian organisations, with courses running across six continents. Every local session is led by a certified teacher who does this because it changed their own life.
            </p>

            {/* Org fact grid */}
            <div className="grid grid-cols-2 gap-4">
              {organizationFacts.map((fact) => (
                <div key={fact.label} className="text-center rounded-xl bg-background p-4 shadow-sm border border-border/50">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                    {fact.number}
                  </div>
                  <div className="text-xs text-muted-foreground leading-tight">
                    {fact.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: lifestyle image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-first lg:order-last">
            <Image
              src="/images/intro/about-art-of-living.webp"
              alt="Art of Living certified teacher guiding a breathing session"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
