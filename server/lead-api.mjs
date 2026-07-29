/**
 * Local dev API — mirrors Hostinger save-lead.php + send-lead.php
 * Run via: npm run dev
 */
import http from 'node:http'
import nodemailer from 'nodemailer'
import crypto from 'node:crypto'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const port = Number(process.env.LEAD_API_PORT || 8787)
const dataDir = resolve(__dirname, 'data')
const leadsFile = resolve(dataDir, 'leads.json')
const partnersFile = resolve(dataDir, 'partners.json')
const visitorsFile = resolve(dataDir, 'visitors.json')
const partnerAuditFile = resolve(dataDir, 'partner-audit.json')
const jwtSecret = process.env.JWT_SECRET || 'dev-partner-jwt-secret-change-in-production'
const mobileApiKey = process.env.MOBILE_API_KEY || 'dev-mobile-api-key'
const LEAD_DEDUP_HOURS = 24

function loadEnvFile() {
  for (const name of ['.env', '.env.local']) {
    const p = resolve(root, name)
    if (!existsSync(p)) continue
    for (const line of readFileSync(p, 'utf8').split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const i = t.indexOf('=')
      if (i < 1) continue
      const key = t.slice(0, i).trim()
      const val = t.slice(i + 1).trim().replace(/^["']|["']$/g, '')
      // Always apply KuberOne bridge keys from .env so local Admin sync cannot stay stuck OFF
      if (key.startsWith('KUBERONE_') || !process.env[key]) process.env[key] = val
    }
  }
}

loadEnvFile()

const kuberoneApiBase = (process.env.KUBERONE_API_BASE || '').replace(/\/$/, '')
const kuberoneApiKey = process.env.KUBERONE_API_KEY || ''
const kuberoneBridgeEnabled = process.env.KUBERONE_BRIDGE_ENABLED === 'true'
const kuberonePartnerAuthEnabled =
  process.env.KUBERONE_PARTNER_AUTH_ENABLED === 'true' ||
  (kuberoneBridgeEnabled && process.env.KUBERONE_PARTNER_AUTH_ENABLED !== 'false')

const leadsTo = process.env.LEADS_TO || process.env.VITE_LEADS_TO || 'loanleads@kuberfinserve.com'
const siteName = process.env.VITE_SITE_NAME || 'KuberFinserve'
const sitePhone = process.env.VITE_SITE_PHONE || '+91 7982953129'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

let transporter = null
if (smtpUser && smtpPass) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: smtpUser, pass: smtpPass },
  })
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Mobile-Api-Key')
}

function json(res, code, data) {
  cors(res)
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(data))
}

function normalizePhone(phone) {
  if (!phone) return null
  let digits = String(phone).replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  if (digits.length !== 10 || !/^[6-9]\d{9}$/.test(digits)) return null
  return digits
}

