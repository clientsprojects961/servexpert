import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
import CTABanner from '../components/CTABanner'
import { X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: 'Drip Organic',
    category: 'Digital Marketing & SEO',
    tags: ['SEO', 'Content Strategy'],
    img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=75',
    results: { traffic: '+340%', ranking: '#1 for 47 keywords', time: '90 days' },
    challenge: 'Drip Organic had zero online visibility despite a premium product. Organic traffic was negligible and they were invisible to their target audience.',
    approach: 'Full technical SEO audit, content strategy overhaul, and AI-assisted keyword clustering targeting high-intent product queries.',
    color: '#02462E',
  },
  {
    id: 2,
    title: 'Luminary Labs',
    category: 'Social Media Management',
    tags: ['Social Media', 'Content Creation', 'Reels'],
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=75',
    results: { traffic: '2.1M Reach', ranking: '340% engagement lift', time: '60 days' },
    challenge: "Luminary Labs' social accounts were inconsistent and failing to connect with their audience despite strong product-market fit.",
    approach: 'Brand voice definition, weekly content calendar, daily reel strategy with AI-assisted scripts and human creative direction.',
    color: '#4A6B5A',
  },
  {
    id: 3,
    title: 'BuildFast',
    category: 'Web & App Development',
    tags: ['React', 'SaaS', 'MVP'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=75',
    results: { traffic: '6 weeks', ranking: '2.3s load time', time: '10x faster' },
    challenge: 'BuildFast needed an MVP fast. Agency quotes were 6+ months and exceeded budget by 3x.',
    approach: 'AI-scaffolded development, component-based architecture, and two-week sprint demos with a dedicated engineering lead.',
    color: '#0D1210',
  },
  {
    id: 4,
    title: 'Bloom Studio',
    category: 'Social Media Management',
    tags: ['Instagram', 'Brand Identity'],
    img: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=75',
    results: { traffic: '+180% followers', ranking: '4.2% avg. engagement', time: '3 months' },
    challenge: 'A creative studio with stunning work but no social strategy. Their feed was inconsistent and their story was untold.',
    approach: 'Editorial content framework, brand narrative system, and monthly campaign planning aligned to product launches.',
    color: '#02462E',
  },
  {
    id: 5,
    title: 'NestLocal',
    category: 'Digital Marketing & SEO',
    tags: ['Local SEO', 'Google Business'],
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=75',
    results: { traffic: '520% more calls', ranking: 'Top 3 local pack', time: '45 days' },
    challenge: 'A real estate firm invisible on Google despite operating for 8 years. No reviews strategy, broken GMB listing.',
    approach: 'Complete Google Business overhaul, local citation audit, review generation system, and hyperlocal content strategy.',
    color: '#4A6B5A',
  },
  {
    id: 6,
    title: 'Volta Commerce',
    category: 'Web & App Development',
    tags: ['E-commerce', 'Shopify', 'CRO'],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=75',
    results: { traffic: '+67% conversion', ranking: '1.8s page speed', time: '5 weeks' },
    challenge: "High traffic D2C brand with a slow, poorly converting Shopify store. Cart abandonment was at 81%.",
    approach: 'Performance audit, complete UX overhaul, A/B-tested checkout flow, and Core Web Vitals optimization led by our growth engineering pod.',
    color: '#0D1210',
  },
]

export default function Work() {
  const [selected, setSelected] = useState(null)
  const [closing, setClosing] = useState(false)
  const cardsRef = useRef([])
  const modalRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.85,
            delay: (i % 3) * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' }
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selected])

  const openProject = (project) => {
    setClosing(false)
    setSelected(project)
  }

  const closeProject = () => {
    if (!selected) return
    setClosing(true)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!modalRef.current) return

      if (selected && !closing) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
        )
      }

      if (selected && closing) {
        gsap.to(modalRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.3,
          ease: 'power3.in',
          onComplete: () => {
            setSelected(null)
            setClosing(false)
          },
        })
      }
    })

    return () => ctx.revert()
  }, [selected, closing])

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60dvh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-green/70 to-transparent" />
        </div>
        <div className="relative z-10 px-8 md:px-16 lg:px-24 pb-20">
          <span className="font-mono text-xs tracking-[0.25em] text-brand-gold uppercase">Work that</span>
          <h1 className="font-display italic text-[5rem] md:text-[8rem] leading-none text-brand-cream mt-2 mb-4">
            Speaks.
          </h1>
          <p className="font-body text-brand-cream/60 text-base max-w-lg">
            Selected client results across digital marketing, social media, and web development. Real numbers, real outcomes.
          </p>
        </div>
      </section>

      {/* Project Grid */}
      <section className="section-padding bg-brand-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[i] = el)}
                className="group relative card-hover rounded-4xl overflow-hidden cursor-pointer shadow-brand"
                onClick={() => openProject(project)}
                style={{ aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: `linear-gradient(to top, ${project.color}ee, ${project.color}88, transparent)` }}
                >
                  <span className="font-mono text-xs text-brand-gold tracking-widest uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-bold text-2xl text-brand-cream mb-3">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-brand-cream/10 text-brand-cream/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Always-visible label */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded-full bg-brand-dark/60 backdrop-blur-sm text-brand-cream/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4" onClick={closeProject}>
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" />
          <div
            ref={modalRef}
            className="relative w-full max-w-4xl bg-brand-cream rounded-4xl overflow-hidden"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero */}
            <div className="relative h-56 md:h-72">
              <img src={selected.img} alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${selected.color}, transparent)` }} />
              <button
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-brand-dark/60 backdrop-blur text-brand-cream flex items-center justify-center"
                onClick={closeProject}
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-6 left-7">
                <span className="font-mono text-xs text-brand-gold tracking-widest">{selected.category}</span>
                <h2 className="font-heading font-bold text-3xl text-brand-cream">{selected.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-7 md:p-10 space-y-8">
              {/* Results Row */}
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(selected.results).map(([key, val]) => (
                  <div key={key} className="bg-brand-green/5 rounded-3xl p-5 text-center">
                    <p className="font-mono font-bold text-xl md:text-2xl text-brand-green">{val}</p>
                    <p className="font-mono text-xs text-brand-sage mt-1 uppercase tracking-widest">{key}</p>
                  </div>
                ))}
              </div>

              {/* Challenge / Approach */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-text mb-3">The Challenge</h3>
                  <p className="font-body text-sm text-brand-sage leading-relaxed">{selected.challenge}</p>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-text mb-3">Our Approach</h3>
                  <p className="font-body text-sm text-brand-sage leading-relaxed">{selected.approach}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CTABanner />
      <Footer />
    </main>
  )
}
