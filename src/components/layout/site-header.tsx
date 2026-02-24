import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-full bg-primary" aria-hidden="true" />
          <span className="text-lg font-semibold tracking-tight">
            Art of Living{" "}
            <span className="text-muted-foreground font-normal">
              Devon &amp; Southwest
            </span>
          </span>
        </Link>
      </div>
    </header>
  )
}
