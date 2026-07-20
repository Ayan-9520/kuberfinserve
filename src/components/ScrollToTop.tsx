import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scrolls window to top on every route change (pathname or search). */
export function ScrollToTop() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
    })
    return () => window.cancelAnimationFrame(id)
  }, [pathname, search])

  return null
}
