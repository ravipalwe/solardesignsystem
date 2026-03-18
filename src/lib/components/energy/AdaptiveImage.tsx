import { useState, useCallback, useRef, useEffect } from 'react'
import { useDeviceEnergyProfile, type EnergyBudget } from '../../hooks/useDeviceEnergyProfile'

export interface AdaptiveImageProps {
  /** Full-quality source */
  src: string
  /** Medium-quality alternative */
  srcMedium?: string
  /** Low-quality alternative */
  srcLight?: string
  /** Alt text (required for accessibility) */
  alt: string
  /** CSS width */
  width?: string | number
  /** CSS height */
  height?: string | number
  /** Aspect ratio (e.g., "16/9") */
  aspectRatio?: string
  /** Loading strategy. 'auto' decides based on profile. Default: 'auto' */
  loading?: 'lazy' | 'eager' | 'auto'
  /** Placeholder style */
  placeholder?: 'blur' | 'color' | 'none'
  /** Tiny blur-up image src */
  placeholderSrc?: string
  /** Placeholder color */
  placeholderColor?: string
  /** When true and saveData is on, only placeholder is shown. Default: true */
  respectSaveData?: boolean
  /** Callback when image loads */
  onLoad?: () => void
  /** Callback when image is intentionally skipped */
  onSkip?: (reason: string) => void
  /** Optional className */
  className?: string
}

function selectSource(
  budget: EnergyBudget,
  src: string,
  srcMedium?: string,
  srcLight?: string,
): string {
  switch (budget) {
    case 'minimal':
      return srcLight ?? srcMedium ?? src
    case 'low':
      return srcMedium ?? srcLight ?? src
    case 'standard':
      return srcMedium ?? src
    case 'generous':
      return src
  }
}

const AdaptiveImage = ({
  src,
  srcMedium,
  srcLight,
  alt,
  width,
  height,
  aspectRatio,
  loading = 'auto',
  placeholder = 'color',
  placeholderSrc,
  placeholderColor = '#121212',
  respectSaveData = true,
  onLoad,
  onSkip,
  className = '',
}: AdaptiveImageProps) => {
  const profile = useDeviceEnergyProfile()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showImage, setShowImage] = useState(true)
  const imgRef = useRef<HTMLImageElement>(null)

  // Should we skip loading?
  const shouldSkip = respectSaveData && profile.prefersReducedData && profile.budget === 'minimal'

  useEffect(() => {
    if (shouldSkip) {
      setShowImage(false)
      onSkip?.('save-data-enabled')
    } else {
      setShowImage(true)
    }
  }, [shouldSkip, onSkip])

  const selectedSrc = selectSource(profile.budget, src, srcMedium, srcLight)
  const resolvedLoading = loading === 'auto'
    ? (profile.budget === 'generous' ? 'eager' : 'lazy')
    : loading

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleClick = useCallback(() => {
    setShowImage(true)
  }, [])

  const style: React.CSSProperties = {
    width,
    height,
    aspectRatio,
  }

  // Skipped state — click to load
  if (!showImage) {
    return (
      <div
        className={`relative overflow-hidden rounded-input bg-background-cardSurface border border-borders-subtle ${className}`}
        style={style}
      >
        {/* Blurred placeholder */}
        {placeholderSrc && (
          <img
            src={placeholderSrc}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30"
            aria-hidden="true"
          />
        )}
        <div className="relative flex flex-col items-center justify-center h-full min-h-[120px] p-4 text-center">
          <span className="text-2xl mb-2" aria-hidden="true">🖼️</span>
          <p className="text-xs text-text-secondary mb-3">Image hidden to save data</p>
          <button
            type="button"
            onClick={handleClick}
            className="bg-accent-primary text-black rounded-button px-4 py-1.5 text-xs font-semibold hover:bg-accent-primary-dim transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-appCanvas"
          >
            Load image
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden rounded-input ${className}`}
      style={{
        ...style,
        backgroundColor: !isLoaded ? placeholderColor : undefined,
      }}
    >
      {/* Blur-up placeholder */}
      {placeholder === 'blur' && placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
          aria-hidden="true"
        />
      )}

      <img
        ref={imgRef}
        src={selectedSrc}
        alt={alt}
        loading={resolvedLoading}
        onLoad={handleLoad}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

export default AdaptiveImage
