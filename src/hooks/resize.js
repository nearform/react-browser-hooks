import { useState, useEffect } from 'react'
import { initRaf, nextRaf, cleanupRaf } from '../utils/fps'

/**
 * Throttled resize hook
 * @param {number} fps Frames per second
 * @returns {object} The size object with dimensions of window innerWidth and innerHeight
 */
export function useResize(fps, onResize) {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const raf = fps && initRaf(fps)

  function handleResizeThrottled() {
    if (!raf) return handleResize()

    nextRaf(raf, handleResize)
  }

  function handleResize() {
    const newSize = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    if (size.width !== newSize.width || size.height !== newSize.height) {
      setSize(newSize)
      if (onResize) onResize()
    }

    raf.ticking = false
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('resize', handleResizeThrottled, false)
    } else if (window.attachEvent) {
      //IE 8
      window.attachEvent('onresize', handleResizeThrottled)
    }

    return function cleanup() {
      cleanupRaf(raf)
      if (window.removeEventListener) {
        window.removeEventListener('resize', handleResizeThrottled)
      } else if (window.detachEvent) {
        window.detachEvent('onresize', handleResizeThrottled)
      }
    }
  }, [fps])

  return {
    ...size,
    throttled: raf && raf.ms ? 'yes' : 'no',
    delay: raf && raf.ms ? raf.ms : 0
  }
}
