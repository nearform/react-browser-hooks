# React Browser Hooks User Guide

## Fullscreen Hook

The default fullscreen hook contains everything you need in one hook to go full screen.

To use it import as follows:

```javascript
import { FullScreen } from '@nearform/react-browser-hooks' 
```

Here is an example of how to use the hook:

```javascript
const fs = useFullScreen()
<button onClick={fs.toggle}>{fs.fullScreen ? 'Close' : 'Open'}</button>
```

The object returned provides access to the following functions:

- toggle()
- open()
- close()

It also contains the following properties:
- fullScreen: whether in full screen mode or not
- info: some information as to why we are in fullScreen (browser specific)

## Fullscreen Browser Hook

To be written.

## Resize Hook

To be written.