import React from 'react'

import { useOrientation } from '../../../src'

export default function Resize() {
  const { angle, type } = useOrientation()

  return (
    <div>
      <h2>Orientation Demo</h2>
      <p>
        Screen angle: {angle}&deg;
        <br />
        Orientation type: {type}
      </p>
      Try using dev tools to rotate your screen, you should see these values
      change.
    </div>
  )
}
