import { useState } from 'react'
import { MAGNET_SHOTS, PETS, STYLE_LABELS, type PetShowcase } from '../data/showcase'

function PetCard({ pet }: { pet: PetShowcase }) {
  const [active, setActive] = useState(0)

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-soft transition-shadow hover:shadow-lift">
      <div className="relative">
        <img
          src={pet.art[active].src}
          alt={`${pet.title} — ${STYLE_LABELS[pet.art[active].style]} artwork`}
          className="aspect-square w-full object-cover"
          width={900}
          height={900}
          loading="lazy"
        />
        {/* original photo inset, polaroid style */}
        <figure className="absolute bottom-3 left-3 w-24 -rotate-3 rounded-lg border-4 border-white bg-white shadow-lift sm:w-28">
          <img
            src={pet.original}
            alt="Original pet photo"
            className="aspect-3/4 w-full rounded-sm object-cover"
            loading="lazy"
          />
          <figcaption className="py-0.5 text-center text-[10px] font-bold text-coffee-light">
            original photo
          </figcaption>
        </figure>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <h3 className="font-display text-lg font-semibold">{pet.title}</h3>
        <div className="flex gap-1.5">
          {pet.art.map((art, i) => (
            <button
              key={art.style}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                i === active
                  ? 'bg-terracotta text-white'
                  : 'bg-cream-dark text-coffee-light hover:bg-apricot-light hover:text-coffee'
              }`}
            >
              {STYLE_LABELS[art.style]}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display font-semibold tracking-wide text-terracotta uppercase">Gallery</p>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">From photo to Pawtrait</h2>
        <p className="mt-4 text-lg font-semibold text-coffee-light">
          Every magnet starts with a real photo. Tap the style buttons to see the transformation.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {PETS.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      {/* finished product strip */}
      <div className="mt-16">
        <h3 className="text-center font-display text-2xl font-semibold">
          …and here they are, on the fridge 🧲
        </h3>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:overflow-visible">
          {MAGNET_SHOTS.map((shot, i) => (
            <img
              key={shot.src}
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              className={`h-56 w-44 shrink-0 snap-center rounded-2xl object-cover shadow-soft transition-transform hover:-translate-y-1 lg:h-auto lg:w-full ${
                i % 2 === 0 ? 'rotate-1' : '-rotate-1'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
