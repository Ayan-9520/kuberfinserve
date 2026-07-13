import { LOAN_RATE_HINT } from '@/data/applyLoanPage'
import { calculateEmi, formatINR } from '@/utils/emi'

const PROPERTY_LOANS = new Set(['Home Loan', 'Loan Against Property'])

export function needsPropertyValue(loanType: string) {
  return PROPERTY_LOANS.has(loanType)
}

export function parseLoanAmount(raw: string): number {
  const s = raw.replace(/,/g, '').trim().toLowerCase()
  const crore = s.match(/([\d.]+)\s*(crore|cr)\b/i)
  if (crore) return parseFloat(crore[1]) * 1e7
  const lakh = s.match(/([\d.]+)\s*(lakh|lac|l)\b/i)
  if (lakh) return parseFloat(lakh[1]) * 1e5
  const n = parseFloat(s.replace(/[^\d.]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : 0
}

export function estimateEligibilityScore(
  income: string,
  loanAmount: string,
  employment: string,
): number {
  let score = 68
  if (income.includes('Above ₹5')) score += 14
  else if (income.includes('₹2,00,000')) score += 10
  else if (income.includes('₹1,00,000')) score += 7
  else if (income.includes('₹50,000')) score += 4

  const amt = parseLoanAmount(loanAmount)
  if (amt > 0 && amt < 2_000_000) score += 6
  else if (amt >= 2_000_000 && amt < 10_000_000) score += 3

  if (employment === 'Salaried') score += 4
  if (employment === 'Business Owner' || employment === 'Self Employed') score += 2

  return Math.min(92, Math.max(62, score))
}

export function getEmiPreview(loanType: string, loanAmount: string, tenureMonths: string) {
  const principal = parseLoanAmount(loanAmount)
  const months = parseInt(tenureMonths, 10) || 0
  const hint = LOAN_RATE_HINT[loanType] ?? { min: 10, max: 13, days: '3–7 days' }
  const midRate = (hint.min + hint.max) / 2
  const tenureYears = months > 0 ? months / 12 : 5
  const { emi } =
    principal > 0 && months > 0
      ? calculateEmi(principal, midRate, tenureYears)
      : { emi: 0 }

  return {
    emi: principal > 0 && months > 0 ? formatINR(emi) : '—',
    rateRange: `${hint.min}% – ${hint.max}%`,
    timeline: hint.days,
  }
}
