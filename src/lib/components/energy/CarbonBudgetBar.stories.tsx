import type { Meta, StoryObj } from '@storybook/react-vite'
import CarbonBudgetBar from './CarbonBudgetBar'

const meta = {
  title: 'Energy/CarbonBudgetBar',
  component: CarbonBudgetBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Live progress bar tracking page carbon consumption against a defined budget. Like a performance budget, but for CO₂. Uses PerformanceObserver to track resources in real time.',
      },
    },
  },
  argTypes: {
    budgetGrams: { control: { type: 'range', min: 0.1, max: 5, step: 0.1 } },
    showRemaining: { control: 'boolean' },
    variant: { control: 'select', options: ['bar', 'compact'] },
  },
} satisfies Meta<typeof CarbonBudgetBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { budgetGrams: 1.0 },
}

export const StrictBudget: Story = {
  args: { budgetGrams: 0.3 },
  parameters: {
    docs: { description: { story: 'A strict 0.3g budget — likely to show warning or exceeded state.' } },
  },
}

export const Compact: Story = {
  args: { budgetGrams: 1.0, variant: 'compact' },
}

export const GenerousBudget: Story = {
  args: { budgetGrams: 5.0, showRemaining: true },
}
