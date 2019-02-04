import React from 'react'

import { useOrientation } from '../../../src'

export default function Orientation() {
  const { angle = null, type } = useOrientation()

  return (
    <div>
      <h2>Orientation Demo</h2>
      {angle !== null ? (
        <p>
          Screen angle: {angle}&deg;
          <br />
          Orientation type: {type}
          <br />
          Try using dev tools to rotate your screen, you should see these values
          change.
        </p>
      ) : (
        <p>Not supported on this browser :-(</p>
      )}
    </div>
  )
}
