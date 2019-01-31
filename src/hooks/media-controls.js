import { useState, useEffect } from 'react'

export function useMediaControls(element) {
  const [muted, setMuted] = useState(getMuted())
  const [oldVolume, setOldVolume] = useState(getVolume()) // useful for toggling mute
  const [paused, setPaused] = useState(isPaused())
  const [volume, _setVolume] = useState(getVolume())

  function isPaused() {
    if (!element || !element.current) return true
    return element.current.paused || element.current.ended
  }

  function getVolume() {
    if (!element || !element.current) return 1
    return element.current.volume
  }

  function getMuted() {
    if (!element || !element.current) return false
    return element.current.muted
  }

  function pause() {
    if (!element || !element.current) return
    element.current.pause()
  }

  function play() {
    if (!element || !element.current) return
    element.current.play()
  }

  function setVolume(value) {
    if (!element || !element.current) return
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
    if (!element || !element.current) return
    setVolume(0)
  }

  function unmute() {
    if (!element || !element.current) return
    setVolume(oldVolume)
  }

  useEffect(() => {
    const playPauseHandler = () => setPaused(isPaused())
    element.current.addEventListener('play', playPauseHandler) // fired by play method or autoplay attribute
    element.current.addEventListener('playing', playPauseHandler) // fired by resume after being paused due to lack of data
    element.current.addEventListener('pause', playPauseHandler) // fired by pause method
    element.current.addEventListener('waiting', playPauseHandler) // fired by pause due to lack of data

    const volumeHandler = () => _setVolume(getVolume())
    element.current.addEventListener('volumechange', volumeHandler) // fired by a change of volume

    return () => {
      element.current.removeEventListener('play', playPauseHandler)
      element.current.removeEventListener('playing', playPauseHandler)
      element.current.removeEventListener('pause', playPauseHandler)
      element.current.removeEventListener('waiting', playPauseHandler)

      element.current.removeEventListener('volumechange', volumeHandler)
    }
  }, [])

  return {
    mute,
    muted,
    unmute,
    pause,
    paused,
    play,
    setVolume,
    toggle: paused ? play : pause,
    volume
  }
}
