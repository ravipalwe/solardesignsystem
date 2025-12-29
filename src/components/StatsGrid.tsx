interface StatsGridProps {
  timeRange: '7d' | '30d' | '90d'
}

const StatsGrid = ({ timeRange }: StatsGridProps) => {
  // Mock data - in a real app, this would come from an API
  const stats = [
    {
      label: 'Total Views',
      value: timeRange === '7d' ? '124.5K' : timeRange === '30d' ? '487.2K' : '1.2M',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: '👁️',
    },
    {
      label: 'Subscribers',
      value: timeRange === '7d' ? '+1.2K' : timeRange === '30d' ? '+4.8K' : '+12.3K',
      change: '+8.3%',
      changeType: 'positive' as const,
      icon: '👥',
    },
    {
      label: 'Engagement Rate',
      value: '4.8%',
      change: '+0.6%',
      changeType: 'positive' as const,
      icon: '💬',
    },
    {
      label: 'Revenue',
      value: timeRange === '7d' ? '$2.4K' : timeRange === '30d' ? '$9.8K' : '$24.5K',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: '💰',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-background-cardSurface border border-borders-subtle rounded-card p-6 hover:bg-background-cardSurfaceHover transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="text-2xl">{stat.icon}</div>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-badge ${
                stat.changeType === 'positive'
                  ? 'bg-accent-success/20 text-accent-success'
                  : 'bg-accent-red/20 text-accent-red'
              }`}
            >
              {stat.change}
            </span>
          </div>
          <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2" style={{ letterSpacing: '0.05em' }}>
            {stat.label}
          </h3>
          <p className="text-2xl font-bold text-text-primary" style={{ letterSpacing: '-0.01em' }}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid

