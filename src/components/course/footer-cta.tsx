import { Button } from "@/components/ui/button"

export function FooterCta() {
  return (
    <section className="bg-primary px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4 text-primary-foreground">
          Ready to Transform Your Life?
        </h2>
        <p className="text-base sm:text-lg text-primary-foreground opacity-90 mb-8 max-w-xl mx-auto">
          Join thousands of people who have discovered the power of SKY Breath Meditation.
          3 days could change everything.
        </p>

        <a
          href="https://www.artofliving.org/gb-en/courses/art-of-living-part-one"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto h-14 text-lg font-semibold px-10"
          >
            Register Now
          </Button>
        </a>

        <p className="mt-4 text-sm text-primary-foreground opacity-70">
          Free to register &bull; No experience needed &bull; Online &amp; In-Person available
        </p>
      </div>
    </section>
  )
}
