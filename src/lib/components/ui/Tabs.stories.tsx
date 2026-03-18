import type { Meta, StoryObj } from '@storybook/react-vite'
import Tabs from './Tabs'
import Badge from './Badge'

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compound tab component with keyboard navigation. Only renders the active panel — inactive content is unmounted, saving DOM nodes and memory. Uses CSS `fadeIn` animation instead of JS transitions.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="energy">Energy</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">
        <div className="p-4 rounded-lg bg-background-cardSurface border border-borders-subtle">
          <p className="text-sm text-text-secondary">
            Your application dashboard with key metrics and activity feed.
          </p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="energy">
        <div className="p-4 rounded-lg bg-background-cardSurface border border-borders-subtle">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-semibold text-text-primary">0.42g</span>
            <Badge variant="success" dot>Below budget</Badge>
          </div>
          <p className="text-sm text-text-secondary">
            CO₂ per page view. Target: 0.5g
          </p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="settings">
        <div className="p-4 rounded-lg bg-background-cardSurface border border-borders-subtle">
          <p className="text-sm text-text-secondary">
            Configure energy modes, carbon budgets, and notification preferences.
          </p>
        </div>
      </Tabs.Content>
    </Tabs>
  ),
}

export const TwoTabs: Story = {
  name: 'Simple Two Tabs',
  render: () => (
    <Tabs defaultValue="code" className="w-80">
      <Tabs.List>
        <Tabs.Trigger value="code">Code</Tabs.Trigger>
        <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="code">
        <div className="p-4 rounded-lg bg-background-cardSurface border border-borders-subtle font-mono text-xs text-text-secondary">
          {'<Button variant="primary">Get Started</Button>'}
        </div>
      </Tabs.Content>
      <Tabs.Content value="preview">
        <div className="p-4 rounded-lg bg-background-cardSurface border border-borders-subtle">
          <button className="px-4 py-2 bg-accent-primary text-text-inverse rounded-button text-sm font-medium">
            Get Started
          </button>
        </div>
      </Tabs.Content>
    </Tabs>
  ),
}
