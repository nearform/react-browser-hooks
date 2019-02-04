import React, { useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { useMediaControls } from '../../../src'
import readme from './README.md'
import { withReadme } from 'storybook-readme'

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
      <p>
        The audio is volume: {volume !== undefined ? volume.toString() : ''}
      </p>
      <p>The audio is muted: {muted !== undefined ? muted.toString() : ''}</p>
    </div>
  )
}

function Video() {
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
      <p>The video is paused: {paused.toString()}</p>
      <p>
        The video currentTime:{' '}
        {currentTime !== undefined ? currentTime.toString() : ''}
      </p>
    </div>
  )
}

function MediaControls() {
  return (
    <div>
      <h2>Media Controls Demo</h2>
      <Video />
      <Audio />
    </div>
  )
}

storiesOf('MediaControls', module).add(
  'Default',
  withReadme(readme, () => <MediaControls />)
)
