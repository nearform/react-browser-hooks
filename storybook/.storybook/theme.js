import { create } from '@storybook/theming'

const brand = {
  blue: '#2165e5',
  blueDark: '#194caa',
  grey: '#6d6d68',
  greyLight: '#efefef',
  greyLighter: '#f4f4f2',
  orange: '#fd775e',
  pink: '#fd7a9e',
  green: '#5EFB89',
  white: '#FFFFFF'
}

export default create({
  base: 'light',

  brandTitle: 'React Browser Hooks',
  brandUrl: 'https://react-browser-hooks.netlify.com/',

  colorPrimary: brand.blue,
  colorSecondary: brand.blueDark,

  appBg: brand.blue,
  appContentBg: brand.white,

  barTextColor: brand.blueDark,
  barSelectedColor: brand.blueDark
})
