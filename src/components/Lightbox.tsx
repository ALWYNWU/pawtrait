import { useEffect } from 'react'

export interface LightboxImage {
  src: string
  alt: string
  caption: string
}

export default function Lightbox({
  image,
  onClose,
}: {
  image: LightboxImage | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!image) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [image, onClose])

  if (!image) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-60 flex animate-[fade-in_150ms_ease-out] items-center justify-center bg-coffee/85 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-cream/90 text-xl font-bold text-coffee shadow-lift transition-colors hover:bg-white"
      >
        ✕
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
      />
    </div>
  )
}
