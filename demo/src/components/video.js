import React, { useRef } from 'react'

import { useMediaControls } from '../../../src'

export default function Audio() {
  const player = useRef(null)
  const { currentTime, paused, play, restart, seek, stop } = useMediaControls(
    player
  )

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
        <button onClick={paused ? play : stop}>Play/Stop</button>
        <button onClick={restart}>Restart</button>
        <button onClick={() => seek(Math.round((currentTime - 2) * 10) / 10)}>
          Seek back
        </button>
        <button onClick={() => seek(Math.round((currentTime + 2) * 10) / 10)}>
          Seek forward
        </button>
      </p>
      <p>The video is paused: {paused !== null ? paused.toString() : ''}</p>
      <p>
        The video currentTime:{' '}
        {currentTime !== null ? currentTime.toString() : ''}
      </p>
    </div>
  )
}
