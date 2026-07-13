const PARTNER_TOKEN_KEY = 'kuberfinserve_partner_token'
const PARTNER_PROFILE_KEY = 'kuberfinserve_partner_profile'

export interface StoredPartnerProfile {
  id: number
  partner_id: string | null
  full_name: string
  email: string
  phone: string
  status: string
}

export function savePartnerSession(token: string, partner: StoredPartnerProfile): void {
  localStorage.setItem(PARTNER_TOKEN_KEY, token)
  localStorage.setItem(PARTNER_PROFILE_KEY, JSON.stringify(partner))
}

export function getPartnerToken(): string | null {
  try {
    return localStorage.getItem(PARTNER_TOKEN_KEY)
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
  localStorage.removeItem(PARTNER_PROFILE_KEY)
}
