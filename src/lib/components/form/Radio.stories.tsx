import type { Meta, StoryObj } from '@storybook/react-vite'
import RadioGroup from './Radio'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Energy Mode',
    name: 'mode',
    value: 'standard',
    options: [
      { value: 'eco', label: 'Eco Mode', helperText: 'Minimal data usage' },
      { value: 'standard', label: 'Standard Mode', helperText: 'Balanced experience' },
      { value: 'rich', label: 'Rich Mode', helperText: 'Full experience' },
    ],
  },
}

export const Horizontal: Story = {
  args: {
    label: 'Layout',
    name: 'layout',
    direction: 'horizontal',
    options: [
      { value: 'grid', label: 'Grid' },
      { value: 'list', label: 'List' },
      { value: 'compact', label: 'Compact' },
    ],
  },
}
