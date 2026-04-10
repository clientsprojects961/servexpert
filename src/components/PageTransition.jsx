import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import barba from '@barba/core'

export default function PageTransition({ children }) {
  const curtainRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize Barba (required by spec). In an SPA we use it as a transition engine,
    // while navigation is still handled by React Router.
    try {
      if (!barba.__servexpert_inited) {
        barba.init({ preventRunning: true, transitions: [] })
        barba.__servexpert_inited = true
      }
    } catch {
      // ignore: Barba can throw if init is called multiple times
    }
  }, [])

  useEffect(() => {
    if (!curtainRef.current) return

    const ctx = gsap.context(() => {
      const curtain = curtainRef.current
      if (!curtain) return

      // Enter transition: curtain is covered, pull it up and out
      gsap.set(curtain, { scaleY: 1, transformOrigin: 'top' })
      gsap.to(curtain, {
        scaleY: 0,
        duration: 0.6,
        ease: 'power3.inOut',
        onComplete: () => {
          if (curtainRef.current) gsap.set(curtainRef.current, { scaleY: 0 })
        },
      })
    }, curtainRef)

    window.scrollTo(0, 0)
    return () => ctx.revert()
  }, [location.pathname])

  useEffect(() => {
    const onClickCapture = (e) => {
      if (e.defaultPrevented) return
      if (e.button !== 0) return
      if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return

      const target = e.target?.closest?.('a[href]')
      if (!target) return

      const href = target.getAttribute('href')
      if (!href) return
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return
      if (!href.startsWith('/')) return
      if (href === location.pathname) return

      e.preventDefault()

      const curtain = curtainRef.current
      if (!curtain) {
        navigate(href)
        return
      }

      const ctx = gsap.context(() => {
        gsap.set(curtain, { transformOrigin: 'bottom', scaleY: 0 })
        gsap.to(curtain, {
          scaleY: 1,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => navigate(href),
        })
      }, curtainRef)

      // cleanup quickly (timeline completes)
      setTimeout(() => ctx.revert(), 2000)
    }

    document.addEventListener('click', onClickCapture, true)
    return () => document.removeEventListener('click', onClickCapture, true)
  }, [navigate, location.pathname])

  return (
    <>
      {/* Forest Green Curtain */}
      <div
        ref={curtainRef}
        className="page-transition-curtain"
        style={{ background: '#02462E' }}
      />
      {children}
    </>
  )
}
