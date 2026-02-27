import Image from "next/image"

const mediaLogos = [
  { name: "CNN", src: "/images/course/cnn.svg", width: 56, height: 28 },
  { name: "Yoga Journal", src: "/images/course/yoga-journal.webp", width: 110, height: 30 },
  { name: "Harvard Health Publishing", src: "/images/course/harvard.webp", width: 120, height: 93 },
  { name: "The Washington Post", src: "/images/course/washington-post.webp", width: 150, height: 26 },
]

export function MediaLogosSection() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 bg-muted/30 border-y border-border/50">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
          As Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {mediaLogos.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="object-contain opacity-60 hover:opacity-90 transition-opacity grayscale"
              style={{ height: "28px", width: "auto" }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
