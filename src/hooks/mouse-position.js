import { useState, useEffect } from 'react'
import { fpsToMs, raf, caf } from '../utils/fps'


export function useMousePosition(fps, callback) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  //get the frame rate in ms
  const ms = fpsToMs(fps)

  let moveTimeout  // backup timer id
  let lastFrameTimeout  // timer id to ensure last position is shown
  let newPos   // holds the latest position 
  let ticking // whether a frame is being updated
  let frame // current frame
  let second // current second
  let rafId // request animation frame id
  function handleMouseMoveThrottled(e) {
    newPos = { x: e.clientX, y: e.clientY }

    if(!fps || !ms) return handleMouseMove()
    if (moveTimeout) return
    if (ticking) return

    var d = new Date()
    var currentSecond = Math.floor(d.getTime() / 1000)
    const currentFrame = Math.floor(d.getMilliseconds() / ms)

    //if rAF supported
    if(raf) {
      // clear last frame timeout if kicked off
      if(lastFrameTimeout) clearTimeout(lastFrameTimeout)

      if(frame !== currentFrame || second !== currentSecond) {
        //don't kick off another rAF request while one is underway
        ticking = true
        rafId = raf(handleMouseMove)
      } else {
        //kick off a timer to perform last frame, but cancel always first thing
        //remainder is ms to next frame
        lastFrameTimeout = setTimeout(handleMouseMove, d.getMilliseconds() % ms)
      }
      frame = currentFrame
      second = currentSecond
      return
    }

    // fps fallback, if equest animation frame isn't supported
    moveTimeout = setTimeout(function () {
      moveTimeout = null
      handleMouseMove()
    }, ms)
  }

  function handleMouseMove () {
    if(position.x !== newPos.x || position.y !== newPos.y) {
      setPosition(newPos)
      if(callback) callback(newPos)
    }

    // only used for rAF request
    ticking = false
  }

  useEffect(() => {  
    if (window.addEventListener) {
      window.addEventListener('mousemove', handleMouseMoveThrottled, false)           
    }
    else if (window.attachEvent) { //IE 8
      window.attachEvent('onmousemove', handleMouseMoveThrottled)            
    }
    
    return function cleanUp() {
      if (caf && rafId) caf(rafId)
      if(moveTimeout) clearTimeout(moveTimeout)      
      if(lastFrameTimeout) clearTimeout(lastFrameTimeout)

      if (window.removeEventListener) {
        window.removeEventListener('mousemove', handleMouseMoveThrottled)        
      }
      else if (window.detachEvent) {
        window.detachEvent('onmousemove', handleMouseMoveThrottled)            
      }
    }
  }, [fps])

  return {
    ...position,
    throttled: fps && ms ? 'yes' : 'no',
    delay: fps && ms ? ms : 0
  }
}
