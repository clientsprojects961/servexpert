import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    tier: 'Essential',
    name: 'Starter',
    price: 'Starting at $X',
    period: '/mo',
    desc: 'Perfect for startups establishing a digital presence.',
    features: [
      '1 Core Service',
      'Monthly Performance Report',
      'Email Support',
      'AI-assisted execution',
      'Strategy kickoff call',
    ],
    cta: 'Start with this',
    highlighted: false,
  },
  {
    tier: 'Performance',
    name: 'Growth',
    price: 'Starting at $X',
    period: '/mo',
    desc: 'For brands ready to scale across multiple channels.',
    features: [
      '2–3 Core Services',
      'Bi-weekly Strategy Calls',
      'AI Performance Dashboards',
      'Priority Response (24h)',
      'Competitor monitoring',
      'Quarterly executive review',
    ],
    cta: 'Start with this',
    highlighted: true,
  },
  {
    tier: 'Enterprise',
    name: 'Scale',
    price: 'Custom',
    period: '',
    desc: 'Full-service, dedicated attention for serious scale.',
    features: [
      'Full Service Suite',
      'Dedicated account director',
      'Weekly strategy sessions',
      'Priority SLA (4h response)',
      'Custom AI integrations',
      'Early-client rate locked in',
    ],
    cta: 'Start with this',
    highlighted: false,
  },
]

export default function Pricing() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
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
    <section ref={sectionRef} className="section-padding bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-brand-sage uppercase">Investment</span>
          <h2 className="font-display italic text-5xl md:text-7xl text-brand-text mt-3">
            Pricing that makes sense.
          </h2>
          <p className="font-body text-brand-sage mt-4 max-w-md mx-auto">
            Transparent pricing. No retainer traps. No hidden fees. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`card-hover rounded-4xl p-8 flex flex-col gap-6 ${
                plan.highlighted
                  ? 'bg-brand-green ring-2 ring-brand-gold scale-[1.02]'
                  : 'bg-brand-cream border border-brand-green/15'
              }`}
              style={{ boxShadow: plan.highlighted ? '0 30px 80px rgba(2,70,46,0.25)' : '0 20px 60px rgba(2,70,46,0.08)' }}
            >
              {plan.highlighted && (
                <div className="flex items-center gap-2">
                  <span className="bg-brand-gold text-brand-dark text-[10px] font-mono font-medium tracking-widest px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div>
                <span className={`font-mono text-xs tracking-widest uppercase ${plan.highlighted ? 'text-brand-gold/60' : 'text-brand-sage'}`}>
                  {plan.tier}
                </span>
                <h3 className={`font-heading font-bold text-3xl mt-1 ${plan.highlighted ? 'text-brand-cream' : 'text-brand-text'}`}>
                  {plan.name}
                </h3>
              </div>

              <div className="flex items-baseline gap-1">
                <span className={`font-heading font-bold text-5xl md:text-6xl ${plan.highlighted ? 'text-brand-cream' : 'text-brand-text'}`}>
                  {plan.price}
                </span>
                <span className={`font-body text-sm ${plan.highlighted ? 'text-brand-cream/50' : 'text-brand-sage'}`}>
                  {plan.period}
                </span>
              </div>

              <p className={`font-body text-sm ${plan.highlighted ? 'text-brand-cream/60' : 'text-brand-sage'}`}>
                {plan.desc}
              </p>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    <Check size={14} className={plan.highlighted ? 'text-brand-gold' : 'text-brand-green'} />
                    <span className={`font-body text-sm ${plan.highlighted ? 'text-brand-cream/80' : 'text-brand-text'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`btn-magnetic relative mt-2 text-center py-3.5 px-6 rounded-full font-heading font-semibold text-sm overflow-hidden ${
                  plan.highlighted
                    ? 'bg-brand-gold text-brand-dark'
                    : 'bg-brand-green text-brand-gold'
                }`}
              >
                {!plan.highlighted && <span className="btn-slide" />}
                <span className={plan.highlighted ? '' : 'btn-text'}>
                  {plan.cta} →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
