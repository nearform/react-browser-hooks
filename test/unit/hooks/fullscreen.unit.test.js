import React, { createRef } from 'react'
import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { fireEvent, render } from '@testing-library/react'

import { useFullScreen, useFullScreenBrowser } from '../../../src'
import * as constants from '../../../src/constants'

afterEach(cleanup)

let testElementRef
beforeEach(() => {
  testElementRef = createRef()
  render(<div ref={testElementRef} />)

  document.fullscreenElement = null
  document.mozFullScreenElement = null
  document.webkitFullscreenElement = null
  document.msFullscreenElement = null
  document.fullscreen = null
  document.mozFullScreen = null
  document.webkitIsFullScreen = null
  document.fullScreenMode = null
})

describe('useFullScreen', () => {
  describe('initial state', () => {
    describe('when rendered on the server', () => {
      beforeAll(() => {
        constants.IS_SERVER = true
      })

      afterAll(() => {
        constants.IS_SERVER = false
      })

      it('defaults to false', () => {
        let fullScreen
        document.fullscreenElement = testElementRef.current
        renderHook(
          () => ({ fullScreen } = useFullScreen({ element: testElementRef }))
        )

        expect(fullScreen).toBe(false)
      })
    })

    describe('with options and element ref', () => {
      it('uses document.fullscreenElement', () => {
        let fullScreen
        document.fullscreenElement = testElementRef.current
        renderHook(
          () => ({ fullScreen } = useFullScreen({ element: testElementRef }))
        )

        expect(fullScreen).toBe(true)
      })

      it('uses document.mozFullScreenElement', () => {
        let fullScreen
        document.mozFullScreenElement = testElementRef.current
        renderHook(
          () => ({ fullScreen } = useFullScreen({ element: testElementRef }))
        )

        expect(fullScreen).toBe(true)
      })

      it('uses document.webkitFullscreenElement', () => {
        let fullScreen
        document.webkitFullscreenElement = testElementRef.current
        renderHook(
          () => ({ fullScreen } = useFullScreen({ element: testElementRef }))
        )

        expect(fullScreen).toBe(true)
      })

      it('uses document.msFullscreenElement', () => {
        let fullScreen
        document.msFullscreenElement = testElementRef.current
        renderHook(
          () => ({ fullScreen } = useFullScreen({ element: testElementRef }))
        )

        expect(fullScreen).toBe(true)
      })
    })

    describe('without options', () => {
      it('uses document.fullscreenElement', () => {
        let fullScreen
        document.fullscreenElement = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('uses document.mozFullScreenElement', () => {
        let fullScreen
        document.mozFullScreenElement = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('uses document.webkitFullscreenElement', () => {
        let fullScreen
        document.webkitFullscreenElement = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('uses document.msFullscreenElement', () => {
        let fullScreen
        document.msFullscreenElement = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('uses document.fullscreen', () => {
        let fullScreen
        document.fullscreen = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('uses document.mozFullScreen', () => {
        let fullScreen
        document.mozFullScreen = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('uses document.webkitIsFullScreen', () => {
        let fullScreen
        document.webkitIsFullScreen = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('uses document.fullScreenMode', () => {
        let fullScreen
        document.fullScreenMode = true
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(true)
      })

      it('defaults initial state to false', () => {
        let fullScreen
        renderHook(() => ({ fullScreen } = useFullScreen()))

        expect(fullScreen).toBe(false)
      })
    })
  })

  describe('change events', () => {
    it('updates state when "webkitfullscreenchange" fires', () => {
      let fullScreen
      document.webkitIsFullScreen = false
      renderHook(() => ({ fullScreen } = useFullScreen()))

      document.webkitIsFullScreen = true

      act(() => {
        fireEvent(
          document,
          new Event('webkitfullscreenchange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(fullScreen).toBe(true)
    })

    it('updates state when "mozfullscreenchange" fires', () => {
      let fullScreen
      document.mozFullScreen = false
      renderHook(() => ({ fullScreen } = useFullScreen()))

      document.mozFullScreen = true

      act(() => {
        fireEvent(
          document,
          new Event('mozfullscreenchange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(fullScreen).toBe(true)
    })

    it('updates state when "msfullscreenchange" fires', () => {
      let fullScreen
      document.fullScreenMode = false
      renderHook(() => ({ fullScreen } = useFullScreen()))

      document.fullScreenMode = true

      act(() => {
        fireEvent(
          document,
          new Event('msfullscreenchange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(fullScreen).toBe(true)
    })

    it('updates state when "MSFullscreenChange" fires', () => {
      let fullScreen
      document.fullScreenMode = false
      renderHook(() => ({ fullScreen } = useFullScreen()))

      document.fullScreenMode = true

      act(() => {
        fireEvent(
          document,
          new Event('MSFullscreenChange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(fullScreen).toBe(true)
    })

    it('updates state when "fullscreenchange" fires', () => {
      let fullScreen
      document.fullscreen = false

      renderHook(() => ({ fullScreen } = useFullScreen()))

      document.fullscreen = true

      act(() => {
        fireEvent(
          document,
          new Event('fullscreenchange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(fullScreen).toBe(true)
    })
  })

  describe('open', () => {
    it('calls requestFullScreen', () => {
      let open
      testElementRef.current.requestFullscreen = jest.fn()
      renderHook(() => ({ open } = useFullScreen({ element: testElementRef })))

      open()

      expect(testElementRef.current.requestFullscreen).toHaveBeenCalled()
    })

    it('calls mozRequestFullScreen', () => {
      let open
      testElementRef.current.mozRequestFullScreen = jest.fn()
      renderHook(() => ({ open } = useFullScreen({ element: testElementRef })))

      open()

      expect(testElementRef.current.mozRequestFullScreen).toHaveBeenCalled()
    })

    it('calls webkitRequestFullscreen', () => {
      let open
      testElementRef.current.webkitRequestFullscreen = jest.fn()
      renderHook(() => ({ open } = useFullScreen({ element: testElementRef })))

      open()

      expect(testElementRef.current.webkitRequestFullscreen).toHaveBeenCalled()
    })

    it('calls msRequestFullscreen', () => {
      let open
      testElementRef.current.msRequestFullscreen = jest.fn()
      renderHook(() => ({ open } = useFullScreen({ element: testElementRef })))

      open()

      expect(testElementRef.current.msRequestFullscreen).toHaveBeenCalled()
    })
  })

  describe('close', () => {
    beforeEach(() => {
      document.exitFullscreen = null
      document.mozCancelFullScreen = null
      document.webkitExitFullscreen = null
      document.msExitFullscreen = null
    })

    it('calls exitFullscreen', () => {
      let close
      document.exitFullscreen = jest.fn()
      renderHook(() => ({ close } = useFullScreen()))

      close()

      expect(document.exitFullscreen).toHaveBeenCalled()
    })

    it('calls mozCancelFullScreen', () => {
      let close
      document.mozCancelFullScreen = jest.fn()
      renderHook(() => ({ close } = useFullScreen()))

      close()

      expect(document.mozCancelFullScreen).toHaveBeenCalled()
    })

    it('calls webkitExitFullscreen', () => {
      let close
      document.webkitExitFullscreen = jest.fn()
      renderHook(() => ({ close } = useFullScreen()))

      close()

      expect(document.webkitExitFullscreen).toHaveBeenCalled()
    })

    it('calls msExitFullscreen', () => {
      let close
      document.msExitFullscreen = jest.fn()
      renderHook(() => ({ close } = useFullScreen()))

      close()

      expect(document.msExitFullscreen).toHaveBeenCalled()
    })
  })
})

describe('useFullScreenBrowser', () => {
  it('sets initial state to false if it is not full screen', () => {
    window.screenTop = 10
    window.screenY = 10
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1000)
    jest.spyOn(window.screen, 'height', 'get').mockReturnValue(1000)
    window.innerWidth = 500
    window.innerHeight = 500

    let fullScreen
    renderHook(() => ({ fullScreen } = useFullScreenBrowser()))

    expect(fullScreen).toBe(false)
  })

  it('sets initial state to true if window and inner sizes are the same', () => {
    window.screenTop = 10
    window.screenY = 10
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(500)
    jest.spyOn(window.screen, 'height', 'get').mockReturnValue(500)
    window.innerWidth = 500
    window.innerHeight = 500

    let fullScreen
    renderHook(() => ({ fullScreen } = useFullScreenBrowser()))

    expect(fullScreen).toBe(true)
  })

  it('sets initial state to true if there is no screenTop and no screenY', () => {
    window.screenTop = 0
    window.screenY = 0
    jest.spyOn(window.screen, 'width', 'get').mockReturnValue(1000)
    jest.spyOn(window.screen, 'height', 'get').mockReturnValue(1000)
    window.innerWidth = 500
    window.innerHeight = 500

    let fullScreen
    renderHook(() => ({ fullScreen } = useFullScreenBrowser()))

    expect(fullScreen).toBe(true)
  })
})
