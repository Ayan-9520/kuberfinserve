const PARTNER_TOKEN_KEY = 'kuberfinserve_partner_token'
const PARTNER_REFRESH_KEY = 'kuberfinserve_partner_refresh_token'
const PARTNER_PROFILE_KEY = 'kuberfinserve_partner_profile'

export interface StoredPartnerProfile {
  id: number
  partner_id: string | null
  full_name: string
  email: string
  phone: string
  status: string
}

export function savePartnerSession(
  token: string,
  partner: StoredPartnerProfile,
  refreshToken?: string | null,
): void {
  localStorage.setItem(PARTNER_TOKEN_KEY, token)
  localStorage.setItem(PARTNER_PROFILE_KEY, JSON.stringify(partner))
  if (refreshToken) {
    localStorage.setItem(PARTNER_REFRESH_KEY, refreshToken)
  }
}

export function getPartnerToken(): string | null {
  try {
    return localStorage.getItem(PARTNER_TOKEN_KEY)
  } catch {
    return null
  }
}

export function getPartnerRefreshToken(): string | null {
  try {
    return localStorage.getItem(PARTNER_REFRESH_KEY)
  } catch {
    return null
  }
}

export function getPartnerProfile(): StoredPartnerProfile | null {
  try {
    const raw = localStorage.getItem(PARTNER_PROFILE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as StoredPartnerProfile
  } catch {
    return null
  }
}

export function clearPartnerSession(): void {
  localStorage.removeItem(PARTNER_TOKEN_KEY)
  localStorage.removeItem(PARTNER_REFRESH_KEY)
  localStorage.removeItem(PARTNER_PROFILE_KEY)
}

/** True when website has a saved partner session (redirect to portal without OTP). */
export function hasPartnerSession(): boolean {
  const token = getPartnerToken()
  const profile = getPartnerProfile()
  return Boolean(token && profile?.partner_id)
}
