# CLAUDE.md

Website for pawtrait.ca — custom pet fridge magnets, handmade in Calgary. Customers submit a
pet photo + art style through the order form; orders arrive by email. No backend, no database,
no auth: a fully static SPA deployed on Vercel.

## Commands

```
npm run dev               # dev server at http://localhost:5173 (add -- --host for phone testing)
npm run build             # tsc -b && vite build → dist/
npm run preview           # serve the production build locally
npm run optimize-images   # regenerate public/showcase/*.webp from image/ via sharp
```

Windows note: Node lives at `%LOCALAPPDATA%\Programs\nodejs` (portable install, on user PATH).
If a shell can't find node, prepend that directory to PATH.

## Architecture

- Single-page scroll site. `src/App.tsx` stacks the sections; there is no router.
- **All content/config lives in `src/data/showcase.ts`**: pet showcase entries (`PETS`),
  fridge photos (`MAGNET_SHOTS`), form style options (`ORDER_STYLES`), and the constants
  `PRICE_PER_MAGNET`, `DELIVERY_MINIMUM`, `CONTACT_EMAIL`. Edit content there, not in components.
- Components (`src/components/`): Navbar, Hero, Gallery (style-switcher cards + magnet strip),
  HowItWorks, Pricing, OrderForm, PawReels (coming-soon placeholder), Footer, PawIcon.
- Styling: Tailwind CSS v4. Design tokens (brand colors, fonts, shadows) are defined in the
  `@theme` block of `src/index.css` — palette is warm cream/terracotta/coffee. Fonts are
  self-hosted via @fontsource (Fredoka for display, Nunito for body).
- Order form flow (`OrderForm.tsx`): photos upload from the browser to Cloudinary (unsigned
  preset) → order details + photo URLs POST to Web3Forms → email to CONTACT_EMAIL. Requires
  three `VITE_*` env vars (see `.env.example`); without them the form degrades to a
  "email us instead" message. Env changes require a dev-server restart.

## Images pipeline

Raw photos live in `image/` (gitignored). `scripts/optimize-images.mjs` holds an explicit
manifest mapping raw files → `public/showcase/*.webp`. To add showcase content: drop the photo
in `image/`, add a manifest line, run `npm run optimize-images`, reference it in `showcase.ts`.

⚠️ The phone photos carry EXIF orientation (=6). sharp's bare `.rotate()` already corrects
this — never add manual rotation on top, and don't trust how raw files look in preview tools
that ignore EXIF.

## Conventions

- Site copy is English; keep the playful, warm tone. README stays English.
- SETUP.md (Chinese, local-only, gitignored) documents Web3Forms/Cloudinary/Vercel/DNS setup.
- After every major update, and whenever a pitfall/gotcha or new owner requirement surfaces,
  record it in Claude's persistent project memory (changelog-style) so future sessions have it.

## Roadmap context

- Near-term: owner registers Web3Forms + Cloudinary, deploys to Vercel, points pawtrait.ca DNS.
- Later: Shopify checkout integration replaces the request-order form; "Paw Reels" AI pet
  video/meme generator (backend + paid image/video model APIs) replaces the placeholder section.
