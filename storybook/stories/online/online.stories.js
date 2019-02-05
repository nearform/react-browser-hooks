import React, { useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useOnline } from '../../../src'
import readme from './README.md'

function Online() {
  const status = useOnline()

  return (
    <div>
      <h2>Online Demo</h2>
      <p>
        Status: {status.online ? 'online' : 'offline'}, Reason: {status.reason}{' '}
      </p>
    </div>
  )
}

storiesOf('Online', module).add('Online', withReadme(readme, () => <Online />))
