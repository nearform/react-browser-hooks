import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'
import theme from './theme'

const req = require.context('../stories', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

addDecorator(
  withOptions({
    name: 'React Browser Hooks',
    url: 'https://react-browser-hooks.netlify.com/',
    goFullScreen: false,
    showStoriesPanel: true,
    showAddonPanel: true,
    showSearchBox: false,
    addonPanelInRight: true,
    sortStoriesByKind: true,
    theme
  })
)

const storyWrapper = (story) => <div style={{ margin: 35 }}>{story()}</div>

addDecorator(storyWrapper)

configure(loadStories, module)
