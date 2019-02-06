import { useState, useEffect } from 'react'

export function useResize() {
  const [size, setSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })

  function handleResize() {
    const newSize = {
      height: window.innerHeight,
      width: window.innerWidth
    }

    if (size.width !== newSize.width || size.height !== newSize.height) {
      setSize(newSize)
    }
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('resize', handleResize, false)
    } else if (window.attachEvent) {
      window.attachEvent('onresize', handleResize)
    }

    return function cleanup() {
      if (window.removeEventListener) {
        window.removeEventListener('resize', handleResize)
      } else if (window.detachEvent) {
        window.detachEvent('onresize', handleResize)
      }
    }
  }, [])

  return size
}
