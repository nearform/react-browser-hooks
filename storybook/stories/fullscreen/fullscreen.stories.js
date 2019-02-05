import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useFullScreen, useFullScreenBrowser } from '../../../src'
import readme from './README.md'

function BrowserFullScreen() {
  const fs = useFullScreen()
  const fsb = useFullScreenBrowser()
  return (
    <div>
      <h2>FullScreen Demo</h2>
      <p>
        {fs.fullScreen && fsb.fullScreen && 'Browser in fullscreen mode'}
        {!fs.fullScreen && fsb.fullScreen && 'Browser in fullscreen mode (F11)'}
        {!fs.fullScreen && !fsb.fullScreen && 'Browser not in fullscreen mode'}
      </p>
      <div>
        <button onClick={fs.toggle}>{'Toggle'}</button>
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

function ElementFullScreen() {
  const el = useRef(null)
  const fsEl = useFullScreen({ element: el })
  return (
    <div>
      <h2>FullScreen Element Demo</h2>
      <div ref={el} style={{ backgroundColor: '#c0c0c0' }}>
        <p>{fsEl.fullScreen && 'Full Screen on Element Only'}</p>
        <button onClick={fsEl.toggle}>{'Toggle (Element)'}</button>
      </div>
    </div>
  )
}

storiesOf('FullScreen', module)
  .add('Browser Full Screen', withReadme(readme, () => <BrowserFullScreen />))
  .add('Element Full Screen', withReadme(readme, () => <ElementFullScreen />))
