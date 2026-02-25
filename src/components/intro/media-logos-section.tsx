const mediaLogos = [
  { name: "CNN", style: "font-black tracking-tight text-gray-700" },
  { name: "Yoga Journal", style: "font-semibold italic text-gray-600" },
  { name: "Harvard Health Publishing", style: "font-semibold text-gray-700 text-sm sm:text-base" },
  { name: "The Washington Post", style: "font-serif font-bold text-gray-700" },
]

export function MediaLogosSection() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 bg-muted/30 border-y border-border/50">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-widest mb-5">
          Backed by 100+ peer-reviewed studies &bull; Featured in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {mediaLogos.map((logo) => (
            <span
              key={logo.name}
              className={`text-lg sm:text-xl opacity-60 hover:opacity-90 transition-opacity select-none ${logo.style}`}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
