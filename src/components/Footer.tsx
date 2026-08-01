import { CONTACT_EMAIL } from '../data/showcase'
import PawIcon from './PawIcon'

export default function Footer() {
  return (
    <footer className="border-t border-coffee/10 bg-cream-dark/60">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div>
          <p className="flex items-center justify-center gap-2 font-display text-xl font-semibold md:justify-start">
            <PawIcon className="h-5 w-5 text-terracotta" />
            Pawtrait
          </p>
          <p className="mt-1 text-sm font-semibold text-coffee-light">
            Custom pet fridge magnets · Made with ❤️ in Calgary, AB
          </p>
        </div>
        <div className="text-sm font-semibold text-coffee-light">
          <p>
            Questions or custom requests?{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-bold text-terracotta hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-1">© {new Date().getFullYear()} Pawtrait · pawtrait.ca</p>
        </div>
      </div>
    </footer>
  )
}
