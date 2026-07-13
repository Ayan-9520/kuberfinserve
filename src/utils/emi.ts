export type LoanCalculatorType = 'home' | 'personal' | 'business' | 'lap'

export const EMI_DEFAULTS: Record<
  LoanCalculatorType,
  { amount: number; rate: number; tenure: number; min: number; max: number; step: number }
> = {
  home: { amount: 5000000, rate: 8.5, tenure: 20, min: 500000, max: 50000000, step: 100000 },
  personal: { amount: 500000, rate: 11, tenure: 5, min: 50000, max: 5000000, step: 10000 },
  business: { amount: 2000000, rate: 12, tenure: 7, min: 100000, max: 50000000, step: 100000 },
  lap: { amount: 2500000, rate: 9.5, tenure: 15, min: 500000, max: 25000000, step: 100000 },
}

export const LOAN_TAB_LABELS: Record<LoanCalculatorType, string> = {
  home: 'Home Loan',
  personal: 'Personal Loan',
  business: 'Business Loan',
  lap: 'Loan Against Property',
}

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
