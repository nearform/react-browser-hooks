import React, { useRef } from 'react'

import { useMediaControls } from '../../../src'

export default function Audio() {
  const player = useRef(null)
  const { pause, paused, play } = useMediaControls(player)

  return (
    <div>
      <h3>Video</h3>
      <p>
        <video
          autoPlay
          ref={player}
          src="https://ak4.picdn.net/shutterstock/videos/17565994/preview/stock-footage-cute-jack-russell-dog-with-crystal-covered-sunglasses-in-a-disco-setting.webm"
          width="250">
          Your browser does not support the <code>video</code> element.
        </video>
      </p>
      <p>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </p>
      <p>The video paused: {paused.toString()}</p>
    </div>
  )
}
