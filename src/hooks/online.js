import { useState, useEffect } from 'react'

//@todo: perhaps polling approach for older browsers as an option
//e.g. favicon polling
export function useOnline() {
  const [status, setStatus] = useState(getOnlineStatus())

  function handleChange() {
    setStatus(getOnlineStatus())
  }

  function getOnlineStatus() {
    return window.navigator && window.navigator.onLine ? true : false
  }

  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('offline', handleChange, false)
      window.addEventListener('online', handleChange, false)
    }

    return function cleanup() {
      if (window.removeEventListener) {
        window.removeEventListener('online', handleChange)
        window.removeEventListener('offline', handleChange)
      }
    }
  }, [])

  return {
    status
  }
}
