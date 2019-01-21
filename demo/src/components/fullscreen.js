import React, { useRef } from 'react'

import { useFullScreen, useFullScreenBrowser } from '../../../src'

export default function FullScreen () {
  const fs = useFullScreen()
  const fsb = useFullScreenBrowser()
  const el = useRef(null)
  const fsEl = useFullScreen(el.current)
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
        <button onClick={fs.open} disabled={fs.fullScreen}>{'Open'}</button>
        <button onClick={fs.close} disabled={!fs.fullScreen}>{'Close'}</button>
      </div>
      <div ref={el} style={{backgroundColor: '#c0c0c0'}}>
        <p>{fsEl.fullScreen && 'Full Screen on Element Only' }</p>
        <button onClick={fsEl.toggle}>{'Toggle (Element)'}</button>
      </div>
      <h3>Fullscreen</h3>
      <pre>{JSON.stringify(fs, null, 2)}
      </pre>
      <h3>Fullscreen Browser</h3>
      <pre>{JSON.stringify(fsb, null, 2)}
      </pre>
    </div>
  )
}

