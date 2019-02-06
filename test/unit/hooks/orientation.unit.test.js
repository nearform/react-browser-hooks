import { fireEvent, flushEffects } from 'react-testing-library'
import { testHook, cleanup } from 'react-proxy-hook'
import { useOrientation } from '../../../src'

afterEach(cleanup)

describe('useOrientation', () => {
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
    testHook(() => ({ angle, type } = useOrientation()))

    flushEffects()

    window.screen.orientation = { angle: 90, type: 'landscape-primary' }
    fireEvent(
      window,
      new Event('orientationchange', {
        bubbles: false,
        cancelable: false
      })
    )

    expect(angle).toBe(90)
    expect(type).toBe('landscape-primary')
  })
})
