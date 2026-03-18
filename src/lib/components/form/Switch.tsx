export interface SwitchProps {
  /** Label text */
  label: string
  /** Whether the switch is on */
  checked: boolean
  /** Change handler */
  onChange: (checked: boolean) => void
  /** Disabled state */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md'
  /** Optional className */
  className?: string
}

const sizeConfig = {
  sm: { track: 'w-8 h-[18px]', thumb: 'w-3.5 h-3.5', translate: 'translate-x-[14px]', offset: 'translate-x-0.5' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5', offset: 'translate-x-0.5' },
}

const Switch = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
}: SwitchProps) => {
  const s = sizeConfig[size]

  return (
    <label className={`inline-flex items-center gap-2.5 ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-base ease-solar outline-none focus-visible:shadow-solar-focus ${
          checked ? 'bg-accent-primary' : 'bg-borders-contrast'
        }`}
      >
        <span
          className={`inline-block ${s.thumb} rounded-full transition-transform duration-base ease-solar shadow-solar-sm ${
            checked ? `${s.translate} bg-black` : `${s.offset} bg-text-primary`
          }`}
        />
      </button>
      <span className={`text-sm ${disabled ? 'text-text-tertiary' : 'text-text-primary'}`}>
        {label}
      </span>
    </label>
  )
}

export default Switch
