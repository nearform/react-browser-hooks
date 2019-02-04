import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useResize } from '../../../src'
import readme from './README.md'

function Resize() {
  const [skip, setSkip] = useState(20)
  const size = useResize({ skip })

  function handleChange(e) {
    setSkip(e.target.value)
  }

  return (
    <div>
      <h2>Resize Demo</h2>
      <em>The red border shows this visually.</em>
      <p>
        Width: {size.width}px, Height: {size.height}px
        <br />
        Throttled: {size.throttled ? 'true' : 'false'}
      </p>
      Skip Frames: <input type="number" value={skip} onChange={handleChange} />
      <div
        id="follow-cursor"
        style={{
          border: '1px solid red',
          backgroundColor: 'white',
          position: 'fixed',
          zIndex: -1,
          top: '0',
          left: '0',
          width: `${size.width - 2}px`,
          height: `${size.height - 2}px`
        }}
      />
    </div>
  )
}

storiesOf('Resize', module).add('Default', withReadme(readme, () => <Resize />))
