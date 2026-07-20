import { calculateEmi, formatINR } from '@/utils/emi'
import { EMI_DEFAULTS, type LoanCalculatorType } from '@/utils/emi'

export type EligibilityProduct = LoanCalculatorType

export type EmploymentCategory = 'salaried' | 'self-employed' | 'professional' | 'business'

export interface EligibilityInput {
  product: EligibilityProduct
  age: number
  employment: EmploymentCategory
  monthlyIncome: number
  existingEmi: number
  cibilScore: number
  requestedAmount: number
  tenureYears: number
  city?: string
}

export type EligibilityVerdict = 'strong' | 'moderate' | 'limited' | 'not-eligible'

export interface EligibilityFactor {
  label: string
  status: 'pass' | 'warn' | 'fail'
  detail: string
}

export interface EligibilityResult {
  verdict: EligibilityVerdict
  verdictLabel: string
  score: number
  maxEligibleAmount: number
  suggestedAmount: number
  estimatedEmi: number
  estimatedRate: number
  foirUsed: number
  surplusEmiCapacity: number
  factors: EligibilityFactor[]
  tips: string[]
  productLabel: string
  rateFromLabel: string
  disclaimer: string
}

type ProductRule = {
  label: string
  minAge: number
  maxAge: number
  minIncome: number
  maxLoan: number
  /** Income multiplier for max eligibility (monthly * 12 * years) */
  incomeMultipliers: Record<EmploymentCategory, number>
  baseRate: number
  rateBumpLowCibil: number
  preferredCibil: number
  minCibilSoft: number
  maxTenure: number
  /** FOIR cap: max % of income for total EMIs */
  foirCap: number
}

const PRODUCT_RULES: Record<EligibilityProduct, ProductRule> = {
  home: {
    label: 'Home Loan',
    minAge: 21,
    maxAge: 70,
    minIncome: 25_000,
    maxLoan: 25_00_00_000,
    incomeMultipliers: { salaried: 60, professional: 55, 'self-employed': 45, business: 45 },
    baseRate: 7.1,
    rateBumpLowCibil: 1.25,
    preferredCibil: 700,
    minCibilSoft: 650,
    maxTenure: 30,
    foirCap: 0.5,
  },
  lap: {
    label: 'Loan Against Property',
    minAge: 21,
    maxAge: 70,
    minIncome: 30_000,
    maxLoan: 25_00_00_000,
    incomeMultipliers: { salaried: 50, professional: 50, 'self-employed': 40, business: 40 },
    baseRate: 9.0,
    rateBumpLowCibil: 1.5,
    preferredCibil: 680,
    minCibilSoft: 650,
    maxTenure: 20,
    foirCap: 0.55,
  },
  personal: {
    label: 'Personal Loan',
    minAge: 21,
    maxAge: 60,
    minIncome: 25_000,
    maxLoan: 50_00_000,
    incomeMultipliers: { salaried: 18, professional: 15, 'self-employed': 12, business: 12 },
    baseRate: 10.49,
    rateBumpLowCibil: 3,
    preferredCibil: 700,
    minCibilSoft: 650,
    maxTenure: 7,
    foirCap: 0.45,
  },
  business: {
    label: 'Business Loan',
    minAge: 21,
    maxAge: 65,
    minIncome: 40_000,
    maxLoan: 10_00_00_000,
    incomeMultipliers: { salaried: 20, professional: 24, 'self-employed': 30, business: 36 },
    baseRate: 10.5,
    rateBumpLowCibil: 2,
    preferredCibil: 680,
    minCibilSoft: 650,
    maxTenure: 10,
    foirCap: 0.5,
  },
  'working-capital': {
    label: 'Working Capital',
    minAge: 21,
    maxAge: 65,
    minIncome: 50_000,
    maxLoan: 20_00_00_000,
    incomeMultipliers: { salaried: 18, professional: 20, 'self-employed': 28, business: 36 },
    baseRate: 9.5,
    rateBumpLowCibil: 2,
    preferredCibil: 680,
    minCibilSoft: 650,
    maxTenure: 5,
    foirCap: 0.55,
  },
  'new-car': {
    label: 'New Car Loan',
    minAge: 21,
    maxAge: 65,
    minIncome: 25_000,
    maxLoan: 2_00_00_000,
    incomeMultipliers: { salaried: 24, professional: 22, 'self-employed': 18, business: 18 },
    baseRate: 7.75,
    rateBumpLowCibil: 1.5,
    preferredCibil: 680,
    minCibilSoft: 650,
    maxTenure: 8,
    foirCap: 0.5,
  },
  'used-car': {
    label: 'Used Car Loan',
    minAge: 21,
    maxAge: 65,
    minIncome: 20_000,
    maxLoan: 5_00_00_000,
    incomeMultipliers: { salaried: 18, professional: 16, 'self-employed': 14, business: 14 },
    baseRate: 9.25,
    rateBumpLowCibil: 2,
    preferredCibil: 680,
    minCibilSoft: 650,
    maxTenure: 7,
    foirCap: 0.45,
  },
  education: {
    label: 'Education Loan',
    minAge: 18,
    maxAge: 35,
    minIncome: 20_000,
    maxLoan: 3_00_00_000,
    incomeMultipliers: { salaried: 30, professional: 30, 'self-employed': 24, business: 24 },
    baseRate: 8.15,
    rateBumpLowCibil: 1.25,
    preferredCibil: 650,
    minCibilSoft: 600,
    maxTenure: 15,
    foirCap: 0.5,
  },
  machinery: {
    label: 'Machinery Loan',
    minAge: 21,
    maxAge: 65,
    minIncome: 40_000,
    maxLoan: 15_00_00_000,
    incomeMultipliers: { salaried: 24, professional: 24, 'self-employed': 30, business: 36 },
    baseRate: 9.25,
    rateBumpLowCibil: 1.75,
    preferredCibil: 680,
    minCibilSoft: 650,
    maxTenure: 10,
    foirCap: 0.5,
  },
}