async function syncKuberone(path, payload) {
  if (!kuberoneBridgeEnabled || !kuberoneApiBase) {
    return { ok: true, skipped: true }
  }
  try {
    // Zod rejects null; strip null/undefined from nested fields
    const clean = JSON.parse(
      JSON.stringify(payload, (_k, v) => (v === null || v === undefined || v === '' ? undefined : v)),
    )
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    if (kuberoneApiKey) headers['X-Website-Api-Key'] = kuberoneApiKey
    const res = await fetch(`${kuberoneApiBase}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(clean),
      signal: AbortSignal.timeout(8000),
    })
    const body = await res.json().catch(() => ({}))
    if (!res.ok) {
      console.error('[kuberone-bridge]', path, res.status, body)
      const errMsg =
        (typeof body?.error === 'string' && body.error) ||
        body?.error?.message ||
        body?.message ||
        `HTTP ${res.status}`
      return {
        ok: false,
        status: res.status,
        error: errMsg,
        details: body?.error?.details ?? body?.error ?? null,
      }
    }
    return { ok: true, status: res.status, body }
  } catch (err) {
    console.error('[kuberone-bridge]', path, err.message)
    return { ok: false, error: err.message }
  }
}

function str(value, max = 500) {
  if (value === undefined || value === null || value === '') return null
  const s = String(value).trim()
  if (!s) return null
  return s.length > max ? s.slice(0, max) : s
}

function readLeads() {
  if (!existsSync(leadsFile)) return []
  try {
    return JSON.parse(readFileSync(leadsFile, 'utf8'))
  } catch {
    return []
  }
}

function writeLeads(leads) {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
  writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf8')
}

function mapFields(payload) {
  const fields = payload.fields && typeof payload.fields === 'object' ? payload.fields : payload

  const known = new Set([
    'form_type', 'formType', 'source', 'fields', '_gotcha', 'website',
    'full_name', 'fullName', 'name', 'phone', 'email', 'city', 'age',
    'employment_type', 'employmentType', 'company_name', 'companyName',
    'monthly_income', 'monthlyIncome', 'work_experience', 'workExperience',
    'loan_type', 'loanType', 'loan_amount', 'loanAmount', 'tenure_months', 'tenureMonths',
    'existing_emi', 'existingEmi', 'purpose', 'pan', 'message', 'page_url', 'pageUrl',
    'agreeTerms', 'lead_id', 'external_lead_id', 'form_variant', 'crm_channel', 'property_value',
    'partner_id', 'idempotency_key', 'channel',
  ])

  const extra = {}
  for (const [key, value] of Object.entries(fields)) {
    if (known.has(key) || value === null || value === '' || key === 'agreeTerms') continue
    extra[key] = typeof value === 'object' ? JSON.stringify(value) : String(value)
  }

  return {
    form_type: str(payload.form_type || payload.formType, 80) || 'Lead',
    source: str(payload.source, 120),
    crm_channel: str(payload.crm_channel || fields.crm_channel || payload.channel, 40) || 'website',
    partner_id: str(fields.partner_id || fields.partnerId || payload.partner_id, 20)?.toUpperCase() ?? null,
    external_lead_id: str(fields.external_lead_id || fields.lead_id || payload.external_lead_id, 32),
    form_variant: str(fields.form_variant || payload.form_variant, 80),
    idempotency_key: str(payload.idempotency_key || fields.idempotency_key, 64),
    full_name: str(fields.full_name || fields.fullName || fields.name, 150),
    phone: normalizePhone(fields.phone),
    email: str(fields.email, 150),
    city: str(fields.city, 100),
    age: str(fields.age, 20),
    employment_type: str(fields.employment_type || fields.employmentType, 80),
    company_name: str(fields.company_name || fields.companyName, 150),
    monthly_income: str(fields.monthly_income || fields.monthlyIncome, 80),
    work_experience: str(fields.work_experience || fields.workExperience, 80),
    loan_type: str(fields.loan_type || fields.loanType, 120),
    loan_amount: str(fields.loan_amount || fields.loanAmount, 50),
    tenure_months: str(fields.tenure_months || fields.tenureMonths, 30),
    existing_emi: str(fields.existing_emi || fields.existingEmi, 50),
    purpose: str(fields.purpose, 120),
    pan: str(fields.pan, 20),
    property_value: str(fields.property_value || fields.propertyValue, 50),
    message: str(fields.message, 5000),
    page_url: str(payload.page_url || fields.page_url || fields.pageUrl, 500),
    extra_data: Object.keys(extra).length ? extra : null,
  }
}

function buildAdminEmailText(lead, leadId) {
  const lines = [
    `New ${lead.form_type} — ${lead.full_name || 'Applicant'} (#${leadId})`,
    '',
    `Source: ${lead.source || '—'}`,
    `Name: ${lead.full_name || '—'}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `City: ${lead.city || '—'}`,
    `Employment: ${lead.employment_type || '—'}`,
    `Company: ${lead.company_name || '—'}`,
    `Income: ${lead.monthly_income || '—'}`,
    `Experience: ${lead.work_experience || '—'}`,
    `Loan type: ${lead.loan_type || '—'}`,
    `Amount: ${lead.loan_amount || '—'}`,
    `Tenure: ${lead.tenure_months || '—'}`,
    `Message: ${lead.message || '—'}`,
    `Page: ${lead.page_url || '—'}`,
  ]
  if (lead.extra_data) {
    lines.push('', 'Extra:', JSON.stringify(lead.extra_data, null, 2))
  }
  lines.push('', `Saved at: ${lead.created_at}`, '[DEV] Stored in server/data/leads.json')
  return lines.join('\n')
}

function buildUserConfirmationText(lead) {
  const name = lead.full_name || 'Customer'
  const loan = lead.loan_type || 'your enquiry'
  let text = `Dear ${name},\n\n`
  text += `Thank you for contacting ${siteName}.\n\n`
  text += `We have received your application for: ${loan}.\n`
  text += 'Our team will review your details and contact you within 24 working hours.\n\n'
  text += 'Summary:\n'
  text += `- Phone: ${lead.phone}\n`
  text += `- Email: ${lead.email}\n`
  if (lead.loan_amount) text += `- Loan amount: ${lead.loan_amount}\n`
  text += `\nFor urgent queries, call us at ${sitePhone}.\n\n`
  text += `Regards,\n${siteName} Team\n${leadsTo}\n`
  return text
}

async function sendEmails(lead, leadId, { adminOnly = false, userOnly = false } = {}) {
  const results = { admin: false, user: false }
  if (!transporter) return results

  const from = process.env.SMTP_FROM || smtpUser

  try {
    if (!userOnly) {
      await transporter.sendMail({
        from: `${siteName} <${from}>`,
        to: leadsTo,
        replyTo: lead.email,
        subject: `New ${lead.form_type} — ${lead.full_name || 'Lead'} (#${leadId})`,
        text: buildAdminEmailText(lead, leadId),
      })
      results.admin = true
    }

    if (!adminOnly && lead.email?.includes('@')) {
      await transporter.sendMail({
        from: `${siteName} <${from}>`,
        to: lead.email,
        replyTo: leadsTo,
        subject: `We received your application — ${siteName}`,
        text: buildUserConfirmationText(lead),
      })
      results.user = true
    }
  } catch (err) {
    console.error('[lead-api] email error:', err.message)
  }

  return results
}

