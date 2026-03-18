import type { Meta, StoryObj } from '@storybook/react-vite'
import Textarea from './Textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Message', placeholder: 'Write something...' },
}

export const WithError: Story = {
  args: { label: 'Bio', error: 'Bio must be under 500 characters', value: 'x'.repeat(501) },
}

export const WithHelperText: Story = {
  args: { label: 'Description', helperText: 'Supports markdown formatting', placeholder: 'Describe your project...' },
}
