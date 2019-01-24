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
      <div id='follow-cursor' 
        style={{
          border: '1px solid red', 
          backgroundColor: 'white',
          position: 'fixed',
          zIndex: -1, 
          top: '0', left: '0', 
          width: `${size.width-2}px`, height: `${size.height-2}px`}}>
      </div>
    </div>
  )
}
