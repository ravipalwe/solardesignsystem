import { useCarbonCost } from '../../hooks/useCarbonCost'
import type { CarbonFootprintProps, ImpactLevel } from '../../types'

const impactStyles: Record<ImpactLevel, { color: string; bgColor: string; label: string }> = {
  excellent: { color: 'text-accent-success', bgColor: 'bg-accent-success/20', label: 'Excellent' },
  good: { color: 'text-accent-primary', bgColor: 'bg-accent-primary/20', label: 'Good' },
  fair: { color: 'text-accent-solar-amber', bgColor: 'bg-accent-solar-amber/20', label: 'Fair' },
  high: { color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20', label: 'High' },
}

const CarbonFootprint = ({
  pageSizeKB: providedSize,
  showBreakdown = false,
  serverLocation = 'Global Average',
  compact = false,
  carbonIntensity = 475,
  className = '',
}: CarbonFootprintProps) => {
  const { pageSizeKB, carbonGrams, impactLevel, comparison } = useCarbonCost(
    providedSize,
    carbonIntensity,
  )

  const impact = impactStyles[impactLevel]

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-badge ${impact.bgColor} ${impact.color} border border-borders-subtle ${className}`}
        role="status"
        aria-label={`Carbon footprint: ${carbonGrams}g CO₂ — ${comparison}`}
      >
        <span className="text-sm" aria-hidden="true">🌍</span>
        <span className="text-xs font-semibold">{carbonGrams}g CO₂</span>
      </div>
    )
  }

  return (
    <div
      className={`bg-background-cardSurface border border-borders-subtle rounded-card p-6 ${className}`}
      role="region"
      aria-label="Carbon footprint"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl" aria-hidden="true">🌍</div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">Carbon Footprint</h3>
            <p className="text-xs text-text-tertiary">{serverLocation}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-badge text-xs font-semibold ${impact.bgColor} ${impact.color}`}
        >
          {impact.label}
        </span>
      </div>

      <div className="mb-4">
        <p
          className="text-2xl font-bold text-text-primary mb-1"
          style={{ letterSpacing: '-0.01em' }}
        >
          {carbonGrams}g CO₂
        </p>
        <p className="text-xs text-text-secondary">{comparison}</p>
      </div>

      {showBreakdown && (
        <div className="space-y-3 pt-4 border-t border-borders-subtle">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Page Size</span>
            <span className="text-xs font-semibold text-text-primary">{pageSizeKB.toFixed(0)} KB</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Data Transfer</span>
            <span className="text-xs font-semibold text-text-primary">
              {(pageSizeKB / 1024).toFixed(2)} MB
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Grid Intensity</span>
            <span className="text-xs font-semibold text-text-primary">
              {carbonIntensity}g CO₂/kWh
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-borders-subtle">
        <p className="text-xs text-text-tertiary">
          <span aria-hidden="true">💡</span> Calculated using{' '}
          <a
            href="https://www.thegreenwebfoundation.org/co2-js/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-link hover:underline"
          >
            CO2.js
          </a>{' '}
          methodology
        </p>
      </div>
    </div>
  )
}

export default CarbonFootprint
