import type { RecentActivityProps } from '../../types'

const RecentActivity = ({
  title = 'Recent Activity',
  activities,
}: RecentActivityProps) => {
  if (activities.length === 0) {
    return (
      <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">{title}</h2>
        <p className="text-sm text-text-tertiary text-center py-8">No recent activity</p>
      </div>
    )
  }

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6">{title}</h2>
      <div className="space-y-3" role="list" aria-label={title}>
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-input bg-background-badgeNeutral border border-borders-subtle hover:bg-background-cardSurfaceHover transition-colors"
            role="listitem"
          >
            <div
              className="text-xl flex-shrink-0"
              role="img"
              aria-hidden="true"
            >
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{activity.message}</p>
              <p className="text-xs text-text-tertiary mt-1">
                <time>{activity.time}</time>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
