import React, { Fragment } from 'react'
import { render } from 'react-dom'

import FullScreen from './components/fullscreen'
import PageVisibility from './components/page-visibility'
import Resize from './components/resize'
import MousePosition from './components/mouse-position'
import Online from './components/online'
import Scroll from './components/scroll'
import Orientation from './components/orientation'
import Geolocation from './components/geolocation'
import Fps from './components/fps'

const Demo = () => (
  <Fragment>
    <h1>React Browser Hooks Examples</h1>
    <Fps />
    <FullScreen />
    <Resize />
    <MousePosition />
    <Scroll />
    <Orientation />
    <Geolocation />
    <PageVisibility />
    <Online />
  </Fragment>
)

render(<Demo />, document.querySelector('#demo'))
