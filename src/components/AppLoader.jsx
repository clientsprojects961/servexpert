import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const BRAND = 'ServeXpert'

function waitWindowLoad() {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') resolve()
    else window.addEventListener('load', () => resolve(), { once: true })
  })
}

export default function AppLoader({ onDone }) {
  const rootRef = useRef(null)
  const lettersRef = useRef([])
  const dotRef = useRef(null)
  const exitedRef = useRef(false)

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean)
    const dot = dotRef.current
    const root = rootRef.current
    if (!letters.length || !dot || !root) return

    const ctx = gsap.context(() => {
      gsap.set(letters, {
        opacity: 0,
        y: 88,
        rotateX: 48,
        transformOrigin: '50% 50%',
      })
      gsap.set(dot, { scale: 0, opacity: 0 })

      const intro = gsap.timeline()
      intro
        .to(letters, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: { each: 0.055, from: 'random' },
        })
        .to(
          dot,
          { scale: 1, opacity: 1, duration: 0.38, ease: 'back.out(2.2)' },
          '-=0.55'
        )
        .to(
          letters,
          {
            y: '+=5',
            duration: 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
            stagger: { each: 0.025, from: 'center' },
          },
          '-=0.15'
        )

      const playExit = () => {
        if (exitedRef.current) return
        exitedRef.current = true
        const out = gsap.timeline({
          onComplete: () => onDone?.(),
        })
        out
          .to(letters, {
            y: -40,
            opacity: 0,
            rotateX: -42,
            duration: 0.52,
            ease: 'power3.in',
            stagger: 0.035,
          })
          .to(dot, { scale: 0, opacity: 0, duration: 0.22, ease: 'power2.in' }, '-=0.38')
          .to(root, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.28')
      }

      const t0 = Date.now()
      const minTotalMs = 2000
      const maxTotalMs = 5500

      waitWindowLoad().then(() => {
        const elapsed = Date.now() - t0
        const wait = Math.max(0, minTotalMs - elapsed)
        setTimeout(playExit, wait)
      })

      setTimeout(playExit, maxTotalMs)
    }, rootRef)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200000] flex flex-col items-center justify-center bg-brand-dark"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_38%,rgba(2,70,46,0.5)_0%,transparent_58%)]" />

      <div
        className="relative flex items-baseline justify-center px-6"
        style={{ perspective: '900px' }}
      >
        {BRAND.split('').map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            ref={(el) => (lettersRef.current[i] = el)}
            className="inline-block font-heading text-4xl font-extrabold tracking-tight text-brand-cream sm:text-5xl md:text-6xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {ch}
          </span>
        ))}
        <span
          ref={dotRef}
          className="mb-2 ml-0.5 inline-block h-2.5 w-2.5 rounded-full bg-brand-gold sm:h-3 sm:w-3"
        />
      </div>
      <p className="relative mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-brand-gold/70">
        Loading experience
      </p>
    </div>
  )
}
