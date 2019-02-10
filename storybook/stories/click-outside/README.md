## useClickOutside Hook

The useClickOutside Hook attaches a listener which will callback the target component with the event object on any click which is not on the target component, or a child of the target component.

Import as follows:

```javascript
import { useClickOutside } from '@nearform/react-browser-hooks'
```

Example of usage:

```javascript
useClickOutside(ref, onClick)
```

Callback is invoked with the original event as the only argument
