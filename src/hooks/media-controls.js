import { useState, useEffect } from 'react'

export function useMediaControls(element) {
  const [paused, setPaused] = useState(isPaused())

  function isPaused() {
    const player = element && element.current
    if (!player) return true
    return player.paused || player.ended
  }

  function pause() {
    const player = element && element.current
    if (!player) return
    player.pause()
  }

  function play() {
    const player = element && element.current
    if (!player) return
    player.play()
  }

  useEffect(() => {
    const player = element && element.current
    const handler = () => setPaused(isPaused())

    player.addEventListener('play', handler) // fired by play method or autoplay attribute
    player.addEventListener('playing', handler) // fired by resume after being paused due to lack of data
    player.addEventListener('pause', handler) // fired by pause method
    player.addEventListener('waiting', handler) // fired by pause due to lack of data

    return () => {
      player.removeEventListener('play', handler)
      player.removeEventListener('playing', handler)
      player.removeEventListener('pause', handler)
      player.removeEventListener('waiting', handler)
    }
  }, [])

  return {
    pause,
    paused,
    play,
    toggle: paused ? play : pause
  }
}
