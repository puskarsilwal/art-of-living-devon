const stats = [
  { number: "44+", label: "Years of teaching" },
  { number: "180+", label: "Countries worldwide" },
  { number: "40,000+", label: "Certified teachers" },
  { number: "800M+", label: "People reached" },
]

export function NumbersSection() {
  return (
    <section className="bg-gray-950 text-white px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-4" />
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-2 text-white">
            Art of Living in Numbers
          </h2>
          <p className="text-gray-300 text-base sm:text-lg">
            44 years of transforming lives around the world
          </p>
        </div>

        {/* Stats grid: 2x2 on mobile, 4-column on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
