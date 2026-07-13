import type { LoanProduct } from '@/data/loans'

export const EMPLOYMENT_TYPES_LEAD = [
  'Salaried',
  'Self Employed',
  'Professional',
  'Business Owner',
] as const

export const INCOME_RANGES = [
  'Below ₹25,000',
  '₹25,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹2,00,000',
  '₹2,00,000 – ₹5,00,000',
  'Above ₹5,00,000',
] as const

export const TENURE_OPTIONS = [
  { label: '1 Year', months: 12 },
  { label: '2 Years', months: 24 },
  { label: '3 Years', months: 36 },
  { label: '5 Years', months: 60 },
  { label: '7 Years', months: 84 },
  { label: '10 Years', months: 120 },
  { label: '15 Years', months: 180 },
  { label: '20 Years', months: 240 },
] as const

export const LOAN_PURPOSES = [
  'New purchase',
  'Balance transfer',
  'Top-up',
  'Business expansion',
  'Education',
  'Medical / Emergency',
  'Other',
] as const

export const SLUG_TO_LOAN_TYPE: Record<string, string> = {
  'new-car-loan': 'Auto Loan (New Car)',
  'used-car-loan': 'Auto Loan (Used Car)',
  'home-loan': 'Home Loan',
  'personal-loan': 'Personal Loan',
  'business-loan': 'Business Loan',
  'loan-against-property': 'Loan Against Property',
  'education-loan': 'Education Loan',
  'machinery-loan': 'Machinery Loan',
}

export const LOAN_TYPE_OPTIONS = [
  'Home Loan',
  'Loan Against Property',
  'Auto Loan (New Car)',
  'Auto Loan (Used Car)',
  'Personal Loan',
  'Business Loan',
  'Education Loan',
  'Machinery Loan',
  'Insurance',
  'Credit Card',
] as const

export const LOAN_PAGE_META: Record<
  string,
  { minAmount: number; maxAmount: string; maxTenure: string; processingTime: string }
> = {
  'new-car-loan': { minAmount: 100000, maxAmount: '₹50 Lakh', maxTenure: '7 Years', processingTime: '24–48 hrs' },
  'used-car-loan': { minAmount: 50000, maxAmount: '₹25 Lakh', maxTenure: '5 Years', processingTime: '24–48 hrs' },
  'home-loan': { minAmount: 500000, maxAmount: '₹5 Cr+', maxTenure: '30 Years', processingTime: '3–7 days' },
  'personal-loan': { minAmount: 50000, maxAmount: '₹40 Lakh', maxTenure: '5 Years', processingTime: 'Same day' },
  'business-loan': { minAmount: 100000, maxAmount: '₹2 Cr+', maxTenure: '10 Years', processingTime: '2–5 days' },
  'loan-against-property': { minAmount: 500000, maxAmount: '₹10 Cr+', maxTenure: '15 Years', processingTime: '5–10 days' },
  'education-loan': { minAmount: 100000, maxAmount: '₹1.5 Cr', maxTenure: '15 Years', processingTime: '3–7 days' },
  'machinery-loan': { minAmount: 100000, maxAmount: '₹5 Cr+', maxTenure: '10 Years', processingTime: '2–5 days' },
}

export const APPLICATION_STEPS = [
  { step: '01', title: 'Apply Online', desc: 'Fill the lead form with loan & employment details.' },
  { step: '02', title: 'Expert Review', desc: 'Our team matches you with suitable lenders.' },
  { step: '03', title: 'Quick Disbursal', desc: 'Complete documentation and get funds faster.' },
] as const

export function getDefaultLoanType(slug?: string): string {
  if (slug && SLUG_TO_LOAN_TYPE[slug]) return SLUG_TO_LOAN_TYPE[slug]
  return ''
}

export function getLoanMeta(slug: string) {
  return LOAN_PAGE_META[slug] ?? { minAmount: 50000, maxAmount: 'As per profile', maxTenure: '5 Years', processingTime: '2–5 days' }
}

export function loanTypeFromProduct(loan: LoanProduct): string {
  return SLUG_TO_LOAN_TYPE[loan.slug] ?? loan.title
}
