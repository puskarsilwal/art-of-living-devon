import Link from "next/link"

export default function HomePage() {
  return (
    <section className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-16 text-center md:py-24">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Art of Living
        <br />
        <span className="text-primary">Devon &amp; Southwest</span>
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Discover breathing techniques, meditation, and yoga for a stress-free,
        healthy life. Join our free intro talks and community events across Devon
        and Southwest England.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/privacy-policy"
          className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </section>
  )
}
