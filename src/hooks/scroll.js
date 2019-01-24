import { useState, useEffect } from 'react'

export function useScroll(callback) {
  const [state, setState] = useState({
    top: window.scrollY,
    left: window.scrollX
  })

  function handleScroll() {
    setState({ top: window.scrollY, left: window.scrollX })
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('scroll', handleScroll, false)           
    }
    else if (window.attachEvent) { //IE 8
      window.attachEvent('onscroll', handleScroll)            
    }

    return function cleanup() {
      if (window.removeEventListener) {
        window.removeEventListener('scroll', handleScroll)        
      }
      else if (window.detachEvent) {
        window.detachEvent('onscroll', handleScroll)            
      }
    }
  })

  return state
}
