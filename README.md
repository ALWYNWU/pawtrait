# Pawtrait 🐾

Custom pet fridge magnets, handmade in Calgary — the website behind [pawtrait.ca](https://pawtrait.ca).

Send us a photo of your pet, pick an art style (cartoon, watercolor, 3D animated or line art),
and it becomes a fridge magnet. This repo is the static storefront: **Vite + React 18 +
TypeScript + Tailwind CSS v4**, no backend — the order form uploads photos to Cloudinary and
delivers the order by email via Web3Forms.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in dist/
npm run preview    # serve the production build locally
```

**Mobile preview**: open the site in Chrome → `F12` → `Ctrl+Shift+M` (device toolbar).
On a real phone: `npm run dev -- --host`, then visit the LAN address shown in the terminal.

## Configuration

The order form needs three environment variables (copy `.env.example` to `.env.local`;
set the same variables in Vercel → Project Settings → Environment Variables):

| Variable | Where it comes from |
|---|---|
| `VITE_WEB3FORMS_ACCESS_KEY` | [web3forms.com](https://web3forms.com) access key for the order inbox email |
| `VITE_CLOUDINARY_CLOUD_NAME` | [cloudinary.com](https://cloudinary.com) dashboard "Cloud name" |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | An **unsigned** upload preset created in Cloudinary settings |

Both services are free-tier. Until the variables are set, the form politely falls back to
"email us instead". Restart the dev server after editing `.env.local`.

## Project structure

```
image/                        raw photo assets (not committed)
scripts/optimize-images.mjs   sharp pipeline: npm run optimize-images
public/showcase/              optimized WebP images used by the site
src/
  data/showcase.ts            ★ all content & pricing constants live here
  components/                 Navbar, Hero, Gallery, HowItWorks, Pricing,
                              OrderForm, PawReels, Footer
```

## Common edits

| Change | Where |
|---|---|
| Price / delivery minimum / contact email | constants at the bottom of `src/data/showcase.ts` |
| Showcase pets & magnet photos | `PETS` / `MAGNET_SHOTS` in `src/data/showcase.ts` |
| Add a new showcase image | drop into `image/` → add to `scripts/optimize-images.mjs` → `npm run optimize-images` |
| Brand colors & fonts | `@theme` block in `src/index.css` |
| Copy | directly in the relevant component |

## Deployment

Pushes to `main` auto-deploy via [Vercel](https://vercel.com) (framework preset: Vite).
Custom domain `pawtrait.ca` is attached in Vercel → Settings → Domains.
