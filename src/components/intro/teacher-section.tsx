import Image from "next/image"
import { Award, Heart, Users } from "lucide-react"

const credentials = [
  {
    icon: Award,
    label: "Internationally certified",
  },
  {
    icon: Heart,
    label: "Warm & supportive",
  },
  {
    icon: Users,
    label: "Local community",
  },
]

export function TeacherSection() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block w-12 h-1 rounded-full bg-primary mb-4" />
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Meet Your Guide
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-5/12 shrink-0">
            <Image
              src="/images/intro/teacher-guiding.jpg"
              alt="Art of Living teacher guiding a breathing and meditation session"
              width={600}
              height={400}
              className="rounded-2xl object-cover w-full aspect-[4/3] shadow-lg"
              priority={false}
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <p className="text-lg sm:text-xl font-semibold text-primary mb-2">
              Certified Art of Living Teacher
            </p>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-2">
              Trained in the tradition of Gurudev Sri Sri Ravi Shankar, passionate about bringing authentic, life-changing practices to the Devon &amp; Southwest community.
            </p>

            {/* Decorative Gurudev quote */}
            <blockquote className="border-l-2 border-primary/30 pl-4 my-4">
              <p className="text-sm sm:text-base italic text-muted-foreground/80">
                &ldquo;The quality of our life depends on the quality of our
                mind.&rdquo;
              </p>
              <cite className="text-xs text-primary/70 not-italic font-medium">
                -- Gurudev Sri Sri Ravi Shankar
              </cite>
            </blockquote>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
              {credentials.map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-center gap-2"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <cred.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{cred.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
