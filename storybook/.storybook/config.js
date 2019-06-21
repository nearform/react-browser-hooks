import React from 'react'
import { addParameters, addDecorator, configure } from '@storybook/react'
import { addReadme } from 'storybook-readme'
import theme from './theme'

const req = require.context('../stories', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addParameters({
  options: {
    panelPosition: 'right',
    sortStoriesByKind: true,
    theme
  },

  readme: {
    codeTheme: 'github'
  }
})

addDecorator(addReadme)

configure(loadStories, module)
