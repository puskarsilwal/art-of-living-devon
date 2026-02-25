import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FooterCta() {
  return (
    <section className="py-16 sm:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Experience the Difference?
          </h2>
          <p className="text-white/90 mt-4 text-lg max-w-xl mx-auto">
            Join a free 60-minute intro talk in Devon or Southwest England. No experience needed.
          </p>
          <Link href="/intro">
            <Button size="lg" variant="secondary" className="mt-8 text-base px-8">
              Register for a Free Intro Talk
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
