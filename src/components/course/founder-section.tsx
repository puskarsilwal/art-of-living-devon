// TODO: Replace about-art-of-living.webp with Gurudev portrait photo when available
import Image from "next/image"

export function FounderSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50/40 py-20 px-4 sm:px-6 lg:py-28">
      {/* Soft decorative glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: ambient image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-border/40">
            <Image
              src="/images/course/about-art-of-living.webp"
              alt="Art of Living community gathering"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full"
            />
          </div>

          {/* Right: founder content */}
          <div>
            <p className="text-base font-bold text-primary uppercase tracking-wider mb-3">
              About the Founder
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-foreground">
              Sri Sri Ravi Shankar
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              Sri Sri Ravi Shankar is a humanitarian, spiritual leader, and founder of the Art of
              Living Foundation. In 1982, he developed Sudarshan Kriya, a powerful breathing
              technique that has since helped over 800 million people in 180 countries reduce
              stress, improve sleep, and find inner peace.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              He teaches that peace begins within each of us.
            </p>

            {/* Gurudev quote */}
            <blockquote className="border-l-4 border-primary pl-6 py-3 bg-primary/5 rounded-r-lg">
              <p className="italic text-xl sm:text-2xl text-foreground leading-relaxed mb-3">
                &ldquo;The quality of our lives depends on the quality of our minds.&rdquo;
              </p>
              <cite className="text-sm font-bold text-primary not-italic">
                Sri Sri Ravi Shankar
              </cite>
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  )
}
