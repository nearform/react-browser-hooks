import React from 'react'

import { useOrientation } from '../../../src'

export default function Resize() {
  const screenAngle = useOrientation()

  return (
    <div>
      <h2>Orientation Demo</h2>
      <p>Screen angle: {screenAngle}&deg;</p>
      Try using dev tools to rotate your screen, you should see this number
      change.
    </div>
  )
}
