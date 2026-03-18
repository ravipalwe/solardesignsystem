import { forwardRef } from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Full width */
  fullWidth?: boolean
  /** Loading state */
  isLoading?: boolean
  /** Optional left icon */
  iconLeft?: React.ReactNode
  /** Optional right icon */
  iconRight?: React.ReactNode
}

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-button select-none transition-all duration-base ease-solar outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-appCanvas disabled:opacity-40 disabled:pointer-events-none'

const variantClasses = {
  primary:
    'bg-accent-primary text-text-inverse hover:bg-accent-primary-hover active:bg-accent-primary-dim shadow-solar-sm hover:shadow-solar-md',
  secondary:
    'bg-transparent text-text-primary border border-borders-default hover:bg-background-cardSurfaceHover hover:border-borders-contrast active:bg-background-badgeNeutral',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-background-cardSurfaceHover active:bg-background-badgeNeutral',
  danger:
    'bg-accent-oled-rose/12 text-accent-oled-rose border border-accent-oled-rose/20 hover:bg-accent-oled-rose/20 hover:border-accent-oled-rose/30 active:bg-accent-oled-rose/25',
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-11 px-6 text-base gap-2',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth,
      isLoading,
      iconLeft,
      iconRight,
      children,
      className = '',
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled || isLoading}
        className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...rest}
      >
        {isLoading ? (
          <div
            className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
        ) : (
          iconLeft
        )}
        {children}
        {!isLoading && iconRight}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
