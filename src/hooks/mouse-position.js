import { useState, useEffect } from 'react'
import { fpsToMs } from '../utils/fps'

export function useMousePosition(fps, callback) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const ms = fpsToMs(fps)
  let moveTimeout
  let evPos
  function handleMouseMoveThrottled(e) {
    evPos = { x: e.clientX, y: e.clientY }
    if(!fps || !ms) return handleMouseMove()
    if (moveTimeout) return

    moveTimeout = setTimeout(function () {
      moveTimeout = null
      handleMouseMove()
    }, ms)
  }

  function handleMouseMove () {
    if(position.x !== evPos.x || position.y !== evPos.y) {
      setPosition(evPos)
      if(callback) callback(evPos)
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
