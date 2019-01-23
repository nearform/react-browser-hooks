import React from 'react'

import { useScroll } from '../../../src'

export default function Resize () {
  const scroll = useScroll()

  return (
    <div>
      <h2>Scroll Demo</h2>
      <p>top: {scroll.top}px, left: {scroll.left}px</p>
    </div>
  )
}

