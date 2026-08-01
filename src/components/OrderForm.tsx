import { useMemo, useRef, useState } from 'react'
import {
  CONTACT_EMAIL,
  DELIVERY_MINIMUM,
  ORDER_STYLES,
  PRICE_PER_MAGNET,
  type StyleKey,
} from '../data/showcase'

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
const FORM_CONFIGURED = Boolean(WEB3FORMS_KEY && CLOUDINARY_CLOUD && CLOUDINARY_PRESET)

const MAX_PHOTOS = 8
const MAX_PHOTO_MB = 20

type Status = 'idle' | 'uploading' | 'sending' | 'success' | 'error'

interface Photo {
  file: File
  previewUrl: string
}

async function uploadToCloudinary(file: File): Promise<string> {
  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', CLOUDINARY_PRESET!)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
    method: 'POST',
    body,
  })
  if (!res.ok) throw new Error(`Photo upload failed (${res.status})`)
  const data = (await res.json()) as { secure_url?: string }
  if (!data.secure_url) throw new Error('Photo upload failed')
  return data.secure_url
}

export default function OrderForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [petName, setPetName] = useState('')
  const [style, setStyle] = useState<StyleKey | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [fulfillment, setFulfillment] = useState<'pickup' | 'delivery'>('pickup')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [photos, setPhotos] = useState<Photo[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const total = useMemo(() => quantity * PRICE_PER_MAGNET, [quantity])
  const deliveryUnlocked = total >= DELIVERY_MINIMUM
  const busy = status === 'uploading' || status === 'sending'

  function addFiles(list: FileList | null) {
    if (!list) return
    setError('')
    const next: Photo[] = []
    for (const file of Array.from(list)) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
        setError(`"${file.name}" is larger than ${MAX_PHOTO_MB}MB — please pick a smaller photo.`)
        continue
      }
      next.push({ file, previewUrl: URL.createObjectURL(file) })
    }
    setPhotos((prev) => [...prev, ...next].slice(0, MAX_PHOTOS))
  }

  function removePhoto(index: number) {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].previewUrl)
      return prev.filter((_, i) => i !== index)
    })
  }

  function setQty(q: number) {
    const clamped = Math.min(50, Math.max(1, q))
    setQuantity(clamped)
    if (clamped * PRICE_PER_MAGNET < DELIVERY_MINIMUM) setFulfillment('pickup')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!style) {
      setError('Please choose an art style for your magnet.')
      return
    }
    if (photos.length === 0) {
      setError("Please upload at least one photo of your pet — that's what we turn into art!")
      return
    }
    if (!FORM_CONFIGURED) {
      setError(
        `The order form isn't connected yet. Please email your photos and order details to ${CONTACT_EMAIL} instead.`,
      )
      return
    }

    try {
      setStatus('uploading')
      const urls: string[] = []
      for (const photo of photos) {
        urls.push(await uploadToCloudinary(photo.file))
      }

      setStatus('sending')
      const styleLabel = ORDER_STYLES.find((s) => s.key === style)?.label ?? style
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🐾 New Pawtrait order — ${name} (${quantity} × ${styleLabel})`,
          from_name: 'Pawtrait Website',
          'Customer name': name,
          Email: email,
          Phone: phone || '—',
          "Pet's name": petName || '—',
          'Art style': styleLabel,
          Quantity: String(quantity),
          'Estimated total': `$${total.toFixed(2)} CAD`,
          Fulfillment:
            fulfillment === 'delivery' ? `Delivery — ${address}` : 'Pickup in Calgary',
          Notes: notes || '—',
          'Pet photos': urls.join('\n'),
        }),
      })
      const data = (await res.json()) as { success?: boolean; message?: string }
      if (!data.success) throw new Error(data.message || 'Something went wrong sending your order.')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <section id="order" className="scroll-mt-20 bg-cream-dark/60 py-16 lg:py-24">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <div className="rounded-3xl bg-white p-10 shadow-lift">
            <div className="text-6xl" aria-hidden>🎉</div>
            <h2 className="mt-4 font-display text-3xl font-semibold">Order received!</h2>
            <p className="mt-4 text-lg font-semibold text-coffee-light">
              Thanks {name.split(' ')[0]}! We got your photos and we&apos;ll reply to{' '}
              <span className="font-bold text-coffee">{email}</span> within 1–2 days with a
              preview of the artwork.
            </p>
            <button
              type="button"
              onClick={() => {
                photos.forEach((p) => URL.revokeObjectURL(p.previewUrl))
                setPhotos([])
                setStatus('idle')
                setQuantity(1)
                setStyle(null)
                setNotes('')
              }}
              className="mt-8 rounded-full bg-terracotta px-8 py-3 font-display text-lg font-semibold text-white transition-colors hover:bg-terracotta-dark"
            >
              Place another order
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="order" className="scroll-mt-20 bg-cream-dark/60 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display font-semibold tracking-wide text-terracotta uppercase">Order</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            Request your Pawtrait
          </h2>
          <p className="mt-4 text-lg font-semibold text-coffee-light">
            Fill this out and we&apos;ll get back to you within 1–2 days with an artwork preview.
            No payment needed until you love it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8 rounded-3xl bg-white p-6 shadow-soft sm:p-10">
          {/* contact */}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Your name *</span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={busy}
                className="w-full rounded-xl border-2 border-coffee/10 bg-cream/50 px-4 py-3 font-semibold outline-none transition-colors focus:border-terracotta"
                placeholder="Jane Doe"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Email *</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
                className="w-full rounded-xl border-2 border-coffee/10 bg-cream/50 px-4 py-3 font-semibold outline-none transition-colors focus:border-terracotta"
                placeholder="jane@example.com"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Phone (optional)</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={busy}
                className="w-full rounded-xl border-2 border-coffee/10 bg-cream/50 px-4 py-3 font-semibold outline-none transition-colors focus:border-terracotta"
                placeholder="(403) 555-0123"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Pet&apos;s name</span>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                disabled={busy}
                className="w-full rounded-xl border-2 border-coffee/10 bg-cream/50 px-4 py-3 font-semibold outline-none transition-colors focus:border-terracotta"
                placeholder="Mochi"
              />
            </label>
          </div>

          {/* photos */}
          <div>
            <span className="mb-1.5 block text-sm font-bold">
              Pet photos * <span className="font-semibold text-coffee-light">(up to {MAX_PHOTOS})</span>
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={busy || photos.length >= MAX_PHOTOS}
              className="grid w-full place-items-center rounded-2xl border-2 border-dashed border-coffee/20 bg-cream/50 px-4 py-8 text-center transition-colors hover:border-terracotta disabled:opacity-50"
            >
              <span className="text-3xl" aria-hidden>🐶📷🐱</span>
              <span className="mt-2 font-bold">Tap to add photos</span>
              <span className="text-sm font-semibold text-coffee-light">
                Clear, well-lit photos make the best magnets
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => {
                addFiles(e.target.files)
                e.target.value = ''
              }}
            />
            {photos.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-3">
                {photos.map((photo, i) => (
                  <li key={photo.previewUrl} className="relative">
                    <img
                      src={photo.previewUrl}
                      alt={`Upload preview ${i + 1}`}
                      className="h-20 w-20 rounded-xl object-cover shadow-soft"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      disabled={busy}
                      aria-label={`Remove photo ${i + 1}`}
                      className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-coffee text-xs font-bold text-white shadow-soft hover:bg-terracotta"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* style */}
          <div>
            <span className="mb-1.5 block text-sm font-bold">Art style *</span>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ORDER_STYLES.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  disabled={busy}
                  onClick={() => setStyle(option.key)}
                  aria-pressed={style === option.key}
                  className={`overflow-hidden rounded-2xl border-2 text-left transition-all ${
                    style === option.key
                      ? 'border-terracotta shadow-lift'
                      : 'border-coffee/10 hover:border-terracotta/50'
                  }`}
                >
                  {option.sample ? (
                    <img src={option.sample} alt="" className="aspect-square w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="grid aspect-square w-full place-items-center bg-cream-dark text-4xl" aria-hidden>
                      ✏️
                    </div>
                  )}
                  <span className="block px-3 py-2 text-sm font-bold">
                    {option.label}
                    {option.note && (
                      <span className="block text-xs font-semibold text-coffee-light">{option.note}</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* quantity + fulfillment */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <span className="mb-1.5 block text-sm font-bold">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty(quantity - 1)}
                  disabled={busy || quantity <= 1}
                  aria-label="Decrease quantity"
                  className="grid h-11 w-11 place-items-center rounded-xl bg-cream-dark font-display text-xl font-semibold hover:bg-apricot-light disabled:opacity-40"
                >
                  −
                </button>
                <span className="w-10 text-center font-display text-2xl font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQty(quantity + 1)}
                  disabled={busy}
                  aria-label="Increase quantity"
                  className="grid h-11 w-11 place-items-center rounded-xl bg-cream-dark font-display text-xl font-semibold hover:bg-apricot-light"
                >
                  +
                </button>
                <span className="ml-2 font-display text-xl font-semibold text-terracotta">
                  ${total.toFixed(2)} <span className="text-sm text-coffee-light">CAD</span>
                </span>
              </div>
            </div>

            <div>
              <span className="mb-1.5 block text-sm font-bold">Pickup or delivery</span>
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setFulfillment('pickup')}
                  aria-pressed={fulfillment === 'pickup'}
                  className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-colors ${
                    fulfillment === 'pickup'
                      ? 'border-terracotta bg-terracotta/5 text-terracotta'
                      : 'border-coffee/10 text-coffee-light'
                  }`}
                >
                  Pickup 🚗<span className="block text-xs font-semibold">Free · Calgary</span>
                </button>
                <button
                  type="button"
                  disabled={busy || !deliveryUnlocked}
                  onClick={() => setFulfillment('delivery')}
                  aria-pressed={fulfillment === 'delivery'}
                  className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-bold transition-colors disabled:opacity-40 ${
                    fulfillment === 'delivery'
                      ? 'border-terracotta bg-terracotta/5 text-terracotta'
                      : 'border-coffee/10 text-coffee-light'
                  }`}
                >
                  Delivery 📦<span className="block text-xs font-semibold">Orders ${DELIVERY_MINIMUM}+</span>
                </button>
              </div>
              {!deliveryUnlocked && (
                <p className="mt-1.5 text-xs font-semibold text-coffee-light">
                  Add {Math.ceil((DELIVERY_MINIMUM - total) / PRICE_PER_MAGNET)} more to unlock delivery.
                </p>
              )}
            </div>
          </div>

          {fulfillment === 'delivery' && (
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Delivery address *</span>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={busy}
                className="w-full rounded-xl border-2 border-coffee/10 bg-cream/50 px-4 py-3 font-semibold outline-none transition-colors focus:border-terracotta"
                placeholder="123 Example St NW, Calgary, AB"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-sm font-bold">Anything else we should know?</span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={busy}
              rows={3}
              className="w-full rounded-xl border-2 border-coffee/10 bg-cream/50 px-4 py-3 font-semibold outline-none transition-colors focus:border-terracotta"
              placeholder="e.g. It's a birthday gift — I'd love the artwork to include her favourite toy!"
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-terracotta/10 px-4 py-3 text-sm font-bold text-terracotta-dark">
              {error}{' '}
              {!FORM_CONFIGURED && (
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                  Email us instead
                </a>
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-terracotta py-4 font-display text-xl font-semibold text-white shadow-lift transition-all hover:bg-terracotta-dark disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'uploading' && 'Uploading photos…'}
            {status === 'sending' && 'Sending your order…'}
            {(status === 'idle' || status === 'error') && `Send order request · $${total.toFixed(2)}`}
          </button>
          <p className="text-center text-xs font-semibold text-coffee-light">
            We&apos;ll confirm everything by email before any payment. Photos are only used to
            create your artwork.
          </p>
        </form>
      </div>
    </section>
  )
}
