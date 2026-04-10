const items = [
  '→ Digital Marketing',
  '· SEO Strategy',
  '· Social Media',
  '· Web Development',
  '· App Development',
  '· AI-Powered',
  '· Senior-Led',
  '· Real Results',
  '→',
]

export default function TrustStrip() {
  const doubledItems = [...items, ...items]

  return (
    <div className="bg-brand-green py-5 overflow-hidden border-y border-brand-green/20">
      <div className="marquee-track">
        {doubledItems.map((item, i) => (
          <span
            key={i}
            className="font-mono text-xs md:text-sm text-brand-gold tracking-widest whitespace-nowrap px-6"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
