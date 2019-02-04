import React, { useState } from 'react'
import { useRaf } from '../../../src'

export default function Raf() {
  const [frameRate, setFrameRate] = useState(60)
  const { frame, second, stopped, tick, actual } = useRaf({ fps: frameRate })

  function handleChange(e) {
    setFrameRate(e.target.value)
  }

  return (
    <div style={{ position: 'relative' }}>
      <h2>Raf Demo</h2>
      Set Frame Rate (empty means MAX):{' '}
      <input value={frameRate} onChange={handleChange} />.
      <br />
      Second: {second}, Frame: {frame}, Stopped: {stopped ? 'true' : 'false'},
      Tick: {tick}, Actual Fps: {actual}
      <div
        style={{
          position: 'absolute',
          left: `${120 + (100 / frameRate) * frame}px`,
          top: '0px',
          backgroundColor: 'black',
          color: 'white',
          width: '30px',
          height: '30px',
          borderRadius: `${(50 / frameRate) * frame}%`,
          textAlign: 'center',
          verticalAlign: 'middle',
          lineHeight: '30px'
        }}>
        {frame}
      </div>
    </div>
  )
}
