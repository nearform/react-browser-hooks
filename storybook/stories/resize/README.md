## useResize Hook

The useResize hook listens for changes to browser window size.  Passing a parameter throttles the rate at which this hook updates state.

Import as follows:

```javascript
import { useResize } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { width, height } = useResize(5)
<p>Width: {width}px, Height: {height}px<br/>
```

Parameters:
- fps (int): optional frames per second parameter to throttle resize event (default: null, no throttling)

Returns an object containing:
- width (int), height (int): dimensions of the screen
- throttled (boolean): if set, throttling is enabled
- delay (int): the actual delay in ms, based on fps parameter