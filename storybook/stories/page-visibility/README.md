## Page Visibility Hook

The Page Visibilty hook determines if the current page is the active tab or not.

Import as follows:

```javascript
import { usePageVisibility } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const visibility = usePageVisibility()
useEffect(() => {
  document.title = visibility ? 'react-browser-hooks' : 'Hey! Come back!'
}, [visibility])
```

Returns an object containing:
- visibility (boolean): whether the page is in view or not
