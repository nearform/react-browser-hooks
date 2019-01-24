import { useState, useEffect } from 'react';
import { useResize } from './resize';

/**
 * Fullscreen hook based on user invoked request/exitFullScreen and associated triggered events
 * @param {object} element The element to be viewed fullscreen, defaults to documentElement
 * @returns {object} The fullscreen object, providing access to current state and functions
 */
export function useFullScreen(element) {
  const docEl = document.documentElement;
  const [fullScreen, setFullScreen] = useState(isFullScreen());
  const [lastEvent, setLastEvent] = useState(null);
  const [lastRequest, setLastRequest] = useState(null);

  // access various open fullscreen methods
  function openFullScreen() {
    const el = (element && element.current) || docEl;
    if (el.requestFullscreen) {
      setLastRequest('requestFullScreen');
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      setLastRequest('mozRequestFullScreen');
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      setLastRequest('webkitRequestFullscreen');
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      setLastRequest('msRequestFullscreen');
      el.msRequestFullscreen();
    }
  }

  // access various exit fullscreen methods
  function closeFullScreen() {
    if (document.exitFullscreen) {
      setLastRequest('exitFullscreen');
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      setLastRequest('mozCancelFullScreen');
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      setLastRequest('webkitExitFullscreen');
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      setLastRequest('msExitFullscreen');
      document.msExitFullscreen();
    }
  }

  function handleWebkitChange() {
    setState('webkitfullscreenchange');
  }

  function handleMozChange() {
    setState('mozfullscreenchange');
  }

  function handleMsChange1() {
    setState('msfullscreenchange'); //
  }

  function handleMsChange2() {
    setState('MSFullscreenChange'); // IE 11 :-(
  }

  function handleChange() {
    setState('fullscreenchange');
  }

  // various handlers call this so we have the source of event
  function setState(eventName) {
    setFullScreen(isFullScreen());
    setLastEvent(eventName);
  }

  // determine if we are in fullscreen mode and why
  // don't set any state in here as called on init too
  function isFullScreen() {
    if (element && element.current) {
      if (document.fullscreenElement === element.current)
        return { open: true, reason: 'fullscreenElement set to element' };
      if (document.mozFullScreenElement === element.current)
        return { open: true, reason: 'mozFullScreenElement set to element' };
      if (document.webkitFullscreenElement === element.current)
        return { open: true, reason: 'webkitFullscreenElement set to element' };
      if (document.msFullscreenElement === element.current)
        return { open: true, reason: 'msFullscreenElement set to element' };
    } else {
      if (document.fullscreenElement)
        return { open: true, reason: 'fullscreenElement set' };
      if (document.mozFullScreenElement)
        return { open: true, reason: 'mozFullScreenElement set' };
      if (document.webkitFullscreenElement)
        return { open: true, reason: 'webkitFullscreenElement set' };
      if (document.msFullscreenElement)
        return { open: true, reason: 'msFullscreenElement set' };

      if (document.fullscreen) return { open: true, reason: 'fullscreen true' };
      if (document.mozFullScreen)
        return { open: true, reason: 'mozFullScreen true' };
      if (document.webkitIsFullScreen)
        return { open: true, reason: 'webkitIsFullScreen true' };
      if (document.fullScreenMode)
        return { open: true, reason: 'fullScreenMode true' };
    }

    return { open: false };
  }

  useEffect(() => {
    // add fullscreen change listeners for various browsers
    document.addEventListener(
      'webkitfullscreenchange',
      handleWebkitChange,
      false
    );
    document.addEventListener('mozfullscreenchange', handleMozChange, false);
    document.addEventListener('msfullscreenchange', handleMsChange1, false);
    document.addEventListener('MSFullscreenChange', handleMsChange2, false); //IE11
    document.addEventListener('fullscreenchange', handleChange, false);

    return () => {
      // tidy up
      document.removeEventListener(
        'webkitfullscreenchange',
        handleWebkitChange
      );
      document.removeEventListener('mozfullscreenchange', handleMozChange);
      document.removeEventListener('msfullscreenchange', handleMsChange1);
      document.removeEventListener('MSFullscreenChange', handleMsChange2);
      document.removeEventListener('fullscreenchange', handleChange);
    };
  }, [fullScreen.open]);

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
  };
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
export function useFullScreenBrowser() {
  // reuse the useResizeHook to determine act on screen size changes,
  // 5fps should be enough, doesn't really need to be faster for this event
  useResize(5, handleResize);

  const [fullScreen, setFullScreen] = useState(isFullScreen());

  function getSizeInfo() {
    return {
      screenTop: window.screenTop,
      screenY: window.screenY,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      browserWidth: window.outerWidth,
      browserHeight: window.outerHeight
    };
  }

  const [sizeInfo, setSizeInfo] = useState(getSizeInfo());

  function handleResize(newSize) {
    //something has changed so let's see if in fullscreen mode
    const result = isFullScreen();
    setFullScreen(result);
    setSizeInfo(getSizeInfo());
  }

  function isFullScreen() {
    const sizeInfo = getSizeInfo();

    if (
      sizeInfo.screenWidth === sizeInfo.innerWidth &&
      sizeInfo.screenHeight === sizeInfo.innerHeight
    ) {
      return { open: true, reason: 'borderless fullscreen' };
    } else if (!window.screenTop && !window.screenY) {
      return { open: true, reason: 'screenTop and screenY are falsy' };
    }

    return { open: false };
  }

  return {
    fullScreen: fullScreen.open,
    info: {
      reason: fullScreen.reason,
      sizeInfo
    }
  };
}
