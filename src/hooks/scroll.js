import { useState, useEffect } from 'react'
import { fpsToMs } from '../utils/fps'

export function useScroll(fps, callback) {
  const [pos, setPos] = useState({
    top: window.scrollY,
    left: window.scrollX
  })

  function handleScroll() {
    const newPos = { top: window.scrollY, left: window.scrollX }
    if(newPos.top !== pos.top || newPos.left !== pos.left) {
      setPos(newPos)
      if (callback) callback (newPos)
    }
  }

  const ms = fpsToMs(fps)
  let throttleTimeout
  function handleScrollThrottled() {
    if(!fps || !ms) return handleScroll()
    if (throttleTimeout) return

    throttleTimeout = setTimeout(function () {
      throttleTimeout = null
      handleScroll()
    }, ms)
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('scroll', handleScrollThrottled, false)           
    }
    else if (window.attachEvent) { //IE 8
      window.attachEvent('onscroll', handleScrollThrottled)            
    }

    return function cleanup() {
      clearTimeout(throttleTimeout)
      if (window.removeEventListener) {
        window.removeEventListener('scroll', handleScrollThrottled)        
      }
      else if (window.detachEvent) {
        window.detachEvent('onscroll', handleScrollThrottled)            
      }
    }
  }, [pos])

  return pos
}
