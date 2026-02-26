import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const offerings = [
  {
    title: "Free Intro Talk",
    subtitle: "60 minutes. No experience needed.",
    description:
      "Breathe differently. Leave lighter. Experience SKY Breath Meditation live and discover what 500 million people already know.",
    href: "/intro",
    cta: "Register Free",
    image: "/images/intro/meditation-group.jpg",
    accent: "from-primary/80 to-primary/40",
  },
  {
    title: "Part 1 Course",
    subtitle: "3 days. Life-changing.",
    description:
      "A science-backed journey into Sudarshan Kriya, pranayama, and yoga. Designed to clear stress at its root, not just manage it.",
    href: "/art-of-living-part-1",
    cta: "Explore the Course",
    image: "/images/intro/sudarshan-kriya.webp",
    accent: "from-black/80 to-black/40",
  },
  {
    title: "Community Events",
    subtitle: "Satsang, kirtan & gatherings.",
    description:
      "Meditate with your local Devon and Southwest community. Weekly sessions, special events, and the warmth of people on the same path.",
    href: "/events",
    cta: "See Events",
    image: "/images/intro/teacher-guiding.jpg",
    accent: "from-black/80 to-black/40",
  },
]

export function OfferingsSection() {
  return (
    <section className="py-20 sm:py-28 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
            Where would you like to start?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Your path begins here.
          </h2>
        </div>

        {/* Photo cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {offerings.map((offering) => (
            <Link
              key={offering.title}
              href={offering.href}
              className="group relative overflow-hidden rounded-2xl min-h-[420px] flex flex-col justify-end cursor-pointer"
            >
              {/* Photo background */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={offering.image}
                  alt={offering.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient overlay — bottom-heavy so text reads clearly */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Card content */}
              <div className="relative z-20 p-7">
                <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">
                  {offering.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3">{offering.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed mb-5">
                  {offering.description}
                </p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  {offering.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
