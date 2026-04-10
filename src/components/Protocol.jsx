import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    step: '01',
    phase: 'Discover',
    title: 'We audit your current digital presence in 48 hours.',
    copy: 'Deep research. Competitor mapping. Gap analysis. No guesswork.',
    svg: (
      <svg viewBox="0 0 120 120" className="w-28 h-28 opacity-60">
        {[40, 30, 20, 10].map((r, i) => (
          <circle
            key={i}
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="#FEC700"
            strokeWidth="1"
            strokeDasharray={i % 2 === 0 ? '4 6' : '2 4'}
            style={{
              transformOrigin: '60px 60px',
              animation: `spin ${3 + i}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            }}
          />
        ))}
        <circle cx="60" cy="60" r="3" fill="#FEC700" />
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </svg>
    ),
    bg: '#F5F2EA',
    textColor: '#111814',
  },
  {
    step: '02',
    phase: 'Build',
    title: 'AI-powered execution. Lead-reviewed output.',
    copy: 'Speed of AI. Quality of experts. Every deliverable passes practice-lead review and QA before it reaches you.',
    svg: (
      <svg viewBox="0 0 200 80" className="w-48 h-20 opacity-70">
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 16 + 8} r="2" fill="#FEC700" opacity="0.4" />
          ))
        )}
        <line
          x1="0" y1="40" x2="200" y2="40"
          stroke="#FEC700"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            animation: 'laser 2.5s ease-in-out infinite',
          }}
        />
        <style>{`@keyframes laser { 0%,100% { transform: translateX(-200px); opacity: 0; } 20%,80% { opacity: 1; } 50% { transform: translateX(200px); } }`}</style>
      </svg>
    ),
    bg: '#02462E',
    textColor: '#F5F2EA',
  },
  {
    step: '03',
    phase: 'Grow',
    title: 'Results compound. Pricing stays transparent.',
    copy: 'Monthly retainers below agency rates. As you grow, we scale. Early clients keep their rate.',
    svg: (
      <svg viewBox="0 0 200 60" className="w-48 h-16 opacity-70">
        <polyline
          points="0,40 20,38 40,32 60,35 80,20 100,28 120,10 140,22 160,8 180,18 200,5"
          fill="none"
          stroke="#FEC700"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: '500',
            strokeDashoffset: '500',
            animation: 'draw 2s ease-out forwards, pulse-line 2s 2s ease-in-out infinite',
          }}
        />
        <style>{`
          @keyframes draw { to { stroke-dashoffset: 0; } }
          @keyframes pulse-line { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
        `}</style>
      </svg>
    ),
    bg: '#0D1210',
    textColor: '#F5F2EA',
  },
]

export default function Protocol() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return

        if (i < cardRefs.current.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: () => `+=${window.innerHeight}`,
            pin: true,
            pinSpacing: false,
          })
        }

        // Fade out underlying cards
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.5,
          filter: 'blur(4px)',
          scrollTrigger: {
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative" style={{ paddingBottom: `${steps.length * 0}px` }}>
      {steps.map((step, i) => (
        <div
          key={i}
          ref={(el) => (cardRefs.current[i] = el)}
          className="relative w-full min-h-screen flex items-center justify-center px-8 md:px-20"
          style={{ background: step.bg }}
        >
          <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: Text */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="font-mono text-xs tracking-[0.3em] uppercase"
                  style={{ color: '#FEC700' }}
                >
                  Step {step.step}
                </span>
                <span
                  className="w-8 h-px"
                  style={{ background: '#FEC700', opacity: 0.4 }}
                />
                <span
                  className="font-mono text-xs tracking-widest uppercase"
                  style={{ color: step.textColor, opacity: 0.5 }}
                >
                  {step.phase}
                </span>
              </div>

              <h2
                className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-6"
                style={{ color: step.textColor }}
              >
                {step.title}
              </h2>

              <p
                className="font-body text-base leading-relaxed"
                style={{ color: step.textColor, opacity: 0.65 }}
              >
                {step.copy}
              </p>
            </div>

            {/* Right: SVG Animation */}
            <div className="flex items-center justify-center">
              <div
                className="p-10 rounded-4xl flex items-center justify-center"
                style={{
                  background: i === 0 ? 'rgba(2,70,46,0.06)' : 'rgba(245,242,234,0.06)',
                }}
              >
                {step.svg}
              </div>
            </div>
          </div>

          {/* Step number large bg */}
          <span
            className="absolute bottom-8 right-12 font-heading font-bold text-[8rem] leading-none select-none pointer-events-none"
            style={{ color: step.textColor, opacity: 0.04 }}
          >
            {step.step}
          </span>
        </div>
      ))}
    </section>
  )
}
