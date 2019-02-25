import { act, cleanup, renderHook } from 'react-hooks-testing-library'
import { fireEvent } from 'react-testing-library'

import { useScroll } from '../../../src'
import * as constants from '../../../src/constants'

afterEach(cleanup)

describe('useScroll', () => {
  describe('when rendered on the server', () => {
    beforeAll(() => {
      constants.IS_SERVER = true
    })

    afterAll(() => {
      constants.IS_SERVER = false
    })

    it('defaults to 0, 0', () => {
      let top, left

      renderHook(() => ({ top, left } = useScroll()))

      expect(top).toBe(0)
      expect(left).toBe(0)
    })
  })

  it('sets initial state to window.scroll values', () => {
    let top, left

    window.scrollX = 0
    window.scrollY = 0

    renderHook(() => ({ top, left } = useScroll()))

    expect(top).toBe(0)
    expect(left).toBe(0)
  })

  it('updates state on "scroll" event', () => {
    let top, left

    window.scrollX = 0
    window.scrollY = 0

    act(() => {
      renderHook(() => ({ top, left } = useScroll()))
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
