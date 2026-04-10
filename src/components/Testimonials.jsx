import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    initial: 'R',
    name: 'Rahul Mehta',
    company: 'CMO, Drip Organic',
    quote: 'ServeXpert completely transformed our online presence. Organic traffic tripled in 90 days. Editorial and SEO were run like an in-house team — tight feedback loops and zero fluff.',
    stars: 5,
  },
  {
    initial: 'S',
    name: 'Sophia Chen',
    company: 'Marketing Director, Luminary Labs',
    quote: 'We\'ve worked with three agencies before. None matched the accountability ServeXpert brings. Senior people on the calls, senior people on the deliverables — it feels like an embedded team.',
    stars: 5,
  },
  {
    initial: 'A',
    name: 'Arjun Sinha',
    company: 'CEO, BuildFast',
    quote: 'Shipped our MVP in 6 weeks at a fraction of what an agency quoted us. The AI-powered workflow means nothing gets missed and everything gets built right the first time.',
    stars: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.8,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding" style={{ background: '#F0EDE4' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs tracking-[0.2em] text-brand-sage uppercase">Client Stories</span>
          <h2 className="font-display italic text-5xl md:text-7xl text-brand-text mt-3">
            Trusted by builders.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="card-hover bg-brand-cream border border-brand-green/10 rounded-4xl p-8 flex flex-col gap-6 shadow-brand"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} size={14} fill="#FEC700" className="text-brand-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-body text-brand-text/80 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-brand-green/10">
                <div className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0">
                  <span className="font-heading font-bold text-brand-dark text-sm">{t.initial}</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-brand-text">{t.name}</p>
                  <p className="font-mono text-xs text-brand-sage">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
