# React Browser Hooks User Guide

Note: npm package does not exist yet.

Following is a list of the hooks supported in Nearform's React Browser Hooks library.

## useFullScreen Hook

The useFullScreen hook allows a page or element to occupy the full screen.

Import as follows:

```javascript
import { useFullScreen } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const { toggle, fullsceen } = useFullScreen()
<button onClick={toggle}>{fullScreen ? 'Close' : 'Open'}</button>
```

Parameters:
- element (object): optional useRef() React hook returned object (defaults to document element)
- callback (function): optional callback function

Returns an object containing:
- toggle (function): toggles full screen mode
- open (function): opens full screen mode
- close (function): closes full screen mode
- fullScreen (boolean): whether in full screen mode or not
- info (object): some information as to why we are in fullScreen (browser specific)
    - lastRequest (string): the request made to enter/exist fullscreen
    - lastEvent (string): the event raised
    - reason (string): the reason why, if in fullScreen mode

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

Parameters:
- callback (function): optional callback function

Returns an object containing:
- fullScreen (boolean): whether in full screen mode or not
- info (object): some information as to why we are in fullScreen mode
    - reason (string): why we are in full screen mode e.g. borderless full screen as innerWidth and innerHeight are the same size as the screen
    - sizeInfo (object): the sizeInfo object used to determine if in full screen, this is returned so that users can make further judgement as to whether in fullscreen mode or not

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
const { width, height } = useResize(5)
<p>Width: {width}px, Height: {height}px<br/>
```

Parameters:
- fps (int): optional frames per second parameter to throttle resize event (default: null, no throttling)
- callback (function): optional callback function

Returns an object containing:
- width (int), height (int): dimensions of the screen
- throttled (boolean): if set, throttling is enabled
- delay (int): the actual delay in ms, based on fps parameter

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
const { x, y } = useMousePosition(60)
<p>X: {x}px, Y: {y}px<br/>
```

Parameters:
- fps (int): optional frames per second parameter to throttle mouse position event (default: null, no throttling)
- callback (function): optional callback function

Returns an object containing:
- x (int), y (int): the mouse pointer position
- throttled (boolean): if set, throttling is enabled
- delay (int): the actual delay in ms, based on fps parameter

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
const { top, left } = useScroll()
<p>Top: {top}px, Left: {left}px<br/>
```

Parameters:
- fps (int): optional frames per second parameter to throttle mouse position event (default: null, no throttling)
- callback (function): optional callback function

Returns an object containing:
- top (int), left (int): the current scroll position

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
<p>Status: {status.online ? 'online' : 'offline'}<br/>
```

Parameters:
- callback (function): optional callback function

Returns an object containing:
- online (boolean): the current online status
- reason (string): the reason for this status

A callback can be passed into the hook, which is called when online status changes

See the /demo/src/components/online component for a full usage example.