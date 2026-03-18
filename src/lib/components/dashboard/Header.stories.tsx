import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from '@storybook/test'
import Header from './Header'

const meta = {
  title: 'Dashboard/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Page header with title, subtitle, and optional user avatar. Uses `role="banner"` for accessibility.',
      },
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Creator Analytics',
    subtitle: 'Track your content performance',
    userInitials: 'JD',
    onAvatarClick: fn(),
  },
}

export const TitleOnly: Story = {
  args: { title: 'Dashboard' },
}

export const WithSubtitle: Story = {
  args: { title: 'Reports', subtitle: 'Monthly performance overview' },
}
