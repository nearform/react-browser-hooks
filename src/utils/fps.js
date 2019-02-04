const MIN = 1
const MAX = 1000

export function fpsToMs(fps) {
  if (!fps) return null
  if (isNaN(fps)) return null
  if (fps < MIN) return null
  else if (fps > MAX) return null

  return Math.floor(1000 / fps)
}

// needs cross-browser validation
export const raf =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame

export const caf =
  window.cancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelRequestAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.oCancelRequestAnimationFrame ||
  window.oCancelAnimationFrame ||
  window.msCancelRequestAnimationFrame ||
  window.msCancelAnimationFrame

export function nextRaf(rafData, handler) {
  if (rafData.ticking) return

  //if the renderAnimation frame function supported by browser
  if (raf) {
    const d = new Date()
    const currentSecond = Math.floor(d.getTime() / 1000)
    const currentFrame = Math.floor(d.getMilliseconds() / rafData.ms)

    // clear last frame timeout if kicked off
    if (rafData.lastFrameTimoutId) clearTimeout(rafData.lastFrameTimoutId)

    if (rafData.frame !== currentFrame || rafData.second !== currentSecond) {
      //don't kick off another rAF request while one is underway
      rafData.ticking = true
      rafData.rafId = raf(handler)
    } else {
      //kick off a timer to perform last frame, but cancel always first thing
      //remainder is ms to next frame
      rafData.lastFrameTimoutId = setTimeout(
        handler,
        d.getMilliseconds() % rafData.ms
      )
    }
    rafData.frame = currentFrame
    rafData.second = currentSecond

    return
  }

  if (rafData.fallBackTimeoutId) return
  // fps fallback, if equest animation frame isn't supported
  rafData.fallBackTimeoutId = setTimeout(function() {
    rafData.fallBackTimeoutId = null
    handler()
  }, rafData.ms)
}

export function cleanupRaf(rafData) {
  if (caf && rafData && rafData.id) caf(rafData.id)
  if (rafData.lastFrameTimoutId) clearTimeout(rafData.lastFrameTimoutId)
  if (rafData.fallBackTimeoutId) clearTimeout(rafData.fallBackTimeoutId)
}

export function initRaf(fps) {
  const ms = fpsToMs(fps)
  return {
    ms,
    ticking: false,
    frame: 0,
    second: 0,
    rafId: null,
    lastFrameTimoutId: 0,
    fallBackTimeoutId: 0
  }
}
