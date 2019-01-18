import React, { Component } from 'react';
import { render } from 'react-dom';

import FullScreen from './components/fullscreen';
class Demo extends Component {
  render() {
    return (
      <div>
        <h1>Reach Browser Hooks Examples</h1>
        <FullScreen />
      </div>
    );
  }
}

render(<Demo />, document.querySelector('#demo'));
