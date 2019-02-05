import { testHook, flushEffects, fireEvent, cleanup } from 'react-proxy-hook'
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
    fireEvent.orientationchange({ angle: 90, orientation: 'landscape-primary' })
    expect(angle).toBe(90)
  })
})
