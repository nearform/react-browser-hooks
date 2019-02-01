import { useState, useEffect } from 'react'

export function useGeolocation(options) {
  const [position, setPosition] = useState({
    timestamp: Date.now(),
    coords: {}
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, setError, options)
    const watchId = navigator.geolocation.watchPosition(
      setPosition,
      setError,
      options
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [options])

  return [position, error]
}
