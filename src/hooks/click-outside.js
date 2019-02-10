import { useEffect } from 'react'

export function useClickOutside(el, onClick) {
  const handler = (ev) => {
    let target = ev.target

    if (target === el.current) {
      return
    }

    while (target != null) {
      target = target.parentElement
      if (target === el.current) {
        return
      }
    }

    onClick(ev)
  }

  useEffect(() => {
    window.addEventListener('click', handler)
    return () => window.removeEventListener('click', handler)
  }, [el.current])
}
