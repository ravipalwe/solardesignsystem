import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import Modal from './Modal'
import Button from '../form/Button'
import Input from '../form/Input'

const meta: Meta = {
  title: 'Components/Modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Native `<dialog>` modal — no portal library needed. Uses `showModal()` for proper focus trapping and Escape key handling built into the browser. Backdrop uses `bg-overlay` with configurable opacity per theme.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete project?"
          description="This action cannot be undone. All data associated with this project will be permanently removed."
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={() => setOpen(false)}>Delete</Button>
            </>
          }
        >
          <p className="text-sm text-text-secondary">
            Type <strong className="text-text-primary">delete</strong> to confirm.
          </p>
          <Input placeholder="Type delete..." className="mt-3" />
        </Modal>
      </>
    )
  },
}

export const Small: Story = {
  name: 'Small Size',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Small Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Quick confirmation"
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>No</Button>
              <Button onClick={() => setOpen(false)}>Yes</Button>
            </>
          }
        >
          <p className="text-sm text-text-secondary">Are you sure you want to continue?</p>
        </Modal>
      </>
    )
  },
}

export const Large: Story = {
  name: 'Large Size',
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>Large Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Energy Report"
          description="Monthly carbon footprint breakdown for your application."
          size="lg"
          footer={
            <Button onClick={() => setOpen(false)}>Close</Button>
          }
        >
          <div className="space-y-3 text-sm text-text-secondary">
            <p>Total page weight: <strong className="text-text-primary">1.2 MB</strong></p>
            <p>Carbon per view: <strong className="text-text-primary">0.42g CO₂</strong></p>
            <p>Monthly estimate: <strong className="text-text-primary">12.6kg CO₂</strong> (30k views)</p>
          </div>
        </Modal>
      </>
    )
  },
}
