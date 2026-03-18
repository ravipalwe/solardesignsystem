import type { Meta, StoryObj } from '@storybook/react-vite'
import PrintCarbonLabel from './PrintCarbonLabel'

const meta = {
  title: 'Energy/PrintCarbonLabel',
  component: PrintCarbonLabel,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A standardized "nutrition facts" style carbon label for websites. Shows letter grade (A+ to F), page weight, CO₂ per visit, annual estimate, and hosting status. Place in your site footer.',
      },
    },
  },
  argTypes: {
    compact: { control: 'boolean' },
    showPageWeight: { control: 'boolean' },
    showCarbonPerView: { control: 'boolean' },
    showAnnualEstimate: { control: 'boolean' },
    annualPageViews: { control: { type: 'range', min: 1000, max: 1000000, step: 1000 } },
    isGreenHosted: { control: 'boolean' },
  },
} satisfies Meta<typeof PrintCarbonLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pageName: 'Homepage',
    hostingProvider: 'Vercel',
    isGreenHosted: true,
    measuredDate: '2026-03-17',
  },
}

export const Compact: Story = {
  args: { compact: true },
}

export const HighTraffic: Story = {
  args: {
    pageName: 'Product Page',
    annualPageViews: 500000,
    hostingProvider: 'AWS',
    isGreenHosted: false,
  },
}

export const MinimalLabel: Story = {
  args: {
    showPageWeight: false,
    showAnnualEstimate: false,
  },
  parameters: {
    docs: { description: { story: 'Only shows CO₂ per view — minimal footprint label.' } },
  },
}
