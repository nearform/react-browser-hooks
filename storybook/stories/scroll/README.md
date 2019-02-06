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

Returns an object containing:
- top (int), left (int): the current scroll position