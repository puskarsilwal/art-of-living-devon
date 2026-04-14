import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { courseTestimonials } from "@/lib/data/course-testimonials"

export function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-muted/40 via-background to-primary/5 py-20 px-4 sm:px-6">
      {/* Decorative giant quote mark */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 text-[200px] font-serif text-primary/5 leading-none select-none pointer-events-none"
        aria-hidden
      >
        &ldquo;
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Section header with decorative accent */}
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-4" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
            How is Art of Living Changing Lives?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Real transformations from Art of Living Part 1 participants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {courseTestimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="h-full border border-primary/10 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 bg-background relative overflow-hidden"
            >
              <CardContent className="pt-6 relative flex flex-col items-center text-center">
                {/* Circular photo */}
                <Image
                  src={testimonial.imagePath}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover mx-auto mb-3 h-20 w-20 ring-2 ring-primary/20 ring-offset-2"
                />

                {/* Pull-quote highlight */}
                {testimonial.highlight && (
                  <p className="text-base font-bold text-primary mb-2 relative z-10">
                    &ldquo;{testimonial.highlight}&rdquo;
                  </p>
                )}

                {/* Full testimonial quote */}
                <blockquote className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 relative z-10 italic">
                  {testimonial.quote}
                </blockquote>

                {/* Name and role */}
                <p className="font-bold text-foreground text-sm">{testimonial.name}</p>
                {testimonial.context && (
                  <p className="text-sm text-muted-foreground">{testimonial.context}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
