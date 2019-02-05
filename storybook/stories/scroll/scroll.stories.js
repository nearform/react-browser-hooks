import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'

import { useScroll } from '../../../src'
import readme from './README.md'

function Scroll() {
  const [skip, setSkip] = useState(20)
  const scroll = useScroll({ skip })

  function handleChange(e) {
    setSkip(e.target.value)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '2000px',
        height: '2000px'
      }}>
      <div style={{ position: 'fixed', top: '15px', left: '40px' }}>
        <h2>Scroll Demo</h2>
        <em>Try scrolling within this frame...</em>
        <p>
          Top: {Math.round(scroll.top)}px, Left: {Math.round(scroll.left)}px
          <br />
          Throttled: {scroll.throttled ? 'yes' : 'no'}
        </p>
        <p>
          Skip Frames:{' '}
          <input type="number" value={skip} onChange={handleChange} />
        </p>
      </div>
    </div>
  )
}

storiesOf('Scroll', module).add('Default', withReadme(readme, () => <Scroll />))
