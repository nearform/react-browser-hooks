import { useState, useEffect } from 'react'

export function useMediaControls(element) {
  const [currentTime, setCurrentTime] = useState(getAttribute('currentTime', 0))
  const [muted, setMuted] = useState(getAttribute('muted'))
  const [oldVolume, setOldVolume] = useState(getAttribute('volume', 1)) // useful for toggling mute
  const [paused, setPaused] = useState(isPaused())
  const [volume, _setVolume] = useState(getAttribute('volume', 1))

  function isPaused() {
    if (!element || !element.current) return false
    return element.current.paused || element.current.ended
  }

  function getAttribute(attribute, defaultValue = false) {
    if (!element || !element.current) return
    return element.current[attribute]
  }

  function pause() {
    element.current.pause()
  }

  function play() {
    element.current.play()
  }

  function setVolume(value) {
    setOldVolume(element.current.volume)
    element.current.volume = value

    // no onmuted event, must set on volumechange
    if (value === 0) {
      element.current.muted = true
    } else {
      element.current.muted = false
    }
    setMuted(element.current.muted)
  }

  function mute() {
    setVolume(0)
  }

  function unmute() {
    setVolume(oldVolume)
  }

  function seek(value) {
    element.current.currentTime = value
  }

  function stop() {
    pause()
    seek(0)
  }

  function restart() {
    play()
    seek(0)
  }

  useEffect(() => {
    const playPauseHandler = () => setPaused(isPaused())
    element.current.addEventListener('play', playPauseHandler) // fired by play method or autoplay attribute
    element.current.addEventListener('playing', playPauseHandler) // fired by resume after being paused due to lack of data
    element.current.addEventListener('pause', playPauseHandler) // fired by pause method
    element.current.addEventListener('waiting', playPauseHandler) // fired by pause due to lack of data

    const volumeHandler = () => _setVolume(getAttribute('volume'))
    element.current.addEventListener('volumechange', volumeHandler) // fired by a change of volume

    const seekHandler = () => setCurrentTime(getAttribute('currentTime'))
    element.current.addEventListener('seeked', seekHandler) // fired on seek completed
    element.current.addEventListener('timeupdate', seekHandler) // fired on currentTime update

    return () => {
      element.current.removeEventListener('play', playPauseHandler)
      element.current.removeEventListener('playing', playPauseHandler)
      element.current.removeEventListener('pause', playPauseHandler)
      element.current.removeEventListener('waiting', playPauseHandler)

      element.current.removeEventListener('volumechange', volumeHandler)

      element.current.removeEventListener('seeked', seekHandler)
      element.current.removeEventListener('timeupdate', seekHandler)
    }
  }, [])

  return {
    currentTime,
    mute,
    muted,
    unmute,
    pause,
    paused,
    play,
    restart,
    seek,
    setVolume,
    stop,
    volume
  }
}
