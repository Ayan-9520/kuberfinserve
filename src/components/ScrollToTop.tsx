import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls to top on route change, or to hash target when present (e.g. #academy). */
export function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      if (hash) {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' in window ? 'instant' : 'auto',
      })
    })
    // Hash targets may render after lazy sections — retry once
    let retry: number | undefined
    if (hash) {
      retry = window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    }
    return () => {
      window.cancelAnimationFrame(id)
      if (retry) window.clearTimeout(retry)
    }
  }, [pathname, search, hash])

  return null
}
