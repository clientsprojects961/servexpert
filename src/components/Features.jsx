import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ArrowUpRight, Sparkles, Bot } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const seoCards = [
  { label: 'Technical SEO', color: '#02462E' },
  { label: 'Content clusters', color: '#4A6B5A' },
  { label: 'Rank & revenue tracking', color: '#0D1210' },
]

function SEOShuffler() {
  const [activeIdx, setActiveIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActiveIdx((p) => (p + 1) % seoCards.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative flex h-40 items-center justify-center">
      {seoCards.map((card, i) => {
        const offset = (i - activeIdx + seoCards.length) % seoCards.length
        return (
          <div
            key={i}
            className="absolute w-full rounded-2xl px-5 py-3.5"
            style={{
              background: card.color,
              zIndex: seoCards.length - offset,
              transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.06})`,
              opacity: 1 - offset * 0.28,
              transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-gold" />
              <span className="font-mono text-sm text-brand-cream">{card.label}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const perfLines = [
  { label: 'ROAS', value: '4.2×' },
  { label: 'CPA', value: '−38%' },
  { label: 'Conv. rate', value: '+62%' },
]

function PerformancePulse() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % perfLines.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-40 overflow-hidden rounded-2xl border border-brand-gold/15 bg-brand-dark/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-brand-cream/10 pb-3">
        <span className="font-mono text-[10px] tracking-widest text-brand-gold">LIVE PERFORMANCE</span>
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-1">
        <span className="font-mono text-xs text-brand-cream/50">{perfLines[i].label}</span>
        <span
          key={i}
          className="font-heading text-4xl font-bold tracking-tight text-brand-gold"
          style={{ animation: 'featFade 0.45s ease' }}
        >
          {perfLines[i].value}
        </span>
        <div className="mt-4 h-1 w-full max-w-[180px] overflow-hidden rounded-full bg-brand-cream/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-gold transition-all duration-700"
            style={{ width: `${((i + 1) / perfLines.length) * 100}%` }}
          />
        </div>
      </div>
      <style>{`@keyframes featFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const phases = ['UX', 'Build', 'Ship', 'Scale']

function BuildOrbit() {
  const [activeDay, setActiveDay] = useState(2)
  useEffect(() => {
    let idx = 0
    const seq = [2, 3, 4, 5, 3]
    const id = setInterval(() => {
      setActiveDay(seq[idx % seq.length])
      idx++
    }, 850)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] text-brand-cream/40">{d}</span>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-500"
              style={{
                background: activeDay === i ? '#FEC700' : 'rgba(245,242,234,0.06)',
                transform: activeDay === i ? 'scale(1.12)' : 'scale(1)',
              }}
            >
              {activeDay === i && <span className="h-2 w-2 rounded-full bg-brand-dark" />}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {phases.map((p) => (
          <span
            key={p}
            className="rounded-full border border-brand-gold/20 px-3 py-1 font-mono text-[10px] text-brand-cream/70"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  )
}

const chatSteps = ['Qualify', 'Book', 'Handoff', 'CRM sync']

function ChatAutomationFlow() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % chatSteps.length), 1600)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative flex h-40 flex-col justify-between rounded-2xl border border-brand-green/20 bg-gradient-to-br from-brand-green/20 to-brand-dark/80 p-4">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-brand-gold" />
        <span className="font-mono text-[10px] tracking-widest text-brand-cream/60">CHATBOT AUTOMATION</span>
      </div>
      <div className="space-y-2">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-cream/10 px-3 py-2 font-body text-xs text-brand-cream/90">
          Hi — want a growth audit for your brand?
        </div>
        <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-brand-gold/20 px-3 py-2 font-body text-xs text-brand-cream">
          Yes, book me in this week.
        </div>
      </div>
      <div className="flex gap-1.5">
        {chatSteps.map((label, i) => (
          <span
            key={label}
            className={`flex-1 rounded-lg py-1.5 text-center font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
              i === step ? 'bg-brand-gold text-brand-dark' : 'bg-brand-cream/5 text-brand-cream/40'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

const pillars = [
  {
    tag: 'SEO & organic',
    title: 'Search that compounds',
    desc: 'Enterprise-grade SEO: architecture, topical authority, and reporting tied to pipeline — not vanity metrics.',
    widget: <SEOShuffler />,
  },
  {
    tag: 'Performance marketing',
    title: 'Paid media & CRO',
    desc: 'Performance creative, structured experiments, and conversion design — budgets that learn, scale, and stay accountable.',
    widget: <PerformancePulse />,
  },
  {
    tag: 'Websites, apps & software',
    title: 'Product-grade delivery',
    desc: 'Marketing sites, web apps, and internal tools — fast releases, QA you can trust, built to convert and scale.',
    widget: <BuildOrbit />,
  },
  {
    tag: 'Chatbots & automation',
    title: 'Always-on systems',
    desc: 'AI assistants, chatbot flows, and workflow automation — qualify leads, book calls, and sync data without friction.',
    widget: <ChatAutomationFlow />,
  },
]

export default function Features() {
  const sectionRef = useRef(null)
  const introRef = useRef(null)
  const cardsRef = useRef([])
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (introRef.current?.children?.length) {
        gsap.fromTo(
          introRef.current.children,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: introRef.current, start: 'top 82%' },
          }
        )
      }
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          rotate: 360,
          duration: 56,
          repeat: -1,
          ease: 'none',
        })
      }
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { y: 72, opacity: 0, rotateX: 10 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.95,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-cream py-20 md:py-28"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-brand-gold/10 blur-[120px]"
      />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 h-[480px] w-[480px] rounded-full bg-brand-green/15 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <div ref={introRef} className="mx-auto mb-14 max-w-3xl text-center md:mb-20">
          
          <h2 className="font-heading text-4xl font-bold leading-[1.08] text-brand-text md:text-5xl lg:text-6xl">
            Performance marketing, product, and
            <span className="block bg-gradient-to-r from-brand-green via-brand-sage to-brand-green bg-clip-text text-transparent">
              automation — one integrated system
            </span>
          </h2>
          <p className="mt-6 font-body text-base leading-relaxed text-brand-sage md:text-lg">
            We’re a senior digital agency team: SEO, paid performance, websites & apps, plus chatbots and workflow
            automations — orchestrated so acquisition, conversion, and retention reinforce each other.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {pillars.map((p, i) => (
            <div
              key={p.tag}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group relative flex flex-col overflow-hidden rounded-4xl border border-brand-green/10 bg-gradient-to-b from-brand-dark to-[#0a1612] p-7 text-brand-cream shadow-brand-xl ring-1 ring-brand-gold/10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-brand-lg"
              style={{ perspective: '1200px' }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gold/10 blur-3xl" />
              </div>
              <div className="relative mb-6 min-h-[10rem]">{p.widget}</div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold/80">{p.tag}</span>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
              <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-brand-cream/65 md:text-[15px]">
                {p.desc}
              </p>
              <Link
                to="/services"
                className="mt-8 inline-flex items-center gap-2 font-heading text-sm font-semibold text-brand-gold transition-colors hover:text-brand-cream"
              >
                View capabilities
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
