import React, { Fragment } from 'react'
import { render } from 'react-dom'

import FullScreen from './components/fullscreen'
import PageVisibility from './components/page-visibility'
import Resize from './components/resize'
import Orientation from './components/orientation'
import Geolocation from './components/geolocation'

const Demo = () => (
  <Fragment>
    <h1>React Browser Hooks Examples</h1>
    <FullScreen />
    <Resize />
    <Orientation />
    <Geolocation />
    <PageVisibility />
  </Fragment>
)

render(<Demo />, document.querySelector('#demo'))
