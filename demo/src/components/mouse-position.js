import React, {useState} from 'react'

import { useMousePosition } from '../../../src'

export default function Resize () {
  const [fps, setFps] = useState(60)
  const pos = useMousePosition(fps)

  function handleChange (e) {
    setFps(e.target.value)
  }

  return (
    <div>
      <h2>Mouse Position Demo</h2>
      <p>X: {pos.x}px, Y: {pos.y}px<br/>
      Throttled: {pos.throttled}, Delay: {pos.delay}ms</p>
      FPS: <input value={fps} onChange={handleChange} />
    </div>
  )
}

