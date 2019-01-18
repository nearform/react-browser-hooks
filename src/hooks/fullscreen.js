import { useState, useEffect } from 'react';

export function useFullScreen(element) {
  const info = true //@todo: move to config or param
  const el = element || document.documentElement;
  const [fullScreen, setFullScreen] = useState(isFullScreen());
  const [sizeInfo, setSizeInfo] = useState(getSizeInfo());
  const [lastEvent, setLastEvent] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);

  // we get this info so user can make informed decision
  // if we think it's fullscreen but not borderless
  function getSizeInfo() {
    return { 
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      browserWidth: window.outerWidth,
      browserHeight: window.outerHeight
    }
  }

  // access various open fullscreen methods
  function openFullScreen() {
    if (el.requestFullscreen) {
      info && setLastRequest('requestFullScreen')
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      info && setLastRequest('mozRequestFullScreen')
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      info && setLastRequest('webkitRequestFullscreen')
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      info && setLastRequest('msRequestFullscreen')
      el.msRequestFullscreen();
    }
  }

  // access various exit fullscreen methods
  function closeFullScreen() {
    if (document.exitFullscreen) {
      info && setLastRequest('exitFullscreen')
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      info && setLastRequest('mozCancelFullScreen')
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      info && setLastRequest('webkitExitFullscreen')
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      info && setLastRequest('msExitFullscreen')
      document.msExitFullscreen();
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
    setFullScreen(isFullScreen())
    if (info) {
      setLastEvent(eventName)
      setSizeInfo(getSizeInfo())
    }
  }

  // determine if we are in fullscreen mode and why
  // don't set any state in here
  function isFullScreen() {
    if (document.fullscreenElement) return { open: true, reason: 'fullscreenElement set'}
    if (document.mozFullScreenElement) return { open: true, reason: 'mozFullScreenElement set'}
    if (document.webkitFullscreenElement) return { open: true, reason: 'webkitFullscreenElement set'}
    if (document.msFullscreenElement) return { open: true, reason: 'msFullscreenElement set'}

    if (document.fullscreen) return { open: true, reason: 'fullscreen true'}
    if (document.mozFullScreen) return { open: true, reason: 'mozFullScreen true'}
    if (document.webkitIsFullScreen) return { open: true, reason: 'webkitIsFullScreen true'}
    if (document.fullScreenMode) return { open: true, reason: 'fullScreenMode true'}

    if (window.screen.height === window.innerHeight) {
      return { open: true, reason: 'innerHeight === screenHeight'}
    }

    //@todo: we may need to capture resize event to determine mode based on window size
    // e.g. consoles open, f11 fullscreen doesn't call events etc.

    return { open: false}
  }

  useEffect(
    () => {
      // add fullscreen change listeners for various browsers
      document.addEventListener('webkitfullscreenchange', handleWebkitChange, false);
      document.addEventListener('mozfullscreenchange', handleMozChange, false);
      document.addEventListener('msfullscreenchange', handleMsChange1, false);
      document.addEventListener('MSFullscreenChange', handleMsChange2, false); //IE11
      document.addEventListener('fullscreenchange', handleChange, false);

      return () => {
        // tidy up
        document.removeEventListener('webkitfullscreenchange', handleWebkitChange);
        document.removeEventListener('mozfullscreenchange', handleMozChange);
        document.removeEventListener('msfullscreenchange', handleMsChange1);
        document.removeEventListener('MSFullscreenChange', handleMsChange2);
        document.removeEventListener('fullscreenchange', handleChange);
      };
    },
    [fullScreen.open]
  );

  return {
    fullScreen: fullScreen.open,
    open: openFullScreen,
    close: closeFullScreen,
    toggle: fullScreen.open ? closeFullScreen : openFullScreen,
    info: info && {
      reason: fullScreen.reason,
      borderLess: sizeInfo.screenWidth === sizeInfo.innerWidth && sizeInfo.screenHeight === sizeInfo.innerHeight,
      lastEvent,
      lastRequest,
      sizes: sizeInfo
    }
  };
}
