import React, { useRef } from 'react'

import { useMediaControls } from '../../../src'

export default function MediaControls() {
  const player = useRef(null)
  const { pause, paused, play, toggle } = useMediaControls(player)

  return (
    <div>
      <h2>Media Controls Demo</h2>
      <p>
        <video
          autoPlay
          ref={player}
          src="https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm"
          width="250">
          Your browser does not support the <code>video</code> element.
        </video>
      </p>
      <p>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={toggle}>Play/Pause</button>
      </p>
      <p>The media paused: {paused.toString()}</p>
    </div>
  )
}
