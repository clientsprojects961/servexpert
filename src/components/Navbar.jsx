import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const menuRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    if (!menuRef.current) return
    const ctx = gsap.context(() => {
      if (!menuRef.current) return

      if (menuOpen) {
        gsap.set(menuRef.current, { display: 'flex' })
        gsap.fromTo(
          menuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        gsap.fromTo(
          linksRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.15 }
        )
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (menuRef.current) gsap.set(menuRef.current, { display: 'none' })
          },
        })
      }
    }, menuRef)

    return () => ctx.revert()
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-8 rounded-full px-6 py-3 transition-all duration-500 ${
          scrolled
            ? 'border border-white/25 bg-brand-cream/45 shadow-[0_8px_32px_rgba(13,18,16,0.12)] backdrop-blur-2xl backdrop-saturate-150'
            : 'border border-white/20 bg-brand-cream/18 shadow-[0_4px_24px_rgba(13,18,16,0.08)] backdrop-blur-2xl backdrop-saturate-150'
        }`}
        style={{ minWidth: 'min(760px, 95vw)' }}
      >
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-1 group">
          <span className="font-heading font-bold text-lg tracking-tight text-brand-green">
            ServeXpert
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold inline-block mb-0.5" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7 ml-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-sm font-medium link-hover ${
                location.pathname === link.to
                  ? 'text-brand-green'
                  : scrolled || location.pathname !== '/'
                    ? 'text-brand-text'
                    : 'text-brand-cream'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/contact"
            className="btn-magnetic relative ml-2 bg-brand-green text-brand-gold px-5 py-2.5 rounded-full font-heading font-semibold text-sm overflow-hidden"
          >
            <span className="btn-slide" />
            <span className="btn-text">Book a Call</span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={`ml-auto md:ml-0 ${scrolled || location.pathname !== '/' ? 'text-brand-green' : 'text-brand-cream'}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-brand-green flex-col items-center justify-center hidden"
      >
        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              ref={(el) => (linksRef.current[i] = el)}
              onClick={closeMenu}
              className="font-display italic text-5xl text-brand-cream opacity-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            ref={(el) => (linksRef.current[navLinks.length] = el)}
            onClick={closeMenu}
            className="mt-4 bg-brand-gold text-brand-dark px-8 py-3 rounded-full font-heading font-bold text-base opacity-0"
          >
            Book a Call →
          </Link>
        </div>
      </div>
    </>
  )
}
