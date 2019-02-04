import { useState, useEffect } from 'react'
import { initRaf, nextRaf, cleanupRaf } from '../utils/fps'

export function useScroll(options) {
  const [pos, setPos] = useState({
    top: window.scrollY,
    left: window.scrollX
  })

  const raf = options && options.fps ? initRaf(options.fps) : null

  function handleScrollThrottled() {
    if (!raf) return handleScroll()
    nextRaf(raf, handleScroll)
  }

  function handleScroll() {
    const newPos = { top: window.scrollY, left: window.scrollX }
    if (newPos.top !== pos.top || newPos.left !== pos.left) {
      setPos(newPos)
    }

    if (raf) raf.ticking = false
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('scroll', handleScrollThrottled, false)
    } else if (window.attachEvent) {
      //IE 8
      window.attachEvent('onscroll', handleScrollThrottled)
    }

    return function cleanup() {
      if (raf) cleanupRaf(raf)
      if (window.removeEventListener) {
        window.removeEventListener('scroll', handleScrollThrottled)
      } else if (window.detachEvent) {
        window.detachEvent('onscroll', handleScrollThrottled)
      }
    }
  }, [options])

  return {
    ...pos,
    throttled: raf && raf.ms ? 'yes' : 'no',
    delay: raf && raf.ms ? raf.ms : 0
  }
}
