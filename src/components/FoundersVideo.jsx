import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Play } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const LOCAL_YOUTUBE_ID = ''
const YOUTUBE_VIDEO_ID = 's9AWenGgvrzgp9Q0'
  import.meta.env.VITE_AGENCY_VIDEO_ID?.trim() ||
  import.meta.env.VITE_FOUNDERS_YOUTUBE_ID?.trim() ||
  LOCAL_YOUTUBE_ID

export default function AgencyShowreel() {
  const sectionRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const embedUrl = YOUTUBE_VIDEO_ID
    ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`
    : null

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-cream py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(2,70,46,0.06)_0%,transparent_65%)]" />

      <div ref={innerRef} className="relative z-10 mx-auto max-w-5xl px-6 md:px-10">
        <div className="mb-10 text-center md:mb-14">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-sage">Watch</p>
          <h2 className="mt-3 font-display text-4xl italic text-brand-text md:text-5xl lg:text-6xl">
            How we ship for clients
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-brand-sage md:text-base">
            A quick look at our process, craft, and the kind of outcomes global brands expect from a senior agency
            partner.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {embedUrl ? (
            <div className="overflow-hidden rounded-4xl border border-brand-green/10 bg-brand-dark shadow-brand-xl ring-1 ring-brand-green/5">
              <div className="relative aspect-video w-full">
                <iframe
                  title="ServeXpert — agency showreel"
                  src={embedUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="flex aspect-video flex-col items-center justify-center gap-4 rounded-4xl border border-dashed border-brand-green/25 bg-brand-dark/5 px-8 text-center shadow-brand">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                <Play className="h-7 w-7" fill="currentColor" />
              </div>
              <p className="font-heading text-lg text-brand-text">Showreel video</p>
              <p className="max-w-md font-body text-sm text-brand-sage">
                Set <code className="font-mono text-xs text-brand-green">VITE_AGENCY_VIDEO_ID</code> in{' '}
                <span className="font-mono text-xs">.env</span> (YouTube video ID).
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
