import { useState } from 'react'

interface ClickToLoadMediaProps {
  /** Media source URL (image or video) */
  src: string
  /** Media type */
  type: 'image' | 'video'
  /** Alt text for images */
  alt?: string
  /** Thumbnail/poster image URL */
  thumbnail?: string
  /** Estimated data size in KB */
  dataSizeKB?: number
  /** Estimated CO2 cost in grams */
  carbonCostGrams?: number
  /** Custom width */
  width?: string
  /** Custom height */
  height?: string
  /** Border radius class */
  rounded?: string
}

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
}: ClickToLoadMediaProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate carbon cost if not provided
  const calculatedCarbonCost = carbonCostGrams || (dataSizeKB / 1024 / 1024) * 0.06 * 475

  const formatDataSize = (kb: number): string => {
    if (kb < 1024) return `${kb.toFixed(0)} KB`
    return `${(kb / 1024).toFixed(1)} MB`
  }

  const handleLoadMedia = () => {
    setIsLoading(true)
    // Simulate loading delay
    setTimeout(() => {
      setIsLoaded(true)
      setIsLoading(false)
    }, 300)
  }

  if (isLoaded) {
    return (
      <div className={`relative ${rounded} overflow-hidden`} style={{ width, height }}>
        {type === 'image' ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <video
            src={src}
            controls
            className="w-full h-full object-cover"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative bg-background-cardSurface border-2 border-borders-subtle ${rounded} overflow-hidden transition-colors hover:border-borders-contrast`}
      style={{ width, height }}
    >
      {/* Thumbnail background if provided */}
      {thumbnail && (
        <div
          className="absolute inset-0 opacity-20 blur-sm"
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="mb-4 text-5xl opacity-80">
          {type === 'image' ? '🖼️' : '🎬'}
        </div>

        <h3 className="text-sm font-semibold text-text-primary mb-2">
          {type === 'image' ? 'Image not loaded' : 'Video not loaded'}
        </h3>

        <p className="text-xs text-text-secondary mb-4 max-w-xs">
          Click to load {type}. This action will transfer <strong>{formatDataSize(dataSizeKB)}</strong> of data.
        </p>

        {/* Data cost information */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-badge bg-background-badgeNeutral text-xs text-text-secondary">
            <span>📊</span>
            {formatDataSize(dataSizeKB)}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-badge bg-background-badgeNeutral text-xs text-text-secondary">
            <span>🌍</span>
            {calculatedCarbonCost.toFixed(2)}g CO₂
          </span>
        </div>

        {/* Load button */}
        <button
          onClick={handleLoadMedia}
          disabled={isLoading}
          className="bg-accent-primary text-black rounded-button px-6 py-2.5 text-sm font-semibold hover:bg-accent-primary-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Loading...' : `Load ${type}`}
        </button>

        <p className="text-xs text-text-tertiary mt-3">
          💡 Consensual data loading saves energy
        </p>
      </div>
    </div>
  )
}

export default ClickToLoadMedia

