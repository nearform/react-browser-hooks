import { useState, useEffect } from 'react'

export function useOrientation() {
  const currentAngle =
    typeof window === 'object' ? window.screen.orientation.angle : 0
  const [state, setState] = useState(currentAngle)

  useEffect(() => {
    const handler = () => setState(window.screen.orientation.angle)
    if (typeof window !== 'object') return () => {}

    window.addEventListener('orientationchange', handler)
    return () => window.removeEventListener('orientationchange', handler)
  }, [])

  return state
}
