## Orientation Hook

The Orientation hook gives you device orientation.

Import as follows:

```javascript
import { useOrientation } from 'react-browser-hooks'
```

Example of usage:

```javascript
const { angle, type } = useOrientation()
<p>Screen angle: {angle}&deg;, Orientation type: {type}</p>
```

Returns an object containing:
- angle(double): current orientation angle
- type(string): one of `portrait-primary`, `portrait-secondary`, `landscape-primary`, or `landscape-secondary`
