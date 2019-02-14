import { useState, useEffect } from 'react'

export function useDeviceOrientation() {
  const [state, setState] = useState(null)

  useEffect(() => {
    const handler = (event) => setState(event)
    if (typeof window !== 'object') return
    console.log({ state })
    window.addEventListener('deviceorientation', handler)
    return () => window.removeEventListener('deviceorientation', handler)
  }, [])

  return state
}
