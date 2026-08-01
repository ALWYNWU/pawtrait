import { useState } from 'react'
import PawIcon from './PawIcon'

const LINKS = [
  { href: '#gallery', label: 'Gallery' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#paw-reels', label: 'Paw Reels' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-coffee/5 bg-cream/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2" aria-label="Pawtrait home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-terracotta text-cream">
            <PawIcon className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-wide">Pawtrait</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-coffee-light transition-colors hover:text-terracotta"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            className="rounded-full bg-terracotta px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-all hover:bg-terracotta-dark hover:shadow-lift"
          >
            Order Now
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-xl text-coffee md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-coffee/5 bg-cream px-4 pb-4 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-coffee/5 py-3 font-bold text-coffee-light"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-terracotta px-5 py-3 text-center font-bold text-white"
          >
            Order Now
          </a>
        </div>
      )}
    </header>
  )
}
