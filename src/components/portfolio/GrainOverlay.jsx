import React from 'react'

export default function GrainOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        opacity: 0.05,
        mixBlendMode: 'overlay',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-50">
        <filter id="pf-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#pf-noise)" />
      </svg>
    </div>
  )
}
