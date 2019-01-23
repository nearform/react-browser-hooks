import { useState, useEffect } from 'react'

export function useScroll(callback) {
  const [state, setState] = useState({
    top: window.scrollY,
    left: window.scrollX
  })

  function handleScroll() {
    setState({ top: window.scrollY, left: window.scrollX })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return state
}
