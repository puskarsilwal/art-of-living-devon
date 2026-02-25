import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { testimonials } from "@/lib/data/testimonials"

export function TestimonialsSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl text-center mb-8">
          What People Are Saying
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="h-full">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/30 mb-3" />
                <p className="text-base sm:text-lg leading-relaxed mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
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
              Save My Seat — It&apos;s Free
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
