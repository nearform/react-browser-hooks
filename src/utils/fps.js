const MIN = 1
const MAX = 1000
const ONE_FRAME = 16.7

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
    rafData.tick++
    // clear last frame timeout if kicked off
    if (rafData.lastFrameTimeoutId) clearTimeout(rafData.lastFrameTimeoutId)

    if (rafData.tick > rafData.skip) {
      //don't kick off another rAF request while one is underway
      rafData.ticking = true
      rafData.rafId = raf(handler)
      rafData.tick = 0
    } else {
      //get the remainder using optimistic 60fps
      const remainder = Math.floor(
        (rafData.skip + 1 - rafData.tick) * ONE_FRAME
      )
      //kick off a timer to perform last frame, but cancel always first thing
      if (remainder) rafData.lastFrameTimeoutId = setTimeout(handler, remainder)
    }

    return
  }

  if (rafData.fallBackTimeoutId) return
  // fps fallback, if equest animation frame isn't supported
  rafData.fallBackTimeoutId = setTimeout(function() {
    rafData.fallBackTimeoutId = null
    handler()
  }, Math.floor(rafData.skip * ONE_FRAME))
}

export function cleanupRaf(rafData) {
  if (!caf || !rafData) return
  if (rafData.rafId) {
    caf(rafData.rafId)
    rafData.rafId = null
  }
  if (rafData.lastFrameTimeoutId) clearTimeout(rafData.lastFrameTimeoutId)
  if (rafData.fallBackTimeoutId) clearTimeout(rafData.fallBackTimeoutId)
}

export function initRaf(skip) {
  if (skip === null || skip === undefined) return null
  if (isNaN(skip)) return null

  return {
    skip: parseInt(skip),
    ticking: false,
    tick: 0,
    rafId: null,
    lastFrameTimeoutId: null,
    fallBackTimeoutId: null
  }
}
