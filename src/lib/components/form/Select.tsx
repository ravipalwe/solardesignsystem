import { forwardRef } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  helperText?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-3.5 text-sm',
  lg: 'h-11 px-4 text-base',
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, options, placeholder, size = 'md', className = '', id, ...rest }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)
    const errorId = error ? `${selectId}-error` : undefined

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-medium text-text-secondary mb-1.5"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full bg-background-cardSurface border ${
            error ? 'border-accent-oled-rose/60' : 'border-borders-default'
          } rounded-input ${sizeClasses[size]} text-text-primary transition-all duration-base ease-solar outline-none focus-visible:border-accent-primary focus-visible:shadow-solar-focus ${
            error ? 'focus-visible:border-accent-oled-rose focus-visible:shadow-[0_0_0_2px_rgb(244_63_94/0.2)]' : ''
          } appearance-none cursor-pointer`}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-accent-oled-rose" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-text-tertiary">{helperText}</p>
        )}
      </div>
    )
  },
)

Select.displayName = 'Select'

export default Select
