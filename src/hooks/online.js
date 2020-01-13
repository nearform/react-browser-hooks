import { useState, useEffect } from 'react'
import { IS_SERVER } from '../constants'

//@todo: perhaps polling approach for older browsers as an option
//e.g. favicon polling
export function useOnline() {
  const [online, setOnline] = useState(getOnlineStatus())

  function getOnlineStatus() {
    return IS_SERVER || (window.navigator && window.navigator.onLine)
      ? true
      : false
  }

  useEffect(() => {
    function handleChange() {
      setOnline(getOnlineStatus())
    }

    window.addEventListener('offline', handleChange, false)
    window.addEventListener('online', handleChange, false)

    return function cleanup() {
      window.removeEventListener('online', handleChange)
      window.removeEventListener('offline', handleChange)
    }
  }, [])

  return online
}
