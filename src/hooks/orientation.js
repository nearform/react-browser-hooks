import { useState, useEffect } from 'react'

export function useOrientation() {
  const currentOrientation =
    typeof window === 'object' ? window.screen.orientation : null
  const [state, setState] = useState(currentOrientation)

  useEffect(() => {
    const handler = () => setState(window.screen.orientation)
    if (typeof window !== 'object') return () => {}

    window.addEventListener('orientationchange', handler)
    return () => window.removeEventListener('orientationchange', handler)
  }, [])

  return { angle: state.angle, orientationType: state.type }
}
