import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useFullScreen, useFullScreenBrowser } from '../../../src'
import readme from './README.md'

function BrowserFullScreen() {
  const element = useRef(null)
  const fs = useFullScreen({ element })
  const fsb = useFullScreenBrowser()
  return (
    <div
      ref={element}
      className="fullscreen-demo"
      style={{ backgroundColor: '#f4f4f2' }}>
      <h2>Browser FullScreen Demo</h2>
      <p>
        {fs.fullScreen && fsb.fullScreen && 'Browser in fullscreen mode'}
        {!fs.fullScreen && fsb.fullScreen && 'Browser in fullscreen mode (F11)'}
        {!fs.fullScreen && !fsb.fullScreen && 'Browser not in fullscreen mode'}
      </p>
      <div>
        <button onClick={fs.toggle}>Toggle</button>
        <button onClick={fs.open} disabled={fs.fullScreen}>
          {'Open'}
        </button>
        <button onClick={fs.close} disabled={!fs.fullScreen}>
          {'Close'}
        </button>
      </div>
      <h3>Fullscreen</h3>
      <pre>{JSON.stringify(fs, null, 2)}</pre>
      <h3>Fullscreen Browser</h3>
      <pre>{JSON.stringify(fsb, null, 2)}</pre>
    </div>
  )
}

storiesOf('FullScreen', module).add(
  'Default',
  withReadme(readme, () => <BrowserFullScreen />)
)
