import { useEffect } from 'react'

export function useClickOutside(el, options = {}, onClick) {
  const els = [].concat(el)
  let active = true

  if (!onClick && typeof options === 'function') {
    onClick = options
  } else {
    active = options.active
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
