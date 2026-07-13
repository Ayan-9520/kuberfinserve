import { SITE } from '@/data/site'

type AppPlatform = 'android' | 'ios'
type AppTarget = 'partner' | 'customer'

interface AppConfig {
  androidPackage: string
  iosBundleId: string
  androidDeepLink: string
  iosDeepLink: string
  universalPath: string
  androidStoreUrl: string
  iosStoreUrl: string
}

function detectPlatform(): AppPlatform {
  if (typeof navigator === 'undefined') return 'android'
  const ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  return 'android'
}

function getAppConfig(target: AppTarget): AppConfig {
  if (target === 'customer') {
    return {
      androidPackage: SITE.customerApp.androidPackage,
      iosBundleId: SITE.customerApp.iosBundleId,
      androidDeepLink: SITE.customerApp.androidDeepLink,
      iosDeepLink: SITE.customerApp.iosDeepLink,
      universalPath: SITE.customerApp.universalOpenPath,
      androidStoreUrl: SITE.customerApp.androidStoreUrl,
      iosStoreUrl: SITE.customerApp.iosStoreUrl,
    }
  }

  return {
    androidPackage: SITE.partnerApp.androidPackage,
    iosBundleId: SITE.partnerApp.iosBundleId,
    androidDeepLink: SITE.partnerApp.androidDeepLink,
    iosDeepLink: SITE.partnerApp.iosDeepLink,
    universalPath: SITE.partnerApp.universalLoginPath,
    androidStoreUrl: SITE.partnerApp.androidStoreUrl,
    iosStoreUrl: SITE.partnerApp.iosStoreUrl,
  }
}

function buildCustomSchemeLink(platform: AppPlatform, config: AppConfig, params?: Record<string, string>): string {
  const base = platform === 'ios' ? config.iosDeepLink : config.androidDeepLink
  if (!params || Object.keys(params).length === 0) return base

  const query = new URLSearchParams(params).toString()
  const separator = base.includes('?') ? '&' : '?'
  return `${base}${separator}${query}`
}

function buildUniversalLink(config: AppConfig, params?: Record<string, string>): string {
  const base = `${SITE.appBaseUrl}${config.universalPath}`
  if (!params || Object.keys(params).length === 0) return base

  const query = new URLSearchParams(params).toString()
  return `${base}?${query}`
}

function buildAndroidIntentUrl(
  config: AppConfig,
  params: Record<string, string> | undefined,
  storeUrl: string,
): string {
  const path = config.androidDeepLink.replace(/^kuberone:\/\//, '').replace(/^kuberfinserve:\/\//, '')
  const query = params ? new URLSearchParams(params).toString() : ''
  const intentPath = query ? `${path}?${query}` : path

  return (
    `intent://${intentPath}#Intent;` +
    `scheme=${config.androidDeepLink.split('://')[0]};` +
    `package=${config.androidPackage};` +
    `S.browser_fallback_url=${encodeURIComponent(storeUrl)};` +
    'end'
  )
}

function navigateWithStoreFallback(primaryUrl: string, storeUrl: string): void {
  const start = Date.now()
  let redirected = false

  const fallback = () => {
    if (redirected) return
    if (Date.now() - start < 2200) {
      redirected = true
      window.location.href = storeUrl
    }
  }

  const onVisibility = () => {
    if (document.hidden) redirected = true
  }

  document.addEventListener('visibilitychange', onVisibility, { once: true })
  window.addEventListener(
    'pagehide',
    () => {
      redirected = true
    },
    { once: true },
  )

  window.setTimeout(fallback, 2500)
  window.location.href = primaryUrl
}

/**
 * Opens partner (KuberOne) or customer app via universal link → custom scheme → store.
 */
export function openMobileApp(
  target: AppTarget = 'partner',
  params?: Record<string, string>,
): void {
  const platform =
    params?.platform === 'ios' || params?.platform === 'android'
      ? params.platform
      : detectPlatform()

  const { platform: platformKey, ...restParams } = params ?? {}
  const linkParams = restParams
  void platformKey
  const config = getAppConfig(target)
  const storeUrl = platform === 'ios' ? config.iosStoreUrl : config.androidStoreUrl
  const universalLink = buildUniversalLink(config, linkParams)

  if (platform === 'android') {
    const intentUrl = buildAndroidIntentUrl(config, linkParams, storeUrl)
    navigateWithStoreFallback(intentUrl, storeUrl)
    return
  }

  // iOS: universal link first (works when app is installed via Associated Domains)
  navigateWithStoreFallback(universalLink, storeUrl)

  // Custom scheme fallback after brief delay if still visible
  window.setTimeout(() => {
    if (!document.hidden) {
      const scheme = buildCustomSchemeLink(platform, config, linkParams)
      window.location.href = scheme
    }
  }, 600)
}

/** @deprecated Use openMobileApp('partner', params) */
export function openPartnerApp(params?: Record<string, string>): void {
  openMobileApp('partner', params)
}

export function openCustomerApp(params?: Record<string, string>): void {
  openMobileApp('customer', params)
}

export function getPartnerAppDownloadUrl(platform: AppPlatform): string {
  return platform === 'ios' ? SITE.partnerApp.iosStoreUrl : SITE.partnerApp.androidStoreUrl
}

export function getCustomerAppDownloadUrl(platform: AppPlatform): string {
  return platform === 'ios' ? SITE.customerApp.iosStoreUrl : SITE.customerApp.androidStoreUrl
}

/** Opens Play Store / App Store for the given app target. */
export function downloadMobileApp(target: AppTarget, platform?: AppPlatform): void {
  const p = platform ?? detectPlatform()
  const url =
    target === 'partner' ? getPartnerAppDownloadUrl(p) : getCustomerAppDownloadUrl(p)
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function buildAppUniversalUrl(target: AppTarget, params?: Record<string, string>): string {
  return buildUniversalLink(getAppConfig(target), params)
}
