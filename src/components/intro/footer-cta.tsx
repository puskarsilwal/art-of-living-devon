import { Button } from "@/components/ui/button"

export function FooterCTA() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-3">
          Ready to Transform Your Life?
        </h2>
        <p className="text-base sm:text-lg opacity-90 mb-6 max-w-xl mx-auto">
          Don&apos;t miss out — seats are limited. Reserve your free spot now.
        </p>
        <a href="#register">
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-14 text-lg font-semibold px-8 bg-white text-primary hover:bg-white/90 border-white"
          >
            Save My Seat — It&apos;s Free
          </Button>
        </a>
      </div>
    </section>
  )
}
