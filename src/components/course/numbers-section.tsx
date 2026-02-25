import Image from "next/image"

const stats = [
  { number: "44+", label: "Years of teaching" },
  { number: "180+", label: "Countries worldwide" },
  { number: "40,000+", label: "Certified teachers" },
  { number: "800M+", label: "People reached" },
]

export function NumbersSection() {
  return (
    <section className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

        {/* Left: image */}
        <div className="relative min-h-[260px] lg:min-h-full overflow-hidden">
          <Image
            src="/images/course/sudarshan-kriya.webp"
            alt="Art of Living community"
            fill
            className="object-cover opacity-50"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/30 via-transparent to-gray-950/60 lg:bg-gradient-to-r lg:from-transparent lg:to-gray-950" />
        </div>

        {/* Right: heading + stats */}
        <div className="px-6 py-12 sm:px-10 sm:py-16 flex flex-col justify-center">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-5" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Art of Living in Numbers
          </h2>
          <p className="text-gray-400 text-base mb-10">
            44 years transforming lives across every continent
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary pl-4">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 tabular-nums">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
