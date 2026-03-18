import { useState, useCallback } from 'react'
import type { ClickToLoadMediaProps } from '../../types'

const ClickToLoadMedia = ({
  src,
  type,
  alt = 'Media content',
  thumbnail,
  dataSizeKB = 500,
  carbonCostGrams,
  width = '100%',
  height = '300px',
  rounded = 'rounded-input',
  onLoad,
  onError,
  className = '',
}: ClickToLoadMediaProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const calculatedCarbonCost =
    carbonCostGrams ?? (dataSizeKB / 1024 / 1024) * 0.06 * 475

  const formatDataSize = (kb: number): string => {
    if (kb < 1024) return `${kb.toFixed(0)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  const handleLoadMedia = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
  }, [])

  const handleMediaLoaded = useCallback(() => {
    setIsLoaded(true)
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleMediaError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
    onError?.(new Error(`Failed to load ${type}: ${src}`))
  }, [type, src, onError])

  // Loaded state
  if (isLoaded) {
    return (
      <div className={`relative ${rounded} overflow-hidden ${className}`} style={{ width, height }}>
        {type === 'image' ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <video src={src} controls className="w-full h-full object-cover" preload="metadata">
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    )
  }

  // Loading state — actually load the resource
  if (isLoading) {
    return (
      <div
        className={`relative bg-background-cardSurface border-2 border-borders-subtle ${rounded} overflow-hidden ${className}`}
        style={{ width, height }}
        role="status"
        aria-label={`Loading ${type}…`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs text-text-secondary">Loading {type}…</p>
        </div>

        {/* Hidden element that triggers actual network load */}
        {type === 'image' ? (
          <img
            src={src}
            alt={alt}
            className="sr-only"
            onLoad={handleMediaLoaded}
            onError={handleMediaError}
          />
        ) : (
          <video
            src={src}
            className="sr-only"
            preload="metadata"
            onLoadedMetadata={handleMediaLoaded}
            onError={handleMediaError}
          />
        )}
      </div>
    )
  }

  // Placeholder state
  return (
    <div
      className={`relative bg-background-cardSurface border-2 border-borders-subtle ${rounded} overflow-hidden transition-colors hover:border-borders-contrast ${className}`}
      style={{ width, height }}
    >
      {/* Blurred thumbnail */}
      {thumbnail && (
        <div
          className="absolute inset-0 opacity-20 blur-sm"
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-4 text-5xl opacity-80" aria-hidden="true">
          {type === 'image' ? '🖼️' : '🎬'}
        </div>

        <h3 className="text-sm font-semibold text-text-primary mb-2">
          {hasError ? `Failed to load ${type}` : `${type === 'image' ? 'Image' : 'Video'} not loaded`}
        </h3>

        <p className="text-xs text-text-secondary mb-4 max-w-xs">
          {hasError
            ? 'Something went wrong. Try again.'
            : <>Click to load {type}. This will transfer <strong>{formatDataSize(dataSizeKB)}</strong> of data.</>}
        </p>

        {/* Cost badges */}
        <div className="flex flex-wrap gap-2 justify-center mb-4" aria-label="Data cost">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-badge bg-background-badgeNeutral text-xs text-text-secondary">
            <span aria-hidden="true">📊</span>
            {formatDataSize(dataSizeKB)}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-badge bg-background-badgeNeutral text-xs text-text-secondary">
            <span aria-hidden="true">🌍</span>
            {calculatedCarbonCost.toFixed(2)}g CO₂
          </span>
        </div>

        <button
          type="button"
          onClick={handleLoadMedia}
          className="bg-accent-primary text-black rounded-button px-6 py-2.5 text-sm font-semibold hover:bg-accent-primary-dim transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-appCanvas"
        >
          {hasError ? `Retry loading ${type}` : `Load ${type}`}
        </button>

        <p className="text-xs text-text-tertiary mt-3">
          <span aria-hidden="true">💡</span> Consensual data loading saves energy
        </p>
      </div>
    </div>
  )
}

export default ClickToLoadMedia
