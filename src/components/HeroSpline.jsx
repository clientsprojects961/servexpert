import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SPLINE_SCENE = 'https://prod.spline.design/aSK9uw8nRDricMRy/scene.splinecode'

export default function HeroSpline({ onLoaded }) {
  return (
    <Suspense
      fallback={
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-brand-dark via-brand-green/30 to-brand-dark" />
      }
    >
      <div className="hero-spline">
        <Spline
          scene={SPLINE_SCENE}
          renderOnDemand
          onLoad={() => onLoaded?.()}
        />
      </div>
    </Suspense>
  )
}
