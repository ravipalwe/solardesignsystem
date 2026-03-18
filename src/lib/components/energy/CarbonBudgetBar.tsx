import { useCarbonBudget, type BudgetStatus } from '../../hooks/useCarbonBudget'

export interface CarbonBudgetBarProps {
  /** Budget in grams CO₂ (default: 1.0) */
  budgetGrams?: number
  /** Show remaining budget (default: true) */
  showRemaining?: boolean
  /** Visual style */
  variant?: 'bar' | 'compact'
  /** Fixed position for dev overlay */
  position?: 'inline' | 'fixed-bottom'
  /** Carbon intensity override */
  carbonIntensity?: number
  /** Callback when budget is exceeded */
  onExceeded?: () => void
  /** Optional className */
  className?: string
}

const statusColors: Record<BudgetStatus, { bar: string; text: string; bg: string }> = {
  under: {
    bar: 'bg-accent-success',
    text: 'text-accent-success',
    bg: 'bg-accent-success/20',
  },
  warning: {
    bar: 'bg-accent-solar-amber',
    text: 'text-accent-solar-amber',
    bg: 'bg-accent-solar-amber/20',
  },
  exceeded: {
    bar: 'bg-accent-oled-rose',
    text: 'text-accent-oled-rose',
    bg: 'bg-accent-oled-rose/20',
  },
}

const CarbonBudgetBar = ({
  budgetGrams = 1.0,
  showRemaining = true,
  variant = 'bar',
  position = 'inline',
  carbonIntensity,
  onExceeded,
  className = '',
}: CarbonBudgetBarProps) => {
  const budget = useCarbonBudget({
    budgetGrams,
    carbonIntensity,
    onExceeded: onExceeded ? () => onExceeded() : undefined,
  })

  const colors = statusColors[budget.status]
  const clampedPercent = Math.min(budget.percentUsed, 100)

  const positionClass = position === 'fixed-bottom'
    ? 'fixed bottom-0 left-0 right-0 z-50'
    : ''

  if (variant === 'compact') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-badge ${colors.bg} ${colors.text} border border-borders-subtle ${className}`}
        role="status"
        aria-label={`Carbon budget: ${budget.percentUsed.toFixed(0)}% used (${budget.usedGrams.toFixed(2)}g of ${budgetGrams}g CO₂)`}
      >
        <span className="text-sm" aria-hidden="true">🌍</span>
        <span className="text-xs font-semibold">{budget.usedGrams.toFixed(2)}g / {budgetGrams}g</span>
        <div className="w-16 h-1.5 bg-background-badgeNeutral rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${colors.bar}`}
            style={{ width: `${clampedPercent}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-background-cardSurface border border-borders-subtle rounded-card p-4 ${positionClass} ${className}`}
      role="region"
      aria-label="Carbon budget tracker"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🌍</span>
          <h4 className="text-sm font-semibold text-text-primary">Carbon Budget</h4>
        </div>
        <span className={`px-2 py-1 rounded-badge text-xs font-semibold ${colors.bg} ${colors.text}`}>
          {budget.percentUsed.toFixed(0)}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-3 bg-background-badgeNeutral rounded-full overflow-hidden mb-3"
        role="progressbar"
        aria-valuenow={clampedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${budget.percentUsed.toFixed(0)}% of carbon budget used`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
          style={{ width: `${clampedPercent}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-text-secondary">
          {budget.usedGrams.toFixed(2)}g CO₂ used
        </span>
        {showRemaining && (
          <span className={`font-semibold ${colors.text}`}>
            {budget.remaining.grams.toFixed(2)}g remaining
          </span>
        )}
      </div>

      {budget.status === 'exceeded' && (
        <div className="mt-3 p-2 bg-accent-oled-rose/10 border border-accent-oled-rose/20 rounded-badge">
          <p className="text-xs text-accent-oled-rose">
            Budget exceeded. Consider reducing images, scripts, or third-party resources.
          </p>
        </div>
      )}
    </div>
  )
}

export default CarbonBudgetBar
