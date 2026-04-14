import React, { useState, useEffect } from 'react'

export default function IframePreview({ url, title, fallbackImage }) {
  const safeUrl = url.toLowerCase().startsWith('http') ? url : `https://${url}`
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Extract domain from url
  let domain = safeUrl
  try {
    const parsed = new URL(safeUrl)
    domain = parsed.hostname
  } catch (e) {
    // leave as is
  }

  // Timeout fallback since cross-origin iframes suppress errors
  useEffect(() => {
    let timer;
    if (!isLoaded && !hasError) {
      timer = setTimeout(() => {
        setHasError(true)
        setIsLoaded(true)
      }, 6000)
    }
    return () => clearTimeout(timer)
  }, [isLoaded, hasError])

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[var(--pf-border)] bg-[#1a1a1a] shadow-[0_40px_80px_rgba(0,0,0,0.6)] flex flex-col">
      {/* Top Bar */}
      <div className="h-11 bg-[#1a1a1a] flex items-center px-4 relative shrink-0">
        <div className="flex gap-2 z-10">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#2a2a2a] px-3 py-1 rounded text-xs font-mono text-gray-400">
            {domain}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative w-full h-[580px] bg-black">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-10 h-10 border-4 border-[rgba(255,255,255,0.2)] border-t-white rounded-full animate-spin" />
          </div>
        )}

        {!hasError ? (
          <iframe
            src={safeUrl}
            title={title}
            className={`w-full h-full border-none transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
            {fallbackImage ? (
              <img src={fallbackImage} alt={title} className="w-full h-full object-cover" />
            ) : (
              <p>Preview not available for this site.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
