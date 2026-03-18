import { useState } from 'react'

interface DataCostBadgeProps {
  /** Action label (e.g., "Load Video", "Download File") */
  label: string
  /** Data size in KB */
  dataSizeKB: number
  /** Show carbon cost */
  showCarbonCost?: boolean
  /** Show financial cost (optional) */
  showFinancialCost?: boolean
  /** Financial cost per MB (in cents) - varies by mobile plan */
  costPerMB?: number
  /** Callback when user acknowledges the cost */
  onAcknowledge?: () => void
  /** Icon emoji for the action */
  icon?: string
  /** Dismissible badge */
  dismissible?: boolean
}

const DataCostBadge = ({
  label,
  dataSizeKB,
  showCarbonCost = true,
  showFinancialCost = false,
  costPerMB = 10, // 10 cents per MB (rough estimate for mobile data)
  onAcknowledge,
  icon = '📊',
  dismissible = false,
}: DataCostBadgeProps) => {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  // Calculate costs
  const dataSizeMB = dataSizeKB / 1024
  const carbonCostGrams = (dataSizeMB / 1024) * 0.06 * 475 // CO2.js methodology
  const financialCost = (dataSizeMB * costPerMB) / 100 // Convert cents to dollars

  const formatDataSize = (kb: number): string => {
    if (kb < 1024) return `${kb.toFixed(0)} KB`
    const mb = kb / 1024
    if (mb < 10) return `${mb.toFixed(1)} MB`
    return `${mb.toFixed(0)} MB`
  }

  const getSizeLevel = (kb: number): { color: string; bgColor: string; label: string } => {
    const mb = kb / 1024
    if (mb < 1) {
      return { color: 'text-accent-success', bgColor: 'bg-accent-success/20', label: 'Light' }
    } else if (mb < 5) {
      return { color: 'text-accent-solar-amber', bgColor: 'bg-accent-solar-amber/20', label: 'Moderate' }
    } else if (mb < 20) {
      return { color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20', label: 'Heavy' }
    }
    return { color: 'text-accent-oled-rose', bgColor: 'bg-accent-oled-rose/20', label: 'Very Heavy' }
  }

  const sizeLevel = getSizeLevel(dataSizeKB)

  const handleAcknowledge = () => {
    if (onAcknowledge) {
      onAcknowledge()
    }
    if (dismissible) {
      setIsDismissed(true)
    }
  }

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <h4 className="text-sm font-semibold text-text-primary">{label}</h4>
        </div>
        <span className={`px-2 py-1 rounded-badge text-xs font-semibold ${sizeLevel.bgColor} ${sizeLevel.color}`}>
          {sizeLevel.label}
        </span>
      </div>

      {/* Data size */}
      <div className="mb-3">
        <p className="text-xs text-text-secondary mb-1">Data Transfer</p>
        <p className="text-xl font-bold text-text-primary" style={{ letterSpacing: '-0.01em' }}>
          {formatDataSize(dataSizeKB)}
        </p>
      </div>

      {/* Cost breakdown */}
      <div className="space-y-2 mb-4">
        {showCarbonCost && (
          <div className="flex items-center justify-between py-2 px-3 bg-background-badgeNeutral rounded-badge">
            <div className="flex items-center gap-2">
              <span className="text-sm">🌍</span>
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
              <span className="text-sm">💵</span>
              <span className="text-xs text-text-secondary">Estimated Cost</span>
            </div>
            <span className="text-xs font-semibold text-text-primary">
              ${financialCost.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Info message */}
      <div className="bg-accent-primary/10 border border-accent-primary/20 rounded-badge p-3 mb-3">
        <p className="text-xs text-text-secondary">
          💡 This action will consume <strong className="text-text-primary">{formatDataSize(dataSizeKB)}</strong> of data
          {showCarbonCost && ` and emit ${carbonCostGrams.toFixed(2)}g of CO₂`}.
        </p>
      </div>

      {/* Action buttons */}
      {(onAcknowledge || dismissible) && (
        <div className="flex gap-2">
          {onAcknowledge && (
            <button
              onClick={handleAcknowledge}
              className="flex-1 bg-accent-primary text-black rounded-button px-4 py-2 text-sm font-semibold hover:bg-accent-primary-dim transition-colors"
            >
              Continue Anyway
            </button>
          )}
          {dismissible && (
            <button
              onClick={() => setIsDismissed(true)}
              className="flex-1 bg-transparent text-text-primary border border-borders-contrast rounded-button px-4 py-2 text-sm font-semibold hover:bg-background-cardSurfaceHover transition-colors"
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

