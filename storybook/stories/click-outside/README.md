## Click Outside Hook

The Click Outside Hook attaches a listener which will callback the target component with the event object on any click which is not on the target component, or a child of the target component.

Import as follows:

```javascript
import { useClickOutside } from '@nearform/react-browser-hooks'
```

Example of usage:

```javascript
useClickOutside(ref, onClick)
```

Callback is invoked with the original event as the only argument

Also supported is passing an array of refs, where `onClick` will only be called if the click target is outside _all_ of the components referenced.

```javascript
useClickOutside([ref, siblingRef], onClick)
```
