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

Avoiding unnecessary callbacks:

If you have a large app with many components using this hook, you may wish to avoid calling the callback when not necessary. In this situation you can pass options as the second argument, and include an `active` property. The callback will not be invoked if this is falsey. For example, if you you had a dropdown where you are only interested in receiving a callback if the options are visible, you might use like:

```javascript
const [optionsVisible, setOptionsVisible] = useState(false)
const hideOptions = () => setOptionsVisible(false)
useClickOutside(ref, { active: optionsVisible }, hideOptions)
```

In this example, `hideOptions` will never be called if `optionsVisible` is already `false`.
