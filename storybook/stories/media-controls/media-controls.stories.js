import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { useMediaControls } from '../../../src'
import readme from './README.md'

function Audio() {
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
      <div>
        <div>
          <audio
            ref={player}
            muted
            src="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/00/ea/65/00ea65de-25f1-3217-7a2b-097e989dd884/mzaf_5030465069226935473.plus.aac.p.m4a"
            width="250">
            Your browser does not support the <code>audio</code> element.
          </audio>
        </div>
        <div>
          <button onClick={paused ? play : pause}>
            {paused ? 'Play' : 'Pause'}
          </button>
          <button onClick={muted ? unmute : mute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
          <button
            onClick={() =>
              setVolume(Math.max(0, Math.round((volume - 0.1) * 10) / 10))
            }
            disabled={volume === 0}>
            Volume down
          </button>
          <button
            onClick={() =>
              setVolume(Math.min(1, Math.round((volume + 0.1) * 10) / 10))
            }
            disabled={volume === 1}>
            Volume up
          </button>
        </div>
        <p>The audio is paused: {paused !== null ? paused.toString() : ''}</p>
        <p>The audio is volume: {volume !== null ? volume.toString() : ''}</p>
        <p>The audio is muted: {muted !== null ? muted.toString() : ''}</p>
      </div>
      <div style={{ display: 'none' }}>
        <p>
          <video
            ref={player}
            muted
            src="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/00/ea/65/00ea65de-25f1-3217-7a2b-097e989dd884/mzaf_5030465069226935473.plus.aac.p.m4a"
            width="250">
            Your browser does not support the <code>audio</code> element.
          </video>
        </p>
        <p>
          <button onClick={paused ? play : pause}>
            {paused ? 'Play' : 'Pause'}
          </button>
          <button onClick={muted ? unmute : mute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
          <button
            onClick={() => setVolume(Math.round((volume - 0.1) * 10) / 10)}>
            Volume down
          </button>
          <button
            onClick={() => setVolume(Math.round((volume + 0.1) * 10) / 10)}>
            Volume up
          </button>
        </p>
        <p>The audio is paused: {paused !== null ? paused.toString() : ''}</p>
        <p>The audio is volume: {volume !== null ? volume.toString() : ''}</p>
        <p>The audio is muted: {muted !== null ? muted.toString() : ''}</p>
      </div>
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
          ref={player}
          muted
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          width="250">
          Your browser does not support the <code>video</code> element.
        </video>
      </p>
      <p>
        <button onClick={paused ? play : stop}>Play/Stop</button>
        <button onClick={restart}>Restart</button>
        <button onClick={() => seek(currentTime - 2)}>Seek back</button>
        <button onClick={() => seek(currentTime + 2)}>Seek forward</button>
      </p>
      <p>The video is paused: {paused !== null ? paused.toString() : ''}</p>
      <p>
        The video currentTime:{' '}
        {currentTime !== null ? currentTime.toString() : ''}
      </p>
    </div>
  )
}

function MediaControls() {
  return (
    <div className="media-controls-demo">
      <h2>Media Controls Demo</h2>
      <Video />
      <Audio />
    </div>
  )
}

storiesOf('MediaControls', module)
  .addParameters({ readme: { sidebar: readme } })
  .add('Default', () => <MediaControls />)
