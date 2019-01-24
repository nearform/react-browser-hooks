import React, {useState} from 'react'

import { useScroll } from '../../../src'

export default function Scroll () {
  const [fps, setFps] = useState(3)
  const scroll = useScroll(fps)

  function handleChange (e) {
    setFps(e.target.value)
  }

  return (
    <div style={{position: 'fixed', bottom: 10, right: 10}}>
      <h2>Scroll Demo</h2>
      <p>Top: {scroll.top}px, Left: {scroll.left}px</p>
      <p>FPS: <input value={fps} onChange={handleChange} /></p>
      
    </div>
  )
}
