## useMousePosition Hook

The useMousePosition hook listens for changes to mouse position.  Passing a parameter throttles the rate at which this hook updates state.

Import as follows:

```javascript
import { useMousePosition } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { x, y } = useMousePosition(60)
<p>X: {x}px, Y: {y}px<br/>
```

Parameters:
- fps (int): optional frames per second parameter to throttle mouse position event (default: null, no throttling)

Returns an object containing:
- x (int), y (int): the mouse pointer position
- throttled (boolean): if set, throttling is enabled
- delay (int): the actual delay in ms, based on fps parameter