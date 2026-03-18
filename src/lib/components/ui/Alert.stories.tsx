import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Alert from './Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Contextual feedback message. Uses inline SVG icons (no icon library), 6% opacity tinted backgrounds for OLED efficiency, and semantic `role="alert"` for screen readers.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'New version available',
    children: 'Solar DS v2.1 includes improved energy tracking and new components.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Under budget',
    children: 'Your page carbon footprint is 0.32g CO₂ — well within the 0.5g target.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'High energy usage',
    children: 'This page is using 3.2MB of resources. Consider deferring non-critical media.',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Budget exceeded',
    children: 'Carbon budget exceeded by 40%. Remove unused scripts or enable eco mode.',
  },
}

export const Dismissable: Story = {
  render: () => {
    const [visible, setVisible] = useState(true)
    if (!visible) return <p className="text-sm text-text-tertiary">Alert dismissed. Refresh to see again.</p>
    return (
      <Alert variant="info" title="Tip" onDismiss={() => setVisible(false)}>
        You can dismiss this alert by clicking the close button.
      </Alert>
    )
  },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="space-y-3 max-w-md">
      <Alert variant="info" title="Info">Informational message.</Alert>
      <Alert variant="success" title="Success">Operation completed.</Alert>
      <Alert variant="warning" title="Warning">Something needs attention.</Alert>
      <Alert variant="danger" title="Error">Something went wrong.</Alert>
    </div>
  ),
}
