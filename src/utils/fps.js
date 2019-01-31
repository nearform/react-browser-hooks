const DEF_FPS = 15
const DEF_MIN = 1
const DEF_MAX = 120

//converts frames per second into milliseconds for timers
export function fpsToMs(fps, min = DEF_MIN, max = DEF_MAX, def = DEF_FPS) {
  // nulls will pass through
  if (isNaN(fps)) return null
  def = isNaN(def) ? DEF_FPS : def
  min = isNaN(min) ? DEF_MIN : min
  max = isNaN(max) ? DEF_MAX : max

  if (min > max) return null

  if (fps === null) fps = isNaN(def) ? DEF_FPS : def
    
  if (fps < min) fps = min
  else if (fps > max) fps = max

  // prevent divide by zero and can only go as low as 1ms
  if (fps < 1 || fps > 1000) return null    

  return Math.floor(1000 / fps)
}

// needs cross-browser validation
export const raf = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame

export const caf = window.cancelAnimationFrame ||
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
  if(raf) {
    const d = new Date()
    const currentSecond = Math.floor(d.getTime() / 1000)
    const currentFrame = Math.floor(d.getMilliseconds() / rafData.ms)
  
    // clear last frame timeout if kicked off
    if(rafData.lastFrameTimoutId) clearTimeout(rafData.lastFrameTimoutId)
  
    if(rafData.frame !== currentFrame || rafData.second !== currentSecond) {
    //don't kick off another rAF request while one is underway
      rafData.ticking = true
      rafData.rafId = raf(handler)
    } else {
    //kick off a timer to perform last frame, but cancel always first thing
    //remainder is ms to next frame
      rafData.lastFrameTimoutId = setTimeout(handler, d.getMilliseconds() % rafData.ms)
    }
    rafData.frame = currentFrame
    rafData.second = currentSecond
    
    return
  }

  if (rafData.fallBackTimeoutId) return
  // fps fallback, if equest animation frame isn't supported
  rafData.fallBackTimeoutId = setTimeout(function () {
    rafData.fallBackTimeoutId = null
    handler()
  }, rafData.ms)
}

export function cleanupRaf(rafData) {
  if (caf && rafData.id) caf(rafData.id)
  if(rafData.lastFrameTimoutId) clearTimeout(rafData.lastFrameTimoutId)
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



