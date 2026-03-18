import { useGridIntensity, getIntensityLevel } from '../../hooks/useGridIntensity'
import type { GridStatusBadgeProps, GridIntensityLevel } from '../../types'

const levelConfig: Record<GridIntensityLevel, {
  label: string
  color: string
  bgColor: string
  icon: string
  message: string
}> = {
  'very-low': {
    label: 'Very Low',
    color: 'text-accent-success',
    bgColor: 'bg-accent-success/20',
    icon: '🟢',
    message: 'Grid is very clean! Great time to use energy.',
  },
  low: {
    label: 'Low',
    color: 'text-accent-deep-teal',
    bgColor: 'bg-accent-deep-teal/20',
    icon: '🟡',
    message: 'Grid is relatively clean.',
  },
  moderate: {
    label: 'Moderate',
    color: 'text-accent-solar-amber',
    bgColor: 'bg-accent-solar-amber/20',
    icon: '🟠',
    message: 'Moderate grid intensity.',
  },
  high: {
    label: 'High',
    color: 'text-accent-oled-rose',
    bgColor: 'bg-accent-oled-rose/20',
    icon: '🔴',
    message: 'Grid intensity is high. Consider deferring heavy tasks.',
  },
  'very-high': {
    label: 'Very High',
    color: 'text-accent-oled-rose',
    bgColor: 'bg-accent-oled-rose/20',
    icon: '⛔',
    message: 'Grid intensity is very high. Eco mode recommended.',
  },
}

const formatLastUpdated = (date: Date): string => {
  const diffMinutes = Math.floor((Date.now() - date.getTime()) / 60000)
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes === 1) return '1 minute ago'
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours === 1) return '1 hour ago'
  return `${diffHours} hours ago`
}

const GridStatusBadge = ({
  region = 'Global Average',
  carbonIntensity,
  showDetails = false,
  compact = false,
  pollInterval = 5 * 60 * 1000,
  className = '',
}: GridStatusBadgeProps) => {
  const { intensity, lastUpdated } = useGridIntensity(carbonIntensity, pollInterval)
  const level = getIntensityLevel(intensity)
  const status = levelConfig[level]

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-badge ${status.bgColor} ${status.color} border border-borders-subtle ${className}`}
        role="status"
        aria-label={`Grid status: ${intensity}g CO₂/kWh — ${status.message}`}
      >
        <span className="text-sm" aria-hidden="true">{status.icon}</span>
        <span className="text-xs font-semibold">{intensity}g CO₂/kWh</span>
      </div>
    )
  }

  return (
    <div
      className={`bg-background-cardSurface border border-borders-subtle rounded-card p-6 ${className}`}
      role="region"
      aria-label="Grid carbon intensity status"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-badge ${status.bgColor}`}
            aria-hidden="true"
          >
            <span className="text-2xl">{status.icon}</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-1">Grid Status</h3>
            <p className="text-xs text-text-tertiary">{region}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-badge text-xs font-semibold ${status.bgColor} ${status.color}`}
        >
          {status.label}
        </span>
      </div>

      <div className="mb-4">
        <p
          className="text-2xl font-bold text-text-primary mb-1"
          style={{ letterSpacing: '-0.01em' }}
        >
          {intensity}
          <span className="text-sm font-normal text-text-secondary ml-1">gCO₂/kWh</span>
        </p>
        <p className="text-xs text-text-secondary">{status.message}</p>
      </div>

      {showDetails && (
        <div className="space-y-2 pt-4 border-t border-borders-subtle">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Last Updated</span>
            <span className="text-xs font-semibold text-text-primary">
              <time>{formatLastUpdated(lastUpdated)}</time>
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-secondary">Region</span>
            <span className="text-xs font-semibold text-text-primary">{region}</span>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-borders-subtle">
        <p className="text-xs text-text-tertiary">
          <span aria-hidden="true">📊</span> Data from{' '}
          <a
            href="https://app.electricitymaps.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-link hover:underline"
          >
            Electricity Maps
          </a>
        </p>
      </div>
    </div>
  )
}

export default GridStatusBadge