function readJsonFile(file, fallback = []) {
  if (!existsSync(file)) return fallback
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

function writeJsonFile(file, data) {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
  writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `scrypt:${salt}:${hash}`
}

function verifyPassword(password, stored) {
  if (!stored) return false
  const parts = stored.split(':')
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false
  const [, salt, hash] = parts
  const verify = crypto.scryptSync(password, salt, 64).toString('hex')
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verify, 'hex'))
}

function jwtEncode(payload, ttlSeconds = 72 * 3600) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const body = Buffer.from(
    JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + ttlSeconds }),
  ).toString('base64url')
  const sig = crypto.createHmac('sha256', jwtSecret).update(`${header}.${body}`).digest('base64url')
  return `${header}.${body}.${sig}`
}

function generatePartnerId(partners) {
  const year = new Date().getFullYear()
  const prefix = `KF${year}`
  const last = partners
    .map((p) => p.partner_id)
    .filter((id) => id && id.startsWith(prefix))
    .sort()
    .pop()
  let seq = 1
  if (last) {
    const m = last.match(/KF\d{4}(\d{5})$/)
    if (m) seq = Number(m[1]) + 1
  }
  return `${prefix}${String(seq).padStart(5, '0')}`
}

function generateTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  let pass = ''
  for (let i = 0; i < 10; i++) pass += chars[Math.floor(Math.random() * chars.length)]
  return pass
}

function logPartnerAudit(entry) {
  const audit = readJsonFile(partnerAuditFile)
  audit.unshift({
    id: audit.length > 0 ? Math.max(...audit.map((a) => a.id || 0)) + 1 : 1,
    created_at: new Date().toISOString(),
    ...entry,
  })
  writeJsonFile(partnerAuditFile, audit.slice(0, 500))
}

function findPartnerByIdentifier(partners, identifier) {
  const id = String(identifier).trim().toLowerCase()
  const phone = normalizePhone(identifier)
  return partners.find(
    (p) =>
      p.partner_id === identifier ||
      p.email?.toLowerCase() === id ||
      p.phone === phone ||
      p.phone === identifier,
  )
}

