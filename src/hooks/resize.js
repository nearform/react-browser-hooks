import { useState, useEffect } from 'react'

/**
 * Throttled resize hook
 * @param {number} fps Frames per second
 * @param {function} callback Callback function if size changes
 * @returns {object} The size object with dimensions of window innerWidth and innerHeight
 */
export function useResize(fps, callback) {
  // set fps to min 1 and max 60, default 15
  if (isNaN(fps)) fps = 15
  else if (fps < 1) fps = 1
  else if (fps > 60) fps = 60

  // convert fps to timeout
  const timeout = Math.floor(1000 / fps)

  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  var resizeTimeout
  function handleResizeThrottled(e) {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null
        const newSize = { width: e.target.innerWidth, height: e.target.innerHeight }
        if (size.width !== newSize.width || size.height !== newSize.height) {
          setSize(newSize)
          if (callback) callback(newSize) //@todo: async?
        } 
      }, timeout)
    }
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
   if (window.addEventListener) {
      window.addEventListener('resize', handleResizeThrottled, false)           
   }
   else if (window.attachEvent) { //IE 8
      window.attachEvent('resize', handleResizeThrottled)            
   }
    

    return function cleanup() {
      clearTimeout(resizeTimeout)
      if (window.removeEventListener) {
        window.removeEventListener('resize', handleResizeThrottled)        
      }
      else if (window.detachEvent) {
        window.detachEvent('resize', handleResizeThrottled)            
      }
    }
  }, [size])

  return size
}
