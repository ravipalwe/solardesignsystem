interface TopContentProps {
  timeRange: '7d' | '30d' | '90d'
}

const TopContent = ({ timeRange }: TopContentProps) => {
  const topContent = [
    {
      title: '10 Productivity Hacks That Changed My Life',
      views: '125K',
      engagement: '6.2%',
      revenue: '$1.2K',
      thumbnail: '📹',
    },
    {
      title: 'Building a Side Project in 30 Days',
      views: '98K',
      engagement: '5.8%',
      revenue: '$950',
      thumbnail: '🎬',
    },
    {
      title: 'My Morning Routine for Success',
      views: '87K',
      engagement: '5.5%',
      revenue: '$820',
      thumbnail: '📺',
    },
  ]

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6">Top Performing Content</h2>
      <div className="space-y-4">
        {topContent.map((content, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-input bg-background-badgeNeutral border border-borders-subtle hover:bg-background-cardSurfaceHover transition-colors"
          >
            <div className="text-3xl flex-shrink-0">{content.thumbnail}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2">
                {content.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <span className="text-accent-blue">👁️</span> {content.views}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-accent-purple">💬</span> {content.engagement}
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-accent-success">💰</span> {content.revenue}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopContent

