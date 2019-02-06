import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useResize } from '../../../src'
import readme from './README.md'

function Resize() {
  const size = useResize()

  return (
    <div>
      <h2>Resize Demo</h2>
      <em>The red border shows this visually.</em>
      <p>
        Width: {size.width}px, Height: {size.height}px
        <br />
      </p>
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
