import { act, renderHook, cleanup } from 'react-hooks-testing-library'

import { useGeolocation } from '../../../src'

afterEach(cleanup)

describe('useGeolocation', () => {
  it('sets initial state to mock Position', () => {
    let position, error
    renderHook(() => ({ position, error } = useGeolocation()))

    expect(position).toEqual({
      coords: {},
      timestamp: 1549358005991
    })

    expect(error).toBe(null)
  })

  it('calls getCurrentPosition with options', () => {
    act(() => {
      renderHook(() => useGeolocation({ foo: 'bar' }))
    })

    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        foo: 'bar'
      }
    )
  })

  it('returns a position on a successful getCurrentPosition', () => {
    navigator.geolocation.getCurrentPosition = jest
      .fn()
      .mockImplementationOnce((onSuccess) => onSuccess('position'))

    let position, error
    act(() => {
      renderHook(() => ({ position, error } = useGeolocation()))
    })

    expect(position).toBe('position')
    expect(error).toBe(null)
  })

  it('returns an error on an unsuccessful getCurrentPosition', () => {
    const mockError = new Error('Where are you?')

    navigator.geolocation.getCurrentPosition = jest
      .fn()
      .mockImplementationOnce((_, onError) => onError(mockError))

    let error
    act(() => {
      renderHook(() => ({ error } = useGeolocation()))
    })

    expect(error).toBe(mockError)
  })

  it('calls watchPosition with options', () => {
    act(() => {
      renderHook(() => useGeolocation({ foo: 'bar' }))
    })

    expect(navigator.geolocation.watchPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      {
        foo: 'bar'
      }
    )
  })

  it('returns a position on a successful watchPosition', () => {
    navigator.geolocation.watchPosition = jest
      .fn()
      .mockImplementationOnce((onSuccess) => onSuccess('position'))

    let position, error
    act(() => {
      renderHook(() => ({ position, error } = useGeolocation()))
    })

    expect(position).toBe('position')
    expect(error).toBe(null)
  })

  it('returns an error on an unsuccessful watchPosition', () => {
    const mockError = new Error('Cannot find you!')

    navigator.geolocation.watchPosition = jest
      .fn()
      .mockImplementationOnce((_, onError) => onError(mockError))

    let error
    act(() => {
      renderHook(() => ({ error } = useGeolocation()))
    })

    expect(error).toBe(mockError)
  })
})
