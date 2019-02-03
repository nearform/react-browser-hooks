import React from 'react'

import { useOrientation } from '../../../src'

export default function Orientation() {
  const orientation = useOrientation()

  return (
    <div>
      <h2>Orientation Demo</h2>
      {orientation && orientation.angle ? (
        <p>
          Screen angle: {orientation.angle}&deg;
          <br />
          Orientation type: {orientation.type}
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
