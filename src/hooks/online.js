import { useState, useEffect } from 'react'

//@todo: perhaps polling approach for older browsers as an option 
//e.g. favicon polling
export function useOnline(callback) {
  const initialState = window.navigator && window.navigator.onLine
  console.log(initialState)
  const [online, setOnline] = useState(initialState)
  const [reason, setReason] = useState('initial status')

  function handleOnline() {
    if(!online) {
      setOnline(true)
      setReason('online event')
      if (callback) callback(true)
    }
  }

  function handleOffline() {
    if(online) {
      setOnline(false)
      setReason('offline event')
      if (callback) callback(false)
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
  }, [online])

  return {
    online,
    reason
  }
}
