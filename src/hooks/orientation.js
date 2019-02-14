import { useState, useEffect } from 'react'
import { IS_SERVER } from '../constants'

const defaultState = {
  angle: 0,
  type: 'landscape-primary'
}

export function useOrientation() {
  const currentOrientation =
    !IS_SERVER && window.screen.orientation
      ? window.screen.orientation
      : defaultState

  const [state, setState] = useState(currentOrientation)

  useEffect(() => {
    const handler = () => setState(window.screen.orientation)

    window.addEventListener('orientationchange', handler)
    return () => window.removeEventListener('orientationchange', handler)
  }, [])

  return state
}
