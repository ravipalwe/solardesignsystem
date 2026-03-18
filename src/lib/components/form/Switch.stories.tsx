import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Switch from './Switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Dark mode', checked: false, onChange: () => {} },
}

export const Checked: Story = {
  args: { label: 'Notifications', checked: true, onChange: () => {} },
}

export const Small: Story = {
  args: { label: 'Compact view', checked: true, size: 'sm', onChange: () => {} },
}

export const Disabled: Story = {
  args: { label: 'Locked setting', checked: false, disabled: true, onChange: () => {} },
}

export const Interactive: Story = {
  args: { label: 'Eco Mode', checked: true, onChange: () => {} },
  render: () => {
    const [eco, setEco] = useState(true)
    const [animations, setAnimations] = useState(false)
    return (
      <div className="space-y-4">
        <Switch label="Eco Mode" checked={eco} onChange={setEco} />
        <Switch label="Enable Animations" checked={animations} onChange={setAnimations} />
      </div>
    )
  },
}
