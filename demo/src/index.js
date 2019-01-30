import React from 'react'
import { render } from 'react-dom'

import FullScreen from './components/fullscreen'
import Resize from './components/resize'
import Orientation from './components/orientation'
const Demo = () => (
  <div>
    <h1>Reach Browser Hooks Examples</h1>
    <FullScreen />
    <Resize />
    <Orientation />
  </div>
)

render(<Demo />, document.querySelector('#demo'))
