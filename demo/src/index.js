import React, { Component } from 'react'
import { render } from 'react-dom'

import FullScreen from './components/fullscreen'
import Resize from './components/resize'
import Geolocation from './components/geolocation'

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Reach Browser Hooks Examples</h1>
        <FullScreen />
        <Resize />
        <Geolocation />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
