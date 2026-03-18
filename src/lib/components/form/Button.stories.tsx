import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from '@storybook/test'
import Button from './Button'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Energy-efficient action button. Uses CSS transitions instead of JS animations, minimal box-shadow for depth, and `focus-visible` for keyboard-only focus rings — saving paint cycles on every interaction.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
      table: { defaultValue: { summary: 'md' } },
    },
    fullWidth: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Get Started', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Learn More', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost' },
}

export const Danger: Story = {
  args: { children: 'Delete Account', variant: 'danger' },
}

export const Loading: Story = {
  args: { children: 'Saving…', isLoading: true },
}

export const Sizes: Story = {
  name: 'Size Scale',
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
        <Button variant="secondary" disabled>Disabled</Button>
      </div>
    </div>
  ),
}

export const ButtonPair: Story = {
  name: 'Common Pair',
  render: () => (
    <div className="flex items-center gap-2">
      <Button variant="primary">Confirm</Button>
      <Button variant="ghost">Cancel</Button>
    </div>
  ),
}
