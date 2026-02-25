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
    <section className="bg-background py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-10">
          As Featured In
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start justify-items-center">
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
    </section>
  )
}
