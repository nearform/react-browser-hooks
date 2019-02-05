## Scroll Hook

The Scroll hook listens for changes to the browser window scroll position.  

Import as follows:

```javascript
import { useScroll } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { top, left } = useScroll()
<p>Top: {top}px, Left: {left}px</p>
```

Parameters:
- options (optional): set { skip } property to the amount of animation frames to skip before each update.
    - null: no throttling (default)
    - 0: no frames skipped (as fast as renderAnimationFrame)
    - 1+: skip one or more frames e.g. 1 = 1/2 the render rate, 20 = 3fps if renderAnimationFrame is working at 60fps

Returns an object containing:
- top (int), left (int): the current scroll position
- throttled (boolean): whether throttled or not