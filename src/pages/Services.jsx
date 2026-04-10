import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ========== SEO Dashboard Mockup ========== */
function SEODashboard() {
  const metrics = [
    { label: 'Organic Traffic', value: 0, target: 12400, suffix: '+' },
    { label: 'Keyword Rankings', value: 0, target: 847, suffix: '' },
    { label: 'Domain Authority', value: 0, target: 72, suffix: '' },
  ]
  const [vals, setVals] = useState(metrics.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setVals(metrics.map((m) => {
        return Math.floor(Math.random() * m.target * 0.3 + m.target * 0.7)
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-brand-dark rounded-4xl p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
        <span className="font-mono text-xs text-brand-cream/40">SEO DASHBOARD — LIVE</span>
      </div>
      {metrics.map((m, i) => (
        <div key={i} className="bg-brand-cream/5 rounded-2xl p-4">
          <p className="font-mono text-xs text-brand-cream/40 mb-1">{m.label}</p>
          <p className="font-heading font-bold text-3xl text-brand-gold transition-all duration-700">
            {vals[i].toLocaleString()}{m.suffix}
          </p>
          <div className="mt-2 h-1 rounded-full bg-brand-cream/10 overflow-hidden">
            <div
              className="h-full bg-brand-gold rounded-full transition-all duration-700"
              style={{ width: `${(vals[i] / m.target) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ========== Phone Social Feed Mockup ========== */
function PhoneMockup() {
  const posts = [
    { handle: '@yourband', likes: '2.4K', type: 'Reel', img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&q=60' },
    { handle: '@yourband', likes: '1.8K', type: 'Post', img: 'https://images.unsplash.com/photo-1600096194534-95cf5ece3190?w=300&q=60' },
    { handle: '@yourband', likes: '3.1K', type: 'Story', img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&q=60' },
  ]

  return (
    <div className="relative w-48 mx-auto">
      <div className="bg-brand-dark rounded-[2rem] p-2 border border-brand-cream/10" style={{ boxShadow: '0 30px 60px rgba(2,70,46,0.3)' }}>
        <div className="rounded-[1.5rem] overflow-hidden">
          <div className="bg-[#111] p-3 space-y-2" style={{ animation: 'scrollFeed 8s linear infinite' }}>
            {[...posts, ...posts].map((p, i) => (
              <div key={i} className="rounded-xl overflow-hidden relative">
                <img src={p.img} alt="" className="w-full h-28 object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                  <div>
                    <p className="font-mono text-[9px] text-white/70">{p.handle}</p>
                    <p className="font-mono text-[9px] text-brand-gold">♥ {p.likes} · {p.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes scrollFeed { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }`}</style>
    </div>
  )
}

/* ========== Code Editor Typewriter ========== */
function CodeEditor() {
  const lines = [
    { code: 'const app = createApp()', color: '#79c0ff' },
    { code: '  .withAuth()', color: '#d2a8ff' },
    { code: '  .withDB(postgres)', color: '#d2a8ff' },
    { code: '  .deploy({ env: "prod" })', color: '#FEC700' },
    { code: '', color: '' },
    { code: '// ✓ Build complete. Live in 3..2..1', color: '#22c55e' },
  ]

  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < lines.length) {
      const t = setTimeout(() => setVisibleLines(v => v + 1), 600)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setVisibleLines(0), 3000)
      return () => clearTimeout(t)
    }
  }, [visibleLines])

  return (
    <div className="bg-[#0d1117] rounded-4xl overflow-hidden" style={{ boxShadow: '0 30px 60px rgba(2,70,46,0.2)' }}>
      {/* Editor top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="font-mono text-xs text-white/30 ml-3">app.js</span>
      </div>
      <div className="p-5 min-h-[180px] font-mono text-sm space-y-1">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-white/20 text-xs w-4">{i + 1}</span>
            <span style={{ color: line.color }}>{line.code}</span>
          </div>
        ))}
        {visibleLines < lines.length && (
          <div className="flex items-center gap-3">
            <span className="text-white/20 text-xs w-4">{visibleLines + 1}</span>
            <span className="typewriter-cursor text-brand-gold">|</span>
          </div>
        )}
      </div>
    </div>
  )
}

const services = [
  {
    id: 's1',
    tag: 'Digital Marketing & SEO',
    heading: 'Rank higher. Earn more.',
    desc: 'AI-driven keyword research, technical SEO implementation, and content strategy that compounds over time. Not vanity metrics — revenue-linked performance.',
    deliverables: [
      'Full Technical SEO Audit',
      'Keyword & Content Strategy',
      'On-Page Optimization',
      'Monthly Rank Tracking Reports',
      'Competitor Gap Analysis',
      'Core Web Vitals optimization',
    ],
    cta: 'Start with SEO →',
    widget: <SEODashboard />,
    reverse: false,
  },
  {
    id: 's2',
    tag: 'Social Media Management',
    heading: 'Content that converts.',
    desc: 'From strategy to daily execution — we handle ideation, design, copywriting, scheduling, and engagement. AI-assisted creation, human-quality output.',
    deliverables: [
      'Monthly Content Calendar',
      'Reel & Post Production',
      'Caption & Hashtag Strategy',
      'Community Engagement',
      'Weekly Analytics Report',
      'Influencer Collaboration Strategy',
    ],
    cta: 'Start with Social →',
    widget: <PhoneMockup />,
    reverse: true,
  },
  {
    id: 's3',
    tag: 'Web & App Development',
    heading: 'Built fast. Built right.',
    desc: 'From wireframe to live product in weeks, not months. AI-accelerated development with senior code review every sprint. Performance-first, conversion-optimized.',
    deliverables: [
      'Discovery & Wireframing',
      'UI/UX Design System',
      'Full-Stack Development',
      'Performance & Core Web Vitals',
      'Deployment & DevOps',
      'Post-launch Support (30 days)',
    ],
    cta: 'Start Building →',
    widget: <CodeEditor />,
    reverse: false,
  },
]

export default function Services() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-hero-content > *',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <main>
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[60dvh] flex flex-col justify-end overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80"
            alt="Services background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-green/70 to-transparent" />
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-20 services-hero-content">
          <span className="font-mono text-xs tracking-[0.25em] text-brand-gold uppercase font-bold">What We Build</span>
          <h1 className="font-display italic text-[5rem] md:text-[8rem] leading-none text-brand-cream mt-2 mb-4">
            For You.
          </h1>
          <p className="font-body text-brand-cream/60 text-base md:text-lg max-w-lg">
            Three core practices. AI-enhanced. Senior-led delivery. Priced for ambitious brands, quality that holds up at enterprise scale.
          </p>
        </div>
      </section>

      {/* Service Deep-Dive Sections */}
      {services.map((service, i) => (
        <section
          key={service.id}
          className="section-padding"
          style={{ background: i % 2 === 0 ? '#F5F2EA' : '#F0EDE4' }}
        >
          <div className={`max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center ${service.reverse ? 'md:flex-row-reverse' : ''}`}>
            {/* Widget side */}
            <div className={service.reverse ? 'md:order-2' : ''}>
              {service.widget}
            </div>

            {/* Text side */}
            <div className={service.reverse ? 'md:order-1' : ''}>
              <span className="font-mono text-xs tracking-widest text-brand-sage uppercase">{service.tag}</span>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-brand-text mt-3 mb-5 leading-tight">
                {service.heading}
              </h2>
              <p className="font-body text-brand-sage text-base mb-8 leading-relaxed">
                {service.desc}
              </p>

              {/* Deliverables */}
              <ul className="space-y-3 mb-8">
                {service.deliverables.map((d, di) => (
                  <li key={di} className="flex items-center gap-3">
                    <span className="font-mono text-brand-gold text-sm">✓</span>
                    <span className="font-mono text-sm text-brand-text/80">{d}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="btn-magnetic relative inline-flex items-center gap-2 bg-brand-green text-brand-gold px-7 py-3.5 rounded-full font-heading font-semibold text-sm overflow-hidden"
              >
                <span className="btn-slide" />
                <span className="btn-text">{service.cta}</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      <Pricing />
      <Footer />
    </main>
  )
}
