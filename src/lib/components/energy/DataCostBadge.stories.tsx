import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from '@storybook/test'
import DataCostBadge from './DataCostBadge'

const meta = {
  title: 'Energy/DataCostBadge',
  component: DataCostBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shows the environmental and financial cost of a data-heavy action. Supports carbon cost, financial cost, acknowledge/dismiss flows.',
      },
    },
  },
  argTypes: {
    dataSizeKB: { control: { type: 'range', min: 100, max: 20000, step: 100 } },
    showCarbonCost: { control: 'boolean' },
    showFinancialCost: { control: 'boolean' },
    dismissible: { control: 'boolean' },
    costPerMB: { control: { type: 'range', min: 1, max: 50, step: 1 } },
  },
} satisfies Meta<typeof DataCostBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Download PDF',
    icon: '📄',
    dataSizeKB: 450,
  },
}

export const WithFinancialCost: Story = {
  args: {
    label: 'Load High-Res Images',
    icon: '🖼️',
    dataSizeKB: 2800,
    showFinancialCost: true,
    dismissible: true,
  },
}

export const HeavyAction: Story = {
  args: {
    label: 'Stream Video HD',
    icon: '🎬',
    dataSizeKB: 12800,
    showFinancialCost: true,
    onAcknowledge: fn(),
  },
}

export const LightAction: Story = {
  args: {
    label: 'Load Thumbnail',
    icon: '🖼️',
    dataSizeKB: 50,
  },
}
