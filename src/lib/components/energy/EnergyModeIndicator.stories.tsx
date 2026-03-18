import type { Meta, StoryObj } from '@storybook/react-vite'
import EnergyModeIndicator from './EnergyModeIndicator'

const meta = {
  title: 'Energy/EnergyModeIndicator',
  component: EnergyModeIndicator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays the current energy mode (Eco / Standard / Rich) based on grid intensity. Auto-detects mode from time-of-day heuristic when no `mode` prop is provided. In production, connect to Electricity Maps API for real data.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['eco', 'standard', 'rich'],
      description: 'Energy mode. Auto-detected if omitted.',
    },
    showDescription: {
      control: 'boolean',
    },
    compact: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof EnergyModeIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { mode: 'standard' },
}

export const EcoMode: Story = {
  args: { mode: 'eco', showDescription: true },
}

export const RichMode: Story = {
  args: { mode: 'rich', showDescription: true },
}

export const Compact: Story = {
  args: { mode: 'eco', compact: true },
}

export const AllCompactModes: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <EnergyModeIndicator mode="eco" compact />
      <EnergyModeIndicator mode="standard" compact />
      <EnergyModeIndicator mode="rich" compact />
    </div>
  ),
}

export const AutoDetected: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'No `mode` prop — auto-detects based on time of day. Peak hours (9-17) = Eco, Night (22-6) = Rich, else Standard.',
      },
    },
  },
}
