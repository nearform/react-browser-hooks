## useResize Hook

The useResize hook listens for changes to browser window size.  Passing a parameter throttles the rate at which this hook updates.

Import as follows:

```javascript
import { useResize } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { width, height } = useResize(20)
<p>Width: {width}px, Height: {height}px</p>
```

Parameters:
- optional object: set property skip (int) to the amount of animation frames to skip before each update (default: no throttling)

Returns an object containing:
- width (int), height (int): dimensions of the screen
- throttled (boolean): if set, throttling is enabled