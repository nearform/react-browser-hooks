import { useEffect } from 'react'

export function useClickOutside(el, onClick) {
  const els = [].concat(el)

  const handler = (ev) => {
    const target = ev.target
    if (els.every((ref) => !ref.current.contains(target))) {
      onClick(ev)
    }
  }

  useEffect(() => {
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [el])
}
