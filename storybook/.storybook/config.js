import React from 'react'
import { configure, addDecorator, addParameters } from '@storybook/react'
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

const storyWrapper = (story) => <div style={{ margin: 35 }}>{story()}</div>

addDecorator(addReadme)

configure(loadStories, module)
