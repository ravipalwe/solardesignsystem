import type { Meta, StoryObj } from '@storybook/react-vite'
import Checkbox from './Checkbox'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
}

export const WithHelperText: Story = {
  args: { label: 'Subscribe to newsletter', helperText: 'We send at most one email per week' },
}

export const Checked: Story = {
  args: { label: 'Enable dark mode', checked: true },
}
