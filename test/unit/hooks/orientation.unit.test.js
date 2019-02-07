import { testHook, cleanup, fireEvent } from 'react-testing-library'
import { act } from 'react-dom/test-utils'

import { useOrientation } from '../../../src'

afterEach(cleanup)

describe('useOrientation', () => {
  it('sets initial state to the default state if window.screen.orientation is falsy', () => {
    let angle, type
    window.screen.orientation = null

    testHook(() => ({ angle, type } = useOrientation()))

    expect(angle).toBe(0)
    expect(type).toBe('landscape-primary')
  })

  it('sets initial state to window.screen.orientation', () => {
    let angle, type
    window.screen.orientation = { angle: 0, type: 'portrait-primary' }

    testHook(() => ({ angle, type } = useOrientation()))

    expect(angle).toBe(0)
    expect(type).toBe('portrait-primary')
  })

  it('updates state on "orientationchange"', () => {
    let angle, type
    window.screen.orientation = { angle: 0, type: 'portrait-primary' }

    act(() => {
      testHook(() => ({ angle, type } = useOrientation()))
    })

    window.screen.orientation = { angle: 90, type: 'landscape-primary' }

    act(() => {
      fireEvent(
        window,
        new Event('orientationchange', {
          bubbles: false,
          cancelable: false
        })
      )
    })

    expect(angle).toBe(90)
    expect(type).toBe('landscape-primary')
  })
})
