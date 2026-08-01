// One-time image pipeline: reads raw photos from image/, outputs web-optimized
// WebP files to public/showcase/.
//
// The phone photos carry EXIF orientation=6; sharp's .rotate() with no args
// applies it. AI renders are stored upright.
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'image'
const OUT = 'public/showcase'

/** @type {{src: string, out: string, size: number}[]} */
const manifest = [
  // originals (customer photos)
  { src: 'original_1.jpg', out: 'pet1-original.webp', size: 1000 },
  { src: 'origional_2.jpg', out: 'pet2-original.webp', size: 1000 },
  { src: 'original_3.jpg', out: 'pet3-original.webp', size: 1000 },
  { src: 'original_4.jpg', out: 'pet4-original.webp', size: 1000 },

  // AI artwork renders — already upright, square
  { src: 'rendering_1.jpg', out: 'pet1-cartoon.webp', size: 900 },
  { src: 'rendering_1_2.jpg', out: 'pet1-watercolor.webp', size: 900 },
  { src: 'rendering_2.jpg', out: 'pet2-3d.webp', size: 900 },
  { src: 'rendering_3.jpg', out: 'pet3-watercolor.webp', size: 900 },
  { src: 'rendering_3 (2).jpg', out: 'pet3-cartoon.webp', size: 900 },
  { src: 'rendering_4.jpg', out: 'pet4-3d.webp', size: 900 },

  // finished magnet product photos
  { src: 'refrige magnets.jpg', out: 'magnets-hero.webp', size: 1400 },
  { src: '图片_20260801141901_947_1.jpg', out: 'magnets-grid4.webp', size: 1100 },
  { src: 'refrige magnet_1 (2).jpg', out: 'magnet-pet1-watercolor.webp', size: 1000 },
  { src: 'refrige magnet_1.jpg', out: 'magnet-pet1-cartoon.webp', size: 1000 },
  { src: 'refrige magnet_3.jpg', out: 'magnet-pet3-cartoon.webp', size: 1000 },
  { src: 'refrige magnet_3 (2).jpg', out: 'magnet-pet3-watercolor.webp', size: 1000 },
  { src: 'refrige magnet_4.jpg', out: 'magnet-pet2-3d.webp', size: 1000 },
  { src: 'refrige magnet_warehouse.jpg', out: 'magnet-pet4-3d.webp', size: 1000 },
]

await mkdir(OUT, { recursive: true })

for (const item of manifest) {
  const input = path.join(SRC, item.src)
  const output = path.join(OUT, item.out)
  const info = await sharp(input)
    .rotate() // apply EXIF orientation
    .resize(item.size, item.size, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output)
  console.log(`${item.src} -> ${item.out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`)
}
console.log('Done.')
