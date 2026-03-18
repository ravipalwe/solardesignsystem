import type { Meta, StoryObj } from '@storybook/react-vite'
import Badge from './Badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compact label for status, categories, or counts. Uses 12% opacity backgrounds instead of full-color fills — significantly less power on OLED panels.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'success', 'warning', 'danger', 'info', 'outline'] },
    size: { control: 'select', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Default' },
}

export const Success: Story = {
  args: { children: 'Online', variant: 'success', dot: true },
}

export const Warning: Story = {
  args: { children: 'High usage', variant: 'warning', dot: true },
}

export const Danger: Story = {
  args: { children: 'Over budget', variant: 'danger', dot: true },
}

export const Info: Story = {
  args: { children: 'New', variant: 'info' },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="warning" dot>Warning</Badge>
      <Badge variant="danger" dot>Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const Sizes: Story = {
  name: 'Size Scale',
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm" variant="success">Small</Badge>
      <Badge size="md" variant="success">Medium</Badge>
    </div>
  ),
}
