export function EventVideoSection({ videoUrl }: { videoUrl: string }) {
  return (
    <section className="bg-black py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-white text-2xl font-semibold text-center mb-8">
          See What a Satsang Evening Looks Like
        </h2>
        <div className="relative w-full">
          <div style={{ paddingBottom: "56.25%", position: "relative" }}>
            <iframe
              className="absolute inset-0 w-full h-full rounded-2xl"
              src={videoUrl}
              title="Event video"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
