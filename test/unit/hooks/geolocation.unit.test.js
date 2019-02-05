import { flushEffects } from 'react-testing-library'
import { testHook, cleanup } from 'react-proxy-hook'
import { useGeolocation } from '../../../src'

afterEach(cleanup)

describe('useGeolocation', () => {
  it('sets initial state to mock Position', () => {
    let position, error
    testHook(() => ({ position, error } = useGeolocation()))

    expect(position).toEqual({
      coords: {},
      timestamp: 1549358005991
    })

    expect(error).toBe(null)
  })

  it('calls getCurrentPosition with options', () => {
    testHook(() => useGeolocation({ foo: 'bar' }))

    flushEffects()

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
    testHook(() => ({ position, error } = useGeolocation()))

    flushEffects()

    expect(position).toBe('position')
    expect(error).toBe(null)
  })

  it('returns an error on an unsuccessful getCurrentPosition', () => {
    const mockError = new Error('Where are you?')

    navigator.geolocation.getCurrentPosition = jest
      .fn()
      .mockImplementationOnce((_, onError) => onError(mockError))

    let error
    testHook(() => ({ error } = useGeolocation()))

    flushEffects()

    expect(error).toBe(mockError)
  })

  it('calls watchPosition with options', () => {
    testHook(() => useGeolocation({ foo: 'bar' }))

    flushEffects()

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
    testHook(() => ({ position, error } = useGeolocation()))

    flushEffects()

    expect(position).toBe('position')
    expect(error).toBe(null)
  })

  it('returns an error on an unsuccessful watchPosition', () => {
    const mockError = new Error('Cannot find you!')

    navigator.geolocation.watchPosition = jest
      .fn()
      .mockImplementationOnce((_, onError) => onError(mockError))

    let error
    testHook(() => ({ error } = useGeolocation()))

    flushEffects()

    expect(error).toBe(mockError)
  })
})
