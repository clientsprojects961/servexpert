import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Hook Lenis into GSAP ticker for ScrollTrigger sync
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCb = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCb)

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerCb)
    }
  }, [])

  return lenisRef
}