/** Max loan from EMI capacity (FOIR surplus) using reducing balance formula. */
function maxPrincipalFromEmi(emiCapacity: number, annualRate: number, tenureYears: number): number {
  if (emiCapacity <= 0 || tenureYears <= 0) return 0
  const months = tenureYears * 12
  const r = annualRate / 12 / 100
  if (r === 0) return emiCapacity * months
  return (emiCapacity * (Math.pow(1 + r, months) - 1)) / (r * Math.pow(1 + r, months))
}

function cibilBand(score: number): { label: string; factor: number; rateAdd: number } {
  if (score >= 750) return { label: 'Excellent', factor: 1.1, rateAdd: 0 }
  if (score >= 700) return { label: 'Good', factor: 1.0, rateAdd: 0.25 }
  if (score >= 650) return { label: 'Fair', factor: 0.85, rateAdd: 0.75 }
  if (score >= 550) return { label: 'Below average', factor: 0.55, rateAdd: 2 }
  return { label: 'Poor', factor: 0.25, rateAdd: 3.5 }
}

export function checkEligibility(input: EligibilityInput): EligibilityResult {
  const rule = PRODUCT_RULES[input.product]
  const defaults = EMI_DEFAULTS[input.product]
  const tenure = Math.min(Math.max(1, input.tenureYears), rule.maxTenure)
  const factors: EligibilityFactor[] = []
  const tips: string[] = []
  let score = 100

  // Age
  if (input.age < rule.minAge || input.age > rule.maxAge) {
    factors.push({
      label: 'Age',
      status: 'fail',
      detail: `Preferred age for ${rule.label} is ${rule.minAge}–${rule.maxAge} years.`,
    })
    score -= 40
  } else {
    factors.push({
      label: 'Age',
      status: 'pass',
      detail: `${input.age} years — within preferred range.`,
    })
  }

  // Income
  if (input.monthlyIncome < rule.minIncome) {
    factors.push({
      label: 'Monthly Income',
      status: 'fail',
      detail: `Minimum indicative income ${formatINR(rule.minIncome)}/month for this product.`,
    })
    score -= 35
    tips.push('Improve documented income or consider a co-applicant.')
  } else if (input.monthlyIncome < rule.minIncome * 1.25) {
    factors.push({
      label: 'Monthly Income',
      status: 'warn',
      detail: 'Income meets minimum but may limit loan amount / lender options.',
    })
    score -= 10
  } else {
    factors.push({
      label: 'Monthly Income',
      status: 'pass',
      detail: `${formatINR(input.monthlyIncome)}/month meets typical thresholds.`,
    })
  }

  // CIBIL
  const cibil = cibilBand(input.cibilScore)
  if (input.cibilScore < rule.minCibilSoft) {
    factors.push({
      label: 'Credit Score',
      status: 'fail',
      detail: `${input.cibilScore} (${cibil.label}) — below preferred band for most lenders.`,
    })
    score -= 35
    tips.push('Improve credit hygiene before applying — see our CIBIL assistance page.')
  } else if (input.cibilScore < rule.preferredCibil) {
    factors.push({
      label: 'Credit Score',
      status: 'warn',
      detail: `${input.cibilScore} (${cibil.label}) — some lenders may charge higher rates.`,
    })
    score -= 12
  } else {
    factors.push({
      label: 'Credit Score',
      status: 'pass',
      detail: `${input.cibilScore} (${cibil.label}) — favourable for eligibility & pricing.`,
    })
  }

  // Existing EMI / FOIR
  const maxTotalEmi = input.monthlyIncome * rule.foirCap
  const surplusEmi = Math.max(0, maxTotalEmi - input.existingEmi)
  const currentFoir =
    input.monthlyIncome > 0 ? (input.existingEmi / input.monthlyIncome) * 100 : 100

  if (input.existingEmi >= maxTotalEmi) {
    factors.push({
      label: 'EMI Capacity (FOIR)',
      status: 'fail',
      detail: `Existing EMI utilises ~${currentFoir.toFixed(0)}% of income. Little headroom for a new loan.`,
    })
    score -= 30
    tips.push('Reduce existing EMIs or lower the requested loan amount.')
  } else if (currentFoir > rule.foirCap * 100 * 0.75) {
    factors.push({
      label: 'EMI Capacity (FOIR)',
      status: 'warn',
      detail: `Existing FOIR ~${currentFoir.toFixed(0)}%. New loan amount may be constrained.`,
    })
    score -= 10
  } else {
    factors.push({
      label: 'EMI Capacity (FOIR)',
      status: 'pass',
      detail: `Surplus EMI capacity ~${formatINR(surplusEmi)}/month (indicative FOIR cap ${(rule.foirCap * 100).toFixed(0)}%).`,
    })
  }

  // Employment
  factors.push({
    label: 'Employment',
    status: 'pass',
    detail: `${input.employment.replace('-', ' ')} profile assessed with product-specific multipliers.`,
  })

  const estimatedRate = Math.min(
    defaults.rateMax,
    Math.max(rule.baseRate, rule.baseRate + cibil.rateAdd),
  )

  const incomeBasedMax =
    input.monthlyIncome * rule.incomeMultipliers[input.employment] * cibil.factor
  const foirBasedMax = maxPrincipalFromEmi(surplusEmi, estimatedRate, tenure)
  let maxEligible = Math.min(rule.maxLoan, incomeBasedMax, foirBasedMax)
  maxEligible = Math.max(0, Math.floor(maxEligible / 1000) * 1000)

  const hardFail =
    input.age < rule.minAge ||
    input.age > rule.maxAge ||
    input.monthlyIncome < rule.minIncome * 0.7 ||
    (input.cibilScore < 550 && input.product === 'personal') ||
    surplusEmi <= 0

  if (hardFail) {
    maxEligible = Math.min(maxEligible, input.requestedAmount * 0.2)
  }

  const suggestedAmount = Math.min(input.requestedAmount || maxEligible, maxEligible)
  const { emi: estimatedEmi } = calculateEmi(suggestedAmount || 0, estimatedRate, tenure)

  // Requested amount check
  if (input.requestedAmount > 0) {
    if (input.requestedAmount <= maxEligible * 0.9) {
      factors.push({
        label: 'Requested Amount',
        status: 'pass',
        detail: `${formatINR(input.requestedAmount)} is within indicative eligibility.`,
      })
    } else if (input.requestedAmount <= maxEligible * 1.15) {
      factors.push({
        label: 'Requested Amount',
        status: 'warn',
        detail: 'Requested amount is near the upper limit — lenders may offer a lower sanction.',
      })
      score -= 8
      tips.push('Consider a slightly lower amount or longer tenure for better odds.')
    } else {
      factors.push({
        label: 'Requested Amount',
        status: 'fail',
        detail: `Requested ${formatINR(input.requestedAmount)} exceeds indicative max ${formatINR(maxEligible)}.`,
      })
      score -= 20
      tips.push(`Try requesting up to ${formatINR(maxEligible)} based on current inputs.`)
    }
  }

  score = Math.max(0, Math.min(100, score))

  let verdict: EligibilityVerdict
  let verdictLabel: string
  if (hardFail || score < 40 || maxEligible < (defaults.min || 50_000)) {
    verdict = 'not-eligible'
    verdictLabel = 'Currently Not Eligible'
    tips.push('Speak to an advisor — secured products or co-applicant options may still be available.')
  } else if (score >= 80 && suggestedAmount >= input.requestedAmount * 0.9) {
    verdict = 'strong'
    verdictLabel = 'Strong Eligibility'
  } else if (score >= 60) {
    verdict = 'moderate'
    verdictLabel = 'Moderate Eligibility'
  } else {
    verdict = 'limited'
    verdictLabel = 'Limited Eligibility'
  }

  if (tips.length === 0) {
    tips.push('Complete KYC & income docs for faster lender matching.')
    tips.push('Compare offers from multiple banks & NBFCs before you apply.')
  }

  return {
    verdict,
    verdictLabel,
    score,
    maxEligibleAmount: maxEligible,
    suggestedAmount: Math.max(0, suggestedAmount),
    estimatedEmi,
    estimatedRate: Number(estimatedRate.toFixed(2)),
    foirUsed: Number(currentFoir.toFixed(1)),
    surplusEmiCapacity: Math.round(surplusEmi),
    factors,
    tips: tips.slice(0, 5),
    productLabel: rule.label,
    rateFromLabel: defaults.rateLabel,
    disclaimer:
      '*Indicative assessment only — not a loan sanction or credit decision. Final eligibility, amount, rate and tenure are solely at the discretion of the respective Bank or NBFC and subject to documentation, credit bureau checks and underwriting.',
  }
}

export const ELIGIBILITY_PRODUCTS: { id: EligibilityProduct; label: string }[] = [
  { id: 'home', label: 'Home Loan' },
  { id: 'lap', label: 'Loan Against Property' },
  { id: 'personal', label: 'Personal Loan' },
  { id: 'business', label: 'Business Loan' },
  { id: 'working-capital', label: 'Working Capital' },
  { id: 'new-car', label: 'New Car Loan' },
  { id: 'used-car', label: 'Used Car Loan' },
  { id: 'education', label: 'Education Loan' },
  { id: 'machinery', label: 'Machinery Loan' },
]

export const EMPLOYMENT_OPTIONS: { id: EmploymentCategory; label: string }[] = [
  { id: 'salaried', label: 'Salaried' },
  { id: 'self-employed', label: 'Self Employed' },
  { id: 'professional', label: 'Professional' },
  { id: 'business', label: 'Business Owner' },
]

export { formatINR }