async function handleSavePartner(payload) {
  if (payload._gotcha || payload.website) {
    return { ok: true, id: 0, status: 'pending' }
  }

  const fields = payload.fields && typeof payload.fields === 'object' ? payload.fields : payload
  const fullName = str(fields.name || fields.full_name, 150)
  const phone = normalizePhone(fields.phone)
  const email = str(fields.email, 150)?.toLowerCase()
  const city = str(fields.city, 100)
  const state = str(fields.state, 100)
  const businessType = str(fields.business_type || fields.role, 80)

  if (!fullName) return { ok: false, error: 'Full name is required', status: 422 }
  if (!phone) return { ok: false, error: 'Valid 10-digit Indian mobile number required', status: 422 }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Valid email required', status: 422 }
  if (!city) return { ok: false, error: 'City is required', status: 422 }
  if (!state) return { ok: false, error: 'State is required', status: 422 }
  if (!businessType) return { ok: false, error: 'Business type is required', status: 422 }

  const partners = readJsonFile(partnersFile)
  const existing = partners.find((p) => p.phone === phone || p.email === email)
  if (existing) {
    if (existing.status === 'pending') {
      return { ok: false, error: 'An application with this email or mobile is already pending review.', status: 409 }
    }
    if (existing.status === 'approved') {
      return { ok: false, error: 'This email or mobile is already registered as an approved partner.', status: 409 }
    }
    return { ok: false, error: 'This email or mobile was used in a previous application. Please contact support.', status: 409 }
  }

  const partnerId = partners.length > 0 ? Math.max(...partners.map((p) => Number(p.id) || 0)) + 1 : 1
  const partner = {
    id: partnerId,
    partner_id: null,
    full_name: fullName,
    phone,
    email,
    city,
    state,
    company_name: str(fields.company_name || fields.companyName, 150),
    business_type: businessType,
    experience: str(fields.experience, 80),
    message: str(fields.message, 5000),
    password_hash: null,
    must_change_password: false,
    otp_hash: null,
    otp_expires_at: null,
    status: 'pending',
    source: str(payload.source, 120),
    page_url: str(payload.page_url, 500),
    created_at: new Date().toISOString(),
  }

  partners.unshift(partner)
  writeJsonFile(partnersFile, partners)
  logPartnerAudit({ partner_row_id: partnerId, action: 'registered', old_status: null, new_status: 'pending', performed_by: 'system' })

  console.log(`[partner-api] New partner application #${partnerId} — ${fullName}`)

  const kuberone = await syncKuberone('/api/v1/public/website/partners', {
    contactName: fullName,
    phone,
    email,
    businessName: partner.company_name || businessType || fullName,
    partnerTypeCode: 'DSA',
    city,
    state,
    businessType,
    experience: partner.experience || undefined,
    message: partner.message || undefined,
    pageUrl: partner.page_url || undefined,
    source: partner.source || 'website-become-partner',
  })

  const partnerCode = kuberone.body?.data?.partner?.partnerCode ?? null
  if (partnerCode) {
    partner.partner_id = partnerCode
    writeJsonFile(partnersFile, partners)
  }

  const synced = !!kuberone.ok && !kuberone.skipped
  const skipped = !!kuberone.skipped
  const duplicate = !!kuberone.body?.data?.duplicate

  // Bridge is required for Admin Partners list. Fail loudly so the form never shows false success.
  if (kuberoneBridgeEnabled && !synced && !skipped && !duplicate) {
    return {
      ok: false,
      status: 502,
      error:
        kuberone.error ||
        'Could not sync to Admin CRM. Ensure KuberOne backend is running on :4000 and try again.',
      id: partnerId,
      partner_code: partnerCode,
      kuberone: {
        synced: false,
        skipped: false,
        duplicate: false,
        partner_code: partnerCode,
        error: kuberone.error ?? null,
      },
    }
  }

  return {
    ok: true,
    id: partnerId,
    application_status: 'pending',
    message:
      'Application submitted successfully. Our team will contact you within 48 hours with next steps.',
    saved: 'local_json',
    partner_code: partnerCode,
    kuberone: {
      synced: synced || skipped || duplicate,
      skipped,
      duplicate,
      partner_code: partnerCode,
      error: kuberone.error ?? null,
    },
  }
}

function extractKuberoneError(body, fallback = 'KuberOne request failed') {
  if (!body) return fallback
  if (typeof body.error === 'string') return body.error
  if (body.error?.message) return body.error.message
  if (body.message) return body.message
  return fallback
}

async function handleKuberonePartnerAuth(payload) {
  const identifier = str(payload.identifier || payload.email || payload.partner_id, 150)
  const mode = str(payload.mode, 20) || 'otp_request'
  const otp = str(payload.otp, 10)

  if (!identifier) {
    return { ok: false, error: 'Mobile, email, or Partner Code is required', status: 422 }
  }
  if (!['otp_request', 'otp'].includes(mode)) {
    return { ok: false, error: 'Invalid login mode', status: 422 }
  }
  if (mode === 'otp' && !otp) {
    return { ok: false, error: 'OTP is required', status: 422 }
  }

  // Client-side style validation when identifier looks like a mobile
  const digitsOnly = String(identifier).replace(/\D/g, '')
  const looksLikeMobile =
    digitsOnly.length >= 10 &&
    !identifier.includes('@') &&
    !/^[A-Za-z]{2,}/.test(identifier.trim())
  if (looksLikeMobile) {
    const phone = normalizePhone(identifier)
    if (!phone) {
      return {
        ok: false,
        error: 'Mobile number must be a valid 10-digit Indian number starting with 6–9',
        status: 422,
      }
    }
  }

  const result = await syncKuberone('/api/v1/public/website/partner-auth', {
    mode,
    identifier,
    ...(otp ? { otp } : {}),
  })

  if (result.skipped) {
    return { ok: false, skipped: true, error: 'KuberOne partner auth not configured' }
  }
  if (!result.ok) {
    return {
      ok: false,
      error: result.error || extractKuberoneError(result.details, 'Login failed'),
      status: result.status || 401,
    }
  }

  const data = result.body?.data ?? {}
  if (mode === 'otp_request') {
    return {
      ok: true,
      otp_sent: true,
      message: data.message || 'OTP sent to your registered mobile number.',
      phone_hint: data.phone_hint,
      auth_via: 'kuberone',
    }
  }

  const token = data.accessToken || data.token
  if (!token) {
    return { ok: false, error: 'KuberOne login did not return a token', status: 502 }
  }

  return {
    ok: true,
    token,
    partner: data.partner,
    must_change_password: Boolean(data.must_change_password),
    auth_via: 'kuberone',
  }
}

