import Image from "next/image"

const stats = [
  { number: "44+", label: "Years of teaching" },
  { number: "180+", label: "Countries worldwide" },
  { number: "40,000+", label: "Certified teachers" },
  { number: "800M+", label: "People reached" },
]

export function NumbersSection() {
  return (
    <section className="bg-amber-50/40 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

        {/* Left: image — full strength, no dark overlay */}
        <div className="relative min-h-[300px] lg:min-h-full overflow-hidden">
          <Image
            src="/images/course/numbers-hands.jpg"
            alt="Art of Living community doing Sudarshan Kriya"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle right-edge fade into warm bg */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-50/20 lg:bg-gradient-to-r lg:from-transparent lg:to-amber-50/60" />
        </div>

        {/* Right: heading + stats */}
        <div className="px-6 py-12 sm:px-10 sm:py-16 flex flex-col justify-center bg-amber-50/40">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-5" />
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Art of Living in Numbers
          </h2>
          <p className="text-muted-foreground text-base mb-10">
            44 years transforming lives across every continent
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-4 border-primary pl-4">
                <div className="text-4xl sm:text-5xl font-black text-foreground mb-1 tabular-nums">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
