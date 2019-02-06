import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'

import { useScroll } from '../../../src'
import readme from './README.md'

function Scroll() {
  const scroll = useScroll()

  return (
    <div style={{ height: '110vh', width: '110vw' }}>
      <div style={{ position: 'fixed', top: 10, left: 10 }}>
        <h2>Scroll Demo</h2>
        <p>
          Top: {scroll.top}px, Left: {scroll.left}px
        </p>
      </div>
    </div>
  )
}

storiesOf('Scroll', module).add('Default', withReadme(readme, () => <Scroll />))
