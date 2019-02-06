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
    let status

    onLineGetter.mockReturnValue(true)

    testHook(() => ({ status } = useOnline()))

    expect(status).toBe(true)
  })

  it('updates state on "online"', () => {
    let status

    onLineGetter.mockReturnValue(false)

    act(() => {
      testHook(() => ({ status } = useOnline()))
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

    expect(status).toBe(true)
  })
})

it('updates state on "offline"', () => {
  let status

  onLineGetter.mockReturnValue(true)

  act(() => {
    testHook(() => ({ status } = useOnline()))
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

  expect(status).toBe(false)
})
