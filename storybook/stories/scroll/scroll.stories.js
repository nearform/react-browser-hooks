import React from 'react'
import { storiesOf } from '@storybook/react'

import { useScroll } from '../../../src'
import readme from './README.md'

function Scroll() {
  const scroll = useScroll()

  return (
    <div
      style={{
        position: 'relative',
        width: '2000px',
        height: '2000px'
      }}>
      <div style={{ position: 'fixed', top: '15px', left: '40px' }}>
        <div className="scroll-demo">
          <h2>Scroll Demo</h2>
          <em>Try scrolling within this frame...</em>
          <p>
            Top: {Math.round(scroll.top)}px, Left: {Math.round(scroll.left)}px
            <br />
          </p>
        </div>
      </div>
    </div>
  )
}

storiesOf('Scroll', module)
  .addParameters({ readme: { sidebar: readme } })
  .add('Default', () => <Scroll />)
