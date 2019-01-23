import { useState, useEffect } from 'react'
import { fpsToMs } from '../utils/fps'

/**
 * Throttled resize hook
 * @param {number} fps Frames per second
 * @param {function} callback Callback function if size changes
 * @returns {object} The size object with dimensions of window innerWidth and innerHeight
 */
export function useResize(fps, callback) {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const ms = fpsToMs(fps)
  let resizeTimeout
  function handleResizeThrottled(e) {
    if(fps && ms) {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null
          handleResize(e)
        }, ms)
      }
    } else {
      // no throttle
      handleResize(e)
    }
  }

  function handleResize(e) {
    const newSize = { width: e.target.innerWidth, height: e.target.innerHeight }
    if (size.width !== newSize.width || size.height !== newSize.height) {
      setSize(newSize)
      if (callback) callback(newSize) //@todo: async?
    } 
  }

  
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
   if (window.addEventListener) {
      window.addEventListener('resize', handleResizeThrottled, false)           
   }
   else if (window.attachEvent) { //IE 8
      window.attachEvent('onresize', handleResizeThrottled)            
   }
    

    return function cleanup() {
      clearTimeout(resizeTimeout)
      if (window.removeEventListener) {
        window.removeEventListener('resize', handleResizeThrottled)        
      }
      else if (window.detachEvent) {
        window.detachEvent('onresize', handleResizeThrottled)            
      }
    }
  }, [size])

  return {
    ...size,
    throttled: fps && ms ? 'yes' : 'no',
    delay: fps && ms ? ms : 0
  }
}
