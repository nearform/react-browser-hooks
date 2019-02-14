import { useEffect, useState } from 'react'
import { IS_SERVER } from '../constants'

/**
 * Function to grab the visibility prop strings
 * from the current browser
 *
 * @returns {object} - object containing both hidden
 *  and visibilityChange properties
 */
const getVisibilityProps = () => {
  if (IS_SERVER) return {}

  let hidden
  let visibilityChange

  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden'
    visibilityChange = 'webkitvisibilitychange'
  }
  return { hidden, visibilityChange }
}

/**
 * Page Visibility API Hook
 * Hooks into page visibility API
 * @returns {boolean} - whether page is currently visible
 */
export const usePageVisibility = () => {
  const { hidden, visibilityChange } = getVisibilityProps()
  const [visible, setVisible] = useState(IS_SERVER ? true : !document[hidden])
  const handler = () => setVisible(!document[hidden])
  useEffect(() => {
    document.addEventListener(visibilityChange, handler)
    return () => {
      document.removeEventListener(visibilityChange, handler)
    }
  }, [])
  return visible
}
