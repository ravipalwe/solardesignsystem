import type { Meta, StoryObj } from '@storybook/react-vite'
import StatsGrid from './StatsGrid'
import type { StatItem } from '../../types'

const sampleStats: StatItem[] = [
  { label: 'Total Views', value: '487.2K', change: '+12.5%', changeType: 'positive', icon: '👁️' },
  { label: 'Subscribers', value: '+4.8K', change: '+8.3%', changeType: 'positive', icon: '👥' },
  { label: 'Engagement', value: '4.8%', change: '+0.6%', changeType: 'positive', icon: '💬' },
  { label: 'Revenue', value: '$9.8K', change: '-2.1%', changeType: 'negative', icon: '💰' },
]

const meta = {
  title: 'Dashboard/StatsGrid',
  component: StatsGrid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A responsive grid of metric cards. Accepts data via props — no hardcoded data.',
      },
    },
  },
  argTypes: {
    columns: { control: 'select', options: [1, 2, 3, 4] },
  },
} satisfies Meta<typeof StatsGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { stats: sampleStats },
}

export const TwoColumns: Story = {
  args: { stats: sampleStats.slice(0, 2), columns: 2 },
}

export const WithNegativeChange: Story = {
  args: {
    stats: [
      { label: 'Churn Rate', value: '3.2%', change: '+1.1%', changeType: 'negative', icon: '📉' },
      { label: 'MRR', value: '$24K', change: '-5%', changeType: 'negative', icon: '💸' },
    ],
  },
}
