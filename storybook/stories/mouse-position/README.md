## MousePosition Hook

The MousePosition hook listens for changes to mouse position.  

Import as follows:

```javascript
import { useMousePosition } from 'react-browser-hooks' 
```

Example of usage:

```javascript
const { x, y } = useMousePosition()
<p>X: {x}px, Y: {y}px</p>
```

Returns an object containing:
- x (int), y (int): the mouse pointer position
