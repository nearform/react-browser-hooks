import React from 'react'
import { useFullScreen } from '../../../src'

export default function FullScreen() {
  const { toggle } = useFullScreen()
  return <button onClick={toggle}>{'Toggle'}</button>
}
