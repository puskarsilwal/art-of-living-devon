const REGISTER_URL =
  "https://www.artofliving.org/gb-en/courses/art-of-living-part-one"

export function VideoSection() {
  return (
    <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: YouTube embed */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.youtube.com/embed/76sTPIt_onw"
              title="James Nestor on SKY Breath Meditation"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Right: quotes + attribution + CTA */}
          <div className="flex flex-col gap-6">
            <blockquote className="space-y-4">
              <p className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                &ldquo;No matter what you eat, how much you exercise, how skinny or young or wise you are, none of it matters if you&rsquo;re not breathing properly.&rdquo;
              </p>
              <p className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                &ldquo;...[SKY] is the most powerful technique I&rsquo;ve learned.&rdquo;
              </p>
            </blockquote>

            <div>
              <p className="font-semibold text-foreground">James Nestor</p>
              <p className="text-sm text-muted-foreground mt-1">
                Author of New York Times bestseller,{" "}
                <em>Breath: The New Science of a Lost Art</em>
              </p>
            </div>

            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              Learn SKY Breath Meditation
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
