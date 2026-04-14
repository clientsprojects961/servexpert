import React, { useEffect, useRef } from 'react'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GrainOverlay from '../components/portfolio/GrainOverlay'
import CustomCursor from '../components/portfolio/CustomCursor'
import IframePreview from '../components/portfolio/IframePreview'
import StatsGrid from '../components/portfolio/StatsGrid'
import { projects } from '../lib/projects'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const iframeSectionRef = useRef(null)
  
  const projectIndex = projects.findIndex(p => p.slug === slug)
  const project = projects[projectIndex]

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (iframeSectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(iframeSectionRef.current,
          { opacity: 0, scale: 0.96 },
          { 
            opacity: 1, 
            scale: 1, 
            duration: 1, 
            ease: 'power3.out',
            scrollTrigger: {
              trigger: iframeSectionRef.current,
              start: 'top 85%'
            }
          }
        )
      }, iframeSectionRef)
      return () => ctx.revert()
    }
  }, [slug])

  if (!project && projectIndex === -1) return <Navigate to="/projects" replace />

  const nextProjectIndex = (projectIndex + 1) % projects.length
  const nextProject = projects[nextProjectIndex]

  // motion variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }
  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <>
      <Navbar />
      <GrainOverlay />
      <CustomCursor />

      <main className="min-h-screen pt-32 pb-0 bg-[var(--pf-bg)] text-[var(--pf-text)] selection:bg-[var(--pf-accent)] selection:text-[var(--pf-bg)] overflow-hidden">
        {/* BACK BUTTON */}
        <div className="px-6 md:px-16 lg:px-24 mb-12">
          <button 
            onClick={() => navigate('/projects')}
            className="text-sm font-mono uppercase tracking-widest text-[var(--pf-muted)] hover:text-[var(--pf-text)] transition-colors inline-flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Projects
          </button>
        </div>

        {/* HERO SECTION */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="px-6 md:px-16 lg:px-24 mb-24 lg:mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12"
        >
          <div className="lg:w-2/3">
            <motion.div variants={itemVariant} className="text-xs font-mono uppercase tracking-[0.1em] text-[var(--pf-muted)] mb-6 flex items-center justify-between">
              <span>{project.tags.join(' • ')}</span>
              <span className="lg:hidden">{project.year}</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariant}
              className="font-[Syne] font-extrabold m-0 leading-[0.9] mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {project.name}
            </motion.h1>
            
            <motion.p 
              variants={itemVariant}
              className="font-[DM_Sans] text-lg lg:text-xl leading-relaxed text-[#a0a0a0] max-w-[640px]"
            >
              {project.description}
            </motion.p>
          </div>

          <motion.div variants={itemVariant} className="lg:w-1/3 flex flex-col lg:items-end flex-shrink-0">
            <div className="hidden lg:block text-sm font-mono text-[var(--pf-muted)] mb-8">
              {project.year}
            </div>
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-[var(--pf-border)] rounded-full text-sm font-semibold uppercase tracking-wider transition-colors duration-300 hover:bg-white hover:text-black w-full lg:w-auto text-center bg-transparent text-[var(--pf-text)]"
            >
              Launch Project →
            </a>
          </motion.div>
        </motion.div>

        {/* PREVIEW SECTION */}
        <div ref={iframeSectionRef} className="px-6 md:px-16 lg:px-24 mb-32 -mx-6 md:mx-0">
          <div className="text-xs uppercase tracking-[0.1em] text-[var(--pf-muted)] mb-6 px-6 md:px-0">
            LIVE PREVIEW
          </div>
          <IframePreview url={project.liveUrl} title={project.name} fallbackImage={project.thumbnail} />
        </div>

        {/* DETAILS SECTION */}
        <div className="px-6 md:px-16 lg:px-24 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            
            {/* SERVICES */}
            <div className="lg:col-span-4">
              <h3 className="text-xs font-mono uppercase tracking-[0.1em] text-[var(--pf-muted)] mb-8">
                SERVICES
              </h3>
              <ul className="space-y-4">
                {project.services.map((service, i) => (
                  <motion.li 
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="font-[Syne] font-semibold text-xl lg:text-2xl border-l-2 border-[var(--pf-border)] pl-4 hover:border-[var(--pf-accent)] transition-colors py-1 text-[var(--pf-text)]"
                  >
                    {service}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* RESULTS */}
            {project.type === 'website+ads' && project.stats ? (
              <div className="lg:col-span-8">
                <div className="mb-8">
                  <h3 className="text-xs font-mono uppercase tracking-[0.1em] text-[var(--pf-muted)] mb-2">
                    RESULTS & PERFORMANCE
                  </h3>
                  <p className="text-sm text-[#808080]">Verified campaign results across all paid channels.</p>
                </div>
                <StatsGrid stats={project.stats} />
              </div>
            ) : (
              <div className="lg:col-span-8 flex items-center justify-center border border-[var(--pf-border)] rounded-2xl p-12 bg-[var(--pf-bg-card)]">
                <p className="text-[var(--pf-muted)] font-mono uppercase tracking-widest text-sm text-center">
                  Case Study Data Gathering In Progress
                </p>
              </div>
            )}
          </div>
        </div>

        {/* NEXT PROJECT SECTION */}
        <Link 
          to={`/projects/${nextProject.slug}`}
          className="group block w-full border-t border-[var(--pf-border)] py-20 px-6 md:px-16 lg:px-24 transition-colors duration-500 hover:bg-[#111] bg-[var(--pf-bg)] no-underline"
        >
          <div className="text-xs font-mono uppercase tracking-[0.1em] text-[var(--pf-muted)] mb-4">
            NEXT PROJECT
          </div>
          <div className="flex items-center justify-between">
            <h2 
              className="font-[Syne] font-extrabold m-0 leading-none group-hover:translate-x-4 transition-transform duration-500 ease-out text-[var(--pf-text)]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              {nextProject.name}
            </h2>
            <span className="text-2xl md:text-3xl text-[var(--pf-muted)] group-hover:text-[var(--pf-accent)] group-hover:translate-x-2 transition-all duration-300">
              →
            </span>
          </div>
        </Link>
      </main>
      
      <Footer />
    </>
  )
}
