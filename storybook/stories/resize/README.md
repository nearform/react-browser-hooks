## useResize Hook

The useResize hook listens for changes to browser window size.  Passing an optional 'skip' parameter throttles the rate at which this hook updates based on skipping animation frames.

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
- options (optional): set { skip } property to the amount of animation frames to skip before each update.
    - null: no throttling (default)
    - 0: no frames skipped (as fast as renderAnimationFrame)
    - 1+: skip one or more frames e.g. 1 = 1/2 the render rate, 20 = 3fps if renderAnimationFrame is working at 60fps

Returns an object containing:
- width (int), height (int): dimensions of the screen
- throttled (boolean): whether throttling is enabled or not