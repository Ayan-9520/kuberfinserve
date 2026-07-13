import type { FormPayload } from '@/utils/submitFormEmail'

export interface SubmitLeadApiOptions {
  formType: string
  source: string
  data: FormPayload
}

function getLeadApiUrl(): string {
  const base = (import.meta.env.VITE_LEAD_API_URL as string | undefined)?.replace(/\/$/, '')
  if (base) return `${base}/api/save-lead.php`
  // Dev: Vite proxies to local lead-api.mjs (server/data/leads.json)
  if (import.meta.env.DEV) return '/api/save-lead.php'
  return '/api/save-lead.php'
}

/** Save lead to Hostinger MySQL via PHP + send emails */
export async function submitLeadToServer(
  options: SubmitLeadApiOptions,
): Promise<{
  ok: boolean
  error?: string
  id?: number
  duplicate?: boolean
  message?: string
  emailsSent?: boolean
  emails?: { admin?: boolean; user?: boolean }
  warning?: string
}> {
  const useApi = import.meta.env.VITE_USE_LEAD_API !== 'false'

  if (!useApi) {
    return { ok: false, error: 'Lead API disabled' }
  }

  try {
    const res = await fetch(getLeadApiUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        form_type: options.formType,
        source: options.source,
        fields: options.data,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
      }),
    })

    const rawText = await res.text()
    const cleaned = rawText.trim().replace(/^\uFEFF/, '')

    let json: {
      ok?: boolean
      error?: string
      warning?: string
      message?: string
      duplicate?: boolean
      id?: number
      saved?: string
      emails?: { admin?: boolean; user?: boolean }
    } = {}
    try {
      json = JSON.parse(cleaned) as typeof json
    } catch {
      return {
        ok: false,
        error:
          cleaned.startsWith('<') || cleaned.includes('<!DOCTYPE')
            ? 'API not found. Upload public_html/api/ folder (save-lead.php + config.php).'
            : 'Server response invalid. Re-upload api/save-lead.php (no spaces before <?php).',
      }
    }

    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error || 'Could not save your application.' }
    }

    const emails = json.emails
    const emailsSent = Boolean(emails?.admin && emails?.user)

    return {
      ok: true,
      id: json.id,
      duplicate: Boolean(json.duplicate),
      message: json.message,
      emailsSent,
      emails,
      warning: json.warning,
    }
  } catch {
    return {
      ok: false,
      error: 'Network error. Check internet or try again later.',
    }
  }
}
