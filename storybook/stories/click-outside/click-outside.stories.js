import React, { useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useClickOutside } from '../../../src'
import readme from './README.md'

function ClickOutside() {
  const elRef = useRef(null)
  const [clickEvent, setClickEvent] = useState(null)
  useClickOutside(elRef, (ev) => {
    setClickEvent(ev)
  })

  const message =
    clickEvent === null
      ? ''
      : `Clicked outside (x: ${clickEvent.clientX}, y: ${clickEvent.clientY})`

  return (
    <>
      <h2>Click Outside Demo</h2>
      <em>Click outside target component receives full event</em>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          marginTop: 15,
          position: 'absolute',
          width: '30%',
          height: '15%',
          background: 'grey'
        }}
        ref={elRef}
        onClick={() => setClickEvent(null)}>
        {message}
      </div>
    </>
  )
}

storiesOf('Click Outside', module).add(
  'Default',
  withReadme(readme, () => <ClickOutside />)
)
