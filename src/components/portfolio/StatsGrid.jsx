import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const statItems = [
  { key: 'revenue',     label: 'Ad Revenue',       icon: '💰' },
  { key: 'roas',        label: 'ROAS',              icon: '📈' },
  { key: 'impressions', label: 'Impressions',       icon: '👁️'  },
  { key: 'ctr',         label: 'Click-Through Rate',icon: '🖱️'  },
  { key: 'conversions', label: 'Conversions',       icon: '🛒' },
  { key: 'campaigns',   label: 'Campaigns Run',     icon: '📊' },
]

export default function StatsGrid({ stats }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const cards = containerRef.current.querySelectorAll('.stat-card')
    
    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const valEl = card.querySelector('.stat-val')
        const originalText = valEl.dataset.val
        
        // Extract numeric part and prefix/suffix
        const numericMatch = originalText.match(/[\d.,]+/)
        if (!numericMatch) {
          // If no numbers, just fade in
          gsap.fromTo(card, 
            { opacity: 0, y: 20 }, 
            {
              opacity: 1, y: 0, duration: 0.6, 
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 90%' },
              delay: index * 0.1
            }
          )
          return
        }

        const numericStr = numericMatch[0].replace(/,/g, '')
        const numValue = parseFloat(numericStr)
        const prefix = originalText.substring(0, numericMatch.index)
        const suffix = originalText.substring(numericMatch.index + numericMatch[0].length)

        const formatNumber = (val) => {
          if (numericStr.includes('.')) {
            return val.toFixed(1)
          }
          return Math.floor(val).toLocaleString()
        }

        // Setup the animation for the number
        const obj = { val: 0 }
        
        gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 90%' }
        })
        .fromTo(card, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: index * 0.1 }
        )
        .to(obj, {
          val: numValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            valEl.textContent = `${prefix}${formatNumber(obj.val)}${suffix}`
          }
        }, '<')
      })
    }, containerRef)

    return () => ctx.revert()
  }, [stats])

  if (!stats) return null

  return (
    <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {statItems.map(({ key, label, icon }) => (
        <div 
          key={key} 
          className="stat-card bg-[var(--pf-bg-card)] border border-[var(--pf-border)] rounded-2xl p-6 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.04)]"
        >
          <div className="text-2xl mb-2">{icon}</div>
          <div 
            className="stat-val font-[Syne] font-extrabold text-[var(--pf-text)]"
            style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)' }}
            data-val={stats[key] || '0'}
          >
            0
          </div>
          <div className="text-xs uppercase tracking-[0.1em] text-[var(--pf-muted)] mt-1">
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}
