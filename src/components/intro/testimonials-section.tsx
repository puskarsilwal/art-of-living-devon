import Image from "next/image"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { testimonials } from "@/lib/data/testimonials"

export function TestimonialsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            Real Experiences
          </p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            What People Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`h-full border-0 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden ${
                index % 2 === 1 ? "bg-primary/[0.02]" : ""
              }`}
            >
              <CardContent className="pt-6 relative">
                {/* Decorative watermark quote */}
                <Quote className="absolute top-3 right-4 h-16 w-16 text-primary/[0.06]" />

                {/* Pull-quote highlight */}
                {testimonial.highlight && (
                  <p className="text-primary font-semibold text-base sm:text-lg mb-2 relative z-10">
                    &ldquo;{testimonial.highlight}&rdquo;
                  </p>
                )}

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 relative z-10">
                  {testimonial.quote}
                </p>

                <div className="flex items-center gap-3 relative z-10">
                  <Image
                    src={testimonial.imagePath}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover h-12 w-12"
                  />
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    {testimonial.context && (
                      <p className="text-xs text-muted-foreground">
                        {testimonial.context}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <a href="#register">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 text-lg font-semibold px-8"
            >
              I Want This →
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
