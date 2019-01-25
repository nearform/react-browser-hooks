import React, { useState } from 'react'

import { useResize } from '../../../src'

export default function Resize() {
  const [debounce, setDebounce] = useState(60)
  const size = useResize(debounce)

  function handleChange(e) {
    var parsed = parseInt(e.target.value)
    if (isNaN(parsed)) {
      setDebounce(null)
    } else {
      setDebounce(parsed)
    }
  }

  return (
    <div>
      <h2>Resize Demo</h2>
      <p>
        width: {size.width}px, height: {size.height}px
      </p>
      FPS: <input value={debounce} onChange={handleChange} />
    </div>
  )
}
