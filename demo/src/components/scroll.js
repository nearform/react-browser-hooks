import React, { useState } from 'react'

import { useScroll } from '../../../src'

export default function Scroll() {
  const [skip, setSkip] = useState(20)
  const scroll = useScroll({ skip })

  function handleChange(e) {
    setSkip(e.target.value)
  }

  return (
    <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
      <h2>Scroll Demo</h2>
      <p>
        Top: {scroll.top}px, Left: {scroll.left}px
        <br />
        Throttled: {scroll.throttled ? 'yes' : 'no'}
      </p>
      <p>
        Skip Frames: <input value={skip} onChange={handleChange} />
      </p>
    </div>
  )
}
