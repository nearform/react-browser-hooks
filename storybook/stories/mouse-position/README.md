## MousePosition Hook

The MousePosition hook listens for changes to mouse position.

Import as follows:

```javascript
import { useMousePosition } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { x, y } = useMousePosition({ skip: 0 })
<p>X: {x}px, Y: {y}px</p>
```

Parameters:
- options (optional): set { skip } property to the number of animation frames to skip before each renderAnimationFrame (rAF) update.
    - null: no throttling (default)
    - 0: no frames skipped (as fast as rAF)
    - 1+: skip one or more frames e.g. 1 = 1/2 the render rate, 20 = 3fps if renderAnimationFrame is working at 60fps

Returns an object containing:
- x (int), y (int): the mouse pointer position
- throttled (boolean): if set, throttling is enabled
- delay (int): the actual delay in ms, based on fps parameter