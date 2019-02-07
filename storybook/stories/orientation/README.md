## Orientation Hook

The Orientation hook gives you device orientation.  

Import as follows:

```javascript
import { useOrientation } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { angle, type } = useOrientation()
<p>Screen angle: {angle}&deg;, Orientation type: {type}</p>
```

Returns an object containing:
- angle(string): one of `portrait-primary`, `portrait-secondary`, `landscape-primary`, or `landscape-secondary`
- type(double): current orientation angle