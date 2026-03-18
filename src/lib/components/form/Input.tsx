import { forwardRef } from 'react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label text */
  label?: string
  /** Helper text below the input */
  helperText?: string
  /** Error message (replaces helperText when present) */
  error?: string
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-11 px-4 text-base',
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, size = 'md', className = '', id, ...rest }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText && !error ? `${inputId}-helper` : undefined

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-background-cardSurface border ${
            error ? 'border-accent-oled-rose/60' : 'border-borders-default'
          } rounded-input ${sizeClasses[size]} text-text-primary placeholder:text-text-tertiary transition-all duration-base ease-solar outline-none focus-visible:border-accent-primary focus-visible:shadow-solar-focus ${
            error ? 'focus-visible:border-accent-oled-rose focus-visible:shadow-[0_0_0_2px_rgb(244_63_94/0.2)]' : ''
          }`}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId || helperId}
          {...rest}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-accent-oled-rose" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-text-tertiary">
            {helperText}
          </p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export default Input
