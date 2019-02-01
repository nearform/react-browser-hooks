import { useState, useEffect } from 'react'
import { useResize } from './resize'

// determine if we are in fullscreen mode and why
// don't set any state in here as called on init too
export function isFullScreenElement(doc, el) {
  if (el && el.current) {
    if (doc.fullscreenElement === el.current) return { open: true, reason: 'fullscreenElement set to element'}
    if (doc.mozFullScreenElement === el.current) return { open: true, reason: 'mozFullScreenElement set to element'}
    if (doc.webkitFullscreenElement === el.current) return { open: true, reason: 'webkitFullscreenElement set to element'}
    if (doc.msFullscreenElement === el.current) return { open: true, reason: 'msFullscreenElement set to element'}
  } else {
    if (doc.fullscreenElement) return { open: true, reason: 'fullscreenElement set'}
    if (doc.mozFullScreenElement) return { open: true, reason: 'mozFullScreenElement set'}
    if (doc.webkitFullscreenElement) return { open: true, reason: 'webkitFullscreenElement set'}
    if (doc.msFullscreenElement) return { open: true, reason: 'msFullscreenElement set'}

    if (doc.fullscreen) return { open: true, reason: 'fullscreen true'}
    if (doc.mozFullScreen) return { open: true, reason: 'mozFullScreen true'}
    if (doc.webkitIsFullScreen) return { open: true, reason: 'webkitIsFullScreen true'}
    if (doc.fullScreenMode) return { open: true, reason: 'fullScreenMode true'}
  }

  return { open: false }
}


/**
 * Fullscreen hook based on user invoked request/exitFullScreen and associated triggered events
 * @param {object} element The element to be viewed fullscreen, defaults to documentElement
 * @returns {object} The fullscreen object, providing access to current state and functions
 */
export function useFullScreen(element) {
  const docEl = document.documentElement
  const [fullScreen, setFullScreen] = useState(isFullScreenElement(document, element))
  const [lastEvent, setLastEvent] = useState(null)
  const [lastRequest, setLastRequest] = useState(null)

  // access various open fullscreen methods
  function openFullScreen() {
    const el = (element && element.current) || docEl
    if (el.requestFullscreen) {
      setLastRequest('requestFullScreen')
      el.requestFullscreen()
    } else if (el.mozRequestFullScreen) {
      setLastRequest('mozRequestFullScreen')
      el.mozRequestFullScreen()
    } else if (el.webkitRequestFullscreen) {
      setLastRequest('webkitRequestFullscreen')
      el.webkitRequestFullscreen()
    } else if (el.msRequestFullscreen) {
      setLastRequest('msRequestFullscreen')
      el.msRequestFullscreen()
    }
  }

  // access various exit fullscreen methods
  function closeFullScreen() {
    if (document.exitFullscreen) {
      setLastRequest('exitFullscreen')
      document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
      setLastRequest('mozCancelFullScreen')
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      setLastRequest('webkitExitFullscreen')
      document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) {
      setLastRequest('msExitFullscreen')
      document.msExitFullscreen()
    }
  }

  function handleWebkitChange() {
    setState('webkitfullscreenchange')
  }

  function handleMozChange() {
    setState('mozfullscreenchange')
  }

  function handleMsChange1() {
    setState('msfullscreenchange') //
  }

  function handleMsChange2() {
    setState('MSFullscreenChange') // IE 11 :-(
  }

  function handleChange() {
    setState('fullscreenchange')
  }

  // various handlers call this so we have the source of event
  function setState(eventName) {
    const newState = isFullScreenElement(document, element)
    setFullScreen(newState)
    setLastEvent(eventName)
  }

  useEffect(
    () => {
      // add fullscreen change listeners for various browsers
      document.addEventListener('webkitfullscreenchange', handleWebkitChange, false)
      document.addEventListener('mozfullscreenchange', handleMozChange, false)
      document.addEventListener('msfullscreenchange', handleMsChange1, false)
      document.addEventListener('MSFullscreenChange', handleMsChange2, false) //IE11
      document.addEventListener('fullscreenchange', handleChange, false)

      return () => {
        // tidy up
        document.removeEventListener('webkitfullscreenchange', handleWebkitChange)
        document.removeEventListener('mozfullscreenchange', handleMozChange)
        document.removeEventListener('msfullscreenchange', handleMsChange1)
        document.removeEventListener('MSFullscreenChange', handleMsChange2)
        document.removeEventListener('fullscreenchange', handleChange)
      }
    },
    []
  )

  return {
    fullScreen: fullScreen.open,
    open: openFullScreen,
    close: closeFullScreen,
    toggle: fullScreen.open ? closeFullScreen : openFullScreen,
    info: {
      reason: fullScreen.reason,
      lastEvent,
      lastRequest
    }
  }
}

export function getSizeInfo() {
  return { 
    screenTop: window.screenTop,
    screenY: window.screenY,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  }
}

export function isFullScreenSize(sizeInfo) {
  if (sizeInfo.screenWidth === sizeInfo.innerWidth && sizeInfo.screenHeight === sizeInfo.innerHeight) {
    return { open: true, reason: 'borderless fullscreen'}
  } else if (!sizeInfo.screenTop && !sizeInfo.screenY) {
    return { open: true, reason: 'screenTop and screenY are falsy'}
  }

  return { open: false }
}

/**
 * Fullscreen hook baed on browser invoked fullscreen e.g. F11
 * Browsers have inbuilt fullscreen function, which is different than fullscreen of an
 * element. Typically this leaves the browser in a fullscreen mode that retains the address bar.
 * This cannot be invoked via javascript, but we can check and make educated guess as to whether in
 * fullscreen mode, or at least help users of this hook to guess within their level of acceptance
 * @param {object} element The element to be viewed fullscreen, defaults to documentElement
 * @returns {object} The fullscreen object, providing access to current state and functions
 */
export function useFullScreenBrowser(callback) {
  // reuse the useResizeHook to determine act on screen size changes,
  // 1fps should be enough, doesn't really need to be faster for this event
  useResize(1, handleResize)

  const initialSizeInfo = getSizeInfo()
  const [fullScreen, setFullScreen] = useState(isFullScreenSize(initialSizeInfo))
  const [sizeInfo, setSizeInfo] = useState(initialSizeInfo)

  function handleResize(newSize) {
    //something has changed so let's see if in fullscreen mode
    const sizeInfo = getSizeInfo()
    const result = isFullScreenSize(sizeInfo)
    setFullScreen(result)
    setSizeInfo(sizeInfo)
  }

  return {
    fullScreen: fullScreen.open,
    info: {
      reason: fullScreen.reason,
      sizeInfo
    }
  }
}
