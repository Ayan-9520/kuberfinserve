export const ELIGIBILITY_PAGE = {
  title: 'Check Loan Eligibility',
  description:
    'Get an instant indicative eligibility estimate based on income, credit score, existing EMIs and loan type. Compare what you may qualify for — subject to lender policy.',
  heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=85',
  metaTitle: 'Check Loan Eligibility Online — Instant Estimate | KuberFinserve',
  metaDescription:
    'Free loan eligibility calculator for home, personal, business, LAP & more. Instant indicative amount, EMI & rate estimate. Subject to eligibility — no approval guarantee.',
  keywords:
    'check loan eligibility, loan eligibility calculator, home loan eligibility, personal loan eligibility India, FOIR calculator, KuberFinserve',
} as const

export const ELIGIBILITY_FAQS = [
  {
    q: 'Is this eligibility check a loan approval?',
    a: 'No. This is an indicative assessment based on common lending norms (income, FOIR, credit score and product limits). Final sanction is solely at the discretion of the Bank or NBFC.',
  },
  {
    q: 'How is eligibility calculated?',
    a: 'We estimate surplus EMI capacity using FOIR (fixed obligation to income), apply product-wise income multipliers, adjust for credit score bands and cap against product maximums. Rates shown are starting-from indicative figures.',
  },
  {
    q: 'What is FOIR?',
    a: 'Fixed Obligation to Income Ratio — the share of monthly income already committed to EMIs. Lenders typically keep total obligations within a defined percentage of income.',
  },
  {
    q: 'Do I need to share documents to see the estimate?',
    a: 'No documents are required for the online estimate. For actual lender matching, KYC and income proofs will be needed later.',
  },
  {
    q: 'Will this check affect my CIBIL score?',
    a: 'No. This is a self-assessment tool on our website and does not trigger a hard bureau enquiry.',
  },
  {
    q: 'What if I am shown as not eligible?',
    a: 'You may still explore secured products, a co-applicant, lower amount, longer tenure or credit improvement. Talk to our advisors for realistic options — never guaranteed.',
  },
  {
    q: 'Are interest rates guaranteed?',
    a: 'No. Rates are indicative starting-from figures and vary by lender, profile and market conditions.',
  },
  {
    q: 'Can NRIs use this tool?',
    a: 'The calculator uses resident-oriented norms. NRI eligibility differs by lender — contact us for product-specific guidance.',
  },
] as const

export const ELIGIBILITY_STEPS = [
  { step: '01', title: 'Select Product', desc: 'Choose the loan type you want to check.' },
  { step: '02', title: 'Enter Profile', desc: 'Income, age, credit score & existing EMIs.' },
  { step: '03', title: 'View Estimate', desc: 'See indicative amount, EMI & next steps.' },
] as const
