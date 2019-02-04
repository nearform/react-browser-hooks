import { useState, useEffect } from 'react'
import { raf, caf, fpsToMs } from '../utils/fps'

//experimental
export function useRaf(options) {
  const msPerFrame = fpsToMs(options.fps)
  const obj = getSecondAndFrame()
  const [second, setSecond] = useState(obj.second)
  const [frame, setFrame] = useState(obj.frame)
  const [tick, setTick] = useState(0)
  const [actual, setActual] = useState(0)
  const [framesRendered, setFramesRendered] = useState(0)

  function getSecondAndFrame() {
    if (!msPerFrame) return { second: 0, frame: 0 }

    const d = new Date()
    return {
      second: Math.floor(d.getSeconds()),
      frame: Math.floor(d.getMilliseconds() / msPerFrame) + 1
    }
  }

  useEffect(() => {
    function handleAf() {
      const obj = getSecondAndFrame()
      if (!msPerFrame) return

      if (frame !== obj.frame && second !== obj.second) {
        setSecond(obj.second)
        setFrame(obj.frame)
        setActual(framesRendered)
        setFramesRendered(1)
        setTick(1)
        return
      }

      if (frame !== obj.frame) {
        setFrame(obj.frame)
        setFramesRendered(framesRendered + 1)
      }

      if (second !== obj.second) {
        setSecond(obj.second)
        setActual(1)
      }

      setTick(tick + 1)
    }
    const rafId = raf && raf(handleAf)
    return function cleanup() {
      caf && caf(rafId)
    }
  }, [tick, options.fps])

  return {
    frame,
    second,
    stopped: !msPerFrame ? true : false,
    actual,
    tick
  }
}
