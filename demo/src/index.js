import React, { Component } from 'react'
import { render } from 'react-dom'

import FullScreen from './components/fullscreen'
import Resize from './components/resize'
import MousePosition from './components/mouse-position'
import Online from './components/online'
import Scroll from './components/scroll'
class Demo extends Component {
  render() {
    return (
      <div style={{width: '150%'}}>
        <h1>Reach Browser Hooks Examples</h1>
        <em>Configure react developer tools with 'highlight updates' on to see components update based on state.</em>
        <FullScreen />
        <Resize />
        <MousePosition />
        <Online />
        <Scroll />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
