import { useState, useEffect } from 'react'

export function useMediaControls(element) {
  const [currentTime, setCurrentTime] = useState(null)
  const [muted, setMuted] = useState(null)
  const [paused, setPaused] = useState(null)
  const [volume, adjustVolume] = useState(null)
  const [cachedVolume, setCachedVolume] = useState(null)

  function pause() {
    element.current.pause()
  }

  function play() {
    return element.current.play()
  }

  function setVolume(value) {
    let volume

    if (value < 0) {
      volume = 0
    } else if (value > 1) {
      volume = 1
    } else {
      volume = value
    }

    if (volume === 0) {
      setCachedVolume(element.current.volume)
      mute()
    } else {
      unmute()
    }

    element.current.volume = volume
  }

  function mute() {
    element.current.muted = true
  }

  function unmute() {
    element.current.muted = false
    if (cachedVolume) {
      element.current.volume = cachedVolume
      setCachedVolume(null)
    }
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
    adjustVolume(currEl.volume)
    setMuted(currEl.muted)

    const playPauseHandler = () => setPaused(isPaused())
    currEl.addEventListener('play', playPauseHandler) // fired by play method or autoplay attribute
    currEl.addEventListener('playing', playPauseHandler) // fired by resume after being paused due to lack of data
    currEl.addEventListener('pause', playPauseHandler) // fired by pause method
    currEl.addEventListener('waiting', playPauseHandler) // fired by pause due to lack of data

    const volumeHandler = () => {
      setMuted(currEl.muted)
      adjustVolume(currEl.volume)
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
