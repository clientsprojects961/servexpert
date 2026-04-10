import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner() {
  const sectionRef = useRef(null)
  const headRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-28 md:py-36 px-8 text-center"
      style={{ background: '#FEC700' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headRef}
          className="font-display italic text-[5rem] md:text-[8rem] leading-none mb-6"
          style={{ color: '#02462E' }}
        >
          Ready to grow?
        </h2>
        <p className="font-body text-brand-dark/70 text-base md:text-lg mb-10 max-w-lg mx-auto">
          Book a free 30-minute strategy call with our growth team — we’ll map priorities and next steps on the spot.
        </p>
        <Link
          to="/contact"
          className="btn-magnetic relative inline-flex items-center gap-2 bg-brand-green text-brand-cream px-8 py-4 rounded-full font-heading font-bold text-base overflow-hidden"
        >
          <span className="btn-slide !bg-brand-dark" />
          <span className="btn-text">Book Now →</span>
        </Link>
      </div>
    </section>
  )
}
