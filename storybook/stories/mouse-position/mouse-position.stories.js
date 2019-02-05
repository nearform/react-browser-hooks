import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useMousePosition } from '../../../src'
import readme from './README.md'

function MousePosition() {
  const [skip, setSkip] = useState(0)
  const pos = useMousePosition({ skip })

  function handleChange(e) {
    setSkip(e.target.value)
  }

  return (
    <div>
      <h2>Mouse Position Demo</h2>
      <em>The red dot shows this visually (offset by 5px)</em>
      <p>
        X: {pos.x}px, Y: {pos.y}px
        <br />
        Throttled: {pos.throttled ? 'yes' : 'no'}
      </p>
      <p>
        Skip Frames: <input value={skip} onChange={handleChange} />
      </p>
      <em>
        <strong>Note:</strong> When throttled (0 or more), the position will
        update as fast as renderAnimationFrame (rAF) can execute. Setting to 1
        or more will skip frames accordingly e.g. setting to 1 one will skip
        every other frame, and 30 will skip 30 frames before rendering. If rAF
        runs at 60fps, setting to 59 means updates will occur every second.
      </em>
      <p>Try it!</p>
      <div
        id="follow-cursor"
        style={{
          borderRadius: '50%',
          backgroundColor: 'red',
          position: 'fixed',
          top: `${pos.y - 5}px`,
          left: `${pos.x - 5}px`,
          width: '4px',
          height: '4px'
        }}
      />
    </div>
  )
}

storiesOf('Mouse Position', module).add(
  'Default',
  withReadme(readme, () => <MousePosition />)
)
