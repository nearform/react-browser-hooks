import { useState, useEffect } from 'react'
import { initRaf, nextRaf, cleanupRaf } from '../utils/fps'

export function useResize(options) {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const raf = options && options.skip ? initRaf(options.skip) : null

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
    }

    if (raf) raf.ticking = false
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('resize', handleResizeThrottled, false)
    } else if (window.attachEvent) {
      window.attachEvent('onresize', handleResizeThrottled)
    }

    return function cleanup() {
      if (raf) cleanupRaf(raf)
      if (window.removeEventListener) {
        window.removeEventListener('resize', handleResizeThrottled)
      } else if (window.detachEvent) {
        window.detachEvent('onresize', handleResizeThrottled)
      }
    }
  }, [options.skip])

  return {
    ...size,
    throttled: raf && raf.skip ? true : false
  }
}
