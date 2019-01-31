import React, { useRef } from 'react'

import { useMediaControls } from '../../../src'

export default function Audio() {
  const player = useRef(null)
  const { paused, toggle } = useMediaControls(player)

  return (
    <div>
      <h3>Audio</h3>
      <p>
        <audio
          ref={player}
          src="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/00/ea/65/00ea65de-25f1-3217-7a2b-097e989dd884/mzaf_5030465069226935473.plus.aac.p.m4a"
          width="250">
          Your browser does not support the <code>audio</code> element.
        </audio>
      </p>
      <p>
        <button onClick={toggle}>Play/Pause</button>
      </p>
      <p>The audio paused: {paused.toString()}</p>
    </div>
  )
}
