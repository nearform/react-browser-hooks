import React from 'react'

import { useOrientation } from '../../../src'

export default function Resize() {
  const { angle, orientationType } = useOrientation()

  return (
    <div>
      <h2>Orientation Demo</h2>
      <p>
        Screen angle: {angle}&deg;
        <br />
        Orientation type: {orientationType}
      </p>
      Try using dev tools to rotate your screen, you should see these values
      change.
    </div>
  )
}
