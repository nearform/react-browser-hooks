import React, { useRef } from 'react'

import { useMediaControls } from '../../../src'

export default function Audio() {
  const player = useRef(null)
  const {
    mute,
    muted,
    unmute,
    pause,
    paused,
    play,
    setVolume,
    volume
  } = useMediaControls(player)

  return (
    <div>
      <h3>Audio</h3>
      <p>
        <audio
          controls
          ref={player}
          src="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/00/ea/65/00ea65de-25f1-3217-7a2b-097e989dd884/mzaf_5030465069226935473.plus.aac.p.m4a"
          width="250">
          Your browser does not support the <code>audio</code> element.
        </audio>
      </p>
      <p>
        <button onClick={paused ? play : pause}>Play/Pause</button>
        <button onClick={muted ? unmute : mute}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
        <button onClick={() => setVolume(Math.round((volume - 0.1) * 10) / 10)}>
          Volume down
        </button>
        <button onClick={() => setVolume(Math.round((volume + 0.1) * 10) / 10)}>
          Volume up
        </button>
      </p>
      <p>The audio is paused: {paused.toString()}</p>
      <p>The audio is volume: {volume.toString()}</p>
      <p>The audio is muted: {muted.toString()}</p>
    </div>
  )
}
