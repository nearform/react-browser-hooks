import React from 'react'
import { useOnline } from '../../../src'

export default function Online() {
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
