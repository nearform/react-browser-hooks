import React, { Fragment, useState } from 'react'
import { useGeolocation } from '../../../src'

const CurrentLocation = () => {
  const [position, error] = useGeolocation()

  return error ? (
    <p>There was an error: {error.message}</p>
  ) : (
    <pre>{JSON.stringify(position, null, 2)}</pre>
  )
}

export default function Geolocation() {
  const [showLocation, setShowLocation] = useState(false)

  return (
    <Fragment>
      <h2>Geolocation demo</h2>
      {showLocation ? (
        <CurrentLocation />
      ) : (
        <button onClick={() => setShowLocation(true)}>Show my location</button>
      )}
    </Fragment>
  )
}
