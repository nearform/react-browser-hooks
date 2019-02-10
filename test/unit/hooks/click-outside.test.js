import React, { forwardRef, createRef } from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'
import { act } from 'react-dom/test-utils'

import { useClickOutside } from '../../../src'

let callback
let testElementRef = createRef()

beforeEach(() => {
  const TestClickOutsideHook = forwardRef(({ callback }, ref) => {
    useClickOutside(ref, callback)
    return <div ref={ref} />
  })

  const testClickOutsideHook = (callback) => {
    render(<TestClickOutsideHook ref={testElementRef} callback={callback} />)
  }

  callback = jest.fn()
  testClickOutsideHook(callback)
})

afterEach(cleanup)

describe('useClickOutside', () => {
  it('fires a click event on clicking outside the component', () => {
    act(() => {
      fireEvent(
        document.body,
        new Event('click', {
          bubbles: true,
          cancelable: false
        })
      )
    })

    expect(callback).toBeCalledTimes(1)
    expect(callback.mock.calls[0].length).toBe(1)
    expect(callback.mock.calls[0][0] instanceof Event).toBe(true)
    expect(callback.mock.calls[0][0].type).toBe('click')
  })

  it('does not fire a click event when the component itself receives a click', () => {
    act(() => {
      fireEvent(
        testElementRef.current,
        new Event('click', {
          bubbles: true,
          cancelable: false
        })
      )
    })

    expect(callback).toBeCalledTimes(0)
  })
})
