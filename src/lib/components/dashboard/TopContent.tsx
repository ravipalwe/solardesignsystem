import type { TopContentProps } from '../../types'

const TopContent = ({
  title = 'Top Performing Content',
  items,
}: TopContentProps) => {
  if (items.length === 0) {
    return (
      <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-6">{title}</h2>
        <p className="text-sm text-text-tertiary text-center py-8">No content available</p>
      </div>
    )
  }

  return (
    <div className="bg-background-cardSurface border border-borders-subtle rounded-card p-6">
      <h2 className="text-lg font-semibold text-text-primary mb-6">{title}</h2>
      <div className="space-y-4" role="list" aria-label={title}>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-input bg-background-badgeNeutral border border-borders-subtle hover:bg-background-cardSurfaceHover transition-colors"
            role="listitem"
          >
            <div
              className="text-3xl flex-shrink-0"
              role="img"
              aria-label={`${item.title} thumbnail`}
            >
              {item.thumbnail}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary mb-2 line-clamp-2">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">👁️</span>
                  <span>{item.views} views</span>
                </span>
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">💬</span>
                  <span>{item.engagement} engagement</span>
                </span>
                <span className="flex items-center gap-1">
                  <span aria-hidden="true">💰</span>
                  <span>{item.revenue} revenue</span>
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
