import { DELIVERY_MINIMUM, PRICE_PER_MAGNET } from '../data/showcase'

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="font-display font-semibold tracking-wide text-terracotta uppercase">Pricing</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Simple pricing, no surprises
          </h2>
          <p className="mt-4 max-w-md text-lg font-semibold text-coffee-light">
            One flat price per magnet — custom artwork, printing and packaging all included.
            We currently serve the Calgary area.
          </p>
          <ul className="mt-6 space-y-3 font-semibold">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-light text-sm text-sage">✓</span>
              Custom artwork in the style of your choice
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-light text-sm text-sage">✓</span>
              Free pickup anywhere in Calgary
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-light text-sm text-sage">✓</span>
              Home delivery on orders of ${DELIVERY_MINIMUM}+
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage-light text-sm text-sage">✓</span>
              Makes a perfect gift for pet parents 🎁
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="rounded-3xl bg-coffee p-8 text-cream shadow-lift">
            <p className="font-display text-lg font-medium text-apricot">Custom Pet Magnet</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-6xl font-semibold">${PRICE_PER_MAGNET}</span>
              <span className="text-lg font-bold text-cream/70">CAD each</span>
            </p>
            <p className="mt-4 text-sm font-semibold text-cream/70">
              Order 5 or more (${(PRICE_PER_MAGNET * 5).toFixed(2)}) to unlock delivery.
            </p>
            <a
              href="#order"
              className="mt-6 block rounded-full bg-terracotta py-3.5 text-center font-display text-lg font-semibold text-white transition-colors hover:bg-terracotta-dark"
            >
              Start your order
            </a>
          </div>
          <span
            aria-hidden
            className="absolute -top-5 -right-5 rotate-12 rounded-full bg-apricot px-4 py-2 font-display text-sm font-semibold text-coffee shadow-soft"
          >
            Gift-ready!
          </span>
        </div>
      </div>
    </section>
  )
}
