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
    if (window.addEventListener) {
      window.addEventListener('scroll', handleScroll, false)
    } else if (window.attachEvent) {
      //IE 8
      window.attachEvent('onscroll', handleScroll)
    }

    return function cleanup() {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', handleScroll)
      } else if (window.detachEvent) {
        window.detachEvent('onscroll', handleScroll)
      }
    }
  }, [])

  return pos
}
