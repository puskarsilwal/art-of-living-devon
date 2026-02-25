import Image from "next/image"
import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { courseTestimonials } from "@/lib/data/course-testimonials"

export function TestimonialsSection() {
  return (
    <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto">
        {/* Section header with decorative accent */}
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-4" />
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl mb-2">
            How is Art of Living Changing Lives?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Real transformations from Happiness Program participants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {courseTestimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="h-full border-0 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              <CardContent className="pt-6 relative flex flex-col items-center text-center">
                {/* Decorative watermark quote */}
                <Quote className="absolute top-3 right-4 h-14 w-14 text-primary/[0.06]" />

                {/* Circular photo */}
                <Image
                  src={testimonial.imagePath}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full object-cover mx-auto mb-3 h-20 w-20"
                />

                {/* Pull-quote highlight */}
                {testimonial.highlight && (
                  <p className="text-primary font-semibold text-base mb-2 relative z-10">
                    &ldquo;{testimonial.highlight}&rdquo;
                  </p>
                )}

                {/* Full testimonial quote */}
                <blockquote className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 relative z-10 italic">
                  {testimonial.quote}
                </blockquote>

                {/* Name and role */}
                <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
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
