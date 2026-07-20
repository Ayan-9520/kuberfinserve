export const APPLY_TRUST_STRIP = [
  'Secure & Encrypted',
  '100% Data Privacy',
  'RBI Compliant Partners',
  'No Hidden Charges',
] as const

export const APPLY_LEFT_METRICS = [
  { value: '₹500+ Cr', label: 'Loans Processed' },
  { value: '25,000+', label: 'Customers Served' },
  { value: '50+', label: 'Banking Partners' },
  { value: '4.9★', label: 'Customer Rating' },
] as const

export const APPLY_BANK_LOGOS = [
  { name: 'HDFC', logo: '/partners/hdfc.png' },
  { name: 'ICICI', logo: '/partners/icici.png' },
  { name: 'Axis', logo: '/partners/axis.png' },
  { name: 'SBI', logo: '/partners/sbi.png' },
  { name: 'Kotak', logo: '/partners/kotak.png' },
  { name: 'Bajaj Finance', logo: '/partners/partner-nbfc.svg' },
  { name: 'Tata Capital', logo: '/partners/partner-finance.svg' },
] as const

export const APPLY_BENEFITS = [
  'Free Eligibility Check',
  'Lowest Interest Rates',
  'Dedicated Relationship Manager',
  'Paperless Process',
  'Fast Approval',
] as const

export const APPLY_REVIEW = {
  quote: 'Home loan approved within 48 hours.',
  name: 'Rahul Sharma',
  city: 'Delhi',
  image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0B5D4B&color=fff&size=96',
  rating: 5,
} as const

export const APPLY_DOCUMENTS = [
  { id: 'pan', label: 'PAN Card', icon: 'id' },
  { id: 'aadhaar', label: 'Aadhaar Card', icon: 'id' },
  { id: 'bank', label: 'Bank Statement', icon: 'bank' },
  { id: 'salary', label: 'Salary Slip', icon: 'doc' },
  { id: 'itr', label: 'ITR', icon: 'doc' },
  { id: 'gst', label: 'GST Documents', icon: 'doc' },
] as const

export const APPLY_SUCCESS_STORIES = [
  {
    amount: '₹85 Lakh',
    product: 'Home Loan',
    time: '48 Hours',
    city: 'Delhi',
  },
  {
    amount: '₹1.2 Crore',
    product: 'Business Loan',
    time: '5 Days',
    city: 'Mumbai',
  },
] as const

export const APPLY_FAQ = [
  {
    q: 'Which products can I apply for here?',
    a: 'Global Apply covers all loans (home, LAP, auto, personal, business, working capital, education, machinery), plus Credit Card, Insurance, and CIBIL assistance — select the product first, then fill your details.',
  },
  {
    q: 'How long does the process take?',
    a: 'Most applications receive a callback within 24 hours. Sanction or issuance timelines depend on the product and documentation. Final approval is at the lender / insurer discretion.',
  },
  {
    q: 'What documents are required?',
    a: 'Typically PAN, Aadhaar, income proof (salary slips or ITR), and bank statements. Property papers for home/LAP; KYC for cards & insurance. Our team shares an exact checklist for your product.',
  },
  {
    q: 'Can self-employed applicants apply?',
    a: 'Yes. Business owners and professionals can apply with GST returns, ITR, and bank statements. We match partners suited to your profile. Subject to eligibility.',
  },
] as const

export const WIZARD_STEPS = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Employment' },
  { id: 3, label: 'Loan' },
  { id: 4, label: 'Review' },
] as const

export const LOAN_RATE_HINT: Record<string, { min: number; max: number; days: string }> = {
  'Home Loan': { min: 8.4, max: 9.5, days: '5–10 days' },
  'Loan Against Property': { min: 9, max: 11, days: '7–14 days' },
  'Personal Loan': { min: 10.5, max: 14, days: '24–48 hrs' },
  'Business Loan': { min: 11, max: 16, days: '5–7 days' },
  'Auto Loan (New Car)': { min: 8.5, max: 10, days: '3–5 days' },
  'Auto Loan (Used Car)': { min: 9.5, max: 12, days: '3–7 days' },
  'Education Loan': { min: 8.9, max: 11, days: '7–14 days' },
  'Machinery Loan': { min: 11, max: 14, days: '7–10 days' },
}

export const DRAFT_STORAGE_KEY = 'kuberfinserve_apply_draft_v2'

export const WORK_EXPERIENCE_OPTIONS = [
  'Less than 1 year',
  '1 – 3 years',
  '3 – 5 years',
  '5 – 10 years',
  '10+ years',
] as const
