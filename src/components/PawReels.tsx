export default function PawReels() {
  return (
    <section id="paw-reels" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage to-sage/70 p-8 text-white shadow-lift sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
        />
        <div className="relative max-w-2xl">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold tracking-wide uppercase">
            Coming soon
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Paw Reels <span aria-hidden>🎬</span>
          </h2>
          <p className="mt-4 text-lg font-semibold text-white/90">
            Upload one photo of your pet and get hilarious AI-generated videos and memes —
            your cat starring in the internet&apos;s next viral moment. We&apos;re teaching
            the robots to be funny. Stay tuned!
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/15 px-5 py-3 font-bold">
            <span aria-hidden>🚧</span> In the workshop — launching on pawtrait.ca
          </p>
        </div>
      </div>
    </section>
  )
}
