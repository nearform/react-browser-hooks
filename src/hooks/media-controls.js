import { useState, useEffect } from 'react'

export function useMediaControls(element) {
  const [currentTime, setCurrentTime] = useState(null)
  const [muted, setMuted] = useState(null)
  const [oldVolume, setOldVolume] = useState(null)
  const [paused, setPaused] = useState(null)
  const [volume, _setVolume] = useState(null)

  function pause() {
    element.current.pause()
  }

  function play() {
    return element.current.play()
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
    seek(0)
    return play()
  }

  useEffect(() => {
    const isPaused = () => element.current.paused || element.current.ended

    setCurrentTime(element.current.currentTime)
    setPaused(isPaused())

    setMuted(element.current.muted)
    if (muted) {
      setOldVolume(element.current.volume)
      _setVolume(0)
    } else {
      _setVolume(element.current.volume)
    }

    const playPauseHandler = () => setPaused(isPaused())
    element.current.addEventListener('play', playPauseHandler) // fired by play method or autoplay attribute
    element.current.addEventListener('playing', playPauseHandler) // fired by resume after being paused due to lack of data
    element.current.addEventListener('pause', playPauseHandler) // fired by pause method
    element.current.addEventListener('waiting', playPauseHandler) // fired by pause due to lack of data

    const volumeHandler = () => _setVolume(element.current.volume)
    element.current.addEventListener('volumechange', volumeHandler) // fired by a change of volume

    const seekHandler = () => setCurrentTime(element.current.currentTime)
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
  }, [element.current])

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
