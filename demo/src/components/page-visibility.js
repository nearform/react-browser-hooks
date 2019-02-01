import React, { useEffect } from 'react'
import { usePageVisibility } from '../../../src'

export default function PageVisibility() {
  const visibility = usePageVisibility()

  useEffect(() => {
    document.title = visibility ? 'react-browser-hooks' : 'Hey! Come back!'
  }, [visibility])
  return (
    <div>
      <h2>Page Visibility Demo</h2>
      <p>
        Navigate away from this tab in your browser to see the tab text change.
      </p>
    </div>
  )
}
