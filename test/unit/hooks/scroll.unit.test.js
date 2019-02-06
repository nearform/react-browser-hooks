import { testHook, cleanup, fireEvent } from 'react-testing-library'
import { act } from 'react-dom/test-utils'

import { useScroll } from '../../../src'

afterEach(cleanup)

describe('useScroll', () => {
  it('sets initial state to window.scroll values', () => {
    let top, left

    window.scrollX = 0
    window.scrollY = 0

    testHook(() => ({ top, left } = useScroll()))

    expect(top).toBe(0)
    expect(left).toBe(0)
  })

  it('updates state on "scroll" event', () => {
    let top, left

    window.scrollX = 0
    window.scrollY = 0

    act(() => {
      testHook(() => ({ top, left } = useScroll()))
    })

    window.scrollX = 100
    window.scrollY = 100

    act(() => {
      fireEvent(
        window,
        new Event('scroll', {
          bubbles: false,
          cancelable: false
        })
      )
    })

    expect(top).toBe(100)
    expect(left).toBe(100)
  })
})
