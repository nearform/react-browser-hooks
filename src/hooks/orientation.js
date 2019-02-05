import { useState, useEffect } from 'react'

const defaultState = {
  angle: 0,
  type: 'landscape-primary'
}

export function useOrientation() {
  const currentOrientation =
    typeof window === 'object' && window.screen.orientation
      ? window.screen.orientation
      : defaultState

  const [state, setState] = useState(currentOrientation)

  useEffect(() => {
    const handler = () => setState(window.screen.orientation)
    if (typeof window !== 'object') return

    window.addEventListener('orientationchange', handler)
    return () => window.removeEventListener('orientationchange', handler)
  }, [])

  return state
}
