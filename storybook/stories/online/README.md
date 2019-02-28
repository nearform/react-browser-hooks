## Online Hook

The Online hook listens for browser online/offline events to determine if there is an internet connection.

Import as follows:

```javascript
import { useOnline } from 'react-browser-hooks'
```

Example of usage:

```javascript
const online = useOnline()
<p>Status: {online ? 'online' : 'offline'}</p>
```

Returns:

- online (boolean): whether online or not
