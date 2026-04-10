import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import CTABanner from '../components/CTABanner'

gsap.registerPlugin(ScrollTrigger)

const practices = [
  {
    label: 'GX',
    title: 'Growth & performance',
    subtitle: 'Media, SEO, and lifecycle',
    body: 'Full-funnel acquisition, always-on optimization, and reporting your board can trust. We run campaigns and organic programs the way tier-one shops do — with clearer ownership and faster iteration.',
    color: '#02462E',
  },
  {
    label: 'EX',
    title: 'Product & engineering',
    subtitle: 'Websites, apps, platforms',
    body: 'Design systems, robust front ends, and integrations that survive traffic spikes. Performance, accessibility, and maintainability are non-negotiable on every build.',
    color: '#0D1210',
  },
  {
    label: 'AX',
    title: 'Automation & intelligence',
    subtitle: 'Chatbots, workflows, AI ops',
    body: 'Customer-facing bots, internal copilots, and reliable automations across your stack. We ship production-grade flows, not demos — with monitoring, guardrails, and handover docs.',
    color: '#1a3d2e',
  },
]

const milestones = [
  { year: '2020', event: 'ServeXpert’s core team forms around performance marketing and product delivery for scaling brands.' },
  { year: '2022', event: 'Engineering practice expands: web, mobile, and internal tools with enterprise SLAs and security reviews.' },
  { year: '2024', event: 'Automation & AI practice launches — chatbots, workflow orchestration, and model-assisted content at scale.' },
  { year: '2026', event: 'Global roster across multiple time zones; retained engagements with marketing, product, and ops leaders.' },
]

const founders = [
  {
    name: 'Adarsh',
    focus: 'Websites & software development',
    body: 'Owns product and engineering: web, apps, and integrations — from discovery through launch, with the quality bar you expect from a senior build team.',
    initial: 'Ad',
    accent: '#02462E',
  },
  {
    name: 'Arunabh',
    focus: 'Performance marketing & ads',
    body: 'Leads growth and paid media: campaign architecture, creative testing, and measurement — so spend ties back to pipeline and revenue, not vanity metrics.',
    initial: 'Ar',
    accent: '#0D1210',
  },
]

const values = [
  {
    icon: '◎',
    name: 'Accountability',
    desc: 'Named owners, written scopes, and weekly visibility. No black boxes — you always know who is driving what.',
  },
  {
    icon: '⊞',
    name: 'Precision',
    desc: 'We instrument before we scale. Every recommendation ties to a metric, a timeline, and a clear definition of done.',
  },
  {
    icon: '→',
    name: 'Velocity',
    desc: 'Lean squads, modern tooling, and AI where it actually saves time — so we ship in cycles, not quarters lost to process.',
  },
]

export default function About() {
  const timelineRef = useRef(null)
  const milestonesRef = useRef([])
  const valuesRef = useRef([])
  const foundersRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      milestonesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%' },
          }
        )
      })
      valuesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          }
        )
      })
      foundersRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <main>
      <section className="relative flex min-h-[60dvh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-green/70 to-transparent" />
        </div>
        <div className="relative z-10 px-8 pb-20 md:px-16 lg:px-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-gold">About ServeXpert</span>
          <h1 className="font-display mt-2 mb-4 text-[5rem] leading-none text-brand-cream italic md:text-[8rem]">
            Built to scale with you.
          </h1>
          <p className="max-w-xl font-body text-base text-brand-cream/60">
            We are a full-service digital partner: performance marketing, product engineering, and intelligent automation —
            structured like the teams enterprises trust, with the pace modern brands need.
          </p>
        </div>
      </section>

      <section className="section-padding bg-brand-cream border-t border-brand-green/10">
        <div className="mx-auto max-w-5xl px-2">
          <div className="mb-12 text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-sage">Our founders</span>
            <h2 className="font-heading mt-3 text-3xl font-bold text-brand-text md:text-4xl">
              The people behind ServeXpert
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-body text-sm text-brand-sage md:text-base">
              Two practice leads — one for build, one for growth — so clients always know who owns delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {founders.map((f, i) => (
              <div
                key={f.name}
                ref={(el) => (foundersRef.current[i] = el)}
                className="card-hover flex flex-col gap-5 rounded-4xl p-8 md:flex-row md:items-start md:gap-6"
                style={{ background: f.accent, boxShadow: '0 24px 60px rgba(2,70,46,0.2)' }}
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-gold px-1">
                  <span className="font-heading text-lg font-bold leading-none text-brand-dark">{f.initial}</span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-brand-gold">{f.name}</h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-brand-cream/60">{f.focus}</p>
                  <p className="mt-4 font-body text-sm leading-relaxed text-brand-cream/75">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-sage">Practice areas</span>
            <h2 className="font-heading mt-3 text-4xl font-bold text-brand-text">How the work gets done.</h2>
            <p className="mt-3 max-w-2xl font-body text-sm text-brand-sage md:text-base">
              Senior specialists across growth, engineering, and automation — coordinated under one roof so your roadmap
              stays coherent.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {practices.map((p, i) => (
              <div
                key={i}
                className="card-hover flex flex-col gap-5 rounded-4xl p-8"
                style={{ background: p.color, boxShadow: '0 30px 80px rgba(2,70,46,0.25)' }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold">
                  <span className="font-heading text-xl font-bold text-brand-dark">{p.label}</span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-brand-gold">{p.title}</h3>
                  <p className="font-mono text-xs tracking-wider text-brand-cream/50">{p.subtitle}</p>
                </div>
                <p className="flex-1 font-body text-sm leading-relaxed text-brand-cream/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={timelineRef} className="section-padding" style={{ background: '#0D1210' }}>
        <div className="mx-auto max-w-3xl">
          <div className="mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-sage">Trajectory</span>
            <h2 className="font-display mt-3 text-5xl italic text-brand-cream">How we’ve grown.</h2>
          </div>
          <div className="relative space-y-12">
            <div className="absolute bottom-0 left-[38px] top-0 w-px bg-brand-green/30" />

            {milestones.map((m, i) => (
              <div
                key={i}
                ref={(el) => (milestonesRef.current[i] = el)}
                className="flex items-start gap-8"
              >
                <div className="z-10 flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full border border-brand-gold/30 bg-brand-dark">
                  <span className="font-mono text-sm font-bold text-brand-gold">{m.year}</span>
                </div>
                <div className="pt-6">
                  <p className="font-body text-base leading-relaxed text-brand-cream/70">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-cream">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-brand-sage">What we stand for</span>
            <h2 className="font-display mt-3 text-5xl italic text-brand-text md:text-6xl">Our values.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <div
                key={i}
                ref={(el) => (valuesRef.current[i] = el)}
                className="card-hover rounded-4xl border border-brand-green/10 bg-brand-cream p-8 text-center shadow-brand"
              >
                <div className="mb-5 font-mono text-4xl text-brand-gold">{v.icon}</div>
                <h3 className="font-heading mb-3 text-2xl font-bold text-brand-text">{v.name}</h3>
                <p className="font-body text-sm leading-relaxed text-brand-sage">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
      <Footer />
    </main>
  )
}
