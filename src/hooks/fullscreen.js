import { useState, useEffect } from 'react'
import { useResize } from './resize'

// determine if we are in fullscreen mode and why
// don't set any state in here as called on init too
export function isFullScreenElement(el) {
  if (el && el.current) {
    if (
      document.fullscreenElement === el.current ||
      document.mozFullScreenElement === el.current ||
      document.webkitFullscreenElement === el.current ||
      document.msFullscreenElement === el.current
    ) {
      return true
    }
    return false
  }

  if (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  ) {
    return true
  }

  if (
    document.fullscreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen ||
    document.fullScreenMode
  ) {
    return true
  }

  return false
}

export function useFullScreen(options) {
  const docEl = document.documentElement
  const fsEl = options && options.element
  const [fullScreen, setFullScreen] = useState(isFullScreenElement(fsEl))
  const [lastEvent, setLastEvent] = useState(null)
  const [lastRequest, setLastRequest] = useState(null)

  // access various open fullscreen methods
  function openFullScreen() {
    const el = (fsEl && fsEl.current) || docEl
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
    setState('msfullscreenchange')
  }

  function handleMsChange2() {
    setState('MSFullscreenChange') // IE 11 :-(
  }

  function handleChange() {
    setState('fullscreenchange')
  }

  // various handlers call this so we have the source of event
  function setState(eventName) {
    setFullScreen(isFullScreenElement(fsEl))
    setLastEvent(eventName)
  }

  useEffect(() => {
    document.addEventListener(
      'webkitfullscreenchange',
      handleWebkitChange,
      false
    )
    document.addEventListener('mozfullscreenchange', handleMozChange, false)
    document.addEventListener('msfullscreenchange', handleMsChange1, false)
    document.addEventListener('MSFullscreenChange', handleMsChange2, false) //IE11
    document.addEventListener('fullscreenchange', handleChange, false)

    return () => {
      document.removeEventListener('webkitfullscreenchange', handleWebkitChange)
      document.removeEventListener('mozfullscreenchange', handleMozChange)
      document.removeEventListener('msfullscreenchange', handleMsChange1)
      document.removeEventListener('MSFullscreenChange', handleMsChange2)
      document.removeEventListener('fullscreenchange', handleChange)
    }
  }, [options.element])

  return {
    fullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggle: fullScreen ? closeFullScreen : openFullScreen,
    info: {
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
  if (
    sizeInfo.screenWidth === sizeInfo.innerWidth &&
    sizeInfo.screenHeight === sizeInfo.innerHeight
  ) {
    return true
  } else if (!sizeInfo.screenTop && !sizeInfo.screenY) {
    return true
  }

  return false
}

export function useFullScreenBrowser() {
  const size = useResize()

  const initialSizeInfo = getSizeInfo()
  const [fullScreen, setFullScreen] = useState(
    isFullScreenSize(initialSizeInfo)
  )
  const [sizeInfo, setSizeInfo] = useState(initialSizeInfo)

  useEffect(() => {
    const sizeInfo = getSizeInfo()
    setFullScreen(isFullScreenSize(sizeInfo))
    setSizeInfo(sizeInfo)
  }, [size.width, size.height])

  return {
    fullScreen: fullScreen,
    info: sizeInfo
  }
}
