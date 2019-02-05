import { useState, useEffect } from 'react'
import { initRaf, nextRaf, cleanupRaf } from '../utils/fps'

export function useMousePosition(options) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const raf = options && options.skip !== null ? initRaf(options.skip) : null
  let newPos // holds the latest position
  function handleMouseMoveThrottled(e) {
    //this is being set contantly and will be last position
    newPos = { x: e.clientX, y: e.clientY }

    if (!raf) return handleMouseMove()
    nextRaf(raf, handleMouseMove)
  }

  function handleMouseMove() {
    if (position.x !== newPos.x || position.y !== newPos.y) {
      setPosition(newPos)
    }

    if (raf) raf.ticking = false
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('mousemove', handleMouseMoveThrottled, false)
    } else if (window.attachEvent) {
      //IE 8
      window.attachEvent('onmousemove', handleMouseMoveThrottled)
    }

    return function cleanUp() {
      if (raf) cleanupRaf(raf)

      if (window.removeEventListener) {
        window.removeEventListener('mousemove', handleMouseMoveThrottled)
      } else if (window.detachEvent) {
        window.detachEvent('onmousemove', handleMouseMoveThrottled)
      }
    }
  }, [options.skip])

  return {
    ...position,
    throttled: raf ? true : false
  }
}
