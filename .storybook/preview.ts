import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'solar-dark',
      values: [
        { name: 'solar-dark', value: '#000000' },
        { name: 'solar-surface', value: '#0E0E0E' },
        { name: 'solar-light', value: '#FAFAF9' },
      ],
    },
    layout: 'centered',
    docs: {
      toc: true,
    },
    options: {
      storySort: {
        order: [
          'Getting Started',
          ['Introduction', 'Design Tokens'],
          'Components',
          'Dashboard',
          'Energy',
          'Theme',
        ],
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        { 'data-theme': 'dark', style: { minHeight: '100%' } },
        React.createElement(Story),
      ),
  ],
}

export default preview
