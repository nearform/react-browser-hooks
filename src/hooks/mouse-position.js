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
      if(callback) callback(newPos)
    }
  }

  useEffect(() => {  
    if (window.addEventListener) {
      window.addEventListener('mousemove', handleMouseMoveThrottled, false)           
    }
    else if (window.attachEvent) { //IE 8
        window.attachEvent('onmousemove', handleMouseMoveThrottled)            
    }
    
    return function cleanUp() {
      clearTimeout(moveTimeout)
      if (window.removeEventListener) {
        window.removeEventListener('mousemove', handleMouseMoveThrottled)        
      }
      else if (window.detachEvent) {
        window.detachEvent('onmousemove', handleMouseMoveThrottled)            
      }
    }
  }, [position])

  return {
    ...position,
    throttled: fps && ms ? 'yes' : 'no',
    delay: fps && ms ? ms : 0
  }
}