import { courseDates, type CourseDate } from "@/lib/data/course-dates"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function CourseDateCard({ course }: { course: CourseDate }) {
  return (
    <Card className="group border-2 border-border/50 hover:border-primary/40 shadow-sm hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p className="font-bold text-lg">
              {course.startDate} &ndash; {course.endDate}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{course.location}</p>
            <p className="text-sm text-muted-foreground">
              {course.time} {course.timezone}
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20 font-semibold text-xs shrink-0"
          >
            {course.format}
          </Badge>
        </div>
        {course.badge && (
          <p className="text-xs font-bold text-primary bg-primary/10 rounded-full px-3 py-1 inline-block mb-3">
            {course.badge}
          </p>
        )}
        <div className="border-t border-border/40 my-4" />
        <a
          href={course.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full group-hover:bg-primary/90 transition-colors">
            Register Now
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}

export function UpcomingDatesSection() {
  return (
    <section id="upcoming-dates" className="bg-background py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Limited Seats Available
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-3">
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
