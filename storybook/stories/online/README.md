## Online Hook

The Online hook listens for browser online/offline events to determine if there is an internet connection.

Import as follows:

```javascript
import { useOnline } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const status = useOnline()
<p>Status: {status.online ? 'online' : 'offline'}<br/>
```

Returns an object containing:
- online (boolean): the current online status
- reason (string): the reason for this status
