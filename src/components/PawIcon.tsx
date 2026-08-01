export default function PawIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="22" cy="22" rx="6" ry="7.5" transform="rotate(-18 22 22)" />
      <ellipse cx="42" cy="22" rx="6" ry="7.5" transform="rotate(18 42 22)" />
      <ellipse cx="12.5" cy="33" rx="5" ry="6.5" transform="rotate(-38 12.5 33)" />
      <ellipse cx="51.5" cy="33" rx="5" ry="6.5" transform="rotate(38 51.5 33)" />
      <path d="M32 30c7.5 0 13.5 5.6 13.5 12.1 0 4.4-3.2 7.4-7.2 7.4-2.4 0-4.4-1-6.3-1s-3.9 1-6.3 1c-4 0-7.2-3-7.2-7.4C18.5 35.6 24.5 30 32 30z" />
    </svg>
  )
}
