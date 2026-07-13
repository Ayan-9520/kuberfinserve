export interface LoanProduct {
  slug: string
  title: string
  shortTitle: string
  description: string
  rateFrom: string
  heroImage?: string
  features: string[]
  benefits: string[]
  eligibility: string[]
  documents: string[]
  metaTitle: string
  metaDescription: string
}

export const LOANS: Record<string, LoanProduct> = {
  'new-car-loan': {
    slug: 'new-car-loan',
    title: 'New Car Loan',
    shortTitle: 'New Car Loan',
    description:
      'Finance your brand-new vehicle with attractive interest rates, flexible tenure, and quick disbursal from leading banks and NBFCs.',
    rateFrom: '8.5%',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85',
    features: ['Up to 100% on-road funding', 'Flexible tenure up to 7 years', 'Minimal documentation', 'Quick approval'],
    benefits: ['Competitive interest rates', 'Doorstep documentation', 'Pre-approved offers for salaried', 'Balance transfer options'],
    eligibility: ['Age 21–65 years', 'Minimum income as per lender norms', 'Stable employment or business', 'Good credit score preferred'],
    documents: ['ID & address proof', 'Income proof', 'Bank statements', 'Vehicle proforma invoice'],
    metaTitle: 'New Car Loan | KuberFinserve',
    metaDescription: 'Apply for new car loan with best rates. Quick approval and easy documentation across India.',
  },
  'used-car-loan': {
    slug: 'used-car-loan',
    title: 'Used Car Loan',
    shortTitle: 'Used Car Loan',
    description:
      'Get financing for pre-owned cars with verified valuation, transparent terms, and lender options suited to your budget.',
    rateFrom: '9.2%',
    heroImage: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1920&q=85',
    features: ['Cars up to 10 years old', 'Valuation support', 'Flexible EMI', 'Multiple lender options'],
    benefits: ['Affordable EMIs', 'Fast processing', 'Expert car loan advisors', 'PAN-India coverage'],
    eligibility: ['Age 21–65 years', 'Regular income source', 'Vehicle not older than 10 years', 'Clear RC & insurance'],
    documents: ['KYC documents', 'Income proof', 'RC copy & insurance', 'Valuation report'],
    metaTitle: 'Used Car Loan | KuberFinserve',
    metaDescription: 'Used car loan with easy approval. Compare lenders and get the best deal on pre-owned vehicles.',
  },
  'home-loan': {
    slug: 'home-loan',
    title: 'Home Loan',
    shortTitle: 'Home Loan',
    description:
      'The home loan is advanced to a person to assist in buying a house or condominium. Compare top lenders and secure your dream home.',
    rateFrom: '8.4%',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85',
    features: ['Purchase & construction', 'Balance transfer', 'Top-up facility', 'Tax benefits eligible'],
    benefits: ['Lowest rate comparison', 'Dedicated relationship manager', 'Doorstep service', 'Women borrower benefits'],
    eligibility: ['Age 21–65 years', 'Stable income', 'Property clear title', 'CIBIL score 650+ preferred'],
    documents: ['KYC & income proof', 'Property documents', 'Bank statements', 'Photographs'],
    metaTitle: 'Home Loan | KuberFinserve',
    metaDescription: 'Apply for home loan at competitive rates. Expert guidance for purchase, construction & balance transfer.',
  },
  'personal-loan': {
    slug: 'personal-loan',
    title: 'Personal Loan',
    shortTitle: 'Personal Loan',
    description:
      'A personal loan is typically issued for a specific amount and can be used for various purposes at the discretion of the borrower.',
    rateFrom: '10.5%',
    heroImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=85',
    features: ['No collateral required', 'Quick disbursal', 'Flexible end-use', 'Tenure up to 5 years'],
    benefits: ['Minimal paperwork', 'Online application', 'Competitive rates', 'Prepayment options'],
    eligibility: ['Salaried or self-employed', 'Minimum age 21 years', 'Stable income history', 'Good credit profile'],
    documents: ['Identity & address proof', 'Salary slips / ITR', 'Bank statements', 'Employment proof'],
    metaTitle: 'Personal Loan | KuberFinserve',
    metaDescription: 'Personal loan with quick approval. Compare rates from multiple banks and NBFCs.',
  },
  'business-loan': {
    slug: 'business-loan',
    title: 'Business Loan',
    shortTitle: 'Business Loan',
    description:
      'Working capital and term loans for SMEs, traders, and professionals to expand operations, purchase inventory, or manage cash flow.',
    rateFrom: '11%',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=85',
    features: ['Working capital & term loan', 'Unsecured & secured options', 'Quick turnaround', 'Customized structures'],
    benefits: ['Growth-focused advisory', 'Multiple product types', 'GST & turnover based programs', 'Renewal facilities'],
    eligibility: ['Business vintage 2+ years', 'Positive cash flow', 'GST registration (where applicable)', 'Clean repayment track'],
    documents: ['Business KYC', 'Financials & ITR', 'Bank statements', 'GST returns'],
    metaTitle: 'Business Loan | KuberFinserve',
    metaDescription: 'Business loan for SMEs and enterprises. Flexible funding with expert broking support.',
  },
  'loan-against-property': {
    slug: 'loan-against-property',
    title: 'Loan Against Property',
    shortTitle: 'Loan Against Property',
    description:
      'Unlock the value of your residential or commercial property for business expansion, education, or personal needs at lower interest rates.',
    rateFrom: '9%',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85',
    features: ['High loan amount', 'Longer tenure', 'Residential & commercial', 'Multipurpose usage'],
    benefits: ['Lower rate than unsecured', 'Higher eligibility', 'Top-up available', 'Balance transfer'],
    eligibility: ['Clear property title', 'Age 25–65 years', 'Stable income', 'Property in approved location'],
    documents: ['Property papers', 'KYC & income proof', 'Bank statements', 'Existing loan statements if any'],
    metaTitle: 'Loan Against Property | KuberFinserve',
    metaDescription: 'Loan Against Property at attractive rates. Use property equity for business or personal needs.',
  },
  'education-loan': {
    slug: 'education-loan',
    title: 'Education Loan',
    shortTitle: 'Education Loan',
    description:
      'Fund higher education in India or abroad with moratorium period, tax benefits, and co-borrower options from leading lenders.',
    rateFrom: '8.9%',
    heroImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=85',
    features: ['Domestic & international', 'Moratorium period', 'Co-applicant accepted', 'Course-based limits'],
    benefits: ['Section 80E tax benefit', 'Collateral-free up to limits', 'Career-focused counseling', 'Fast sanction letters'],
    eligibility: ['Confirmed admission', 'Co-borrower income proof', 'Academic record', 'Course from recognized institute'],
    documents: ['Admission letter', 'Fee structure', 'KYC of student & co-borrower', 'Income proof'],
    metaTitle: 'Education Loan | KuberFinserve',
    metaDescription: 'Education loan for India and abroad. Compare lenders and secure admission funding.',
  },
  'machinery-loan': {
    slug: 'machinery-loan',
    title: 'Machinery Loan',
    shortTitle: 'Machinery Loan',
    description:
      'Finance purchase of new or upgraded machinery for your business with flexible tenure, competitive rates, and quick lender matching.',
    rateFrom: '10.5%',
    heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=85',
    features: ['Supports equipment & machinery purchase', 'Flexible repayment tenure', 'Fast documentation review', 'Business expansion oriented'],
    benefits: ['Lower upfront burden', 'Multiple lender options', 'Advisors to help with eligibility', 'Structured repayment plans'],
    eligibility: ['Business/enterprise owner', 'Valid business documents as per lender', 'Stable repayment track record', 'Machinery quotation and usage details'],
    documents: ['Business KYC', 'Quotation/invoice for machinery', 'Bank statements', 'GST/ITR documents (where applicable)'],
    metaTitle: 'Machinery Loan | KuberFinserve',
    metaDescription: 'Apply for Machinery Loan with flexible tenure and quick lender matching. Finance business equipment and growth.',
  },
}

/** Display order for loan categories (home, menu, footer) */
export const LOAN_SLUG_ORDER = [
  'home-loan',
  'loan-against-property',
  'new-car-loan',
  'used-car-loan',
  'personal-loan',
  'business-loan',
  'education-loan',
  'machinery-loan',
] as const

export const LOAN_CARDS = LOAN_SLUG_ORDER.map((slug) => {
  const loan = LOANS[slug]
  return {
    slug: loan.slug,
    title: loan.shortTitle,
    description: loan.description.slice(0, 100) + '…',
    rateFrom: loan.rateFrom,
    path: `/loans/${loan.slug}`,
    features: loan.features,
  }
})
