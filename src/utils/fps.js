const DEF_FPS = 15
const DEF_MIN = 1
const DEF_MAX = 60

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