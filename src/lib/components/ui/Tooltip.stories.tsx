import type { Meta, StoryObj } from '@storybook/react-vite'
import Tooltip from './Tooltip'
import Button from '../form/Button'

const meta: Meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Hover/focus tooltip using pure CSS positioning — no Popper.js or Floating UI dependency. 200ms delay by default to avoid unnecessary renders on quick mouse passes.',
      },
    },
  },
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button variant="secondary">Hover me</Button>,
  },
}

export const Placements: Story = {
  name: 'All Placements',
  render: () => (
    <div className="flex items-center gap-6 py-12">
      <Tooltip content="Top tooltip" placement="top">
        <Button variant="secondary" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button variant="secondary" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left">
        <Button variant="secondary" size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right">
        <Button variant="secondary" size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
}

export const WithDelay: Story = {
  args: {
    content: 'Appears after 500ms',
    delay: 500,
    children: <Button variant="ghost">Slow tooltip</Button>,
  },
}
