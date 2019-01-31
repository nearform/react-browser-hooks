import { useState, useEffect } from 'react'

//@todo: perhaps polling approach for older browsers as an option 
//e.g. favicon polling
export function useOnline() {
  const initialState = window.navigator && window.navigator.onLine
  const [online, setOnline] = useState(initialState)
  const [reason, setReason] = useState('initial status')

  function handleOnline() {
    if(!online) {
      setOnline(true)
      setReason('online event')
    }
  }

  function handleOffline() {
    if(online) {
      setOnline(false)
      setReason('offline event')
    }
  }

  useEffect(() => {
    if(window.addEventListener) {
      window.addEventListener('offline', handleOffline, false)
      window.addEventListener('online', handleOnline, false)
    }

    return function cleanup() {
      if(window.removeEventListener) {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
  }, [])

  return {
    online,
    reason
  }
}
