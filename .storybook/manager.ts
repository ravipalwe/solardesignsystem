import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming/create'

const solarTheme = create({
  base: 'dark',

  // Brand
  brandTitle: 'Solar Design System',
  brandUrl: '/',

  // Colors
  colorPrimary: '#C8E15A',
  colorSecondary: '#C8E15A',

  // UI
  appBg: '#0A0A0A',
  appContentBg: '#000000',
  appPreviewBg: '#000000',
  appBorderColor: '#1E1E1E',
  appBorderRadius: 10,

  // Text
  textColor: '#EDEDED',
  textInverseColor: '#000000',
  textMutedColor: '#9C9C9C',

  // Toolbar
  barTextColor: '#9C9C9C',
  barSelectedColor: '#C8E15A',
  barHoverColor: '#C8E15A',
  barBg: '#0E0E0E',

  // Form
  inputBg: '#0E0E0E',
  inputBorder: '#303030',
  inputTextColor: '#EDEDED',
  inputBorderRadius: 8,

  // Buttons
  buttonBg: '#1A1A1A',
  buttonBorder: '#303030',

  // Booleans
  booleanBg: '#1A1A1A',
  booleanSelectedBg: '#C8E15A',
})

addons.setConfig({
  theme: solarTheme,
  sidebar: {
    showRoots: true,
  },
})
