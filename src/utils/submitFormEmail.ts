import { SITE } from '@/data/site'

export type FormPayload = Record<string, string | number | boolean | undefined | null>

export interface SubmitFormOptions {
  formType: string
  source: string
  data: FormPayload
  replyTo?: string
  /** Customer inbox — confirmation email (requires SMTP) */
  userEmail?: string
  userName?: string
  /** Skip admin email — use when save-lead already notified the team */
  userConfirmationOnly?: boolean
}

const SETUP_HINT =
  'Configure SMTP for customer emails (.env locally / api/config.php on live). See SETUP-EMAIL.md.'

function getSmtpApiUrl(): string {
  const base = (import.meta.env.VITE_LEAD_API_URL as string | undefined)?.replace(/\/$/, '')
  const endpoint = '/api/send-lead.php'
  return base ? `${base}${endpoint}` : endpoint
}

function formatValue(value: FormPayload[string]): string {
  if (value === undefined || value === null || value === '') return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

function buildEmailBody({ formType, source, data }: SubmitFormOptions): Record<string, string> {
  const rows: Record<string, string> = {
    form_type: formType,
    source,
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    website: SITE.name,
  }

  for (const [key, value] of Object.entries(data)) {
    if (key === 'agreeTerms' || key.startsWith('_')) continue
    const label = key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').trim()
    rows[label || key] = formatValue(value)
  }

  return rows
}

function buildPlainMessage(body: Record<string, string>): string {
  return Object.entries(body)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
}

function resolveReplyTo(options: SubmitFormOptions, body: Record<string, string>): string | undefined {
  if (options.replyTo) return options.replyTo
  const fromData = options.data.email
  if (typeof fromData === 'string' && fromData.includes('@')) return fromData
  if (body.email && body.email !== '—') return body.email
  return undefined
}

async function submitViaWeb3Forms(
  accessKey: string,
  options: SubmitFormOptions,
): Promise<{ ok: boolean; error?: string }> {
  const body = buildEmailBody(options)
  const message = buildPlainMessage(body)
  const replyTo = resolveReplyTo(options, body)

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New ${options.formType} — ${SITE.name}`,
      from_name: SITE.name,
      to: SITE.leadsEmail,
      replyto: replyTo || SITE.email,
      message,
      ...body,
    }),
  })

  try {
    const json = (await res.json()) as { success?: boolean; message?: string }
    if (!res.ok || !json.success) {
      return { ok: false, error: json.message || 'Email service rejected the request.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Invalid response from email service.' }
  }
}

async function submitViaSmtpApi(
  options: SubmitFormOptions,
): Promise<{ ok: boolean; error?: string; userEmailSent?: boolean }> {
  const body = buildEmailBody(options)
  const message = buildPlainMessage(body)
  const replyTo = resolveReplyTo(options, body)

  const url = getSmtpApiUrl()

  const userEmail = options.userEmail || resolveReplyTo(options, body)

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      subject: `New ${options.formType} — ${SITE.name}`,
      message,
      replyTo,
      userEmail,
      userConfirmationOnly: options.userConfirmationOnly === true,
      userName:
        options.userName ||
        (typeof options.data.full_name === 'string' ? options.data.full_name : undefined) ||
        (typeof options.data.name === 'string' ? options.data.name : undefined),
      fields: body,
    }),
  })

  try {
    const json = (await res.json()) as {
      ok?: boolean
      error?: string
      emails?: { admin?: boolean; user?: boolean }
    }
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error || 'Could not send via SMTP API.' }
    }
    const userSent = options.userConfirmationOnly
      ? Boolean(json.emails?.user)
      : Boolean(json.emails?.user)
    return { ok: true, userEmailSent: userSent }
  } catch {
    return { ok: false, error: 'Email server not reachable.' }
  }
}

async function submitViaPhpMail(options: SubmitFormOptions): Promise<{ ok: boolean; error?: string }> {
  const body = buildEmailBody(options)
  const message = buildPlainMessage(body)
  const replyTo = resolveReplyTo(options, body)

  const res = await fetch('/api/send-lead.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      subject: `New ${options.formType} — ${SITE.name}`,
      message,
      replyTo,
    }),
  })

  try {
    const json = (await res.json()) as { ok?: boolean; error?: string }
    if (!res.ok || !json.ok) {
      return { ok: false, error: json.error || 'PHP mail failed.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'PHP mail endpoint not available.' }
  }
}

/** Sends admin lead + customer confirmation (SMTP) or Web3Forms admin-only */
export async function submitFormEmail(
  options: SubmitFormOptions,
): Promise<{ ok: boolean; error?: string; userEmailSent?: boolean }> {
  const accessKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined)?.trim()
  const useSmtpApi = import.meta.env.VITE_USE_SMTP_API === 'true'
  const tryPhp = import.meta.env.PROD && import.meta.env.VITE_TRY_PHP_MAIL !== 'false'
  const trySmtpInDev = import.meta.env.DEV

  const sendSmtp = async (userConfirmationOnly = false) => {
    const result = await submitViaSmtpApi({ ...options, userConfirmationOnly })
    if (result.ok) {
      return { ok: true, userEmailSent: Boolean(result.userEmailSent ?? options.userEmail) }
    }
    return result
  }

  try {
    if (options.userConfirmationOnly) {
      return sendSmtp(true)
    }

    if (useSmtpApi || trySmtpInDev) {
      const smtpResult = await sendSmtp(false)
      if (smtpResult.ok) return smtpResult
      if (useSmtpApi) return smtpResult
    }

    if (accessKey) {
      const result = await submitViaWeb3Forms(accessKey, options)
      if (result.ok) {
        const userConfirm = await sendSmtp(true)
        if (userConfirm.ok) return { ok: true, userEmailSent: true }
        return {
          ok: true,
          userEmailSent: false,
          error: 'Lead saved for team; add SMTP in .env for customer confirmation emails.',
        }
      }
      return result
    }

    if (tryPhp) {
      const phpResult = await submitViaPhpMail(options)
      if (phpResult.ok) return phpResult
    }

    return { ok: false, error: SETUP_HINT }
  } catch {
    return {
      ok: false,
      error: 'Network error. Check connection or call us on the phone number shown on the site.',
    }
  }
}
