import { useState } from 'react'
import { MAGNET_SHOTS, PETS, STYLE_LABELS, type PetShowcase } from '../data/showcase'
import Lightbox, { type LightboxImage } from './Lightbox'

type ZoomHandler = (image: LightboxImage) => void

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8 shrink-0 text-terracotta/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Image that opens in the lightbox when clicked. */
function Zoomable({
  image,
  onZoom,
  className,
  imgClassName,
  eager = false,
}: {
  image: LightboxImage
  onZoom: ZoomHandler
  /** shape/size of the clickable frame */
  className: string
  /** aspect ratio of the thumbnail */
  imgClassName: string
  eager?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => onZoom(image)}
      aria-label={`View larger: ${image.caption}`}
      className={`group relative block cursor-zoom-in overflow-hidden ${className}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading={eager ? 'eager' : 'lazy'}
        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${imgClassName}`}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 grid place-items-center bg-coffee/20 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 rounded-full bg-cream/90 p-1.5 text-coffee shadow-soft"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5M11 8v6M8 11h6" />
        </svg>
      </span>
    </button>
  )
}

function PetCard({ pet, onZoom }: { pet: PetShowcase; onZoom: ZoomHandler }) {
  const [active, setActive] = useState(0)
  const art = pet.art[active]

  const originalImage: LightboxImage = {
    src: pet.original,
    alt: `Original photo of ${pet.title}`,
    caption: `${pet.title} — original photo`,
  }
  const artImage: LightboxImage = {
    src: art.src,
    alt: `${pet.title} — ${STYLE_LABELS[art.style]} artwork`,
    caption: `${pet.title} — ${STYLE_LABELS[art.style]} artwork`,
  }
  const magnetImage: LightboxImage | null = art.magnet
    ? {
        src: art.magnet,
        alt: `Finished ${STYLE_LABELS[art.style]} magnet of ${pet.title} on a fridge`,
        caption: `${pet.title} — finished magnet 🧲`,
      }
    : null

  return (
    <article className="overflow-hidden rounded-3xl bg-linen shadow-soft transition-shadow hover:shadow-lift">
      {/* phone/tablet: artwork with polaroid insets overlaid */}
      <div className="relative lg:hidden">
        <Zoomable
          image={artImage}
          onZoom={onZoom}
          className="w-full"
          imgClassName="aspect-square"
        />
        <figure className="absolute bottom-3 left-3 w-20 -rotate-3 rounded-lg border-4 border-white bg-white shadow-lift sm:w-24">
          <Zoomable
            image={originalImage}
            onZoom={onZoom}
            className="w-full rounded-sm"
            imgClassName="aspect-3/4"
          />
          <figcaption className="py-0.5 text-center text-[10px] font-bold text-coffee-light">
            original photo
          </figcaption>
        </figure>
        {magnetImage && (
          <figure className="absolute right-3 bottom-3 w-20 rotate-3 rounded-lg border-4 border-white bg-white shadow-lift sm:w-24">
            <Zoomable
              image={magnetImage}
              onZoom={onZoom}
              className="w-full rounded-sm"
              imgClassName="aspect-3/4"
            />
            <figcaption className="py-0.5 text-center text-[10px] font-bold text-coffee-light">
              on the fridge 🧲
            </figcaption>
          </figure>
        )}
      </div>

      {/* desktop: photo → artwork → magnet transformation strip */}
      <div className="hidden items-center justify-center gap-5 p-6 pb-4 lg:flex xl:gap-7 xl:p-8 xl:pb-5">
        <figure className="w-[24%]">
          <Zoomable
            image={originalImage}
            onZoom={onZoom}
            className="w-full rounded-2xl shadow-soft"
            imgClassName="aspect-3/4"
          />
          <figcaption className="mt-2.5 text-center text-sm font-bold text-coffee-light">
            Original photo
          </figcaption>
        </figure>
        <Arrow />
        <figure className="w-[36%]">
          <Zoomable
            image={artImage}
            onZoom={onZoom}
            className="w-full rounded-2xl shadow-soft"
            imgClassName="aspect-square"
          />
          <figcaption className="mt-2.5 text-center text-sm font-bold text-terracotta">
            {STYLE_LABELS[art.style]} artwork
          </figcaption>
        </figure>
        {magnetImage && (
          <>
            <Arrow />
            <figure className="w-[24%]">
              <Zoomable
                image={magnetImage}
                onZoom={onZoom}
                className="w-full rounded-2xl shadow-soft"
                imgClassName="aspect-3/4"
              />
              <figcaption className="mt-2.5 text-center text-sm font-bold text-coffee-light">
                On the fridge 🧲
              </figcaption>
            </figure>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 lg:px-6 lg:pb-5">
        <h3 className="font-display text-lg font-semibold lg:text-xl">{pet.title}</h3>
        <div className="flex gap-1.5">
          {pet.art.map((entry, i) => (
            <button
              key={entry.style}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors lg:px-4 lg:py-2 lg:text-sm ${
                i === active
                  ? 'bg-terracotta text-white'
                  : 'bg-cream-dark text-coffee-light hover:bg-apricot-light hover:text-coffee'
              }`}
            >
              {STYLE_LABELS[entry.style]}
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Gallery() {
  const [zoomed, setZoomed] = useState<LightboxImage | null>(null)

  return (
    <section id="gallery" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-display font-semibold tracking-wide text-terracotta uppercase">Gallery</p>
        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">From photo to Pawtrait</h2>
        <p className="mt-4 text-lg font-semibold text-coffee-light">
          Every magnet starts with a real photo. Tap the style buttons to see the transformation —
          and tap any photo to view it larger.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-8">
        {PETS.map((pet) => (
          <PetCard key={pet.id} pet={pet} onZoom={setZoomed} />
        ))}
      </div>

      {/* finished product strip */}
      <div className="mt-16">
        <h3 className="text-center font-display text-2xl font-semibold">
          …and here they are, on the fridge 🧲
        </h3>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:overflow-visible">
          {MAGNET_SHOTS.map((shot, i) => (
            <Zoomable
              key={shot.src}
              image={{ src: shot.src, alt: shot.alt, caption: shot.alt }}
              onZoom={setZoomed}
              className={`h-56 w-44 shrink-0 snap-center rounded-2xl shadow-soft lg:h-auto lg:w-full ${
                i % 2 === 0 ? 'rotate-1' : '-rotate-1'
              }`}
              imgClassName="h-full lg:aspect-3/4"
            />
          ))}
        </div>
      </div>

      <Lightbox image={zoomed} onClose={() => setZoomed(null)} />
    </section>
  )
}
