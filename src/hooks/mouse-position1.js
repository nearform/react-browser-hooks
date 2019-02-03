import { useState, useEffect } from 'react'
import { useFps } from './fps'

//experimental version re-using fps hook
//this will cause state updates at max tick rate possible
//existing version only updates state if mouse move event occurs
export function useMousePosition(fps) {
  const [newPos, setNewPos] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const { frame, second, stopped } = useFps(fps)

  function handleMouseMoveThrottled(e) {
    //this is being set contantly and will always be last position
    const newPos = { x: e.clientX, y: e.clientY }
    setNewPos(newPos)

    if (stopped) {
      setPosition(newPos)
    }
  }

  useEffect(() => {
    if (newPos && (position.x !== newPos.x || position.y !== newPos.y)) {
      setPosition(newPos)
    }
  }, [frame, second]) //this will be called if frame or second changes

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('mousemove', handleMouseMoveThrottled, false)
    } else if (window.attachEvent) {
      //IE 8
      window.attachEvent('onmousemove', handleMouseMoveThrottled)
    }

    return function cleanUp() {
      if (window.removeEventListener) {
        window.removeEventListener('mousemove', handleMouseMoveThrottled)
      } else if (window.detachEvent) {
        window.detachEvent('onmousemove', handleMouseMoveThrottled)
      }
    }
  }, [fps]) // only add listeners once

  return {
    ...position,
    throttled: !stopped
  }
}
