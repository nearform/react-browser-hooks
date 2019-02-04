import { useState, useEffect } from 'react'

export function useOrientation() {
  const currentOrientation =
    (window && window.screen && window.screen.orientation) || {}
  const [state, setState] = useState(currentOrientation)

  useEffect(() => {
    const handler = () =>
      setState((window && window.screen && window.screen.orientation) || {})
    if (typeof window !== 'object') return

    window.addEventListener('orientationchange', handler)
    return () => window.removeEventListener('orientationchange', handler)
  }, [])

  return state
}
