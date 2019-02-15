import { useEffect } from 'react'

export function useClickOutside(el, active = true, onClick) {
  const els = [].concat(el)

  if (!onClick && typeof active === 'function') {
    onClick = active
  }

  const handler = (ev) => {
    const target = ev.target

    if (els.every((ref) => !ref.current || !ref.current.contains(target))) {
      onClick(ev)
    }
  }

  const cleanup = () => window.removeEventListener('click', handler)

  useEffect(() => {
    if (active) {
      window.addEventListener('click', handler)
    } else {
      cleanup()
    }

    return cleanup
  })
}
