import type { Meta, StoryObj } from '@storybook/react-vite'
import Skeleton from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Loading placeholder with optional pulse animation. In eco mode, set `animate={false}` to skip the CSS animation entirely — zero GPU compositing for loading states.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular'] },
    animate: { control: 'boolean' },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: { variant: 'text', width: '200px', height: '14px' },
}

export const Circular: Story = {
  args: { variant: 'circular', width: '48px', height: '48px' },
}

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: '300px', height: '120px' },
}

export const CardSkeleton: Story = {
  name: 'Card Loading State',
  render: () => (
    <div className="w-72 p-5 bg-background-cardSurface border border-borders-subtle rounded-card space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width="40px" height="40px" />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height="12px" />
          <Skeleton width="40%" height="10px" />
        </div>
      </div>
      <Skeleton variant="rectangular" height="100px" />
      <div className="space-y-2">
        <Skeleton height="10px" />
        <Skeleton width="80%" height="10px" />
      </div>
    </div>
  ),
}

export const EcoMode: Story = {
  name: 'Eco Mode (No Animation)',
  render: () => (
    <div className="space-y-3 w-60">
      <Skeleton animate={false} height="14px" />
      <Skeleton animate={false} width="75%" height="14px" />
      <Skeleton animate={false} width="50%" height="14px" />
    </div>
  ),
}
