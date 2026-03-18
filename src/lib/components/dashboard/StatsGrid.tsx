import type { StatsGridProps } from '../../types'

const columnClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
}

const StatsGrid = ({ stats, columns }: StatsGridProps) => {
  const cols = columns ?? Math.min(stats.length, 4)

  return (
    <div
      className={`grid ${columnClasses[cols] ?? columnClasses[4]} gap-6`}
      role="list"
      aria-label="Statistics"
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 hover:bg-background-cardSurfaceHover transition-colors"
          role="listitem"
        >
          <div className="flex items-start justify-between mb-4">
            <div
              className="text-2xl"
              role="img"
              aria-label={stat.label}
            >
              {stat.icon}
            </div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-badge ${
                stat.changeType === 'positive'
                  ? 'bg-accent-success/20 text-accent-success'
                  : 'bg-accent-oled-rose/20 text-accent-oled-rose'
              }`}
              aria-label={`${stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by ${stat.change}`}
            >
              {stat.change}
            </span>
          </div>
          <h3
            className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2"
            style={{ letterSpacing: '0.05em' }}
          >
            {stat.label}
          </h3>
          <p
            className="text-2xl font-bold text-text-primary"
            style={{ letterSpacing: '-0.01em' }}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid
