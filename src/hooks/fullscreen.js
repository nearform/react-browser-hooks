import { useState, useEffect } from 'react'
import { useResize } from './resize'

export function isFullScreenElement(doc, el) {
  if (el && el.current) {
    if (doc.fullscreenElement === el.current)
      return { open: true, reason: 'fullscreenElement set to element' }
    if (doc.mozFullScreenElement === el.current)
      return { open: true, reason: 'mozFullScreenElement set to element' }
    if (doc.webkitFullscreenElement === el.current)
      return { open: true, reason: 'webkitFullscreenElement set to element' }
    if (doc.msFullscreenElement === el.current)
      return { open: true, reason: 'msFullscreenElement set to element' }
  } else {
    if (doc.fullscreenElement)
      return { open: true, reason: 'fullscreenElement set' }
    if (doc.mozFullScreenElement)
      return { open: true, reason: 'mozFullScreenElement set' }
    if (doc.webkitFullscreenElement)
      return { open: true, reason: 'webkitFullscreenElement set' }
    if (doc.msFullscreenElement)
      return { open: true, reason: 'msFullscreenElement set' }

    if (doc.fullscreen) return { open: true, reason: 'fullscreen true' }
    if (doc.mozFullScreen) return { open: true, reason: 'mozFullScreen true' }
    if (doc.webkitIsFullScreen)
      return { open: true, reason: 'webkitIsFullScreen true' }
    if (doc.fullScreenMode) return { open: true, reason: 'fullScreenMode true' }
  }

  return { open: false }
}

export function useFullScreen(options) {
  const docEl = document.documentElement
  const fsEl = options && options.element
  const [fullScreen, setFullScreen] = useState(
    isFullScreenElement(document, fsEl)
  )
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

  function setState(eventName) {
    const newState = isFullScreenElement(document, fsEl)
    setFullScreen(newState)
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
  }, [])

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
  if (
    sizeInfo.screenWidth === sizeInfo.innerWidth &&
    sizeInfo.screenHeight === sizeInfo.innerHeight
  ) {
    return { open: true, reason: 'borderless fullscreen' }
  } else if (!sizeInfo.screenTop && !sizeInfo.screenY) {
    return { open: true, reason: 'screenTop and screenY are falsy' }
  }

  return { open: false }
}

export function useFullScreenBrowser() {
  const size = useResize(60)

  const initialSizeInfo = getSizeInfo()
  const [fullScreen, setFullScreen] = useState(
    isFullScreenSize(initialSizeInfo)
  )
  const [sizeInfo, setSizeInfo] = useState(initialSizeInfo)

  useEffect(() => {
    const sizeInfo = getSizeInfo()
    const result = isFullScreenSize(sizeInfo)
    setFullScreen(result)
    setSizeInfo(sizeInfo)
  }, [size.width, size.height])

  return {
    fullScreen: fullScreen.open,
    info: {
      reason: fullScreen.reason,
      sizeInfo
    }
  }
}
