import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useMousePosition } from '../../../src'
import readme from './README.md'

function MousePosition() {
  const [fps, setFps] = useState(3)
  const pos = useMousePosition(fps)

  function handleChange(e) {
    setFps(e.target.value)
  }

  return (
    <div>
      <h2>Mouse Position Demo</h2>
      <em>The red dot shows this visually (offset by 5px)</em>
      <p>
        X: {pos.x}px, Y: {pos.y}px
        <br />
        Throttled: {pos.throttled}, Delay: {pos.delay}ms
      </p>
      FPS: <input value={fps} onChange={handleChange} />
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
