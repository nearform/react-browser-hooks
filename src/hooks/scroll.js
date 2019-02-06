import { useState, useEffect } from 'react'

export function useScroll() {
  const [pos, setPos] = useState({
    top: window.scrollY,
    left: window.scrollX
  })

  function handleScroll() {
    const newPos = { top: window.scrollY, left: window.scrollX }
    if (newPos.top !== pos.top || newPos.left !== pos.left) {
      setPos(newPos)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, false)

    return function cleanup() {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return pos
}
