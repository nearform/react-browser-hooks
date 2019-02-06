## useMediaControls Hook

The useMediaControls hook gives you access to the `HTMLMediaElement` API. Create custom controls for your media.

Import as follows:

```javascript
import { useMediaControls } from '@nearform/react-browser-hooks' 
```

Example of usage:

```javascript
const player = useRef(null)
const {
  pause,
  paused,
  play
} = useMediaControls(player)
<audio
  ref={player}
  src="/path/to/media.mp3">
</audio>
<button onClick={paused ? play : pause}>Play/Pause</button>
```

Accepts a ref to an
[`HTMLMediaElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement) such as [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) or [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio).

Returns an object containing:

- paused(boolean): Tells whether the media element is paused. From [`HTMLMediaElement.paused`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused). Initialises to `null` until the media element has been rendered
- pause(function): Will pause playback of the media, if the media is already in
  a paused state this method will have no effect. Calls
  [`HTMLMediaElement.pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause)
- play(function): Attempts to begin playback of the media. It returns a Promise
  which is resolved when playback has been successfully started. Failure to
  begin playback for any reason, such as permission issues, result in the
  promise being rejected. Calls [`HTMLMediaElement.play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)

- volume(number): The volume at which the media will be played. From 
  [`HTMLMediaElement.volume`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volume). Initialises to `null` until the media element has been rendered
- setVolume(function): Sets the HTMLMediaElement.volume to the passed value (a
  number between 0-1)
- muted(boolean): Indicates whether the media element muted. From 
  [`HTMLMediaElement.muted`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted). Initialises to `null` until the media element has been rendered
- mute(function): Mutes the media element, if already muted this method will
  have no effect
- unmute(function): Unmutes the media element, if already muted this method will
  have no effect

- currentTime(number): Gives the current playback time in seconds. From 
  [`HTMLMediaElement.currentTime`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime). Initialises to `null` until the media element has been rendered
- seek(function): Sets the HTMLMediaElement.currentTime to the passed value (a
  number in seconds). If the number is higher than the total length of the
  media, it will skip to the end

- stop(function): Will seek to the beginning and pause the video. Calls 
  [`HTMLMediaElement.pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause)
- restart(function): Will seek to the beginning and play the video. It returns a
  Promise which is resolved when playback has been successfully started. Failure
  to begin playback for any reason, such as permission issues, result in the
  promise being rejected. Calls 
  [`HTMLMediaElement.play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play)
