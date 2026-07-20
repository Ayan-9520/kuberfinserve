export type LoanCalculatorType =
  | 'home'
  | 'personal'
  | 'business'
  | 'working-capital'
  | 'lap'
  | 'new-car'
  | 'used-car'
  | 'education'
  | 'machinery'

export type EmiProductDefaults = {
  amount: number
  rate: number
  tenure: number
  min: number
  max: number
  step: number
  rateMin: number
  rateMax: number
  rateStep: number
  tenureMin: number
  tenureMax: number
  /** Product page path for Apply CTA */
  applyPath: string
  rateLabel: string
}

/** Market-aligned defaults — Starting From rates match product pages. Subject to eligibility. */
export const EMI_DEFAULTS: Record<LoanCalculatorType, EmiProductDefaults> = {
  home: {
    amount: 50_00_000,
    rate: 7.1,
    tenure: 20,
    min: 5_00_000,
    max: 25_00_00_000,
    step: 1_00_000,
    rateMin: 7.1,
    rateMax: 12,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 30,
    applyPath: '/loans/home-loan',
    rateLabel: 'Starting from 7.10% p.a.*',
  },
  personal: {
    amount: 5_00_000,
    rate: 10.49,
    tenure: 5,
    min: 50_000,
    max: 50_00_000,
    step: 25_000,
    rateMin: 10.49,
    rateMax: 24,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 7,
    applyPath: '/loans/personal-loan',
    rateLabel: 'Starting from 10.49% p.a.*',
  },
  business: {
    amount: 25_00_000,
    rate: 10.5,
    tenure: 5,
    min: 1_00_000,
    max: 10_00_00_000,
    step: 1_00_000,
    rateMin: 10.5,
    rateMax: 18,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 10,
    applyPath: '/loans/business-loan',
    rateLabel: 'Starting from 10.50% p.a.*',
  },
  'working-capital': {
    amount: 20_00_000,
    rate: 9.5,
    tenure: 3,
    min: 1_00_000,
    max: 20_00_00_000,
    step: 1_00_000,
    rateMin: 9.5,
    rateMax: 16,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 5,
    applyPath: '/loans/working-capital',
    rateLabel: 'Starting from 9.50% p.a.*',
  },
  lap: {
    amount: 50_00_000,
    rate: 9.0,
    tenure: 15,
    min: 5_00_000,
    max: 25_00_00_000,
    step: 1_00_000,
    rateMin: 9.0,
    rateMax: 14,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 20,
    applyPath: '/loans/loan-against-property',
    rateLabel: 'Starting from 9.00% p.a.*',
  },
  'new-car': {
    amount: 10_00_000,
    rate: 7.75,
    tenure: 5,
    min: 1_00_000,
    max: 2_00_00_000,
    step: 50_000,
    rateMin: 7.75,
    rateMax: 14,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 8,
    applyPath: '/loans/new-car-loan',
    rateLabel: 'Starting from 7.75% p.a.*',
  },
  'used-car': {
    amount: 5_00_000,
    rate: 9.25,
    tenure: 4,
    min: 50_000,
    max: 5_00_00_000,
    step: 25_000,
    rateMin: 9.25,
    rateMax: 16,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 7,
    applyPath: '/loans/used-car-loan',
    rateLabel: 'Starting from 9.25% p.a.*',
  },
  education: {
    amount: 15_00_000,
    rate: 8.15,
    tenure: 10,
    min: 1_00_000,
    max: 3_00_00_000,
    step: 50_000,
    rateMin: 8.15,
    rateMax: 14,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 15,
    applyPath: '/loans/education-loan',
    rateLabel: 'Starting from 8.15% p.a.*',
  },
  machinery: {
    amount: 25_00_000,
    rate: 9.25,
    tenure: 5,
    min: 1_00_000,
    max: 15_00_00_000,
    step: 1_00_000,
    rateMin: 9.25,
    rateMax: 16,
    rateStep: 0.05,
    tenureMin: 1,
    tenureMax: 10,
    applyPath: '/loans/machinery-loan',
    rateLabel: 'Starting from 9.25% p.a.*',
  },
}

export const LOAN_TAB_LABELS: Record<LoanCalculatorType, string> = {
  home: 'Home Loan',
  personal: 'Personal Loan',
  business: 'Business Loan',
  'working-capital': 'Working Capital',
  lap: 'Loan Against Property',
  'new-car': 'New Car Loan',
  'used-car': 'Used Car Loan',
  education: 'Education Loan',
  machinery: 'Machinery Loan',
}

/** Tab order for calculator UI */
export const EMI_TABS: LoanCalculatorType[] = [
  'home',
  'lap',
  'personal',
  'business',
  'working-capital',
  'new-car',
  'used-car',
  'education',
  'machinery',
]

export type AmortizationRow = {
  month: number
  emi: number
  principal: number
  interest: number
  balance: number
}

export function formatINR(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(n))
}

function buildSchedule(
  principal: number,
  emi: number,
  months: number,
  r: number,
): AmortizationRow[] {
  const rows: AmortizationRow[] = []
  let balance = principal
  for (let m = 1; m <= months; m++) {
    const interest = r === 0 ? 0 : balance * r
    const princ = Math.min(emi - interest, balance)
    balance = Math.max(0, balance - princ)
    rows.push({ month: m, emi, principal: princ, interest, balance })
  }
  return rows
}

export function calculateEmi(principal: number, annualRate: number, tenureYears: number) {
  const months = tenureYears * 12
  const r = annualRate / 12 / 100

  if (months <= 0) {
    return { emi: 0, total: 0, interest: 0, schedule: [] as AmortizationRow[] }
  }

  if (r === 0) {
    const emi = principal / months
    return {
      emi,
      total: principal,
      interest: 0,
      schedule: buildSchedule(principal, emi, months, 0),
    }
  }

  const emi =
    (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
  const total = emi * months
  return {
    emi,
    total,
    interest: total - principal,
    schedule: buildSchedule(principal, emi, months, r),
  }
}
