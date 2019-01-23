# React Browser Hooks User Guide

Note: npm package that does not exist yet.

## useFullScreen Hook

The useFullScreen hook allows a page or element to occupy the full screen using modern browser calls and event listeners.

Import as follows:

```javascript
import { useFullScreen } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const fs = useFullScreen()
<button onClick={fs.toggle}>{fs.fullScreen ? 'Close' : 'Open'}</button>
```

The object returned has the following functions:

- toggle()
- open()
- close()

It also has the following properties:
- fullScreen: whether in full screen mode or not
- info: some information as to why we are in fullScreen (browser specific)
    - lastRequest: the request made to enter/exist fullscreen
    - lastEvent: the event raised
    - reason: the reason why, if in fullScreen mode

A callback can be passed into the hook, which is called when the fullScreen property changes.

See the /demo/src/components/fullscreen component for a full usage example.

## useFullScreenBrowser Hook

The useFullScreenBrowser Hook detects if the user has entered fullscreen using the browser menu.  As this does not trigger any browser events internally, the component must listen for resize events (limited to 1 frame per second), and evaluate whether in full screen mode or not. Both useFullScreenBrowser and useFullScreen can be used together to detect these modes (see the FullScreen demo component for an example).

Import as follows:

```javascript
import { useFullScreenBrowser } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const fsb = useFullScreenBrowser()
<p>Full Screen: {fsb.fullScreen ? 'open' : 'closed'}</p>
```

The returned object has the following properties:
- fullScreen: whether in full screen mode or not
- info: some information as to why we are in fullScreen mode
    - reason: why we are in full screen mode e.g. borderless full screen as innerWidth and innerHeight are the same size as the screen
    - sizeInfo: the sizeInfo object used to determine if in full screen, this is returned so that users can make further judgement as to whether in fullscreen mode or not

A callback can be passed into the hook, which is called when the fullScreen property changes.

See the /demo/src/components/fullscreen component for a full usage example.

## useResize Hook

The useResize hook listens for changes to browser window size.  Passing a parameter throttles the rate at which this hook updates state.

Import as follows:

```javascript
import { useResize } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const resize = useResize(5)
<p>Width: {resize.width}px, Height: {resize.height}px<br/>
```

The returned object has the following properties:
- width, height: dimensions of the screen
- throttled: if set, throttling is enabled
- delay: the actual delay in ms, based on fps parameter

A callback can be passed into the hook, which is called when the browser is resized

See the /demo/src/components/resize component for a full usage example.

## useMousePosition Hook

The useMousePosition hook listens for changes to mouse position.  Passing a parameter throttles the rate at which this hook updates state.

Import as follows:

```javascript
import { useMousePosition } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const pos = useMousePosition(60)
<p>X: {pos.x}px, Y: {pos.y}px<br/>
```

The returned object has the following properties:
- x, y: the mouse pointer position
- throttled: if set, throttling is enabled
- delay: the actual delay in ms, based on fps parameter

A callback can be passed into the hook, which is called when mouse position changes

See the /demo/src/components/mouse-position component for a full usage example.

## useScroll Hook

The useScroll hook listens for changes to the browser window scroll position.  

Import as follows:

```javascript
import { useScroll } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const scroll = useScroll()
<p>Top: {scroll.top}px, Left: {scroll.left}px<br/>
```

The returned object has the following properties:
- top, left: the current scroll position

A callback can be passed into the hook, which is called when scroll position changes

See the /demo/src/components/scroll component for a full usage example.

## useOnline Hook

The useOnline hook listens for browser online/offline events to determine if there is an internet connection.

Import as follows:

```javascript
import { useOnline } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const status = useOnline()
<p>Status: {statis.online ? 'online' : 'offline'}<br/>
```

The returned object has the following properties:
- online: the current online status
- reason: the reason for this status

A callback can be passed into the hook, which is called when online status changes

See the /demo/src/components/online component for a full usage example.