import { forwardRef } from 'react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Semantic variant */
  variant?: 'info' | 'success' | 'warning' | 'danger'
  /** Alert title */
  title?: string
  /** Dismissable — renders close button */
  onDismiss?: () => void
}

const variantClasses = {
  info: 'border-accent-cyan/20 bg-accent-cyan/6 text-accent-cyan',
  success: 'border-accent-success/20 bg-accent-success/6 text-accent-success',
  warning: 'border-accent-solar-amber/20 bg-accent-solar-amber/6 text-accent-solar-amber',
  danger: 'border-accent-oled-rose/20 bg-accent-oled-rose/6 text-accent-oled-rose',
}

const iconPaths = {
  info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  success: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  warning: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
  danger: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'info', title, onDismiss, children, className = '', ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={`relative flex gap-3 rounded-lg border p-4 text-sm ${variantClasses[variant]} ${className}`}
        {...rest}
      >
        <svg
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={iconPaths[variant]} />
        </svg>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-medium mb-1">{title}</p>
          )}
          <div className="text-current/80">{children}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="flex-shrink-0 p-0.5 -m-0.5 rounded opacity-60 hover:opacity-100 transition-opacity duration-fast outline-none focus-visible:shadow-solar-focus"
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  },
)

Alert.displayName = 'Alert'

export default Alert
