import { useEffect } from 'react'

export function useCustomCursor() {
  useEffect(() => {
    const dot = document.querySelector('.cursor-dot')
    const ring = document.querySelector('.cursor-ring')

    if (!dot || !ring) return

    const moveCursor = (e) => {
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'

      // Ring follows with delay via requestAnimationFrame
      requestAnimationFrame(() => {
        ring.style.left = e.clientX + 'px'
        ring.style.top = e.clientY + 'px'
      })
    }

    const addHover = () => document.body.classList.add('hovering')
    const removeHover = () => document.body.classList.remove('hovering')

    document.addEventListener('mousemove', moveCursor)

    const interactives = document.querySelectorAll(
      'a, button, [data-cursor-hover], input, textarea, select'
    )
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
    }
  }, [])
}
