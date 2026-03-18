import { forwardRef } from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  /** Size */
  size?: 'sm' | 'md'
  /** Optional dot indicator */
  dot?: boolean
}

const variantClasses = {
  default: 'bg-background-badgeNeutral text-text-secondary',
  success: 'bg-accent-success/12 text-accent-success',
  warning: 'bg-accent-solar-amber/12 text-accent-solar-amber',
  danger: 'bg-accent-oled-rose/12 text-accent-oled-rose',
  info: 'bg-accent-cyan/12 text-accent-cyan',
  outline: 'bg-transparent text-text-secondary border border-borders-default',
}

const dotColors = {
  default: 'bg-text-tertiary',
  success: 'bg-accent-success',
  warning: 'bg-accent-solar-amber',
  danger: 'bg-accent-oled-rose',
  info: 'bg-accent-cyan',
  outline: 'bg-text-tertiary',
}

const sizeClasses = {
  sm: 'px-1.5 py-0.5 text-2xs',
  md: 'px-2 py-0.5 text-xs',
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, children, className = '', ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={`inline-flex items-center gap-1.5 font-medium rounded-badge whitespace-nowrap leading-tight ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        {dot && (
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`} aria-hidden="true" />
        )}
        {children}
      </span>
    )
  },
)

Badge.displayName = 'Badge'

export default Badge
