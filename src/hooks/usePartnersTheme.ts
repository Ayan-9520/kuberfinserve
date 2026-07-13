import { useCallback, useEffect, useState } from 'react'

export type PartnersTheme = 'dark' | 'light'

const STORAGE_KEY = 'kuberfinserve_partners_theme'

function getInitialTheme(): PartnersTheme {
  if (typeof window === 'undefined') return 'dark'
  const stored = localStorage.getItem(STORAGE_KEY) as PartnersTheme | null
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function usePartnersTheme() {
  const [theme, setThemeState] = useState<PartnersTheme>(getInitialTheme)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  const isDark = theme === 'dark'

  return { theme, isDark, toggleTheme }
}
