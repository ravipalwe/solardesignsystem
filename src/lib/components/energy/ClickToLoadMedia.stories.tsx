import type { Meta, StoryObj } from '@storybook/react-vite'
import ClickToLoadMedia from './ClickToLoadMedia'

const meta = {
  title: 'Energy/ClickToLoadMedia',
  component: ClickToLoadMedia,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Consensual data loading — users explicitly click to load images or videos. Shows data size and CO₂ cost before loading. No auto-play, no surprise bandwidth usage.',
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: ['image', 'video'] },
    dataSizeKB: { control: { type: 'range', min: 100, max: 10000, step: 100 } },
    height: { control: 'text' },
    width: { control: 'text' },
  },
} satisfies Meta<typeof ClickToLoadMedia>

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  args: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
    alt: 'Nature landscape',
    dataSizeKB: 850,
    height: '280px',
  },
}

export const Video: Story = {
  args: {
    type: 'video',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    dataSizeKB: 5120,
    height: '280px',
  },
}

export const SmallImage: Story = {
  args: {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=400',
    alt: 'Small image',
    dataSizeKB: 200,
    height: '200px',
    width: '300px',
  },
}
