import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from './Card'
import Badge from './Badge'
import Avatar from './Avatar'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Surface container with compound sub-components. Uses `border` + subtle `box-shadow` for depth instead of heavy shadows — saving GPU paint cycles. Interactive cards use `focus-visible` and CSS transitions only.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'outlined', 'ghost'] },
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    interactive: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <Card.Header>
        <Card.Title>Energy Dashboard</Card.Title>
        <Card.Description>Monitor your application's energy footprint in real time.</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-text-primary tracking-tighter">0.42g</span>
          <span className="text-sm text-accent-success">CO₂/view</span>
        </div>
      </Card.Content>
      <Card.Footer>
        <Badge variant="success" dot>Below budget</Badge>
      </Card.Footer>
    </Card>
  ),
}

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" className="w-80">
      <Card.Header>
        <Card.Title>Outlined Card</Card.Title>
        <Card.Description>Transparent background with visible border.</Card.Description>
      </Card.Header>
    </Card>
  ),
}

export const Ghost: Story = {
  render: () => (
    <Card variant="ghost" className="w-80">
      <Card.Header>
        <Card.Title>Ghost Card</Card.Title>
        <Card.Description>No background, no border — zero extra paint.</Card.Description>
      </Card.Header>
    </Card>
  ),
}

export const Interactive: Story = {
  render: () => (
    <Card interactive className="w-80">
      <Card.Header>
        <div className="flex items-center gap-3">
          <Avatar initials="RP" size="sm" />
          <div>
            <Card.Title>Ravi Palwe</Card.Title>
            <Card.Description>Creator, Solar DS</Card.Description>
          </div>
        </div>
      </Card.Header>
    </Card>
  ),
}

export const Variants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Card>
        <Card.Title>Default</Card.Title>
        <Card.Description>Surface + subtle shadow</Card.Description>
      </Card>
      <Card variant="outlined">
        <Card.Title>Outlined</Card.Title>
        <Card.Description>Transparent + border</Card.Description>
      </Card>
      <Card variant="ghost">
        <Card.Title>Ghost</Card.Title>
        <Card.Description>Zero visual weight</Card.Description>
      </Card>
    </div>
  ),
}