async function handlePartnerLogin(payload) {
  const mode = str(payload.mode, 20) || 'password'

  if (kuberonePartnerAuthEnabled && (mode === 'otp_request' || mode === 'otp')) {
    const kAuth = await handleKuberonePartnerAuth(payload)
    if (!kAuth.skipped) return kAuth
  }

  const identifier = str(payload.identifier || payload.email || payload.partner_id, 150)
  const password = String(payload.password || '')
  const otp = str(payload.otp, 10)

  if (!identifier) return { ok: false, error: 'Mobile, email, or Partner Code is required', status: 422 }

  const partners = readJsonFile(partnersFile)
  const partner = findPartnerByIdentifier(partners, identifier)

  if (!partner) return { ok: false, error: 'Invalid credentials', status: 401 }

  if (partner.status !== 'approved') {
    const messages = {
      pending: 'Your partner application is pending approval. Our verification team will contact you soon.',
      rejected: 'Your partner application was not approved. Please contact support for details.',
      suspended: 'Your partner account has been suspended. Please contact support.',
    }
    logPartnerAudit({
      partner_row_id: partner.id,
      action: 'login_failed',
      old_status: partner.status,
      new_status: partner.status,
      performed_by: identifier,
      notes: 'Login blocked — status not approved',
    })
    return { ok: false, error: messages[partner.status] || 'You are not authorized to login.', status: 403 }
  }

  if (mode === 'otp_request') {
    const otpCode = String(Math.floor(100000 + Math.random() * 900000))
    partner.otp_hash = hashPassword(otpCode)
    partner.otp_expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString()
    writeJsonFile(partnersFile, partners)
    console.log(`[partner-api] OTP for ${partner.phone}: ${otpCode}`)
    return { ok: true, message: 'OTP sent to your registered mobile number.', otp_sent: true }
  }

  if (mode === 'otp') {
    if (!otp) return { ok: false, error: 'OTP is required', status: 422 }
    if (!partner.otp_hash || !partner.otp_expires_at || Date.parse(partner.otp_expires_at) < Date.now()) {
      return { ok: false, error: 'OTP expired. Please request a new one.', status: 401 }
    }
    if (!verifyPassword(otp, partner.otp_hash)) {
      logPartnerAudit({ partner_row_id: partner.id, action: 'login_failed', performed_by: identifier, notes: 'Invalid OTP' })
      return { ok: false, error: 'Invalid OTP', status: 401 }
    }
    partner.otp_hash = null
    partner.otp_expires_at = null
    writeJsonFile(partnersFile, partners)
    const token = jwtEncode({ sub: partner.partner_id, pid: partner.id, email: partner.email, name: partner.full_name, role: 'partner' })
    logPartnerAudit({ partner_row_id: partner.id, action: 'login_success', performed_by: identifier, notes: 'OTP login' })
    return {
      ok: true,
      token,
      partner: {
        id: partner.id,
        partner_id: partner.partner_id,
        full_name: partner.full_name,
        email: partner.email,
        phone: partner.phone,
        city: partner.city,
        state: partner.state,
        business_type: partner.business_type,
        status: partner.status,
        created_at: partner.created_at,
      },
      must_change_password: Boolean(partner.must_change_password),
    }
  }

  if (!password) return { ok: false, error: 'Password is required', status: 422 }
  if (!verifyPassword(password, partner.password_hash)) {
    logPartnerAudit({ partner_row_id: partner.id, action: 'login_failed', performed_by: identifier, notes: 'Invalid password' })
    return { ok: false, error: 'Invalid credentials', status: 401 }
  }

  const token = jwtEncode({ sub: partner.partner_id, pid: partner.id, email: partner.email, name: partner.full_name, role: 'partner' })
  logPartnerAudit({ partner_row_id: partner.id, action: 'login_success', performed_by: identifier, notes: 'Password login' })
  return {
    ok: true,
    token,
    partner: {
      id: partner.id,
      partner_id: partner.partner_id,
      full_name: partner.full_name,
      email: partner.email,
      phone: partner.phone,
      city: partner.city,
      state: partner.state,
      business_type: partner.business_type,
      status: partner.status,
      created_at: partner.created_at,
    },
    must_change_password: Boolean(partner.must_change_password),
  }
}

