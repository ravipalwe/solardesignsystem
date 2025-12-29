interface ChartCardProps {
  timeRange: '7d' | '30d' | '90d'
}

const ChartCard = ({ timeRange }: ChartCardProps) => {
  // Mock chart data - in a real app, this would be a proper chart library
  const chartData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 52 },
    { day: 'Wed', value: 48 },
    { day: 'Thu', value: 61 },
    { day: 'Fri', value: 55 },
    { day: 'Sat', value: 68 },
    { day: 'Sun', value: 72 },
  ]

  const maxValue = Math.max(...chartData.map(d => d.value))

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6">Views Over Time</h2>
      <div className="space-y-4">
        <div className="flex items-end justify-between gap-2 h-48">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center" style={{ height: '100%' }}>
                <div
                  className="w-full rounded-t-sm bg-accent-primary transition-all hover:bg-accent-primaryDim"
                  style={{
                    height: `${(data.value / maxValue) * 100}%`,
                    minHeight: '4px',
                  }}
                />
              </div>
              <span className="text-xs text-text-tertiary">{data.day}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-borders-subtle">
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1" style={{ letterSpacing: '0.05em' }}>
              Average Daily Views
            </p>
            <p className="text-xl font-bold text-text-primary">57.3K</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-1" style={{ letterSpacing: '0.05em' }}>
              Peak Day
            </p>
            <p className="text-xl font-bold text-text-primary">72K</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChartCard

