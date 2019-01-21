import React from 'react'

import { useFullScreen, useFullScreenBrowser } from '../../../src'

export default function FullScreen () {
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
      <button onClick={fs.toggle}>{'Toggle'}</button>
      <button onClick={fs.open} disabled={fs.fullScreen}>{'Open'}</button>
      <button onClick={fs.close} disabled={!fs.fullScreen}>{'Close'}</button>
      <h3>Fullscreen</h3>
      <pre>{JSON.stringify(fs, null, 2)}
      </pre>
      <h3>Fullscreen Browser</h3>
      <pre>{JSON.stringify(fsb, null, 2)}
      </pre>
    </div>
  )
}

