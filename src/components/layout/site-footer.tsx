import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-secondary/30">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left">
        <p>&copy; {new Date().getFullYear()} Art of Living Devon &amp; Southwest</p>

        <nav className="flex gap-4 text-sm">
          <Link href="/intro" className="underline-offset-4 hover:text-foreground hover:underline">
            Intro Talk
          </Link>
          <Link href="/happiness-program" className="underline-offset-4 hover:text-foreground hover:underline">
            Part 1 Course
          </Link>
          <Link href="/events" className="underline-offset-4 hover:text-foreground hover:underline">
            Events
          </Link>
          {/* Phase 7 */}
        </nav>

        <nav>
          <Link
            href="/privacy-policy"
            className="underline-offset-4 hover:text-foreground hover:underline"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}
