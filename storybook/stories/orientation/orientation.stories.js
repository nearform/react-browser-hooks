import React from 'react'
import { storiesOf } from '@storybook/react'
import { useOrientation } from '../../../src'
import readme from './README.md'
import { withReadme } from 'storybook-readme'

function Orientation() {
  const { angle, type } = useOrientation()

  return (
    <div>
      <h2>Orientation Demo</h2>
      <p>
        Screen angle: {angle}&deg;
        <br />
        Orientation type: {type}
      </p>
      Try using dev tools to rotate your screen, you should see these values
      change.
    </div>
  )
}

storiesOf('Orientation', module).add(
  'Default',
  withReadme(readme, () => <Orientation />)
)
