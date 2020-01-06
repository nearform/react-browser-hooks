import React from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useOnline } from '../../../src'
import readme from './README.md'

function Online() {
  const online = useOnline()
  return (
    <div>
      <h2>Online Demo</h2>
      <p>Status: {online ? 'online' : 'offline'}</p>
    </div>
  )
}

storiesOf('Online', module).add(
  'Default',
  withReadme(readme, () => <Online />)
)
