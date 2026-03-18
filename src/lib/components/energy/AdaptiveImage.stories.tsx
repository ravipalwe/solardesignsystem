import type { Meta, StoryObj } from '@storybook/react-vite'
import AdaptiveImage from './AdaptiveImage'

const meta = {
  title: 'Energy/AdaptiveImage',
  component: AdaptiveImage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An `<img>` replacement that auto-selects quality based on device energy profile (battery, network, Save-Data). Provides multi-source selection, blur-up placeholders, and respects user data-saving preferences.',
      },
    },
  },
  argTypes: {
    loading: { control: 'select', options: ['auto', 'lazy', 'eager'] },
    placeholder: { control: 'select', options: ['blur', 'color', 'none'] },
    respectSaveData: { control: 'boolean' },
  },
} satisfies Meta<typeof AdaptiveImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
    alt: 'Nature landscape',
    width: '100%',
    height: '300px',
  },
}

export const WithPlaceholder: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800',
    srcLight: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=100',
    alt: 'Nature with blur-up',
    placeholderSrc: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=20&q=10',
    placeholder: 'blur',
    width: '100%',
    height: '300px',
  },
}

export const MultipleQualities: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200',
    srcMedium: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600',
    srcLight: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=200',
    alt: 'Multi-quality adaptive image',
    width: '400px',
    height: '250px',
  },
  parameters: {
    docs: {
      description: { story: 'Provides 3 quality levels. The component selects based on `useDeviceEnergyProfile().budget`.' },
    },
  },
}
