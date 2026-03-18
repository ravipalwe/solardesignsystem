import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from '../components/form/Input'
import Textarea from '../components/form/Textarea'
import Select from '../components/form/Select'
import Checkbox from '../components/form/Checkbox'
import RadioGroup from '../components/form/Radio'
import Switch from '../components/form/Switch'
import Button from '../components/form/Button'

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders helper text', () => {
    render(<Input label="Name" helperText="Enter your full name" />)
    expect(screen.getByText('Enter your full name')).toBeInTheDocument()
  })

  it('shows error and hides helper text', () => {
    render(<Input label="Email" helperText="Required" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.queryByText('Required')).not.toBeInTheDocument()
  })

  it('has aria-invalid when error is present', () => {
    render(<Input label="Email" error="Invalid" />)
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
  })

  it('forwards ref', () => {
    const ref = { current: null as HTMLInputElement | null }
    render(<Input label="Test" ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})

// ---------------------------------------------------------------------------
// Textarea
// ---------------------------------------------------------------------------

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Message" />)
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('shows error state', () => {
    render(<Textarea label="Bio" error="Too long" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Too long')
  })
})

// ---------------------------------------------------------------------------
// Select
// ---------------------------------------------------------------------------

describe('Select', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
    { value: 'c', label: 'Option C' },
  ]

  it('renders options', () => {
    render(<Select label="Pick one" options={options} />)
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Select label="Pick" options={options} placeholder="Select..." />)
    expect(screen.getByText('Select...')).toBeInTheDocument()
  })

  it('shows error', () => {
    render(<Select label="Pick" options={options} error="Required" />)
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })
})

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />)
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
  })

  it('is checkable', () => {
    const onChange = vi.fn()
    render(<Checkbox label="Check me" onChange={onChange} />)
    fireEvent.click(screen.getByLabelText('Check me'))
    expect(onChange).toHaveBeenCalled()
  })
})

// ---------------------------------------------------------------------------
// RadioGroup
// ---------------------------------------------------------------------------

describe('RadioGroup', () => {
  const options = [
    { value: 'a', label: 'Alpha' },
    { value: 'b', label: 'Beta' },
  ]

  it('renders all options', () => {
    render(<RadioGroup name="test" options={options} />)
    expect(screen.getByLabelText('Alpha')).toBeInTheDocument()
    expect(screen.getByLabelText('Beta')).toBeInTheDocument()
  })

  it('calls onChange when option selected', () => {
    const onChange = vi.fn()
    render(<RadioGroup name="test" options={options} onChange={onChange} />)
    fireEvent.click(screen.getByLabelText('Beta'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('renders with legend', () => {
    render(<RadioGroup name="test" options={options} label="Choose" />)
    expect(screen.getByText('Choose')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Switch
// ---------------------------------------------------------------------------

describe('Switch', () => {
  it('renders with label', () => {
    render(<Switch label="Dark mode" checked={false} onChange={() => {}} />)
    expect(screen.getByText('Dark mode')).toBeInTheDocument()
  })

  it('toggles on click', () => {
    const onChange = vi.fn()
    render(<Switch label="Toggle" checked={false} onChange={onChange} />)
    fireEvent.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('has correct aria-checked', () => {
    render(<Switch label="Toggle" checked={true} onChange={() => {}} />)
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })
})

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when isLoading', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('is disabled when disabled', () => {
    render(<Button disabled>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies variant classes', () => {
    const { container } = render(<Button variant="danger">Delete</Button>)
    expect(container.querySelector('button')?.className).toContain('bg-accent-oled-rose')
  })
})
