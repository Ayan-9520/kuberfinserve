const PARTNER_REF_KEY = 'kuberfinserve_partner_ref'

/** Read ?partner= or ?ref= from URL and persist for lead attribution. */
export function capturePartnerReferralFromUrl(): string | null {
  if (typeof window === 'undefined') return getStoredPartnerReferral()

  const params = new URLSearchParams(window.location.search)
  const ref = params.get('partner') || params.get('ref') || params.get('partner_id')
  if (ref && /^KF\d{9}$/i.test(ref.trim())) {
    const normalized = ref.trim().toUpperCase()
    try {
      sessionStorage.setItem(PARTNER_REF_KEY, normalized)
    } catch {
      // ignore
    }
    return normalized
  }

  return getStoredPartnerReferral()
}

export function getStoredPartnerReferral(): string | null {
  try {
    const stored = sessionStorage.getItem(PARTNER_REF_KEY)
    return stored && /^KF\d{9}$/i.test(stored) ? stored.toUpperCase() : null
  } catch {
    return null
  }
}

export function clearPartnerReferral(): void {
  try {
    sessionStorage.removeItem(PARTNER_REF_KEY)
  } catch {
    // ignore
  }
}
