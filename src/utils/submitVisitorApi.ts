export interface SubmitVisitorOptions {
  city: string
  name?: string
  phone?: string
  email?: string
  sessionId?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  externalVisitorId?: string
}

function getVisitorApiUrl(): string {
  const base = (import.meta.env.VITE_LEAD_API_URL as string | undefined)?.replace(/\/$/, '')
  if (base) return `${base}/api/save-visitor.php`
  if (import.meta.env.DEV) return '/api/save-visitor.php'
  return '/api/save-visitor.php'
}

function getOrCreateExternalId(): string {
  const key = 'kf_visitor_external_id'
  try {
    const existing = localStorage.getItem(key)
    if (existing) return existing
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `vis_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    localStorage.setItem(key, id)
    return id
  } catch {
    return `vis_${Date.now()}`
  }
}

/** Save visitor interest via website API (never call KuberOne from browser). */
export async function submitVisitorInterest(
  options: SubmitVisitorOptions,
): Promise<{ ok: boolean; error?: string; id?: string | number; duplicate?: boolean }> {
  try {
    const res = await fetch(getVisitorApiUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        city: options.city,
        name: options.name,
        phone: options.phone,
        email: options.email,
        session_id: options.sessionId,
        external_visitor_id: options.externalVisitorId || getOrCreateExternalId(),
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: options.referrer,
        utm_source: options.utmSource,
        utm_medium: options.utmMedium,
        utm_campaign: options.utmCampaign,
      }),
    })

    const rawText = await res.text()
    const cleaned = rawText.trim().replace(/^\uFEFF/, '')
    let json: { ok?: boolean; error?: string; id?: string | number; duplicate?: boolean } = {}
    try {
      json = JSON.parse(cleaned) as typeof json
    } catch {
      return { ok: false, error: 'Server response invalid. Please try again.' }
    }

    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error || 'Could not save your details.' }
    }

    return { ok: true, id: json.id, duplicate: Boolean(json.duplicate) }
  } catch {
    return { ok: false, error: 'Network error. Check internet or try again later.' }
  }
}
