import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { useGeolocation } from '../../../src'
import readme from './README.md'

function CurrentLocation() {
  const { position, error } = useGeolocation()

  return error ? (
    <p>There was an error: {error.message}</p>
  ) : (
    <pre>
      {JSON.stringify(
        {
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
        },
        null,
        2
      )}
    </pre>
  )
}

function Geolocation() {
  const [showLocation, setShowLocation] = useState(false)

  return (
    <div>
      <h2>Geolocation demo</h2>
      {showLocation ? (
        <CurrentLocation />
      ) : (
        <button onClick={() => setShowLocation(true)}>Show my location</button>
      )}
    </div>
  )
}

storiesOf('Geolocation', module)
  .addParameters({ readme: { sidebar: readme } })
  .add('Default', () => <Geolocation />)
