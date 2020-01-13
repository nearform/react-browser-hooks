import React, { forwardRef, createRef } from 'react'
import { cleanup, fireEvent, render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import { useClickOutside } from '../../../src'

let callback
let testElementRef
let childElementRef
let siblingRef
let testHook
let testHookWithSibling
let testHookWithActiveState
let active

beforeEach(() => {
  testElementRef = createRef()
  childElementRef = createRef()
  siblingRef = createRef()
  const TestChildComponent = forwardRef((props, ref) => {
    return <div ref={ref} />
  })

  const TestHook = forwardRef(({ callback }, ref) => {
    useClickOutside(ref, callback)
    return (
      <div ref={ref}>
        <TestChildComponent ref={childElementRef} />
      </div>
    )
  })

  const TestHookWithActiveState = forwardRef(({ callback }, ref) => {
    useClickOutside(ref, { active }, callback)
    return (
      <div ref={ref}>
        <TestChildComponent ref={childElementRef} />
      </div>
    )
  })

  const TestHookWithSibling = forwardRef(({ callback }, ref) => {
    useClickOutside([ref, siblingRef], callback)
    return (
      <>
        <div ref={siblingRef} />
        <div ref={ref}>
          <TestChildComponent ref={childElementRef} />
        </div>
      </>
    )
  })

  testHook = (callback) => {
    render(<TestHook ref={testElementRef} callback={callback} />)
  }

  testHookWithActiveState = (callback) => {
    render(<TestHookWithActiveState ref={testElementRef} callback={callback} />)
  }

  testHookWithSibling = (callback) => {
    render(<TestHookWithSibling ref={testElementRef} callback={callback} />)
  }

  callback = jest.fn()
})

afterEach(cleanup)

describe('useClickOutside', () => {
  it('calls callback with click event on clicking outside the component', () => {
    testHook(callback)
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

  it('calls callback if calling component is active', () => {
    active = true
    testHookWithActiveState(callback)
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

  it('does not call callback if calling component is inactive', () => {
    active = false
    testHookWithActiveState(callback)
    act(() => {
      fireEvent(
        document.body,
        new Event('click', {
          bubbles: true,
          cancelable: false
        })
      )
    })

    expect(callback).toBeCalledTimes(0)
  })

  it('does not call callback when the component itself receives a click', () => {
    testHook(callback)
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

  it('does not call callback when a child receives a click', () => {
    testHook(callback)
    act(() => {
      fireEvent(
        childElementRef.current,
        new Event('click', {
          bubbles: true,
          cancelable: false
        })
      )
    })

    expect(callback).toBeCalledTimes(0)
  })

  it('supports array of refs, and will call callback if target is not contained by any', () => {
    testHookWithSibling(callback)
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

  it('handles null ref.current', () => {
    siblingRef.current = null
    testHookWithSibling(callback)
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

  it('supports array of refs, and will not call callback if target is contained by any', () => {
    testHookWithSibling(callback)
    act(() => {
      fireEvent(
        siblingRef.current,
        new Event('click', {
          bubbles: true,
          cancelable: false
        })
      )
    })
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
