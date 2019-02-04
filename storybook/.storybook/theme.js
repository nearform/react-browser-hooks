import { baseFonts, monoFonts } from '@storybook/components'

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

// see https://storybook.js.org/configurations/theming/
// for more information on what can be themed

const theme = {
  // variables
  mainBackground: brand.blue,
  mainBorder: brand.blue,
  mainBorderColor: brand.blue,
  mainBorderRadius: 4,
  mainFill: brand.greyLighter,
  barFill: brand.greyLighter,
  barSelectedColor: brand.greyLight,
  inputFill: brand.blueDark,
  mainTextFace: baseFonts.fontFamily,
  mainTextColor: brand.grey,
  dimmedTextColor: brand.greyLight,
  highlightColor: brand.orange,
  successColor: brand.green,
  failColor: brand.pink,
  warnColor: brand.orange,
  mainTextSize: 14,
  monoTextFace: monoFonts.fontFamily,
  layoutMargin: 10,

  // components
  brand: { background: brand.blueDark },
  brandLink: { border: 'none' },
  storiesNav: { color: brand.white }
}

export default theme
