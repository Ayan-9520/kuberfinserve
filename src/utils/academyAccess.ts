import { SITE } from '@/data/site'
import { openMobileApp } from '@/utils/partnerApp'

/** Partner must log in (DSA / KuberOne) — Academy dashboard lives in the app, not the website. */
export const ACADEMY_LOGIN_PATH = `${SITE.partnerLoginUrl}?intent=academy`

export function getAcademyLoginPath(extra?: Record<string, string>): string {
  const params = new URLSearchParams({ intent: 'academy', ...extra })
  return `${SITE.partnerLoginUrl}?${params.toString()}`
}

/** Open KuberOne DSA app directly on Academy (store fallback if not installed). */
export function openAcademyInPartnerApp(extra?: Record<string, string>): void {
  openMobileApp('partner', {
    screen: 'academy',
    ...extra,
  })
}
