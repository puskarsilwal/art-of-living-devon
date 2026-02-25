import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LocalGuidesSection() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="/images/intro/teacher-guiding.jpg"
              alt="Art of Living teacher guiding meditation"
              fill
              className="object-cover"
            />
          </div>

          {/* Text column */}
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-wide mb-3">
              Your Local Guides
            </p>
            <h2 className="text-3xl font-bold mb-4">Certified Art of Living Teachers</h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              Our teachers are certified by the Art of Living Foundation after rigorous training.
              They bring warmth, wisdom, and personal experience to every session across Devon and
              Southwest England.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              All practices taught exactly as developed by Sri Sri Ravi Shankar — authentic, safe,
              and profoundly effective.
            </p>
            <Link href="/intro">
              <Button variant="outline" className="mt-6">
                Meet Us at an Intro Talk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
