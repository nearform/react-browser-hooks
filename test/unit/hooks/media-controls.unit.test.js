import React, { useRef } from 'react'
import { act, cleanup } from 'react-hooks-testing-library'
import { fireEvent, render } from 'react-testing-library'

import { useMediaControls } from '../../../src'

// ref
let mediaElementRef

// hook state
let currentTime,
  mute,
  muted,
  unmute,
  pause,
  paused,
  play,
  restart,
  seek,
  setVolume,
  stop,
  volume

// spys
let mediaElementPlaySpy, mediaElementPauseSpy

// getters
let pausedGetter

beforeEach(() => {
  act(() => {
    testMediaControlsHook(
      () =>
        ({
          currentTime,
          mute,
          muted,
          unmute,
          pause,
          paused,
          play,
          restart,
          seek,
          setVolume,
          stop,
          volume
        } = useMediaControls(mediaElementRef))
    )
  })

  mediaElementPlaySpy = jest
    .spyOn(mediaElementRef.current, 'play')
    .mockImplementation(() => {})
  mediaElementPauseSpy = jest
    .spyOn(mediaElementRef.current, 'pause')
    .mockImplementation(() => {})

  pausedGetter = jest.spyOn(mediaElementRef.current, 'paused', 'get')
})

afterEach(cleanup)

function TestMediaControlsHook({ callback }) {
  mediaElementRef = useRef(null)
  callback()
  return (
    <audio
      muted
      ref={mediaElementRef}
      src="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/00/ea/65/00ea65de-25f1-3217-7a2b-097e989dd884/mzaf_5030465069226935473.plus.aac.p.m4a"
    />
  )
}

function testMediaControlsHook(callback) {
  render(<TestMediaControlsHook callback={callback} />)
}

describe('useMediaControls', () => {
  it('sets initial state to match the media element', () => {
    expect(currentTime).toBe(0)
    expect(muted).toBe(true)
    expect(paused).toBe(true)
    expect(volume).toBe(0)
  })

  describe('plays', () => {
    it('when play() is called', () => {
      play()
      expect(mediaElementPlaySpy).toHaveBeenCalled()
    })

    it('when a "play" event is triggered', () => {
      pausedGetter.mockReturnValue(false)

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('play', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(paused).toBe(false)
    })

    it('when a "playing" event is triggered', () => {
      pausedGetter.mockReturnValue(false)

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('playing', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(paused).toBe(false)
    })
  })

  describe('pauses', () => {
    // play the media before pausing it
    beforeEach(() => {
      pausedGetter.mockReturnValue(false)

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('play', {
            bubbles: false,
            cancelable: false
          })
        )
      })
    })

    it('when pause() is called', () => {
      pause()
      expect(mediaElementPauseSpy).toHaveBeenCalled()
    })

    it('when a "pause" event is triggered', () => {
      pausedGetter.mockReturnValue(true)

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('pause', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(paused).toBe(true)
    })

    it('when a "waiting" event is triggered', () => {
      pausedGetter.mockReturnValue(true)

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('waiting', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(paused).toBe(true)
    })
  })

  describe('sets volume', () => {
    beforeEach(() => {
      act(() => {
        unmute()
      })
    })

    it('when setVolume() is called', () => {
      expect(volume).toBe(1)
      expect(mediaElementRef.current.volume).toBe(1)

      act(() => {
        setVolume(0.5)
      })

      expect(volume).toBe(0.5)
      expect(mediaElementRef.current.volume).toBe(0.5)
    })

    it('when a "volumechange" event is triggered', () => {
      expect(volume).toBe(1)
      expect(mediaElementRef.current.volume).toBe(1)

      act(() => {
        mediaElementRef.current.volume = 0.2 // triggers "volumechange" event
      })

      expect(volume).toBe(0.2)
      expect(mediaElementRef.current.volume).toBe(0.2)
    })
  })

  describe('mutes', () => {
    beforeEach(() => {
      act(() => {
        unmute()
      })
    })

    it('when mute() is called', () => {
      expect(volume).toBe(1)
      expect(mediaElementRef.current.volume).toBe(1)

      act(() => {
        mute()
      })

      expect(volume).toBe(0)
      expect(mediaElementRef.current.volume).toBe(0)
    })

    it('when setVolume() is called with 0', () => {
      expect(volume).toBe(1)
      expect(mediaElementRef.current.volume).toBe(1)

      act(() => {
        setVolume(0)
      })

      expect(volume).toBe(0)
      expect(mediaElementRef.current.volume).toBe(0)
    })
  })

  describe('unmutes', () => {
    beforeEach(() => {
      act(() => {
        mute()
      })
    })

    it('when unmute() is called', () => {
      expect(volume).toBe(0)
      expect(mediaElementRef.current.volume).toBe(0)

      act(() => {
        unmute()
      })

      expect(volume).toBe(1)
      expect(mediaElementRef.current.volume).toBe(1)
    })

    it('when setVolume() is called with >0', () => {
      expect(volume).toBe(0)
      expect(mediaElementRef.current.volume).toBe(0)

      act(() => {
        setVolume(1)
      })

      expect(volume).toBe(1)
      expect(mediaElementRef.current.volume).toBe(1)
    })
  })

  describe('seeks', () => {
    it('when seek() is called', () => {
      expect(currentTime).toBe(0)
      expect(mediaElementRef.current.currentTime).toBe(0)

      act(() => {
        seek(2)
      })

      mediaElementRef.current.addEventListener('seeked', () => {
        expect(currentTime).toBe(2)
        expect(mediaElementRef.current.currentTime).toBe(2)
      })
    })

    it('when a "seeked" event is triggered', () => {
      mediaElementRef.current.currentTime = 2

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('seeked', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(currentTime).toBe(2)
      expect(mediaElementRef.current.currentTime).toBe(2)
    })

    it('when a "timeupdate" event is triggered', () => {
      mediaElementRef.current.currentTime = 2

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('timeupdate', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(currentTime).toBe(2)
      expect(mediaElementRef.current.currentTime).toBe(2)
    })
  })

  describe('stops', () => {
    // play the media before stopping it
    beforeEach(() => {
      pausedGetter.mockReturnValue(false)

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('play', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      mediaElementRef.current.currentTime = 2

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('seeked', {
            bubbles: false,
            cancelable: false
          })
        )
      })
    })

    it('when stop() is called', () => {
      expect(paused).toBe(false)
      expect(currentTime).toBeGreaterThan(0)
      expect(mediaElementRef.current.currentTime).toBeGreaterThan(0)

      act(() => {
        stop()
      })

      mediaElementRef.current.addEventListener('seeked', () => {
        expect(paused).toBe(true)
        expect(currentTime).toBe(0)
        expect(mediaElementRef.current.currentTime).toBe(0)
      })
    })
  })

  describe('restarts', () => {
    // end the media before restarting it
    beforeEach(() => {
      mediaElementRef.current.currentTime = 30

      act(() => {
        fireEvent(
          mediaElementRef.current,
          new Event('seeked', {
            bubbles: false,
            cancelable: false
          })
        )
      })
    })

    it('when restart() is called', () => {
      expect(paused).toBe(true)
      expect(currentTime).toBe(30)
      expect(mediaElementRef.current.currentTime).toBe(30)

      act(() => {
        restart()
      })

      mediaElementRef.current.addEventListener('seeked', () => {
        expect(paused).toBe(false)
        expect(currentTime).toBeGreaterThan(0)
        expect(mediaElementRef.current.currentTime).toBeGreaterThan(0)
      })
    })
  })
})
