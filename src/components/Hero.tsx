import PawIcon from './PawIcon'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft background blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-apricot-light blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute top-40 -right-32 h-96 w-96 rounded-full bg-sage-light blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:pt-20 lg:pb-24">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full bg-sage-light px-4 py-1.5 text-sm font-bold text-coffee">
            <PawIcon className="h-4 w-4 text-sage" />
            Handmade in Calgary, AB
          </p>
          <h1 className="mt-5 font-display text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            Your pet, turned into
            <span className="text-terracotta"> adorable art</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg font-semibold text-coffee-light lg:mx-0">
            Send us a photo of your furry friend and we&apos;ll transform it into a custom
            illustrated fridge magnet — cartoon, watercolor, or 3D animated style.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href="#order"
              className="rounded-full bg-terracotta px-8 py-3.5 font-display text-lg font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5 hover:bg-terracotta-dark"
            >
              Order Yours — $6.99
            </a>
            <a
              href="#gallery"
              className="rounded-full border-2 border-coffee/15 bg-white/60 px-8 py-3.5 font-display text-lg font-semibold text-coffee transition-colors hover:border-terracotta hover:text-terracotta"
            >
              See the magic
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-coffee-light lg:justify-start">
            <li className="flex items-center gap-1.5">✓ Custom artwork included</li>
            <li className="flex items-center gap-1.5">✓ Free pickup in Calgary</li>
            <li className="flex items-center gap-1.5">✓ Delivery on $30+ orders</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="rotate-2 overflow-hidden rounded-3xl border-8 border-white shadow-lift transition-transform duration-300 hover:rotate-0">
            <img
              src="/showcase/magnets-hero.webp"
              alt="Six custom pet fridge magnets in different art styles on a stainless steel fridge"
              className="w-full"
              width={1400}
              height={1050}
              fetchPriority="high"
            />
          </div>
          <span className="absolute -top-4 -right-2 -rotate-6 rounded-full bg-apricot px-4 py-2 font-display text-sm font-semibold text-coffee shadow-soft sm:-right-6">
            Customer showcase 🐾
          </span>
        </div>
      </div>
    </section>
  )
}