/** Dev-only: approve partner via query for testing — POST /api/dev/approve-partner */
async function handleDevApprovePartner(payload) {
  const rowId = Number(payload.partner_row_id || payload.id)
  if (!rowId) return { ok: false, error: 'partner_row_id required', status: 422 }

  const partners = readJsonFile(partnersFile)
  const partner = partners.find((p) => p.id === rowId)
  if (!partner) return { ok: false, error: 'Partner not found', status: 404 }

  const tempPassword = generateTempPassword()
  partner.partner_id = partner.partner_id || generatePartnerId(partners)
  partner.password_hash = hashPassword(tempPassword)
  partner.must_change_password = true
  partner.status = 'approved'
  partner.approved_at = new Date().toISOString()
  writeJsonFile(partnersFile, partners)

  logPartnerAudit({
    partner_row_id: rowId,
    action: 'approved',
    old_status: 'pending',
    new_status: 'approved',
    performed_by: 'dev',
    notes: `Partner ID ${partner.partner_id}`,
  })

  console.log(`[partner-api] APPROVED #${rowId} — ID: ${partner.partner_id}, temp password: ${tempPassword}`)

  return {
    ok: true,
    partner_id: partner.partner_id,
    temp_password: tempPassword,
    message: 'Partner approved (dev). Credentials logged to console.',
  }
}

function findDuplicateLead(leads, lead) {
  if (lead.idempotency_key) {
    const byKey = leads.find((l) => l.idempotency_key === lead.idempotency_key)
    if (byKey) return byKey
  }
  if (lead.external_lead_id) {
    const byExt = leads.find((l) => l.external_lead_id === lead.external_lead_id)
    if (byExt) return byExt
  }
  if (lead.phone && lead.loan_type) {
    const cutoff = Date.now() - LEAD_DEDUP_HOURS * 3600 * 1000
    const byPhone = leads.find(
      (l) =>
        l.phone === lead.phone &&
        l.loan_type === lead.loan_type &&
        l.status === 'new' &&
        Date.parse(l.created_at) >= cutoff,
    )
    if (byPhone) return byPhone
  }
  return null
}

function resolvePartnerId(partnerId) {
  if (!partnerId) return null
  const partners = readJsonFile(partnersFile)
  const match = partners.find((p) => p.partner_id === partnerId && p.status === 'approved')
  return match ? match.partner_id : null
}

async function handleSaveLead(payload, defaultChannel = 'website') {
  if (payload._gotcha || payload.website) {
    return { ok: true, id: 0, saved: 'honeypot', emails: { admin: false, user: false } }
  }

  const lead = mapFields(payload)
  if (lead.crm_channel === 'website' && defaultChannel !== 'website') {
    lead.crm_channel = defaultChannel
  }
  lead.partner_id = resolvePartnerId(lead.partner_id)

  if (!lead.phone) {
    return { ok: false, error: 'Valid 10-digit Indian mobile number required', status: 422 }
  }
  if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return { ok: false, error: 'Valid email required', status: 422 }
  }

  const leads = readLeads()
  const existing = findDuplicateLead(leads, lead)
  const kuberonePayload = {
    form_type: lead.form_type,
    source: lead.source,
    page_url: lead.page_url,
    fields: {
      full_name: lead.full_name,
      phone: lead.phone,
      email: lead.email,
      city: lead.city,
      employment_type: lead.employment_type,
      company_name: lead.company_name,
      monthly_income: lead.monthly_income,
      loan_type: lead.loan_type,
      loan_amount: lead.loan_amount,
      tenure_months: lead.tenure_months,
      message: lead.message,
      external_lead_id: lead.external_lead_id,
      partner_id: lead.partner_id,
      crm_channel: lead.crm_channel,
    },
  }

  if (existing) {
    // Still dual-write so Admin gets the lead even if website CRM already saw it
    const kuberone = await syncKuberone('/api/v1/public/website/leads', kuberonePayload)
    return {
      ok: true,
      id: existing.id,
      duplicate: true,
      lead: {
        id: existing.id,
        external_lead_id: existing.external_lead_id,
        crm_channel: existing.crm_channel,
        partner_id: existing.partner_id,
        status: existing.status,
      },
      message: `We already have your application. Reference #${existing.id}`,
      saved: 'local_json',
      kuberone: {
        synced: !!kuberone.ok && !kuberone.skipped,
        skipped: !!kuberone.skipped,
        lead_number: kuberone.body?.data?.lead?.leadNumber ?? null,
        error: kuberone.error ?? null,
      },
    }
  }

  const leadId = leads.length > 0 ? Math.max(...leads.map((l) => Number(l.id) || 0)) + 1 : 1
  lead.id = leadId
  lead.created_at = new Date().toISOString()
  lead.status = 'new'

  leads.unshift(lead)
  writeLeads(leads.slice(0, 500))

  const emails = await sendEmails(lead, leadId)

  const kuberone = await syncKuberone('/api/v1/public/website/leads', kuberonePayload)

  return {
    ok: true,
    id: leadId,
    duplicate: false,
    lead: {
      id: leadId,
      external_lead_id: lead.external_lead_id,
      crm_channel: lead.crm_channel,
      partner_id: lead.partner_id,
      status: lead.status,
    },
    saved: 'local_json',
    emails,
    kuberone: {
      synced: !!kuberone.ok && !kuberone.skipped,
      skipped: !!kuberone.skipped,
      lead_number: kuberone.body?.data?.lead?.leadNumber ?? null,
      error: kuberone.error ?? null,
    },
    ...(transporter
      ? {}
      : {
          warning:
            'Lead saved locally. Add SMTP_USER and SMTP_PASS to .env for email delivery (see SETUP-EMAIL.md).',
        }),
  }
}

