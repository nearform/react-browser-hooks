import { useState, useEffect } from 'react'

export function useResize() {
  const [size, setSize] = useState(getWindowSize())

  function handleResize() {
    const newSize = getWindowSize()

    if (size.width !== newSize.width || size.height !== newSize.height) {
      setSize(newSize)
    }
  }

  function getWindowSize() {
    return {
      height: window.innerHeight,
      width: window.innerWidth
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize, false)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}
