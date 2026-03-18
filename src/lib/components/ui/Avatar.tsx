import { forwardRef, useState } from 'react'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Fallback initials (shown when no image or image fails) */
  initials?: string
  /** Size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Shape */
  shape?: 'circle' | 'square'
  /** Status indicator */
  status?: 'online' | 'offline' | 'busy' | 'away'
}

const sizeClasses = {
  xs: 'w-6 h-6 text-2xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-xl',
}

const statusDotSize = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
}

const statusColors = {
  online: 'bg-accent-success',
  offline: 'bg-text-tertiary',
  busy: 'bg-accent-oled-rose',
  away: 'bg-accent-solar-amber',
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', shape = 'circle', status, className = '', ...rest }, ref) => {
    const [imgError, setImgError] = useState(false)
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt || initials || 'Avatar'}
        className={`relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden bg-background-badgeNeutral text-text-secondary font-medium ${sizeClasses[size]} ${shape === 'circle' ? 'rounded-full' : 'rounded-lg'} ${className}`}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || ''}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="select-none">
            {initials || '?'}
          </span>
        )}
        {status && (
          <span
            className={`absolute bottom-0 right-0 ${statusDotSize[size]} ${statusColors[status]} rounded-full ring-2 ring-background-appCanvas`}
            aria-label={status}
          />
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'

export default Avatar
