import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectListItem({ project, index }) {
  const rowRef = useRef(null)
  const titleRef = useRef(null)
  const [showThumb, setShowThumb] = useState(false)
  const [thumbPos, setThumbPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!rowRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 90%',
          },
          delay: index * 0.1,
        }
      )
    }, rowRef)

    return () => ctx.revert()
  }, [index])

  const handleMouseMove = (e) => {
    setThumbPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      <Link 
        to={`/projects/${project.slug}`}
        ref={rowRef}
        className="project-row block w-full py-8 px-0 border-t border-[var(--pf-border)] group relative no-underline text-[var(--pf-text)] bg-[var(--pf-bg)]"
        onMouseEnter={() => setShowThumb(true)}
        onMouseLeave={() => setShowThumb(false)}
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--pf-muted)] mb-4 md:mb-0 md:w-1/4">
            {project.tags.slice(0, 3).join(' • ')}
          </div>
          
          <div 
            ref={titleRef}
            className="font-[Syne] font-extrabold transition-transform duration-400 ease-[var(--pf-ease-out)] group-hover:translate-x-3 md:w-1/2"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {project.name}
          </div>

          <div className="flex items-center justify-between md:justify-end md:w-1/4 mt-4 md:mt-0 text-sm text-[var(--pf-muted)]">
            <span className="mr-6">{project.year}</span>
            <span className="text-xl transition-transform duration-300 group-hover:rotate-45">→</span>
          </div>
        </div>
      </Link>

      {/* Floating Thumbnail Card */}
      {showThumb && window.matchMedia('(pointer: fine)').matches && (
        <div 
          className="fixed pointer-events-none z-[9900] w-[280px] h-[180px] rounded-xl overflow-hidden shadow-2xl transition-opacity duration-300"
          style={{
            left: thumbPos.x + 20,
            top: thumbPos.y + 20,
            opacity: showThumb ? 1 : 0
          }}
        >
          <img 
            src={project.thumbnail} 
            alt={project.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.backgroundColor = project.color || 'var(--pf-bg-card)';
            }}
          />
        </div>
      )}
    </>
  )
}
