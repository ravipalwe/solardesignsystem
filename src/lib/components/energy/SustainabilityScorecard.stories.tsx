import type { Meta, StoryObj } from '@storybook/react-vite'
import SustainabilityScorecard from './SustainabilityScorecard'

const meta = {
  title: 'Energy/SustainabilityScorecard',
  component: SustainabilityScorecard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A dashboard card showing an overall sustainability score (0-100) for the current page. Combines page weight, carbon footprint, resource efficiency, dark mode, and motion preferences into actionable recommendations.',
      },
    },
  },
  argTypes: {
    showDetails: { control: 'boolean' },
    showRecommendations: { control: 'boolean' },
    targetScore: { control: { type: 'range', min: 50, max: 100, step: 5 } },
    compact: { control: 'boolean' },
  },
} satisfies Meta<typeof SustainabilityScorecard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { showDetails: true, showRecommendations: true },
}

export const Compact: Story = {
  args: { compact: true },
}

export const ScoreOnly: Story = {
  args: { showDetails: false, showRecommendations: false },
}

export const StrictTarget: Story = {
  args: { targetScore: 95, showDetails: true, showRecommendations: true },
  parameters: {
    docs: { description: { story: 'A strict target of 95 — most pages will not meet this.' } },
  },
}
