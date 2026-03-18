import type { Meta, StoryObj } from '@storybook/react-vite'
import ChartCard from './ChartCard'

const meta = {
  title: 'Dashboard/ChartCard',
  component: ChartCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A CSS-only bar chart card. No chart library dependency — zero extra bundle weight.',
      },
    },
  },
} satisfies Meta<typeof ChartCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Views Over Time',
    data: [
      { label: 'Mon', value: 45 },
      { label: 'Tue', value: 52 },
      { label: 'Wed', value: 48 },
      { label: 'Thu', value: 61 },
      { label: 'Fri', value: 55 },
      { label: 'Sat', value: 68 },
      { label: 'Sun', value: 72 },
    ],
    summaries: [
      { label: 'Average Daily', value: '57.3K' },
      { label: 'Peak Day', value: '72K' },
    ],
  },
}

export const FewBars: Story = {
  args: {
    title: 'Quarterly Revenue',
    data: [
      { label: 'Q1', value: 120 },
      { label: 'Q2', value: 180 },
      { label: 'Q3', value: 150 },
      { label: 'Q4', value: 210 },
    ],
  },
}
