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
- options (object): set { element } property using object returned from the useRef() React hook (if options not set, fullscreen defaults to root document element)

Returns an object containing:
- toggle (function): toggles full screen mode
- open (function): opens full screen mode
- close (function): closes full screen mode
- fullScreen (boolean): whether in full screen mode or not
- info (object): some information as to why we are in fullScreen (browser specific)
    - lastRequest (string): the request made to enter/exist fullscreen
    - lastEvent (string): the event raised
    - reason (string): the reason why, if in fullScreen mode

See the /demo/src/components/fullscreen component for a full usage example.

## useFullScreenBrowser Hook

The useFullScreenBrowser Hook detects if the user has entered fullscreen using the browser menu.

Import as follows:

```javascript
import { useFullScreenBrowser } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const fsb = useFullScreenBrowser()
<p>Full Screen: {fsb.fullScreen ? 'open' : 'closed'}</p>
```

Returns an object containing:
- fullScreen (boolean): whether in full screen mode or not
- info (object): some information as to why we are in fullScreen mode
    - reason (string): why we are in full screen mode e.g. borderless full screen as innerWidth and innerHeight are the same size as the screen
    - sizeInfo (object): the sizeInfo object used to determine if in full screen, this is returned so that users can make further judgement as to whether in fullscreen mode or not