async function handleSendLead(payload) {
  if (!transporter) {
    return {
      ok: false,
      error: 'SMTP not configured. Add SMTP_USER and SMTP_PASS to .env (see SETUP-EMAIL.md).',
      status: 503,
    }
  }

  const userOnly = payload.userConfirmationOnly === true
  const fields = payload.fields || payload
  const lead = {
    full_name:
      payload.userName || fields.full_name || fields.fullName || fields.name || 'Customer',
    email: payload.userEmail || fields.email,
    phone: normalizePhone(fields.phone) || fields.phone,
    loan_type: fields.loan_type || fields.loanType,
    loan_amount: fields.loan_amount || fields.loanAmount,
    form_type: 'Lead',
    source: payload.source,
  }

  if (userOnly) {
    if (!lead.email?.includes('@')) {
      return { ok: false, error: 'Valid customer email required.', status: 422 }
    }
    const emails = await sendEmails(lead, 'confirm', { adminOnly: true })
    if (!emails.user) {
      return { ok: false, error: 'Could not send customer confirmation.', status: 500, emails }
    }
    return { ok: true, emails }
  }

  const results = { admin: false, user: false }
  const subject = payload.subject || `New lead — ${siteName}`
  const text = payload.message || payload.text || JSON.stringify(fields, null, 2)
  const from = process.env.SMTP_FROM || smtpUser

  try {
    await transporter.sendMail({
      from: `${siteName} <${from}>`,
      to: leadsTo,
      replyTo: payload.replyTo || payload.reply_to || lead.email,
      subject,
      text,
    })
    results.admin = true
  } catch (err) {
    console.error('[lead-api] admin email:', err.message)
  }

  if (lead.email?.includes('@')) {
    const userEmails = await sendEmails(lead, 'confirm', { adminOnly: true })
    results.user = userEmails.user
  }

  if (!results.admin && !results.user) {
    return { ok: false, error: 'Could not send email via SMTP.', status: 500, emails: results }
  }

  return { ok: true, emails: results }
}

function readVisitors() {
  return readJsonFile(visitorsFile)
}

function writeVisitors(rows) {
  writeJsonFile(visitorsFile, rows)
}

