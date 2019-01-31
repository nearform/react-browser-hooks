import { useState, useEffect } from 'react'

// transform from a Position object to a serialisable object literal
const transformPositiontoObject = (position) => ({
  timestamp: position.timestamp,
  coords: {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed
  }
})

export function useGeolocation(options) {
  const [position, setPosition] = useState(
    transformPositiontoObject({ timestamp: Date.now(), coords: {} })
  )
  const [error, setError] = useState(null)

  const setTransformedPosition = (position) =>
    setPosition(transformPositiontoObject(position))

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      setTransformedPosition,
      setError,
      options
    )
    const watchId = navigator.geolocation.watchPosition(
      setTransformedPosition,
      setError,
      options
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [options])

  return [position, error]
}
