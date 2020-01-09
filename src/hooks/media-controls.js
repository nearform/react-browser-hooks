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
    const currEl = element.current
    const isPaused = () => currEl.paused || currEl.ended

    setCurrentTime(currEl.currentTime)
    setPaused(isPaused())

    setMuted(currEl.muted)
    if (muted) {
      setOldVolume(currEl.volume)
      _setVolume(0)
    } else {
      _setVolume(currEl.volume)
    }

    const playPauseHandler = () => setPaused(isPaused())
    currEl.addEventListener('play', playPauseHandler) // fired by play method or autoplay attribute
    currEl.addEventListener('playing', playPauseHandler) // fired by resume after being paused due to lack of data
    currEl.addEventListener('pause', playPauseHandler) // fired by pause method
    currEl.addEventListener('waiting', playPauseHandler) // fired by pause due to lack of data

    const volumeHandler = () => {
      let vol = currEl.volume

      if (vol < 0) {
        vol = 0
      }

      if (vol > 1) {
        vol = 1
      }

      _setVolume(vol)
    }
    currEl.addEventListener('volumechange', volumeHandler) // fired by a change of volume

    const seekHandler = () => setCurrentTime(currEl.currentTime)
    currEl.addEventListener('seeked', seekHandler) // fired on seek completed
    currEl.addEventListener('timeupdate', seekHandler) // fired on currentTime update

    return () => {
      currEl.removeEventListener('play', playPauseHandler)
      currEl.removeEventListener('playing', playPauseHandler)
      currEl.removeEventListener('pause', playPauseHandler)
      currEl.removeEventListener('waiting', playPauseHandler)

      currEl.removeEventListener('volumechange', volumeHandler)

      currEl.removeEventListener('seeked', seekHandler)
      currEl.removeEventListener('timeupdate', seekHandler)
    }
  }, [element, muted])

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
