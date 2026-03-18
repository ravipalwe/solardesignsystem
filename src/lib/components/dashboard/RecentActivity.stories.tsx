import type { Meta, StoryObj } from '@storybook/react-vite'
import RecentActivity from './RecentActivity'

const meta = {
  title: 'Dashboard/RecentActivity',
  component: RecentActivity,
  tags: ['autodocs'],
} satisfies Meta<typeof RecentActivity>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    activities: [
      { type: 'subscriber', message: 'Gained 150 new subscribers', time: '2 hours ago', icon: '👥' },
      { type: 'milestone', message: 'Reached 50K views milestone', time: '5 hours ago', icon: '🎉' },
      { type: 'comment', message: 'New comment on "Productivity Hacks"', time: '8 hours ago', icon: '💬' },
    ],
  },
}

export const Empty: Story = {
  args: { activities: [] },
}
