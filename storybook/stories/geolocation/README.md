## useGeolocation Hook

The useGeolocation hook gives you current location.  

Import as follows:

```javascript
import { useGeolocation } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const [position, error] = useGeolocation()
const currentPosition = {
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
}
```

Parameters:
- options (object): see https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions for more info

Returns an object containing:
- cords(object):
  - accuracy(double): the accuracy of the latitude and longitude properties, expressed in meters,
  - altitude(double): the position's altitude in meters, relative to sea level.,
  - altitudeAccuracy(double): the accuracy of the altitude expressed in meters,
  - heading(double): the direction in which the device is traveling,
  - latitude(double): the position's latitude in decimal degrees,
  - longitude(double): the position's longitude in decimal degrees,
  - speed(double): the velocity of the device in meters per second
- timestamp(string): time when the location was retrieved