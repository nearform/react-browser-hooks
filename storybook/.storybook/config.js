import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withOptions } from '@storybook/addon-options'

function loadStories() {
  require('../stories/introduction')
  require('../stories/fullscreen')
  require('../stories/mouse-position')
  require('../stories/resize')
  require('../stories/scroll')
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
    sortStoriesByKind: true
  })
)

const storyWrapper = (story) => <div style={{ margin: 35 }}>{story()}</div>

addDecorator(storyWrapper)

configure(loadStories, module)
