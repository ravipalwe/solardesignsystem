import type { Meta, StoryObj } from '@storybook/react-vite'
import CarbonFootprint from './CarbonFootprint'

const meta = {
  title: 'Energy/CarbonFootprint',
  component: CarbonFootprint,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays the carbon footprint of a page in grams CO₂. Uses CO2.js methodology. Can auto-estimate page size from the Performance API or accept a fixed `pageSizeKB` prop.',
      },
    },
  },
  argTypes: {
    pageSizeKB: { control: { type: 'range', min: 50, max: 5000, step: 50 } },
    showBreakdown: { control: 'boolean' },
    compact: { control: 'boolean' },
    carbonIntensity: { control: { type: 'range', min: 100, max: 800, step: 25 } },
    serverLocation: { control: 'text' },
  },
} satisfies Meta<typeof CarbonFootprint>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { pageSizeKB: 250, serverLocation: 'Global CDN' },
}

export const WithBreakdown: Story = {
  args: { pageSizeKB: 500, showBreakdown: true, serverLocation: 'EU West' },
}

export const Compact: Story = {
  args: { pageSizeKB: 250, compact: true },
}

export const CompactSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <CarbonFootprint pageSizeKB={100} compact />
      <CarbonFootprint pageSizeKB={500} compact />
      <CarbonFootprint pageSizeKB={1500} compact />
      <CarbonFootprint pageSizeKB={4000} compact />
    </div>
  ),
  parameters: {
    docs: {
      description: { story: 'Compact badges across different page sizes, showing impact level colors.' },
    },
  },
}

export const HighCarbonIntensity: Story = {
  args: { pageSizeKB: 500, showBreakdown: true, carbonIntensity: 750, serverLocation: 'Coal-heavy Grid' },
}
