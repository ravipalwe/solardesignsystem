import type { Meta, StoryObj } from '@storybook/react-vite'
import DeferredContent from './DeferredContent'

const meta = {
  title: 'Energy/DeferredContent',
  component: DeferredContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Defers rendering its children until conditions are met: visible (IntersectionObserver), idle (requestIdleCallback), interaction (user click), or favorable (energy profile allows). Great for third-party embeds, charts, comment sections.',
      },
    },
  },
  argTypes: {
    loadWhen: { control: 'select', options: ['visible', 'idle', 'interaction', 'favorable'] },
    timeout: { control: { type: 'range', min: 0, max: 10000, step: 500 } },
  },
} satisfies Meta<typeof DeferredContent>

export default meta
type Story = StoryObj<typeof meta>

export const OnInteraction: Story = {
  args: {
    loadWhen: 'interaction',
    estimatedSizeKB: 250,
    children: (
      <div className="bg-background-cardSurface border border-accent-primary rounded-card p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Loaded Content</h3>
        <p className="text-xs text-text-secondary">
          This content was deferred until you clicked. It could be a chart, a comment section, a third-party embed, etc.
        </p>
      </div>
    ),
  },
}

export const OnVisible: Story = {
  args: {
    loadWhen: 'visible',
    children: (
      <div className="bg-background-cardSurface border border-accent-success rounded-card p-6">
        <p className="text-sm text-text-primary">Loaded when scrolled into view.</p>
      </div>
    ),
  },
}

export const WithTimeout: Story = {
  args: {
    loadWhen: 'interaction',
    timeout: 3000,
    estimatedSizeKB: 500,
    children: (
      <div className="bg-background-cardSurface border border-accent-solar-amber rounded-card p-6">
        <p className="text-sm text-text-primary">Auto-loads after 3 seconds, or click to load immediately.</p>
      </div>
    ),
  },
  parameters: {
    docs: { description: { story: 'Will auto-load after 3 seconds even without interaction.' } },
  },
}
