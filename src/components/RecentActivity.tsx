const RecentActivity = () => {
  const activities = [
    {
      type: 'new_subscriber',
      message: 'Gained 150 new subscribers',
      time: '2 hours ago',
      icon: '👥',
      color: 'accent-blue',
    },
    {
      type: 'milestone',
      message: 'Reached 50K total views milestone',
      time: '5 hours ago',
      icon: '🎉',
      color: 'accent-success',
    },
    {
      type: 'comment',
      message: 'New comment on "10 Productivity Hacks"',
      time: '8 hours ago',
      icon: '💬',
      color: 'accent-purple',
    },
    {
      type: 'revenue',
      message: 'Received $450 in revenue',
      time: '1 day ago',
      icon: '💰',
      color: 'accent-success',
    },
  ]

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-input bg-background-badgeNeutral border border-borders-subtle hover:bg-background-cardSurfaceHover transition-colors"
          >
            <div className={`text-xl flex-shrink-0`}>{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{activity.message}</p>
              <p className="text-xs text-text-tertiary mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity

