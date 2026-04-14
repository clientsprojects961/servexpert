import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GrainOverlay from '../components/portfolio/GrainOverlay'
import CustomCursor from '../components/portfolio/CustomCursor'
import ProjectListItem from '../components/portfolio/ProjectListItem'
import { projects } from '../lib/projects'

export default function Projects() {
  return (
    <>
      <Navbar />
      <GrainOverlay />
      <CustomCursor />
      
      <main className="min-h-screen overflow-x-hidden pt-40 pb-16 px-6 md:px-16 lg:px-24 bg-[var(--pf-bg)] text-[var(--pf-text)]">
        {/* HERO SECTION */}
        <div className="mb-24 relative overflow-x-hidden">
          <div className="text-xs uppercase tracking-[0.1em] text-[var(--pf-muted)] mb-6 font-mono">
            SELECTED WORKS
          </div>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            <h1 
              className="font-[Syne] font-extrabold m-0 leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              PROJECTS
            </h1>
            <span className="absolute top-2 right-0 text-sm md:-right-12 md:text-base text-[var(--pf-muted)] font-mono">
              {projects.length < 10 ? `0${projects.length}` : projects.length}
            </span>
          </motion.div>
        </div>

        {/* PROJECT LIST */}
        <div className="w-full">
          {projects.map((project, idx) => (
            <ProjectListItem key={project.slug} project={project} index={idx} />
          ))}
          <div className="border-t border-[var(--pf-border)] w-full"></div>
        </div>

        {/* CTA SECTION */}
        <div className="py-32 text-center flex flex-col items-center justify-center">
          <h2 className="font-display italic text-4xl md:text-5xl lg:text-7xl mb-4 text-[var(--cream)]">
            Got a project in mind?
          </h2>
          <div className="font-[Syne] font-extrabold text-3xl md:text-5xl lg:text-6xl mb-10 text-[var(--pf-text)]">
            Let's build it together.
          </div>
          <Link 
            to="/contact" 
            className="inline-block px-8 py-4 border border-[var(--pf-border)] rounded-full text-sm uppercase tracking-wider transition-colors duration-300 hover:bg-white hover:text-black font-semibold bg-transparent text-[var(--pf-text)]"
          >
            Get in Touch ↗
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
