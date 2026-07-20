import type { PartnerApplyFormData } from '@/utils/leads'

export interface PartnerRegistrationResult {
  ok: boolean
  error?: string
  id?: number
  status?: string
  message?: string
  warning?: string
}

export interface PartnerLoginResult {
  ok: boolean
  error?: string
  token?: string
  partner?: {
    id: number
    partner_id: string | null
    full_name: string
    email: string
    phone: string
    city: string | null
    state: string | null
    business_type: string | null
    status: string
    created_at: string
  }
  must_change_password?: boolean
  otp_sent?: boolean
  message?: string
}

function getPartnerApiBase(): string {
  const base = (import.meta.env.VITE_LEAD_API_URL as string | undefined)?.replace(/\/$/, '')
  if (base) return base
  return ''
}

function partnerUrl(path: string): string {
  return `${getPartnerApiBase()}${path}`
}

async function parseApiResponse(res: Response): Promise<Record<string, unknown>> {
  const rawText = await res.text()
  const cleaned = rawText.trim().replace(/^\uFEFF/, '')
  try {
    return JSON.parse(cleaned) as Record<string, unknown>
  } catch {
    const invalid =
      cleaned.startsWith('<') || cleaned.includes('<!DOCTYPE')
        ? 'Partner API not found. Upload public_html/api/ (save-partner.php, partner-login.php).'
        : 'Invalid server response.'
    return { ok: false, error: invalid }
  }
}

export async function registerPartnerApplication(
  data: PartnerApplyFormData,
  source: string,
): Promise<PartnerRegistrationResult> {
  if (import.meta.env.VITE_USE_LEAD_API === 'false') {
    return { ok: false, error: 'Partner API disabled' }
  }

  try {
    const res = await fetch(partnerUrl('/api/save-partner.php'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        source,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        fields: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          city: data.city,
          state: data.state,
          company_name: data.companyName,
          business_type: data.businessType,
          experience: data.experience,
          message: data.message,
        },
      }),
    })

    const json = await parseApiResponse(res)
    if (!res.ok || !json.ok) {
      return { ok: false, error: (json.error as string) || 'Could not submit partner application.' }
    }

    return {
      ok: true,
      id: json.id as number | undefined,
      status: (json.application_status as string | undefined) || (json.status as string | undefined),
      message: json.message as string | undefined,
      warning:
        json.kuberone &&
        typeof json.kuberone === 'object' &&
        (json.kuberone as { synced?: boolean; skipped?: boolean }).synced === false &&
        !(json.kuberone as { skipped?: boolean }).skipped
          ? 'Saved locally. Admin CRM sync pending — check KuberOne bridge.'
          : undefined,
    }
  } catch {
    return { ok: false, error: 'Network error. Check internet or try again later.' }
  }
}

export async function loginPartner(params: {
  identifier: string
  password?: string
  mode?: 'password' | 'otp' | 'otp_request'
  otp?: string
}): Promise<PartnerLoginResult> {
  if (import.meta.env.VITE_USE_LEAD_API === 'false') {
    return { ok: false, error: 'Partner API disabled' }
  }

  try {
    const res = await fetch(partnerUrl('/api/partner-login.php'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        identifier: params.identifier.trim(),
        password: params.password,
        mode: params.mode ?? 'password',
        otp: params.otp,
      }),
    })

    const json = await parseApiResponse(res)
    if (!res.ok || !json.ok) {
      return { ok: false, error: (json.error as string) || 'Login failed.' }
    }

    return {
      ok: true,
      token: json.token as string | undefined,
      partner: json.partner as PartnerLoginResult['partner'],
      must_change_password: json.must_change_password as boolean | undefined,
      otp_sent: json.otp_sent as boolean | undefined,
      message: json.message as string | undefined,
    }
  } catch {
    return { ok: false, error: 'Network error. Check internet or try again later.' }
  }
}
