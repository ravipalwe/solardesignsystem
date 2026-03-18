import type { Meta, StoryObj } from '@storybook/react-vite'
import GridStatusBadge from './GridStatusBadge'

const meta = {
  title: 'Energy/GridStatusBadge',
  component: GridStatusBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shows real-time grid carbon intensity with 5 levels (Very Low → Very High). Polls at configurable intervals. Connect to Electricity Maps API for production use.',
      },
    },
  },
  argTypes: {
    carbonIntensity: { control: { type: 'range', min: 50, max: 700, step: 25 } },
    region: { control: 'text' },
    showDetails: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
} satisfies Meta<typeof GridStatusBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { region: 'California, USA', showDetails: true },
}

export const VeryLowIntensity: Story = {
  args: { carbonIntensity: 120, region: 'Norway', showDetails: true },
}

export const HighIntensity: Story = {
  args: { carbonIntensity: 520, region: 'Poland', showDetails: true },
}

export const Compact: Story = {
  args: { carbonIntensity: 350, compact: true },
}

export const AllLevels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <GridStatusBadge carbonIntensity={100} compact />
      <GridStatusBadge carbonIntensity={250} compact />
      <GridStatusBadge carbonIntensity={350} compact />
      <GridStatusBadge carbonIntensity={450} compact />
      <GridStatusBadge carbonIntensity={550} compact />
    </div>
  ),
}
