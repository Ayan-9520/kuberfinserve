import type { LeadApplicationData } from '@/components/LeadApplicationForm'
import type { ContactFormData } from '@/components/ContactForm'
import { submitLeadToServer } from '@/utils/submitLeadApi'
import { submitFormEmail } from '@/utils/submitFormEmail'
import { registerPartnerApplication } from '@/utils/submitPartnerApi'
import { getStoredPartnerReferral } from '@/utils/partnerReferral'

const STORAGE_KEY = 'kuberfinserve_leads'

export interface StoredLead extends LeadApplicationData {
  id: string
  submittedAt: string
  source: string
}

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1)
  return digits
}

function leadPayload(
  data: LeadApplicationData,
  extras?: Record<string, string | boolean>,
): Record<string, string | boolean> {
  return {
    full_name: data.fullName,
    phone: normalizePhone(data.phone),
    email: data.email,
    city: data.city,
    age: data.age,
    employment_type: data.employmentType,
    company_name: data.companyName,
    monthly_income: data.monthlyIncome,
    work_experience: data.workExperience,
    loan_type: data.loanType,
    loan_amount: data.loanAmount,
    tenure_months: data.tenureMonths,
    existing_emi: data.existingEmi,
    purpose: data.purpose,
    pan: data.pan,
    message: data.message,
    agreeTerms: data.agreeTerms,
    ...extras,
  }
}

export function generateLeadId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `KFS-${ts}${rnd}`
}

export function saveLeadLocal(data: LeadApplicationData, source: string): StoredLead {
  const lead: StoredLead = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    submittedAt: new Date().toISOString(),
    source,
  }
  try {
    const existing = getLeads()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...existing].slice(0, 100)))
  } catch {
    // localStorage unavailable
  }
  return lead
}

async function submitWithFallback(
  formType: string,
  source: string,
  data: Record<string, string | number | boolean | undefined | null>,
  replyTo: string,
): Promise<{ ok: boolean; error?: string; warning?: string }> {
  const userName =
    (typeof data.full_name === 'string' && data.full_name) ||
    (typeof data.name === 'string' && data.name) ||
    undefined

  const apiResult = await submitLeadToServer({ formType, source, data })

  if (apiResult.ok) {
    let warning = apiResult.warning

    if (apiResult.duplicate) {
      return {
        ok: true,
        warning: apiResult.message || 'We already have your application on file.',
      }
    }

    if (!apiResult.emails?.user) {
      const emailResult = await submitFormEmail({
        formType,
        source,
        replyTo,
        userEmail: replyTo,
        userName,
        data,
        userConfirmationOnly: Boolean(apiResult.emails?.admin),
      })
      if (!apiResult.emails?.admin && !emailResult.ok) {
        warning =
          warning ||
          (emailResult.error?.includes('SMTP')
            ? 'Application saved. Email not sent — set correct smtp_pass in public_html/api/config.php (Hostinger mailbox password).'
            : emailResult.error) ||
          'Application saved. Email not sent — configure SMTP in .env (local) or api/config.php (live).'
      }
    }

    return { ok: true, warning }
  }

  const emailResult = await submitFormEmail({
    formType,
    source,
    replyTo,
    userEmail: replyTo,
    userName,
    data,
  })
  if (emailResult.ok) {
    return {
      ok: true,
      warning:
        'Application sent by email. Database save failed — check Hostinger config.php and leads table.',
    }
  }

  const hint = import.meta.env.DEV
    ? ' Restart npm run dev and add SMTP_USER/SMTP_PASS to .env (see SETUP-EMAIL.md).'
    : ' Upload api/config.php with database + SMTP on Hostinger.'

  return {
    ok: false,
    error: (apiResult.error || emailResult.error || 'Could not submit.') + hint,
  }
}

export async function submitLead(
  data: LeadApplicationData,
  source: string,
  extras?: Record<string, string | boolean>,
): Promise<{ ok: boolean; error?: string; warning?: string; leadId?: string }> {
  const leadId =
    (typeof extras?.lead_id === 'string' && extras.lead_id) || generateLeadId()
  const partnerRef = getStoredPartnerReferral()

  const crmExtras: Record<string, string | boolean> = {
    lead_id: leadId,
    external_lead_id: leadId,
    crm_channel: partnerRef ? 'partner-referral' : 'website',
    form_variant: source,
    ...extras,
  }
  if (partnerRef) {
    crmExtras.partner_id = partnerRef
  }

  const stored = saveLeadLocal({ ...data, message: data.message || `Lead ID: ${leadId}` }, source)

  const result = await submitWithFallback(
    'Loan Application',
    source,
    leadPayload(data, crmExtras),
    data.email,
  )

  return {
    ok: result.ok,
    error: result.error,
    warning: result.warning,
    leadId: stored.id.startsWith('lead_') ? leadId : stored.id,
  }
}

/** Premium apply-loan wizard → same pipeline with CRM metadata */
export async function submitApplyLoanWizard(
  data: LeadApplicationData,
  source: string,
  meta: { leadId: string; propertyValue?: string },
): Promise<{ ok: boolean; error?: string; leadId: string }> {
  const extras: Record<string, string | boolean> = {
    lead_id: meta.leadId,
    form_variant: 'apply-loan-wizard-v2',
    crm_channel: 'apply-loan-portal',
  }
  if (meta.propertyValue) extras.property_value = meta.propertyValue

  const result = await submitLead(data, source, extras)
  return { ok: result.ok, error: result.error, leadId: meta.leadId }
}

export async function submitContact(
  data: ContactFormData,
  source: string,
): Promise<{ ok: boolean; error?: string }> {
  return submitWithFallback(
    'Contact Enquiry',
    source,
    {
      name: data.name,
      phone: normalizePhone(data.phone),
      email: data.email,
      city: data.city,
      employment_type: data.employmentType,
      loan_type: data.loanType,
      message: data.message,
    },
    data.email,
  )
}

export interface PartnerApplyFormData {
  name: string
  phone: string
  email: string
  city: string
  state: string
  companyName?: string
  businessType: string
  experience?: string
  message?: string
  _gotcha?: string
}

export async function submitPartnerApply(
  data: PartnerApplyFormData,
  source: string,
): Promise<{
  ok: boolean
  error?: string
  warning?: string
  id?: number
  partnerCode?: string
  message?: string
}> {
  // Never fall back to loan-lead pipeline — that hides applications from Admin → Partners.
  const partnerResult = await registerPartnerApplication(data, source)

  if (partnerResult.ok) {
    return {
      ok: true,
      warning: partnerResult.warning,
      id: partnerResult.id,
      partnerCode: partnerResult.partnerCode,
      message: partnerResult.message,
    }
  }

  return { ok: false, error: partnerResult.error }
}

export function getLeads(): StoredLead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as StoredLead[]
  } catch {
    return []
  }
}

/** @deprecated Use submitLead */
export function saveLead(data: LeadApplicationData, source: string): StoredLead {
  return saveLeadLocal(data, source)
}
