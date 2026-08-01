const STEPS = [
  {
    emoji: '📸',
    title: 'Send us a photo',
    text: 'Pick your favourite photo of your pet — the clearer the photo, the cuter the result.',
  },
  {
    emoji: '🎨',
    title: 'We craft the artwork',
    text: 'Choose cartoon, watercolor, 3D animated or line art style. We turn the photo into custom art and print it as a magnet.',
  },
  {
    emoji: '🧲',
    title: 'Pickup or delivery',
    text: 'Free pickup in Calgary, or get it delivered to your door on orders of $30 or more.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-cream-dark/60 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display font-semibold tracking-wide text-terracotta uppercase">How it works</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Three easy steps</h2>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-3 lg:gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative rounded-3xl bg-white p-7 shadow-soft">
              <span className="absolute -top-4 left-7 grid h-9 w-9 place-items-center rounded-full bg-terracotta font-display text-lg font-semibold text-white shadow-soft">
                {i + 1}
              </span>
              <div className="text-4xl">{step.emoji}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 font-semibold text-coffee-light">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
