import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])

  const words1 = 'Most agencies focus on: retainers, overhead, and generic playbooks.'.split(' ')
  const words2 = 'Senior squads across growth, engineering, and automation ship as one team. Clear ownership, enterprise-grade QA, and AI where it accelerates delivery — without cutting corners on strategy or craft.'.split(' ')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal words on scroll
      gsap.fromTo(wordsRef.current,
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 70%',
            scrub: true,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden" style={{ background: '#0D1210' }}>
      {/* Texture bg */}
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <img
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16">
        {/* Top copy */}
        <div className="mb-12 flex flex-wrap gap-1.5">
          {words1.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className="font-body text-base md:text-lg text-brand-cream/50 opacity-20"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Focus line */}
        <p className="font-heading font-bold text-xl md:text-2xl text-brand-cream mb-6">
          We focus on:
        </p>

        {/* The Word */}
        <div className="mb-10">
          <span className="font-display italic text-[6rem] md:text-[9rem] lg:text-[11rem] leading-none text-brand-gold block">
            Results.
          </span>
        </div>

        {/* Bottom copy */}
        <div className="flex flex-wrap gap-1.5 max-w-2xl">
          {words2.map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[words1.length + i] = el)}
              className="font-body text-sm md:text-base text-brand-cream/60 opacity-20"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
