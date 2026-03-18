import type { ChartCardProps } from '../../types'

const ChartCard = ({
  title = 'Chart',
  data,
  summaries,
}: ChartCardProps) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6">{title}</h2>

      <div className="space-y-4">
        {/* Bar chart */}
        <div
          className="flex items-end justify-between gap-2 h-48"
          role="img"
          aria-label={`Bar chart: ${title}`}
        >
          {data.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full flex items-end justify-center"
                style={{ height: '100%' }}
              >
                <div
                  className="w-full rounded-t-sm bg-accent-primary transition-all hover:bg-accent-primary-dim"
                  style={{
                    height: `${(point.value / maxValue) * 100}%`,
                    minHeight: '4px',
                  }}
                  role="presentation"
                  aria-label={`${point.label}: ${point.value}`}
                />
              </div>
              <span className="text-xs text-text-tertiary">{point.label}</span>
            </div>
          ))}
        </div>

        {/* Summaries */}
        {summaries && summaries.length > 0 && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-borders-subtle">
            {summaries.map((s, i) => (
              <div key={i} className={i > 0 ? 'text-right' : ''}>
                <p
                  className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {s.label}
                </p>
                <p className="text-xl font-bold text-text-primary">{s.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChartCard
