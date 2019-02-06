import { fireEvent } from 'react-testing-library'
import { testHook, cleanup } from 'react-proxy-hook'
import { act } from 'react-dom/test-utils'

import { useMousePosition } from '../../../src'

afterEach(cleanup)

describe('useMousePosition', () => {
  it('sets initial state to 0, 0', () => {
    let x, y

    testHook(() => ({ x, y } = useMousePosition()))

    expect(x).toBe(0)
    expect(y).toBe(0)
  })

  it('updates state on "mousemove"', () => {
    let x, y

    act(() => {
      testHook(() => ({ x, y } = useMousePosition()))
    })

    act(() => {
      fireEvent.mouseMove(document.body, { clientX: 100, clientY: 100 })
    })

    expect(x).toBe(100)
    expect(y).toBe(100)
  })
})
