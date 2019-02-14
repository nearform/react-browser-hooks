import { useEffect } from 'react'

export function useClickOutside(el, predicate = true, onClick) {
  const els = [].concat(el)

  if (!onClick && typeof predicate === 'function') {
    onClick = predicate
  }

  const handler = (ev) => {
    const target = ev.target

    if (els.every((ref) => !ref.current || !ref.current.contains(target))) {
      onClick(ev)
    }
  }

  const cleanup = () => window.removeEventListener('click', handler)

  useEffect(() => {
    if (predicate) {
      window.addEventListener('click', handler)
    } else {
      cleanup()
    }

    return cleanup
  })
}
