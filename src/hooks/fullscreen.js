import { useState, useEffect } from 'react'
import { IS_SERVER } from '../constants'
import { useResize } from './resize'

// determine if we are in fullscreen mode and why
// don't set any state in here as called on init too
export function isFullScreenElement(el) {
  if (el && el.current) {
    return Boolean(
      document.fullscreenElement === el.current ||
        document.mozFullScreenElement === el.current ||
        document.webkitFullscreenElement === el.current ||
        document.msFullscreenElement === el.current
    )
  }

  return Boolean(
    document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      document.fullscreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen ||
      document.fullScreenMode
  )
}

export function useFullScreen(options = {}) {
  const fsEl = options && options.element
  const initialState = IS_SERVER ? false : isFullScreenElement(fsEl)
  const [fullScreen, setFullScreen] = useState(initialState)

  // access various open fullscreen methods
  function openFullScreen() {
    const el = (fsEl && fsEl.current) || document.documentElement

    if (el.requestFullscreen) return el.requestFullscreen()
    if (el.mozRequestFullScreen) return el.mozRequestFullScreen()
    if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen()
    if (el.msRequestFullscreen) return el.msRequestFullscreen()
  }

  // access various exit fullscreen methods
  function closeFullScreen() {
    if (document.exitFullscreen) return document.exitFullscreen()
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
    if (document.webkitExitFullscreen) return document.webkitExitFullscreen()
    if (document.msExitFullscreen) return document.msExitFullscreen()
  }

  function handleChange() {
    setFullScreen(isFullScreenElement(fsEl))
  }

  useEffect(() => {
    document.addEventListener('webkitfullscreenchange', handleChange, false)
    document.addEventListener('mozfullscreenchange', handleChange, false)
    document.addEventListener('msfullscreenchange', handleChange, false)
    document.addEventListener('MSFullscreenChange', handleChange, false) // IE11
    document.addEventListener('fullscreenchange', handleChange, false)

    return () => {
      document.removeEventListener('webkitfullscreenchange', handleChange)
      document.removeEventListener('mozfullscreenchange', handleChange)
      document.removeEventListener('msfullscreenchange', handleChange)
      document.removeEventListener('MSFullscreenChange', handleChange)
      document.removeEventListener('fullscreenchange', handleChange)
    }
  }, [options.element])

  return {
    fullScreen,
    open: openFullScreen,
    close: closeFullScreen,
    toggle: fullScreen ? closeFullScreen : openFullScreen
  }
}

export function getSizeInfo() {
  if (IS_SERVER) return {}
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
    IS_SERVER ? false : isFullScreenSize(initialSizeInfo)
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
