import type { Meta, StoryObj } from '@storybook/react-vite'
import Input from './Input'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text input with label, helper text, error states, and 3 sizes. Uses `bg-surface` instead of `bg-muted` for lower contrast on OLED, `focus-visible` for keyboard-only rings, and CSS `box-shadow` for focus glow instead of Tailwind ring utilities (single repaint).',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'url'] },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email' },
}

export const WithHelperText: Story = {
  args: { label: 'Username', placeholder: 'johndoe', helperText: 'Must be 3–20 characters' },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address',
    value: 'invalid',
  },
}

export const Sizes: Story = {
  name: 'Size Scale',
  render: () => (
    <div className="space-y-4 w-72">
      <Input label="Small" size="sm" placeholder="Small input" />
      <Input label="Medium" size="md" placeholder="Medium input" />
      <Input label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
}

export const FormExample: Story = {
  name: 'Form Layout',
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Full name" placeholder="Jane Doe" />
      <Input label="Email" type="email" placeholder="jane@company.com" helperText="We'll never share your email" />
      <Input label="Password" type="password" placeholder="••••••••" />
    </div>
  ),
}
