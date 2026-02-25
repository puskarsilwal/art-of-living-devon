import { courseDates, type CourseDate } from "@/lib/data/course-dates"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function CourseDateCard({ course }: { course: CourseDate }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-semibold text-base">
              {course.startDate} &ndash; {course.endDate}
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">{course.location}</p>
            <p className="text-sm text-muted-foreground">
              {course.time} {course.timezone}
            </p>
          </div>
          <Badge variant="secondary">{course.format}</Badge>
        </div>
        {course.badge && (
          <p className="text-xs font-medium text-primary mb-3">{course.badge}</p>
        )}
        <a
          href={course.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full">Register Now</Button>
        </a>
      </CardContent>
    </Card>
  )
}

export function UpcomingDatesSection() {
  return (
    <section id="upcoming-dates" className="px-4 py-12 sm:px-6 sm:py-16 lg:py-20 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Upcoming Courses
          </p>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-3">
            Upcoming Devon &amp; Southwest Courses
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Choose a format and location that works for you
          </p>
        </div>

        {/* Course date cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {courseDates.map((course) => (
            <CourseDateCard key={course.id} course={course} />
          ))}
        </div>

        {/* Fallback note */}
        <p className="text-center text-sm text-muted-foreground">
          Can&apos;t find a date that works? View all available courses at{" "}
          <a
            href="https://www.artofliving.org/gb-en/courses/art-of-living-part-one"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          >
            artofliving.org/gb-en
          </a>
        </p>
      </div>
    </section>
  )
}
