/**
 * Local SMTP API — admin lead + customer confirmation emails
 * Run: npm run dev  (starts Vite + this server)
 * .env: SMTP_USER, SMTP_PASS (Gmail app password or Hostinger mailbox)
 */
import http from 'node:http'
import nodemailer from 'nodemailer'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const port = Number(process.env.LEAD_API_PORT || 8787)

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
      if (!process.env[key]) process.env[key] = val
    }
  }
}

loadEnvFile()

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function buildUserConfirmationText(payload) {
  const name =
    payload.userName ||
    payload.fields?.full_name ||
    payload.fields?.fullName ||
    payload.fields?.name ||
    'Customer'
  const loan = payload.fields?.loan_type || payload.fields?.loanType || 'your enquiry'
  const phone = payload.fields?.phone || '—'
  const email = payload.userEmail || payload.fields?.email || '—'
  const amount = payload.fields?.loan_amount || payload.fields?.loanAmount

  let text = `Dear ${name},\n\n`
  text += `Thank you for contacting ${siteName}.\n\n`
  text += `We have received your application for: ${loan}.\n`
  text += 'Our team will review your details and contact you within 24 working hours.\n\n'
  text += 'Summary:\n'
  text += `- Phone: ${phone}\n`
  text += `- Email: ${email}\n`
  if (amount) text += `- Loan amount: ${amount}\n`
  text += `\nFor urgent queries, call us at ${sitePhone}.\n\n`
  text += `Regards,\n${siteName} Team\n${leadsTo}\n`
  return text
}

const server = http.createServer(async (req, res) => {
  cors(res)

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method !== 'POST' || req.url !== '/api/send-lead') {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: 'Not found' }))
    return
  }

  if (!transporter) {
    res.writeHead(503, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        ok: false,
        error: 'SMTP not configured. Add SMTP_USER and SMTP_PASS to .env (see SETUP-EMAIL.md).',
      }),
    )
    return
  }

  let body = ''
  for await (const chunk of req) body += chunk

  let payload
  try {
    payload = JSON.parse(body)
  } catch {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }))
    return
  }

  const subject = payload.subject || `New lead — ${siteName}`
  const text = payload.message || payload.text || JSON.stringify(payload.fields || payload, null, 2)
  const replyTo = payload.replyTo || payload.reply_to
  const userEmail = payload.userEmail || payload.fields?.email
  const from = process.env.SMTP_FROM || smtpUser

  const userOnly = payload.userConfirmationOnly === true

  const results = { admin: false, user: false }

  try {
    if (!userOnly) {
      await transporter.sendMail({
        from: `${siteName} <${from}>`,
        to: leadsTo,
        replyTo: replyTo || undefined,
        subject,
        text,
      })
      results.admin = true
    }

    if (userEmail && typeof userEmail === 'string' && userEmail.includes('@')) {
      await transporter.sendMail({
        from: `${siteName} <${from}>`,
        to: userEmail,
        replyTo: leadsTo,
        subject: `We received your application — ${siteName}`,
        text: buildUserConfirmationText(payload),
      })
      results.user = true
    } else if (userOnly) {
      res.writeHead(422, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: 'Valid customer email required.' }))
      return
    }

    if (userOnly && !results.user) {
      res.writeHead(500, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: false, error: 'Could not send customer confirmation.', emails: results }))
      return
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true, emails: results }))
  } catch (err) {
    console.error('[send-lead]', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: false, error: 'Failed to send email', emails: results }))
  }
})

server.listen(port, () => {
  console.log(`Lead email API http://localhost:${port}/api/send-lead`)
  if (!transporter) {
    console.warn('SMTP_USER / SMTP_PASS missing — add .env then restart npm run dev')
  } else {
    console.log(`Admin emails → ${leadsTo}`)
    console.log('Customer confirmation → form email (when submitted)')
  }
})
