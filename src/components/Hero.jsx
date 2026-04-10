import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import HeroSpline from './HeroSpline'

const igHandle = import.meta.env.VITE_SOCIAL_INSTAGRAM_HANDLE || 'adarshsinha03'
const xHandle = import.meta.env.VITE_SOCIAL_X_HANDLE || 'servexpert'
const linkedinUrl =
  import.meta.env.VITE_SOCIAL_LINKEDIN_URL || 'https://www.linkedin.com/company/servexpert'
const linkedinLabel = import.meta.env.VITE_SOCIAL_LINKEDIN_LABEL || 'ServeXpert'

const heroSocial = [
  {
    id: 'instagram',
    href: `https://www.instagram.com/${igHandle.replace(/^@/, '')}/`,
    label: igHandle.replace(/^@/, ''),
    ariaLabel: `Instagram ${igHandle}`,
  },
  {
    id: 'x',
    href: `https://x.com/${xHandle.replace(/^@/, '')}`,
    label: `@${xHandle.replace(/^@/, '')}`,
    ariaLabel: `X ${xHandle}`,
  },
  {
    id: 'linkedin',
    href: linkedinUrl,
    label: linkedinLabel,
    ariaLabel: `LinkedIn ${linkedinLabel}`,
  },
]

function SocialIcon({ id, className }) {
  const cn = className || 'h-5 w-5 shrink-0'
  if (id === 'instagram') {
    return (
      <svg className={cn} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  }
  if (id === 'x') {
    return (
      <svg className={cn} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }
  return (
    <svg className={cn} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const ctasRef = useRef(null)
  const primaryBtnRef = useRef(null)
  const secondaryBtnRef = useRef(null)
  const headlineRef = useRef(null)
  const heroCopyRef = useRef(null)
  const [mountSpline, setMountSpline] = useState(false)
  const [splineReady, setSplineReady] = useState(false)

  useEffect(() => {
    const run = () => setMountSpline(true)
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(run, { timeout: 1800 })
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(run, 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const primary = primaryBtnRef.current
      const secondary = secondaryBtnRef.current
      const headline = headlineRef.current
      const copyBlock = heroCopyRef.current
      if (!primary || !secondary) return

      gsap.set([primary, secondary], { opacity: 0, y: 32, scale: 0.94 })
      if (headline) gsap.set(headline, { opacity: 0, y: 14 })
      if (copyBlock) {
        gsap.set(copyBlock.querySelectorAll('[data-hero-reveal]'), { opacity: 0, y: 12 })
      }
      const glassEls = heroRef.current?.querySelectorAll('[data-hero-glass]')
      if (glassEls?.length) {
        gsap.set(glassEls, { opacity: 0, y: 18 })
      }
      const tl = gsap.timeline({ delay: 0.45 })
      if (headline) {
        tl.to(headline, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
        })
      }
      if (copyBlock) {
        tl.to(
          copyBlock.querySelectorAll('[data-hero-reveal]'),
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
          },
          headline ? '-=0.35' : undefined
        )
      }
      if (glassEls?.length) {
        tl.to(
          glassEls,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.14,
            ease: 'power3.out',
          },
          '-=0.4'
        )
      }
      tl.to(
        primary,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        '-=0.25'
      ).to(
        secondary,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
        },
        '-=0.55'
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (splineReady || !mountSpline) return
    const t = setTimeout(() => setSplineReady(true), 14000)
    return () => clearTimeout(t)
  }, [mountSpline, splineReady])

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-brand-dark"
    >
      <div className="absolute inset-0 z-0">
        {mountSpline && (
          <HeroSpline onLoaded={() => setSplineReady(true)} />
        )}
        {!mountSpline && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-green/25 to-brand-dark" />
        )}
        <div
          className={`absolute inset-0 z-[2] bg-brand-dark transition-opacity duration-700 ease-out ${
            splineReady ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
          }`}
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-t from-brand-dark/85 via-transparent to-brand-dark/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_85%_65%_at_50%_100%,rgba(2,70,46,0.38)_0%,transparent_58%)]"
          aria-hidden
        />
        {/* Soft vignette so headline reads over Spline */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_120%_70%_at_50%_25%,rgba(13,18,16,0.35)_0%,transparent_55%)]"
          aria-hidden
        />
      </div>

      {/* Headline + tagline + mobile stats */}
      <div
        ref={heroCopyRef}
        className="pointer-events-none absolute left-0 right-0 top-20 z-10 flex justify-center px-4 pt-[5.5rem] text-center sm:px-5 sm:pt-[6.75rem] md:px-6 md:pt-[7.25rem] lg:pt-[7.5rem] xl:pt-[8rem]"
      >
        <div className="max-w-3xl lg:max-w-4xl">
          <p
            data-hero-reveal
            className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-brand-gold/90 sm:mb-2 sm:text-[10px] sm:tracking-[0.35em] md:text-xs"
          >
            Performance marketing
          </p>
          <h2
            ref={headlineRef}
            className="font-heading text-[1.25rem] font-semibold leading-tight tracking-tight text-brand-cream drop-shadow-[0_6px_32px_rgba(13,18,16,0.85)] min-[400px]:text-[1.35rem] sm:text-2xl md:text-3xl lg:text-[2.15rem] xl:text-[2.35rem]"
          >
            We are a performance marketing agency
          </h2>
          <p
            data-hero-reveal
            className="mx-auto mt-3 max-w-[20rem] font-body text-xs leading-relaxed text-brand-cream/75 sm:mt-4 sm:max-w-xl sm:text-sm md:max-w-2xl md:text-[0.95rem]"
          >
            We build websites, run SEO & performance marketing for Indian and global brands.
          </p>
          <div
            data-hero-reveal
            className="mx-auto mt-3 h-px max-w-[min(260px,88%)] bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent sm:mt-4 sm:max-w-[min(300px,85%)]"
          />

          {/* Mobile / tablet: compact stat glass chips */}
          <div
            data-hero-reveal
            className="pointer-events-auto mx-auto mt-4 flex max-w-md flex-wrap justify-center gap-2 sm:mt-5 sm:gap-2.5 lg:hidden"
          >
            <div className="min-w-[5.5rem] rounded-2xl border border-white/20 bg-brand-cream/10 px-3 py-2.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl backdrop-saturate-150">
              <p className="font-heading text-lg font-bold leading-none text-brand-gold sm:text-xl">12+</p>
              <p className="mt-1 font-mono text-[8px] uppercase leading-tight tracking-wide text-brand-cream/65">
                Projects done
              </p>
            </div>
            <div className="min-w-[6.5rem] max-w-[11rem] rounded-2xl border border-white/20 bg-brand-cream/10 px-3 py-2.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl backdrop-saturate-150">
              <p className="font-heading text-lg font-bold leading-none text-brand-gold sm:text-xl">50K+</p>
              <p className="mt-1 font-mono text-[8px] uppercase leading-snug tracking-wide text-brand-cream/65">
                Orders on sites we run
              </p>
            </div>
            <div className="min-w-[5.5rem] rounded-2xl border border-white/20 bg-brand-cream/10 px-3 py-2.5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl backdrop-saturate-150">
              <p className="font-heading text-lg font-bold leading-none text-brand-gold sm:text-xl">3+</p>
              <p className="mt-1 font-mono text-[8px] uppercase leading-tight tracking-wide text-brand-cream/65">
                Years live
              </p>
            </div>
          </div>
          <p
            data-hero-reveal
            className="mx-auto mt-2 max-w-[18rem] font-body text-[10px] leading-snug text-brand-cream/45 lg:hidden"
          >
            *Order volume across client stores & funnels; conversion rates vary by brand.
          </p>
        </div>
      </div>

      {/* Desktop: glass cards — work (left) & impact (right) */}
      <div className="pointer-events-none absolute inset-0 z-[12] hidden lg:block">
        <div
          data-hero-glass
          className="pointer-events-auto absolute left-6 top-[26%] xl:left-10 xl:top-[28%] xl:max-w-[240px]"
        >
          <div className="max-w-[220px] rounded-3xl border border-white/25 bg-brand-cream/12 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold/90">Selected work</p>
            <p className="mt-2 font-heading text-3xl font-bold text-brand-cream">12+</p>
            <p className="mt-0.5 font-body text-sm leading-snug text-brand-cream/75">
              Websites, landing pages & campaigns shipped end-to-end.
            </p>
            <Link
              to="/work"
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-medium text-brand-gold transition-colors hover:text-brand-cream"
            >
              View case studies →
            </Link>
          </div>
        </div>
        <div
          data-hero-glass
          className="pointer-events-auto absolute right-6 top-[26%] xl:right-10 xl:top-[28%]"
        >
          <div className="max-w-[230px] rounded-3xl border border-white/25 bg-brand-cream/12 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold/90">Scale we’ve fueled</p>
            <p className="mt-2 font-heading text-3xl font-bold text-brand-cream">50K+</p>
            <p className="mt-0.5 font-body text-sm leading-snug text-brand-cream/75">
              Orders placed on properties we built or run ads for — not all convert; mix varies by brand.
            </p>
            <p className="mt-3 border-t border-white/15 pt-3 font-heading text-lg text-brand-gold">3+ yrs</p>
            <p className="font-mono text-[10px] uppercase tracking-wider text-brand-cream/50">Team experience</p>
          </div>
        </div>
      </div>

      {/* Social — desktop left rail; mobile compact row */}
      <div className="pointer-events-none absolute bottom-[6.5rem] left-0 z-20 px-3 sm:bottom-[5.75rem] sm:px-4 md:bottom-12 md:left-2 md:px-8 lg:bottom-14 lg:px-10">
        <div className="pointer-events-auto flex flex-col gap-2 sm:gap-2.5">
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-brand-cream/55 sm:block">Follow</p>
          <ul className="flex flex-row flex-wrap gap-2 sm:flex-col sm:gap-2">
            {heroSocial.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="group flex items-center gap-2 rounded-full border border-white/15 bg-brand-dark/35 py-1.5 pl-1.5 pr-2.5 backdrop-blur-md transition-colors hover:border-brand-gold/40 hover:bg-brand-dark/50 sm:pl-2 sm:pr-3"
                  aria-label={s.ariaLabel}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-cream/10 text-brand-cream transition-colors group-hover:bg-brand-gold/20 group-hover:text-brand-gold sm:h-9 sm:w-9">
                    <SocialIcon id={s.id} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  </span>
                  <span className="hidden max-w-[160px] truncate font-mono text-[11px] font-medium tracking-wide text-brand-cream/90 md:inline md:max-w-[180px] md:text-xs">
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center px-4 pb-8 sm:px-6 sm:pb-10 md:pb-14 lg:pb-16">
        <div
          ref={ctasRef}
          className="pointer-events-auto flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Link
            ref={primaryBtnRef}
            to="/contact"
            className="hero-cta-primary btn-magnetic relative inline-flex min-h-[3rem] items-center justify-center overflow-hidden rounded-full bg-brand-gold px-8 py-3.5 font-heading text-sm font-bold text-brand-dark ring-1 ring-brand-gold/35"
          >
            <span className="btn-slide !bg-brand-green" />
            <span className="btn-text relative z-[1] !text-brand-cream">Start a Project</span>
          </Link>
          <Link
            ref={secondaryBtnRef}
            to="/work"
            className="hero-cta-secondary btn-magnetic relative inline-flex min-h-[3rem] items-center justify-center overflow-hidden rounded-full border border-brand-cream/40 bg-brand-dark/30 px-8 py-3.5 font-heading text-sm font-semibold text-brand-cream backdrop-blur-md transition-colors hover:border-brand-gold/55"
          >
            <span className="btn-slide !bg-brand-gold/20" />
            <span className="btn-text relative z-[1] !text-brand-cream">See Our Work</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
