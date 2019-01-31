import React, { useRef } from 'react'

import Audio from './audio'
import Video from './video'

export default function MediaControls() {
  return (
    <div>
      <h2>Media Controls Demo</h2>
      <Video />
      <Audio />
    </div>
  )
}
