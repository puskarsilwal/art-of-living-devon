import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">
            Art of Living{" "}
            <span className="text-muted-foreground font-normal">
              Devon &amp; Southwest
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/intro" className="text-muted-foreground hover:text-foreground transition-colors">
            Intro Talk
          </Link>
          <Link href="/happiness-program" className="text-muted-foreground hover:text-foreground transition-colors">
            Part 1 Course
          </Link>
          <Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors">
            Events
          </Link>
          {/* /events route created in Phase 7 */}
        </nav>

        <Link href="/intro" className="hidden md:block">
          <Button size="sm">Register Free</Button>
        </Link>

        {/* TODO: mobile hamburger nav — Phase 7+ enhancement */}
      </div>
    </header>
  )
}
