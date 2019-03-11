import { useState, useEffect } from 'react'
import { IS_SERVER } from '../constants'

export function useScroll() {
  const [pos, setPos] = useState({
    top: IS_SERVER ? 0 : window.pageYOffset,
    left: IS_SERVER ? 0 : window.pageXOffset
  })

  function handleScroll() {
    setPos({ top: window.pageYOffset, left: window.pageXOffset })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return pos
}
