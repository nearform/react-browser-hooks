import React, {useState} from 'react'

import { useResize } from '../../../src'

export default function Resize () {
  const [fps, setFps] = useState(3)
  const size = useResize(fps)

  function handleChange (e) {
    setFps(e.target.value)
  }

  return (
    <div>
      <h2>Resize Demo</h2>
      <p>Width: {size.width}px, Height: {size.height}px<br/>
      Throttled: {size.throttled}, Delay: {size.delay}ms</p>
      FPS: <input value={fps} onChange={handleChange} />
    </div>
  )
}
