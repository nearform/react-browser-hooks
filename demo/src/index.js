import React, { Component } from 'react'
import { render } from 'react-dom'

import FullScreen from './components/fullscreen'
import Resize from './components/resize'
import MousePosition from './components/mouse-position'
class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Reach Browser Hooks Examples</h1>
        <FullScreen />
        <Resize />
        <MousePosition />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
