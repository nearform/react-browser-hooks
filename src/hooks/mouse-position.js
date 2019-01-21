import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [state, setState] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handler = ({ clientX, clientY }) =>
      setState({ x: clientX, y: clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return state
}