import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToastProvider, useToast } from './Toast'
import Button from '../form/Button'

const meta = {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Non-blocking notification system with auto-dismiss. Uses CSS animations (no framer-motion), `role="status"` + `aria-live="polite"` for accessibility, and auto-cleanup timers.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function ToastDemo() {
  const { addToast } = useToast()
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={() => addToast({ title: 'Changes saved', variant: 'default' })}
      >
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() => addToast({ title: 'Under budget', description: '0.32g CO₂ per view', variant: 'success' })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => addToast({ title: 'High usage detected', description: 'Consider enabling eco mode', variant: 'warning' })}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() => addToast({ title: 'Budget exceeded', description: 'Carbon budget surpassed by 40%', variant: 'danger' })}
      >
        Danger
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: () => <ToastDemo />,
}
