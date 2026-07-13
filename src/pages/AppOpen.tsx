import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2, Smartphone } from 'lucide-react'
import { openMobileApp } from '@/utils/partnerApp'
import { SeoHead } from '@/components/SeoHead'

/**
 * Universal link landing — /app/partner, /app/customer, /app/open
 * Reads query params and opens the native app (or store fallback).
 */
export function AppOpen() {
  const [searchParams] = useSearchParams()
  const target = (searchParams.get('app') || searchParams.get('target') || 'partner') as
    | 'partner'
    | 'customer'
  const resolvedTarget = target === 'customer' ? 'customer' : 'partner'

  const params = useMemo(() => {
    const next: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      if (!['app', 'target'].includes(key)) {
        next[key] = value
      }
    })
    return next
  }, [searchParams])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      openMobileApp(resolvedTarget, params)
    }, 400)
    return () => window.clearTimeout(timer)
  }, [resolvedTarget, params])

  const appName = resolvedTarget === 'customer' ? 'KuberFinserve' : 'KuberOne'

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <SeoHead title={`Opening ${appName} App`} description={`Redirecting to ${appName} mobile app.`} noindex />
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Smartphone className="h-7 w-7" />
        </div>
        <h1 className="mt-4 font-heading text-xl font-bold text-navy-900">Opening {appName}</h1>
        <p className="mt-2 text-sm text-slate-600">
          If the app doesn&apos;t open automatically, you&apos;ll be redirected to the app store.
        </p>
        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-brand-700">
          <Loader2 className="h-4 w-4 animate-spin" />
          Please wait…
        </div>
        <button
          type="button"
          onClick={() => openMobileApp(resolvedTarget, params)}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3 text-sm font-bold text-white"
        >
          Open App
        </button>
      </motion.div>
    </div>
  )
}
