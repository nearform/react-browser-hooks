import { useState, useEffect } from 'react'

export function useScroll() {
  const [pos, setPos] = useState({
    top: window.scrollY,
    left: window.scrollX
  })

  function handleScroll() {
    setPos({ top: window.scrollY, left: window.scrollX })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return pos
}
