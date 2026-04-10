const clients = [
  'Drip Organic',
  'Luminary Labs',
  'BuildFast',
  'Bloom Studio',
  'NestLocal',
  'Volta Commerce',
  'Northwind D2C',
  'Atlas SaaS',
  'Meridian Health',
  'Pulse Media',
]

function Track({ reverse = false }) {
  const doubled = [...clients, ...clients, ...clients]
  return (
    <div className="overflow-hidden py-3">
      <div
        className={`flex w-max gap-12 md:gap-20 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="shrink-0 font-heading text-sm font-semibold tracking-tight text-brand-text/80 md:text-base"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ClientsMarquee() {
  return (
    <section className="relative border-y border-brand-green/10 bg-brand-cream/80 py-1 backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(2,70,46,0.04),transparent)]" />
      <div className="relative">
        <Track />
        <div className="h-px bg-gradient-to-r from-transparent via-brand-green/15 to-transparent" />
        <Track reverse />
      </div>
    </section>
  )
}
