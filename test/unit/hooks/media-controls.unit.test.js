import React, { useRef } from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import { act } from 'react-dom/test-utils'

import { useMediaControls } from '../../../src'

// hook state
let currentTime,
  media,
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
      (player) =>
        ({
          currentTime,
          media,
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
        } = useMediaControls(player))
    )
  })

  mediaElementPlaySpy = jest.spyOn(media, 'play').mockImplementation(() => {})
  mediaElementPauseSpy = jest.spyOn(media, 'pause').mockImplementation(() => {})

  pausedGetter = jest.spyOn(media, 'paused', 'get')
})

afterEach(cleanup)

describe('useMediaControls', () => {
  it('sets initial state to match the media element', () => {
    expect(currentTime).toBe(0)
    expect(muted).toBe(false)
    expect(paused).toBe(true)
    expect(volume).toBe(1)
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
          media,
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
          media,
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
          media,
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
          media,
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
          media,
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
    it('when setVolume() is called', () => {
      expect(volume).toBe(1)

      act(() => {
        setVolume(0.5)
      })

      expect(volume).toBe(0.5)
    })

    it('when a "volumechange" event is triggered', () => {
      expect(volume).toBe(1)

      act(() => {
        media.volume = 0.2 // triggers "volumechange" event
      })

      expect(volume).toBe(0.2)
    })
  })

  describe('mutes', () => {
    it('when mute() is called', () => {
      expect(volume).toBe(1)

      act(() => {
        mute()
      })

      expect(volume).toBe(0)
    })

    it('when setVolume() is called with 0', () => {
      expect(volume).toBe(1)

      act(() => {
        setVolume(0)
      })

      expect(volume).toBe(0)
    })
  })

  describe('unmutes', () => {
    // mute the media before unmuting
    beforeEach(() => {
      act(() => {
        mute()
      })
    })

    it('when unmute() is called', () => {
      expect(volume).toBe(0)

      act(() => {
        unmute()
      })

      expect(volume).toBe(1)
    })

    it('when setVolume() is called with >0', () => {
      expect(volume).toBe(0)

      act(() => {
        setVolume(1)
      })

      expect(volume).toBe(1)
    })
  })

  describe('seeks', () => {
    // it('when seek() is called', () => {
    //   expect(currentTime).toBe(0)

    //   act(() => {
    //     seek(2) //todo: not firing seeked event as expected, possible bug in jsdom
    //   })

    //   expect(currentTime).toBe(2)
    // })

    it('when a "seeked" event is triggered', () => {
      media.currentTime = 2

      act(() => {
        fireEvent(
          media,
          new Event('seeked', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(currentTime).toBe(2)
    })

    it('when a "timeupdate" event is triggered', () => {
      media.currentTime = 2

      act(() => {
        fireEvent(
          media,
          new Event('timeupdate', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(currentTime).toBe(2)
    })
  })

  // todo: seek method not working in tests - test using spys instead
  // describe('stops', () => {
  //   // play the media before stopping it
  //   beforeEach(() => {
  //     pausedGetter.mockReturnValue(false)

  //     act(() => {
  //       fireEvent(
  //         media,
  //         new Event('play', {
  //           bubbles: false,
  //           cancelable: false
  //         })
  //       )
  //     })

  //     media.currentTime = 2

  //     act(() => {
  //       fireEvent(
  //         media,
  //         new Event('seeked', {
  //           bubbles: false,
  //           cancelable: false
  //         })
  //       )
  //     })
  //   })

  //   it('when stop() is called', () => {
  //     expect(paused).toBe(false)
  //     expect(currentTime).toBeGreaterThan(0)

  //     act(() => {
  //       stop()
  //     })

  //     // expect(paused).toBe(true)
  //     expect(currentTime).toBe(0)
  //   })
  // })
})

function TestMediaControlsHook({ callback }) {
  const player = useRef(null)
  callback(player)
  return (
    <audio
      ref={player}
      src="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/00/ea/65/00ea65de-25f1-3217-7a2b-097e989dd884/mzaf_5030465069226935473.plus.aac.p.m4a"
    />
  )
}

function testMediaControlsHook(callback) {
  render(<TestMediaControlsHook callback={callback} />)
}
