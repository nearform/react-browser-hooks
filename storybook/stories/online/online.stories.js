import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('Online', module)
  .addParameters({ readme: { sidebar: readme } })
  .add('Default', () => <Online />)
