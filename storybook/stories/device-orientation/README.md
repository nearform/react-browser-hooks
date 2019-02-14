## Device Orientation Hook

The device Orientation hook gives you the angle of a device. This can include up to 3-axes (alpha, beta and gamma), along with compass heading and other data as detailed in the [Device Orientation API](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation).

Import as follows:

```javascript
import { useDeviceOrientation } from '@nearform/react-browser-hooks'
```

Example of usage:

```javascript
const { alpha, beta, gamma } = useDeviceOrientation()
<p>Screen angles:</p>
<ul>
  <li>{alpha}&deg; (z-axis)</li>
  <li>{beta}&deg; (x-axis)</li>
  <li>{gamma}&deg; (y-axis)</li>
</ul>
```

Returns an object containing:

- alpha(number): z-axis angle
- beta(number): x-axis angle
- gamma(number): y-axis angle
- absolute(boolean): true if relative to the Earth, false if some other planet / reference point
- ... and potentially device-specific data such as webkitCompassHeading
