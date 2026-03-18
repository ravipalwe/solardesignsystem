import type { HeaderProps } from '../../types'

const Header = ({
  title = 'Dashboard',
  subtitle,
  userInitials,
  onAvatarClick,
}: HeaderProps) => {
  return (
    <header className="border-b border-borders-subtle bg-background-cardSurface" role="banner">
      <div className="container mx-auto px-6 py-4 max-w-7xl flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-text-primary"
            style={{ letterSpacing: '-0.01em' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
          )}
        </div>

        {userInitials && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onAvatarClick}
              className="w-10 h-10 rounded-full bg-background-badgeNeutral border border-borders-subtle flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-appCanvas"
              aria-label={`User menu for ${userInitials}`}
            >
              <span className="text-accent-primary font-semibold" aria-hidden="true">
                {userInitials}
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
