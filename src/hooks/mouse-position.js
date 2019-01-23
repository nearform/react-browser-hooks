import { useState, useEffect } from 'react'
import { fpsToMs } from '../utils/fps'

export function useMousePosition(fps, callback) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const ms = fpsToMs(fps)
  let moveTimeout
  function handleMouseMoveThrottled(e) {
    if(fps && ms) {
      if (!moveTimeout) {
          moveTimeout = setTimeout(function () {
          moveTimeout = null
          handleMouseMove(e)
        }, ms)
      }
    } else {
      // no throttle
      handleMouseMove(e)
    }
  }

  function handleMouseMove ({ clientX, clientY }) {
    const newPos = { x: clientX, y: clientY }
    if(position.x !== newPos.x || position.y !== newPos.y) {
      setPosition(newPos)
      callback(newPos)
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveThrottled)
    return function cleanUp() {
      clearTimeout(moveTimeout)
      window.removeEventListener('mousemove', handleMouseMoveThrottled)
    }
  }, [position])

  return {
    ...position,
    throttled: fps && ms ? 'yes' : 'no',
    delay: fps && ms ? ms : 0
  }
}