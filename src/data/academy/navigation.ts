import type { AcademyNavItem } from './types'

/** Canonical public entry — Academy is a section of Become Partner */
export const ACADEMY_BASE = '/become-partner#academy'
/** Academy LMS opens in KuberOne DSA app after Partner Login — not on the website. */
export const ACADEMY_LOGIN_PATH = '/partner-login?intent=academy'
/** @deprecated Website app routes removed — redirects to Partner Login */
export const ACADEMY_APP = ACADEMY_LOGIN_PATH

/** Website no longer hosts LMS nav — kept empty for legacy imports */
export const ACADEMY_NAV: AcademyNavItem[] = []

export const ACADEMY_SEO = {
  title: 'Partner Academy | Build Your Financial Business | KuberFinserve',
  description:
    'Kuber Academy is part of the Partner journey. Preview the roadmap on Become Partner, then login to KuberOne for courses, certifications, leaderboards and business growth paths.',
  keywords:
    'Kuber Academy, financial partner training, financial entrepreneur, KuberOne Academy, loan product training, partner certification, business growth',
}
