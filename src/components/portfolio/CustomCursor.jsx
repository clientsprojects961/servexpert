import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [hoverText, setHoverText] = useState('')

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    if (isMobile) return

    // Hide original cursor styles
    document.body.style.cursor = 'none'

    // Temporarily hide the global custom cursor if it exists
    const oldDot = document.querySelector('.cursor-dot:not(.pf-cursor-dot)')
    const oldRing = document.querySelector('.cursor-ring:not(.pf-cursor-ring)')
    if (oldDot) oldDot.style.display = 'none'
    if (oldRing) oldRing.style.display = 'none'

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      requestAnimationFrame(animate)
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('.project-row, a, button')
      if (!target) {
        ringRef.current.style.width = '36px'
        ringRef.current.style.height = '36px'
        ringRef.current.style.borderColor = 'var(--pf-border)'
        ringRef.current.style.backgroundColor = 'transparent'
        setHoverText('')
        return
      }

      if (target.classList.contains('project-row')) {
        ringRef.current.style.width = '72px'
        ringRef.current.style.height = '72px'
        ringRef.current.style.backgroundColor = 'rgba(255,255,255,0.1)'
        setHoverText('VIEW')
      } else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
        ringRef.current.style.width = '48px'
        ringRef.current.style.height = '48px'
        ringRef.current.style.borderColor = 'var(--pf-accent)'
        setHoverText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    const animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animId)
      document.body.style.cursor = 'auto'
      if (oldDot) oldDot.style.display = ''
      if (oldRing) oldRing.style.display = ''
    }
  }, [])

  return (
    <>
      <div 
        ref={cursorRef} 
        className="pf-cursor-dot fixed top-0 left-0 w-[6px] h-[6px] bg-[#f0f0f0] rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{ display: window.matchMedia('(pointer: coarse)').matches ? 'none' : 'block' }}
      />
      <div 
        ref={ringRef} 
        className="pf-cursor-ring fixed top-0 left-0 w-[36px] h-[36px] border border-[rgba(255,255,255,0.2)] rounded-full pointer-events-none z-[10000] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{ display: window.matchMedia('(pointer: coarse)').matches ? 'none' : 'flex' }}
      >
        {hoverText && (
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#f0f0f0]">
            {hoverText}
          </span>
        )}
      </div>
    </>
  )
}