async function handleSaveVisitor(payload) {
  if (payload._gotcha || payload.website) {
    return { ok: true, id: 0, saved: 'honeypot' }
  }

  const city = String(payload.city || '').trim()
  if (city.length < 2) {
    return { ok: false, error: 'City is required', status: 422 }
  }

  let phone = null
  if (payload.phone) {
    phone = normalizePhone(payload.phone)
    if (!phone) {
      return { ok: false, error: 'Valid 10-digit Indian mobile number required', status: 422 }
    }
  }

  let email = null
  const emailRaw = String(payload.email || '').trim()
  if (emailRaw) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
      return { ok: false, error: 'Valid email required', status: 422 }
    }
    email = emailRaw.toLowerCase()
  }

  const name = String(payload.name || '').trim() || null
  const externalId = String(payload.external_visitor_id || '').trim() || crypto.randomUUID()
  const sessionId = String(payload.session_id || '').trim() || null

  const visitors = readVisitors()
  const existing = visitors.find((v) => v.external_visitor_id === externalId)

  const record = {
    id: existing?.id,
    external_visitor_id: externalId,
    city,
    name: name || existing?.name || null,
    phone: phone || existing?.phone || null,
    email: email || existing?.email || null,
    page_url: payload.page_url || existing?.page_url || null,
    referrer: payload.referrer || existing?.referrer || null,
    utm_source: payload.utm_source || existing?.utm_source || null,
    utm_medium: payload.utm_medium || existing?.utm_medium || null,
    utm_campaign: payload.utm_campaign || existing?.utm_campaign || null,
    session_id: sessionId || existing?.session_id || null,
    created_at: existing?.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const kuberonePayload = {
    city: record.city,
    name: record.name || undefined,
    phone: record.phone || undefined,
    email: record.email || undefined,
    page_url: record.page_url || undefined,
    referrer: record.referrer || undefined,
    utm_source: record.utm_source || undefined,
    utm_medium: record.utm_medium || undefined,
    utm_campaign: record.utm_campaign || undefined,
    session_id: record.session_id || undefined,
    external_visitor_id: record.external_visitor_id,
  }

  if (existing) {
    Object.assign(existing, record)
    writeVisitors(visitors.slice(0, 1000))
    const kuberone = await syncKuberone('/api/v1/public/website/visitors', kuberonePayload)
    return {
      ok: true,
      id: existing.id,
      duplicate: true,
      saved: 'local_json',
      kuberone: {
        synced: !!kuberone.ok && !kuberone.skipped,
        skipped: !!kuberone.skipped,
        error: kuberone.error ?? null,
      },
    }
  }

  const visitorId = visitors.length > 0 ? Math.max(...visitors.map((v) => Number(v.id) || 0)) + 1 : 1
  record.id = visitorId
  visitors.unshift(record)
  writeVisitors(visitors.slice(0, 1000))

  const kuberone = await syncKuberone('/api/v1/public/website/visitors', kuberonePayload)

  return {
    ok: true,
    id: visitorId,
    duplicate: false,
    saved: 'local_json',
    kuberone: {
      synced: !!kuberone.ok && !kuberone.skipped,
      skipped: !!kuberone.skipped,
      error: kuberone.error ?? null,
    },
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    cors(res)
    res.writeHead(204)
    res.end()
    return
  }

  const url = req.url?.split('?')[0] || ''
  const isSaveLead = url === '/api/save-lead.php' || url === '/api/save-lead'
  const isSendLead = url === '/api/send-lead' || url === '/api/send-lead.php'
  const isSavePartner = url === '/api/save-partner.php'
  const isSaveVisitor = url === '/api/save-visitor.php' || url === '/api/save-visitor'
  const isPartnerLogin = url === '/api/partner-login.php'
  const isMobileSaveLead = url === '/api/mobile/save-lead.php'
  const isDevApprove = url === '/api/dev/approve-partner'

  if (
    req.method !== 'POST' ||
    (!isSaveLead &&
      !isSendLead &&
      !isSavePartner &&
      !isSaveVisitor &&
      !isPartnerLogin &&
      !isMobileSaveLead &&
      !isDevApprove)
  ) {
    json(res, 404, { ok: false, error: 'Not found' })
    return
  }

  if (isMobileSaveLead) {
    const apiKey = req.headers['x-mobile-api-key'] || ''
    const auth = req.headers.authorization || ''
    const bearer = auth.match(/^Bearer\s+(\S+)$/i)?.[1] || ''
    if (apiKey !== mobileApiKey && bearer !== mobileApiKey) {
      json(res, 401, { ok: false, error: 'Unauthorized — invalid mobile API key' })
      return
    }
  }

  let body = ''
  for await (const chunk of req) body += chunk

  let payload
  try {
    payload = JSON.parse(body)
  } catch {
    json(res, 400, { ok: false, error: 'Invalid JSON' })
    return
  }

  let result
  if (isSaveLead) result = await handleSaveLead(payload)
  else if (isMobileSaveLead) result = await handleSaveLead(payload, 'mobile-app')
  else if (isSendLead) result = await handleSendLead(payload)
  else if (isSavePartner) result = await handleSavePartner(payload)
  else if (isSaveVisitor) result = await handleSaveVisitor(payload)
  else if (isPartnerLogin) result = await handlePartnerLogin(payload)
  else result = await handleDevApprovePartner(payload)
  const httpStatus =
    typeof result.status === 'number' ? result.status : result.ok ? 200 : 500
  const { status: _s, ...data } = result
  json(res, httpStatus, data)
})

server.listen(port, () => {
  console.log(`Lead API http://localhost:${port}`)
  console.log(`  POST /api/save-lead.php      → save to server/data/leads.json`)
  console.log(`  POST /api/save-partner.php   → save to server/data/partners.json`)
  console.log(`  POST /api/save-visitor.php   → save to server/data/visitors.json`)
  console.log(`  POST /api/partner-login.php  → partner JWT login`)
  console.log(`  POST /api/mobile/save-lead.php → mobile app leads (same CRM)`)
  console.log(`  POST /api/send-lead          → SMTP emails`)
  if (kuberoneBridgeEnabled && kuberoneApiBase) {
    console.log(`  KuberOne bridge ON → ${kuberoneApiBase}/api/v1/public/website/*`)
    if (kuberonePartnerAuthEnabled) {
      console.log('  KuberOne partner OTP auth ON → /partner-auth')
    }
  } else {
    console.warn('  KuberOne bridge OFF — set KUBERONE_BRIDGE_ENABLED=true in .env for Admin CRM sync')
  }
  if (!transporter) {
    console.warn('  SMTP_USER / SMTP_PASS missing — leads save locally; emails need .env (SETUP-EMAIL.md)')
  } else {
    console.log(`  Admin → ${leadsTo} | Customer confirmation enabled`)
  }
})
