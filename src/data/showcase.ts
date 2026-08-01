export type StyleKey = 'cartoon' | 'watercolor' | '3d' | 'lineart'

export const STYLE_LABELS: Record<StyleKey, string> = {
  cartoon: 'Cartoon',
  watercolor: 'Watercolor',
  '3d': '3D Animated',
  lineart: 'Line Art',
}

export interface PetShowcase {
  id: string
  /** playful caption shown on the card */
  title: string
  original: string
  art: { style: StyleKey; src: string }[]
}

/** Real customer pets: original photo + finished artwork in each style. */
export const PETS: PetShowcase[] = [
  {
    id: 'pet1',
    title: 'The Dog-Bed Connoisseur',
    original: '/showcase/pet1-original.webp',
    art: [
      { style: 'cartoon', src: '/showcase/pet1-cartoon.webp' },
      { style: 'watercolor', src: '/showcase/pet1-watercolor.webp' },
    ],
  },
  {
    id: 'pet3',
    title: 'Chief of Fish Security',
    original: '/showcase/pet3-original.webp',
    art: [
      { style: 'watercolor', src: '/showcase/pet3-watercolor.webp' },
      { style: 'cartoon', src: '/showcase/pet3-cartoon.webp' },
    ],
  },
  {
    id: 'pet2',
    title: 'The Blanket Supervisor',
    original: '/showcase/pet2-original.webp',
    art: [{ style: '3d', src: '/showcase/pet2-3d.webp' }],
  },
  {
    id: 'pet4',
    title: 'The Warehouse Manager',
    original: '/showcase/pet4-original.webp',
    art: [{ style: '3d', src: '/showcase/pet4-3d.webp' }],
  },
]

/** Photos of finished magnets on a real fridge. */
export const MAGNET_SHOTS = [
  { src: '/showcase/magnets-grid4.webp', alt: 'Four custom pet magnets on a fridge' },
  { src: '/showcase/magnet-pet1-watercolor.webp', alt: 'Watercolor style pet magnet' },
  { src: '/showcase/magnet-pet3-cartoon.webp', alt: 'Cartoon style pet magnet' },
  { src: '/showcase/magnet-pet2-3d.webp', alt: '3D animated style pet magnet' },
  { src: '/showcase/magnet-pet3-watercolor.webp', alt: 'Watercolor style pet magnet on a fridge' },
  { src: '/showcase/magnet-pet1-cartoon.webp', alt: 'Cartoon style pet magnet on a fridge' },
]

/** Style options offered in the order form, with a sample image where we have one. */
export const ORDER_STYLES: { key: StyleKey; label: string; sample?: string; note?: string }[] = [
  { key: 'cartoon', label: 'Cartoon', sample: '/showcase/pet1-cartoon.webp' },
  { key: 'watercolor', label: 'Watercolor', sample: '/showcase/pet3-watercolor.webp' },
  { key: '3d', label: '3D Animated', sample: '/showcase/pet2-3d.webp' },
  { key: 'lineart', label: 'Line Art', note: 'Minimal single-line sketch' },
]

export const PRICE_PER_MAGNET = 6.99
export const DELIVERY_MINIMUM = 30
export const CONTACT_EMAIL = 'pawtraitpet@gmail.com'
export const MAGNET_SIZE = '5 cm × 5 cm'

export type CornerStyle = 'rounded' | 'square'
export const CORNER_STYLES: { key: CornerStyle; label: string; blurb: string }[] = [
  { key: 'rounded', label: 'Rounded corners', blurb: 'Soft & friendly' },
  { key: 'square', label: 'Square corners', blurb: 'Clean & classic' },
]
