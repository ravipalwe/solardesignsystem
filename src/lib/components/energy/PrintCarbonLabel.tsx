import { useResourceObserver } from '../../hooks/useResourceObserver'

export interface PrintCarbonLabelProps {
  /** Page name for the label */
  pageName?: string
  /** Measurement date */
  measuredDate?: string
  /** Hosting provider name */
  hostingProvider?: string
  /** Whether hosting is green-certified */
  isGreenHosted?: boolean
  /** Show page weight row (default: true) */
  showPageWeight?: boolean
  /** Show per-view CO₂ row (default: true) */
  showCarbonPerView?: boolean
  /** Show annual estimate row (default: true) */
  showAnnualEstimate?: boolean
  /** Annual page views for annual CO₂ calculation */
  annualPageViews?: number
  /** Compact mode */
  compact?: boolean
  /** Optional className */
  className?: string
}

function getGrade(carbonGrams: number): { letter: string; color: string; bgColor: string } {
  if (carbonGrams < 0.2) return { letter: 'A+', color: 'text-accent-success', bgColor: 'bg-accent-success/20' }
  if (carbonGrams < 0.5) return { letter: 'A', color: 'text-accent-success', bgColor: 'bg-accent-success/20' }
  if (carbonGrams < 1.0) return { letter: 'B', color: 'text-accent-primary', bgColor: 'bg-accent-primary/20' }
  if (carbonGrams < 1.5) return { letter: 'C', color: 'text-accent-solar-amber', bgColor: 'bg-accent-solar-amber/20' }
  if (carbonGrams < 2.5) return { letter: 'D', color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20' }
  return { letter: 'F', color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20' }
}

function formatWeight(kb: number): string {
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

const PrintCarbonLabel = ({
  pageName,
  measuredDate,
  hostingProvider,
  isGreenHosted,
  showPageWeight = true,
  showCarbonPerView = true,
  showAnnualEstimate = true,
  annualPageViews = 10000,
  compact = false,
  className = '',
}: PrintCarbonLabelProps) => {
  const resources = useResourceObserver()
  const grade = getGrade(resources.carbonGrams)
  const annualKg = (resources.carbonGrams * annualPageViews) / 1000

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-3 px-4 py-2 bg-background-cardSurface border border-borders-subtle rounded-card ${className}`}
        role="status"
        aria-label={`Carbon grade: ${grade.letter}, ${resources.carbonGrams.toFixed(2)}g CO₂ per view`}
      >
        <div className={`flex items-center justify-center w-8 h-8 rounded-badge ${grade.bgColor}`}>
          <span className={`text-sm font-bold ${grade.color}`}>{grade.letter}</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-text-primary">{resources.carbonGrams.toFixed(2)}g CO₂</p>
          <p className="text-xs text-text-tertiary">per page view</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-background-cardSurface border-2 border-borders-contrast rounded-card overflow-hidden ${className}`}
      role="region"
      aria-label="Digital Carbon Label"
    >
      {/* Header */}
      <div className="bg-background-badgeNeutral px-4 py-3 border-b border-borders-contrast">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-text-primary">Digital Carbon Label</h4>
            {pageName && <p className="text-xs text-text-tertiary">{pageName}</p>}
          </div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-badge ${grade.bgColor}`}>
            <span className={`text-lg font-bold ${grade.color}`}>{grade.letter}</span>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-borders-subtle">
        {showPageWeight && (
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-text-secondary">Page Weight</span>
            <span className="text-xs font-semibold text-text-primary">
              {formatWeight(resources.totalKB)}
            </span>
          </div>
        )}

        {showCarbonPerView && (
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-text-secondary">CO₂ Per Visit</span>
            <span className={`text-xs font-semibold ${grade.color}`}>
              {resources.carbonGrams.toFixed(2)}g
            </span>
          </div>
        )}

        {showAnnualEstimate && (
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-text-secondary">
              Annual Est. ({(annualPageViews / 1000).toFixed(0)}K views)
            </span>
            <span className="text-xs font-semibold text-text-primary">
              {annualKg < 1 ? `${(annualKg * 1000).toFixed(0)}g` : `${annualKg.toFixed(1)}kg`} CO₂
            </span>
          </div>
        )}

        {hostingProvider && (
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-text-secondary">Hosting</span>
            <span className="text-xs font-semibold text-text-primary flex items-center gap-1">
              {isGreenHosted && <span className="text-accent-success" aria-hidden="true">●</span>}
              {hostingProvider}
              {isGreenHosted && <span className="sr-only">(Green certified)</span>}
            </span>
          </div>
        )}

        {measuredDate && (
          <div className="flex justify-between items-center px-4 py-2.5">
            <span className="text-xs text-text-secondary">Measured</span>
            <span className="text-xs text-text-tertiary">{measuredDate}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-background-badgeNeutral border-t border-borders-contrast">
        <p className="text-xs text-text-tertiary text-center">
          Powered by SOLAR Design System
        </p>
      </div>
    </div>
  )
}

export default PrintCarbonLabel
