import type { Meta, StoryObj } from '@storybook/react-vite'
import Avatar from './Avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'User avatar with image, initials fallback, and optional status indicator. Images use `loading="lazy"` and `decoding="async"` by default — zero data transfer until visible.',
      },
    },
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    status: { control: 'select', options: [undefined, 'online', 'offline', 'busy', 'away'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {
  args: { initials: 'RP', size: 'lg' },
}

export const WithStatus: Story = {
  args: { initials: 'JD', size: 'lg', status: 'online' },
}

export const Sizes: Story = {
  name: 'Size Scale',
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
    </div>
  ),
}

export const StatusIndicators: Story = {
  name: 'Status Indicators',
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar initials="ON" size="lg" status="online" />
      <Avatar initials="AW" size="lg" status="away" />
      <Avatar initials="BS" size="lg" status="busy" />
      <Avatar initials="OF" size="lg" status="offline" />
    </div>
  ),
}

export const AvatarGroup: Story = {
  name: 'Avatar Group',
  render: () => (
    <div className="flex -space-x-2">
      <Avatar initials="A" size="md" className="ring-2 ring-background-appCanvas" />
      <Avatar initials="B" size="md" className="ring-2 ring-background-appCanvas" />
      <Avatar initials="C" size="md" className="ring-2 ring-background-appCanvas" />
      <Avatar initials="+3" size="md" className="ring-2 ring-background-appCanvas" />
    </div>
  ),
}
