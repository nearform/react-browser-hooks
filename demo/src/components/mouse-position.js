import React, { useState } from 'react'

import { useMousePosition } from '../../../src'

export default function MousePosition() {
  const [skip, setSkip] = useState(5)
  const pos = useMousePosition({ skip })

  function handleChange(e) {
    setSkip(e.target.value)
  }

  return (
    <div>
      <h2>Mouse Position Demo</h2>
      <em>The red dot shows this visually (offset by 5px)</em>
      <p>
        X: {pos.x}px, Y: {pos.y}px
        <br />
        Throttled: {pos.throttled ? 'yes' : 'no'}
      </p>
      Skip Frames: <input value={skip} onChange={handleChange} />
      <div
        id="follow-cursor"
        style={{
          borderRadius: '50%',
          backgroundColor: 'red',
          position: 'fixed',
          top: `${pos.y - 5}px`,
          left: `${pos.x - 5}px`,
          width: '4px',
          height: '4px'
        }}
      />
    </div>
  )
}
