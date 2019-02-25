import { act, cleanup, renderHook } from 'react-hooks-testing-library'
import { fireEvent } from 'react-testing-library'
import { useMousePosition } from '../../../src'

afterEach(cleanup)

describe('useMousePosition', () => {
  it('sets initial state to 0, 0', () => {
    let x, y

    renderHook(() => ({ x, y } = useMousePosition()))

    expect(x).toBe(0)
    expect(y).toBe(0)
  })

  it('updates state on "mousemove"', () => {
    let x, y

    act(() => {
      renderHook(() => ({ x, y } = useMousePosition()))
    })

    act(() => {
      fireEvent.mouseMove(document.body, { clientX: 100, clientY: 100 })
    })

    expect(x).toBe(100)
    expect(y).toBe(100)
  })
})
