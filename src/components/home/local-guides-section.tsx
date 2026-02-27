import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LocalGuidesSection() {
  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Image — generous size, slight tilt for personality */}
          <div className="relative">
            {/* Decorative accent behind image */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl bg-primary/10 -z-10" />
            <div className="relative h-80 sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/intro/teacher-guiding-session.jpg"
                alt="Art of Living teacher guiding a meditation session"
                fill
                className="object-cover object-top"
              />
              {/* Warm bottom gradient so image has depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-3 sm:right-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl px-5 py-4 border border-border">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                Certified by
              </p>
              <p className="font-bold text-foreground text-sm">Art of Living Foundation</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-4">
              Your local guides
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              People who've
              <br />
              walked this path.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
              Our teachers aren't just instructors. They're practitioners who have lived these
              practices for years. Every session in Devon and Southwest England is led by someone
              rigorously certified by the Art of Living Foundation.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Warm, unhurried, and deeply personal. Come as you are. No prior meditation
              experience needed.
            </p>
            <Link href="/intro">
              <Button size="lg" className="group px-8 py-6 text-base">
                Meet us at an Intro Talk
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
