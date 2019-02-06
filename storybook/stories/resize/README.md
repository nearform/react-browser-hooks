## Resize Hook

The Resize hook listens for changes to browser window size.  

Import as follows:

```javascript
import { useResize } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { width, height } = useResize()
<p>Width: {width}px, Height: {height}px</p>
```

Returns an object containing:
- width (int), height (int): dimensions of the screen