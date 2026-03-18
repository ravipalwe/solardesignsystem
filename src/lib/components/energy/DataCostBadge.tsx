import { useState } from 'react'
import type { DataCostBadgeProps, SizeLevel } from '../../types'

const sizeStyles: Record<SizeLevel, { color: string; bgColor: string; label: string }> = {
  light: { color: 'text-accent-success', bgColor: 'bg-accent-success/20', label: 'Light' },
  moderate: { color: 'text-accent-solar-amber', bgColor: 'bg-accent-solar-amber/20', label: 'Moderate' },
  heavy: { color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20', label: 'Heavy' },
  'very-heavy': { color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20', label: 'Very Heavy' },
}

function getSizeLevel(kb: number): SizeLevel {
  const mb = kb / 1024
  if (mb < 1) return 'light'
  if (mb < 5) return 'moderate'
  if (mb < 20) return 'heavy'
  return 'very-heavy'
}

function formatDataSize(kb: number): string {
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  const mb = kb / 1024
  if (mb < 10) return `${mb.toFixed(1)} MB`
  return `${mb.toFixed(0)} MB`
}

const DataCostBadge = ({
  label,
  dataSizeKB,
  showCarbonCost = true,
  showFinancialCost = false,
  costPerMB = 10,
  onAcknowledge,
  icon = '📊',
  dismissible = false,
  className = '',
}: DataCostBadgeProps) => {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const dataSizeMB = dataSizeKB / 1024
  const carbonCostGrams = (dataSizeMB / 1024) * 0.06 * 475
  const financialCost = (dataSizeMB * costPerMB) / 100

  const level = getSizeLevel(dataSizeKB)
  const styles = sizeStyles[level]

  const handleAcknowledge = () => {
    onAcknowledge?.()
    if (dismissible) setIsDismissed(true)
  }

  return (
    <div
      className={`bg-background-cardSurface border border-borders-subtle rounded-card p-4 ${className}`}
      role="region"
      aria-label={`Data cost for ${label}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">{icon}</span>
          <h4 className="text-sm font-semibold text-text-primary">{label}</h4>
        </div>
        <span
          className={`px-2 py-1 rounded-badge text-xs font-semibold ${styles.bgColor} ${styles.color}`}
        >
          {styles.label}
        </span>
      </div>

      {/* Data size */}
      <div className="mb-3">
        <p className="text-xs text-text-secondary mb-1">Data Transfer</p>
        <p
          className="text-xl font-bold text-text-primary"
          style={{ letterSpacing: '-0.01em' }}
        >
          {formatDataSize(dataSizeKB)}
        </p>
      </div>

      {/* Cost breakdown */}
      <div className="space-y-2 mb-4">
        {showCarbonCost && (
          <div className="flex items-center justify-between py-2 px-3 bg-background-badgeNeutral rounded-badge">
            <div className="flex items-center gap-2">
              <span className="text-sm" aria-hidden="true">🌍</span>
              <span className="text-xs text-text-secondary">Carbon Cost</span>
            </div>
            <span className="text-xs font-semibold text-text-primary">
              {carbonCostGrams.toFixed(2)}g CO₂
            </span>
          </div>
        )}

        {showFinancialCost && (
          <div className="flex items-center justify-between py-2 px-3 bg-background-badgeNeutral rounded-badge">
            <div className="flex items-center gap-2">
              <span className="text-sm" aria-hidden="true">💵</span>
              <span className="text-xs text-text-secondary">Estimated Cost</span>
            </div>
            <span className="text-xs font-semibold text-text-primary">
              ${financialCost.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-accent-primary/10 border border-accent-primary/20 rounded-badge p-3 mb-3">
        <p className="text-xs text-text-secondary">
          <span aria-hidden="true">💡</span> This action will consume{' '}
          <strong className="text-text-primary">{formatDataSize(dataSizeKB)}</strong> of data
          {showCarbonCost && ` and emit ${carbonCostGrams.toFixed(2)}g of CO₂`}.
        </p>
      </div>

      {/* Actions */}
      {(onAcknowledge || dismissible) && (
        <div className="flex gap-2">
          {onAcknowledge && (
            <button
              type="button"
              onClick={handleAcknowledge}
              className="flex-1 bg-accent-primary text-black rounded-button px-4 py-2 text-sm font-semibold hover:bg-accent-primary-dim transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-appCanvas"
            >
              Continue Anyway
            </button>
          )}
          {dismissible && (
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="flex-1 bg-transparent text-text-primary border border-borders-contrast rounded-button px-4 py-2 text-sm font-semibold hover:bg-background-cardSurfaceHover transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-appCanvas"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default DataCostBadge
