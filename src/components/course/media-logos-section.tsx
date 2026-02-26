import Image from "next/image"

const mediaItems = [
  {
    name: "CNN",
    src: "/images/course/cnn.svg",
    width: 80,
    height: 32,
    quote: "Breathing technique that can change your life",
  },
  {
    name: "Yoga Journal",
    src: "/images/course/yoga-journal.webp",
    width: 120,
    height: 40,
    quote: "One of the world's leading wellness organizations",
  },
  {
    name: "Harvard Health Publishing",
    src: "/images/course/harvard.webp",
    width: 120,
    height: 40,
    quote: "Research-supported benefits of breathing practices",
  },
  {
    name: "The Washington Post",
    src: "/images/course/washington-post.webp",
    width: 140,
    height: 40,
    quote: "The breath as medicine",
  },
]

export function MediaLogosSection() {
  return (
    <section className="bg-muted/20 py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="border border-border/40 rounded-2xl px-8 py-10 bg-background shadow-sm">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 text-center">
            As Featured In
          </p>
          <div className="w-12 h-px bg-border mx-auto mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 items-start justify-items-center">
            {mediaItems.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center h-12">
                  <Image
                    src={item.src}
                    alt={item.name}
                    width={item.width}
                    height={item.height}
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="text-xs italic text-muted-foreground text-center mt-2 max-w-[140px]">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
