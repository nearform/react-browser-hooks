import { useState, useEffect } from 'react'
import { IS_SERVER } from '../constants'

export function useScroll() {
  const [pos, setPos] = useState({
    top: IS_SERVER ? 0 : window.scrollY,
    left: IS_SERVER ? 0 : window.scrollX
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
