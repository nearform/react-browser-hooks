import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/react'

import { useOnline } from '../../../src'
import * as constants from '../../../src/constants'

let onLineGetter

beforeEach(() => {
  onLineGetter = jest.spyOn(window.navigator, 'onLine', 'get')
})

afterEach(cleanup)

describe('useOnline', () => {
  describe('when rendered on the server', () => {
    beforeAll(() => {
      constants.IS_SERVER = true
    })

    afterAll(() => {
      constants.IS_SERVER = false
    })

    it('defaults to true', () => {
      let online
      renderHook(() => (online = useOnline()))

      expect(online).toBe(true)
    })
  })

  it('sets initial state to window.navigator.onLine', () => {
    let online

    onLineGetter.mockReturnValue(true)

    renderHook(() => (online = useOnline()))

    expect(online).toBe(true)
  })

  it('updates state on "online"', () => {
    let online

    onLineGetter.mockReturnValue(false)

    act(() => {
      renderHook(() => (online = useOnline()))
    })

    onLineGetter.mockReturnValue(true)

    act(() => {
      fireEvent(
        window,
        new Event('online', {
          bubbles: false,
          cancelable: false
        })
      )
    })

    expect(online).toBe(true)
  })
})

it('updates state on "offline"', () => {
  let online

  onLineGetter.mockReturnValue(true)

  act(() => {
    renderHook(() => (online = useOnline()))
  })

  onLineGetter.mockReturnValue(false)

  act(() => {
    fireEvent(
      window,
      new Event('online', {
        bubbles: false,
        cancelable: false
      })
    )
  })

  expect(online).toBe(false)
})
