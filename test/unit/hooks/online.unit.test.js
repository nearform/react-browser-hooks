import { testHook, cleanup, fireEvent } from 'react-testing-library'
import { act } from 'react-dom/test-utils'

import { useOnline } from '../../../src'

let onLineGetter

beforeEach(() => {
  onLineGetter = jest.spyOn(window.navigator, 'onLine', 'get')
})

afterEach(cleanup)

describe('useOnline', () => {
  it('sets initial state to window.navigator.onLine', () => {
    let online

    onLineGetter.mockReturnValue(true)

    testHook(() => (online = useOnline()))

    expect(online).toBe(true)
  })

  it('updates state on "online"', () => {
    let online

    onLineGetter.mockReturnValue(false)

    act(() => {
      testHook(() => (online = useOnline()))
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
    testHook(() => (online = useOnline()))
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
