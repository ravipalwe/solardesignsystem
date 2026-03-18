import type { Meta, StoryObj } from '@storybook/react-vite'
import TopContent from './TopContent'

const meta = {
  title: 'Dashboard/TopContent',
  component: TopContent,
  tags: ['autodocs'],
} satisfies Meta<typeof TopContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { title: '10 Productivity Hacks That Changed My Life', views: '125K', engagement: '6.2%', revenue: '$1.2K', thumbnail: '📹' },
      { title: 'Building a Side Project in 30 Days', views: '98K', engagement: '5.8%', revenue: '$950', thumbnail: '🎬' },
      { title: 'My Morning Routine for Success', views: '87K', engagement: '5.5%', revenue: '$820', thumbnail: '📺' },
    ],
  },
}

export const Empty: Story = {
  args: { items: [] },
}
