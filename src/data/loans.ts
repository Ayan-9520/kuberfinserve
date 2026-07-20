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
  keywords: string
  minIncome?: string
  /** Override hero stat label for amount column (e.g. Funding) */
  amountLabel?: string
}

export const LOANS: Record<string, LoanProduct> = {
  'home-loan': {
    slug: 'home-loan',
    title: 'Home Loan',
    shortTitle: 'Home Loan',
    description:
      'Compare home loan offers from 100+ banks and NBFCs. Purchase ready or under-construction property, self-build, balance transfer or top-up — with expert guidance at every step. Subject to eligibility.',
    rateFrom: '7.10% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=85',
    features: [
      'Purchase Ready Property',
      'Under Construction Property',
      'Self Construction',
      'Plot + Construction',
      'Balance Transfer',
      'Top Up Facility',
      'Doorstep Documentation',
      'PAN India Service',
      'Digital Process',
      '100+ Lending Partners',
      'Low EMI Options',
      'No Hidden Charges',
    ],
    benefits: [
      'Dedicated relationship manager',
      'Lowest rate comparison across lenders',
      'Women co-applicant benefits with select banks',
      'Tax planning guidance on eligible products',
      'End-to-end documentation support',
      'Transparent fee communication upfront',
    ],
    eligibility: [
      'Salaried professionals',
      'Self employed individuals',
      'Doctors, CAs & professionals',
      'NRI applicants (selected lenders)',
      'Minimum income: ₹25,000+ per month*',
      'Loan tenure: Up to 30 years*',
      ...['Age: 21–70 years (lender specific)', 'Resident Indian', 'Stable income', 'Good credit history preferred'],
    ],
    documents: [
      'Identity: PAN, Aadhaar, Passport, Driving Licence',
      'Address: Aadhaar, Passport, Utility Bill',
      'Income: Salary Slips, Form 16, ITR, Bank Statements',
      'Property: Sale deed, approved plan, chain documents',
    ],
    minIncome: '₹25,000+ per month*',
    metaTitle: 'Home Loan — Starting From 7.10% p.a.* | Compare 100+ Lenders | KuberFinserve',
    metaDescription:
      'Apply for home loan online. Rates starting from 7.10% p.a.*, funding up to ₹25 Crore, tenure up to 30 years. Compare HDFC, ICICI, SBI & more. Subject to eligibility.',
    keywords:
      'home loan, home loan interest rate, home loan apply online, housing loan India, balance transfer home loan, home loan eligibility, KuberFinserve',
  },
  'loan-against-property': {
    slug: 'loan-against-property',
    title: 'Loan Against Property',
    shortTitle: 'Loan Against Property',
    description:
      'Unlock property value for business expansion, education or personal goals. Compare LAP offers on residential, commercial and industrial property with funding up to ₹25 Crore*. Subject to eligibility.',
    rateFrom: '9.00% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85',
    features: [
      'Residential Property',
      'Commercial Property',
      'Industrial Property',
      'Rental Property',
      'Balance Transfer',
      'Top Up Loan',
      'OD Facility Available',
      'High Funding',
      'Lower Interest vs Unsecured',
      'Flexible EMI',
      'Minimal Documentation',
    ],
    benefits: [
      'Higher loan amounts vs personal loans',
      'Longer repayment tenure options',
      'Multipurpose end-use flexibility',
      'Dedicated valuation & legal support',
      'Balance transfer for rate savings',
      'Relationship manager through disbursal',
    ],
    eligibility: [
      'Clear property title & approved location',
      'Salaried, self employed & professionals',
      'Age: 21–70 years (lender specific)',
      'Stable income & repayment capacity',
      'Good credit history preferred',
      'Loan tenure: Up to 20 years*',
    ],
    documents: [
      'Identity & address proof (PAN, Aadhaar)',
      'Income: Salary slips / ITR / GST / Bank statements',
      'Property: Title deed, approved plan, tax receipts',
      'Existing loan statements (if any)',
    ],
    metaTitle: 'Loan Against Property — From 9.00% p.a.* | Up to ₹25 Cr | KuberFinserve',
    metaDescription:
      'Loan against property starting from 9.00% p.a.* Funding up to ₹25 Crore, tenure up to 20 years. Residential & commercial LAP. Subject to eligibility.',
    keywords:
      'loan against property, LAP, mortgage loan, property loan India, LAP interest rate, commercial property loan, KuberFinserve',
  },
  'business-loan': {
    slug: 'business-loan',
    title: 'Business Loan',
    shortTitle: 'Business Loan',
    description:
      'Fuel MSME growth with term loans for expansion, machinery and working needs. Compare secured and unsecured business loan programs from leading banks and NBFCs. Subject to eligibility.',
    rateFrom: '10.50% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=85',
    features: [
      'MSME Loan',
      'Expansion Loan',
      'Machinery Purchase',
      'Working Capital (Term)',
      'GST Based Funding',
      'OD Facility',
      'CC Facility',
      'Digital Approval',
      'Fast Disbursal',
    ],
    benefits: [
      'Growth-focused business advisory',
      'GST turnover-based programs',
      'Flexible secured & unsecured structures',
      'Renewal & enhancement support',
      'Multiple lender comparison in one place',
      'Minimal documentation for digital programs',
    ],
    eligibility: [
      'Business vintage: 2+ years preferred',
      'GST registered entities (where applicable)',
      'Positive cash flow & banking conduct',
      'Age: 21–70 years (lender specific)',
      'Resident Indian business owners',
      'Loan tenure: Up to 10 years*',
    ],
    documents: [
      'Business KYC & registration proof',
      'GST returns & financial statements',
      'ITR (last 2–3 years)',
      'Bank statements (6–12 months)',
    ],
    metaTitle: 'Business Loan — From 10.50% p.a.* | MSME Funding Up to ₹10 Cr | KuberFinserve',
    metaDescription:
      'Business loan for MSMEs starting from 10.50% p.a.* Funding up to ₹10 Crore. GST-based, unsecured & secured options. Subject to eligibility.',
    keywords:
      'business loan, MSME loan, SME loan India, business loan interest rate, GST business loan, unsecured business loan, KuberFinserve',
  },
  'working-capital': {
    slug: 'working-capital',
    title: 'Working Capital Loan',
    shortTitle: 'Working Capital',
    description:
      'Strengthen cash flow with cash credit, overdraft and invoice finance limits. Ideal for inventory, vendor payments and seasonal business cycles. Subject to eligibility.',
    rateFrom: '9.50% p.a.*',
    amountLabel: 'Maximum Funding',
    heroImage: '/partners/marketing/12-working-capital.png',
    features: [
      'Improve Cash Flow',
      'Seasonal Funding',
      'GST Based Assessment',
      'Inventory Finance',
      'Invoice Discounting',
      'Vendor Payment Support',
      'Business Growth Capital',
      'Cash Credit (CC)',
      'Overdraft (OD)',
      'Invoice Finance',
    ],
    benefits: [
      'Revolving limit — pay interest on utilisation only',
      'Festival & peak-season limit enhancements',
      'Multiple lender CC/OD comparison',
      'Dedicated advisor for limit renewal',
      'Stock & debtor-based drawing power guidance',
      'Digital limit tracking support',
    ],
    eligibility: [
      'Business vintage: 1+ years',
      'Stable turnover & GST filings',
      'Positive banking conduct',
      'Adequate debt service coverage',
      'Age: 21–70 years (lender specific)',
      'Facilities: Cash Credit, Overdraft, Invoice Finance*',
    ],
    documents: [
      'Business KYC & registration',
      'GST returns (12 months)',
      'Audited/unaudited financials & ITR',
      'Bank statements & stock/debtor statements',
    ],
    metaTitle: 'Working Capital Loan — From 9.50% p.a.* | Up to ₹20 Cr Limit | KuberFinserve',
    metaDescription:
      'Working capital loan & OD limits from 9.50% p.a.* Funding up to ₹20 Crore. Cash credit, overdraft & invoice finance. Subject to eligibility.',
    keywords:
      'working capital loan, cash credit, overdraft for business, invoice discounting, CC limit, business OD, KuberFinserve',
  },
  'personal-loan': {
    slug: 'personal-loan',
    title: 'Personal Loan',
    shortTitle: 'Personal Loan',
    description:
      'Unsecured personal loans for medical needs, weddings, travel, education and more. Compare instant eligibility offers from multiple banks — no collateral required. Subject to eligibility.',
    rateFrom: '10.49% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&q=85',
    features: [
      'No Collateral Required',
      'Instant Eligibility Check',
      'Quick Approval Journey',
      'Medical Expenses',
      'Wedding',
      'Travel',
      'Education',
      'Personal Needs',
    ],
    benefits: [
      'Minimal documentation for salaried',
      'Flexible tenure & EMI options',
      'Prepayment options on select lenders',
      'Digital end-to-end for eligible profiles',
      'Compare rates before you commit',
      'No hidden charges — transparent advice',
    ],
    eligibility: [
      'Salaried & self employed',
      'Age: 21–70 years (lender specific)',
      'Stable income history',
      'Good credit score preferred (700+)',
      'Resident Indian',
      'Loan tenure: Up to 7 years*',
    ],
    documents: [
      'Identity & address proof',
      'Salary slips / Form 16 or ITR',
      'Bank statements (3–6 months)',
      'Employment / business proof',
    ],
    metaTitle: 'Personal Loan — From 10.49% p.a.* | Up to ₹50 Lakh | KuberFinserve',
    metaDescription:
      'Personal loan starting from 10.49% p.a.* Up to ₹50 Lakh, tenure up to 7 years. No collateral. Quick approval for eligible profiles. Subject to eligibility.',
    keywords:
      'personal loan, instant personal loan, personal loan interest rate, unsecured loan, personal loan eligibility, KuberFinserve',
  },
  'new-car-loan': {
    slug: 'new-car-loan',
    title: 'New Car Loan',
    shortTitle: 'New Car Loan',
    description:
      'Drive home your new car, SUV or EV with up to 100% on-road funding*. Compare auto loan rates from leading banks with flexible EMI and fast approval. Subject to eligibility.',
    rateFrom: '7.75% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=85',
    features: [
      'New Cars',
      'SUV & MUV',
      'Electric Vehicles (EV)',
      'Luxury Cars',
      'Doorstep Service',
      'Fast Approval',
      'Flexible EMI',
      'Up to 100% On Road Funding*',
    ],
    benefits: [
      'Dealer tie-up with major brands',
      'Pre-approved offers for salaried',
      'Competitive rates for EV segment',
      'Balance transfer from existing auto loan',
      'Minimal down payment options*',
      'Expert car loan specialists',
    ],
    eligibility: [
      'Salaried & self employed',
      'Age: 21–70 years at loan maturity',
      'Stable income as per lender norms',
      'Approved dealer & vehicle model',
      'Loan tenure: Up to 8 years*',
    ],
    documents: [
      'KYC & address proof',
      'Income proof & bank statements',
      'Proforma invoice from dealer',
      'Driving licence (preferred)',
    ],
    metaTitle: 'New Car Loan — From 7.75% p.a.* | 100% On Road Funding* | KuberFinserve',
    metaDescription:
      'New car loan from 7.75% p.a.* Up to 100% on-road funding, tenure up to 8 years. SUV, EV & luxury cars. Subject to eligibility.',
    keywords:
      'new car loan, car loan interest rate, auto loan India, EV car loan, 100 percent car loan, KuberFinserve',
  },
  'used-car-loan': {
    slug: 'used-car-loan',
    title: 'Used Car Loan',
    shortTitle: 'Used Car Loan',
    description:
      'Finance pre-owned cars from dealers or individuals with verified valuation and transparent terms. Luxury and standard vehicles welcome. Subject to eligibility.',
    rateFrom: '9.25% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=1920&q=85',
    features: [
      'Used Cars',
      'Luxury Pre-Owned Cars',
      'Dealer Purchase',
      'Individual Purchase',
      'Fast Approval',
      'High Funding',
      'Flexible EMI',
    ],
    benefits: [
      'Empanelled valuation support',
      'Affordable EMIs vs new car segment',
      'Multiple lender options for older vehicles',
      'Expert guidance on RC transfer',
      'PAN India dealer network',
      'Quick digital processing',
    ],
    eligibility: [
      'Vehicle age: Typically up to 8–10 years*',
      'Clear RC, insurance & no pending hypothecation',
      'Age: 21–70 years (lender specific)',
      'Stable income source',
      'Loan tenure: Up to 7 years*',
    ],
    documents: [
      'KYC & income proof',
      'RC copy, insurance & valuation report',
      'Sale agreement with dealer/seller',
      'Bank statements',
    ],
    metaTitle: 'Used Car Loan — From 9.25% p.a.* | Up to ₹5 Cr | KuberFinserve',
    metaDescription:
      'Used car loan from 9.25% p.a.* Funding up to ₹5 Crore for luxury pre-owned cars. Dealer & individual purchase. Subject to eligibility.',
    keywords:
      'used car loan, second hand car loan, pre owned car finance, used car loan interest rate, KuberFinserve',
  },
  'education-loan': {
    slug: 'education-loan',
    title: 'Education Loan',
    shortTitle: 'Education Loan',
    description:
      'Fund higher education in India or abroad — tuition, living expenses and skill courses. Moratorium options and tax benefits on eligible products. Subject to eligibility.',
    rateFrom: '8.15% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=85',
    features: [
      'Study in India',
      'Study Abroad',
      'Living Expenses Cover',
      'Tuition Fees',
      'Skill & Certification Courses',
      'Moratorium Period',
      'Tax Benefits (Section 80E)*',
    ],
    benefits: [
      'Sanction letter support for visa/admission',
      'Co-applicant structuring guidance',
      'Collateral-free up to lender limits*',
      'Girl child concessions with select banks',
      'Course & university eligibility check',
      'End-to-end documentation assistance',
    ],
    eligibility: [
      'Confirmed admission to recognized institute',
      'Co-applicant with stable income',
      'Academic record as per lender norms',
      'Age: 21–70 years for co-applicant',
      'Loan tenure: Up to 15 years*',
    ],
    documents: [
      'Admission letter & fee structure',
      'KYC of student & co-applicant',
      'Co-applicant income proof & ITR',
      'Academic records & mark sheets',
    ],
    metaTitle: 'Education Loan — From 8.15% p.a.* | Up to ₹3 Cr | India & Abroad | KuberFinserve',
    metaDescription:
      'Education loan from 8.15% p.a.* Up to ₹3 Crore for India & abroad. Moratorium & tax benefits on eligible products. Subject to eligibility.',
    keywords:
      'education loan, study abroad loan, education loan interest rate, student loan India, moratorium education loan, KuberFinserve',
  },
  'machinery-loan': {
    slug: 'machinery-loan',
    title: 'Machinery Loan',
    shortTitle: 'Machinery Loan',
    description:
      'Upgrade manufacturing and operations with new or used machinery finance. Plant equipment, medical devices and construction machinery covered. Subject to eligibility.',
    rateFrom: '9.25% p.a.*',
    heroImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=85',
    features: [
      'New Machinery',
      'Used Machinery',
      'Plant Equipment',
      'Manufacturing Assets',
      'Construction Equipment',
      'Medical Equipment',
      'Flexible EMI',
    ],
    benefits: [
      'Asset-backed competitive pricing',
      'Structured repayment aligned to cash flows',
      'Direct supplier/dealer disbursal',
      'Hypothecation guidance',
      'MSME & corporate programs',
      'Multiple lender comparison',
    ],
    eligibility: [
      'Business/enterprise owner',
      'Stable operations & financials',
      'Machinery quotation from approved vendor',
      'Age: 21–70 years (lender specific)',
      'Loan tenure: Up to 10 years*',
    ],
    documents: [
      'Business KYC & registration',
      'Machinery quotation / proforma invoice',
      'Financials, GST & ITR',
      'Bank statements (6–12 months)',
    ],
    metaTitle: 'Machinery Loan — From 9.25% p.a.* | Up to ₹15 Cr | KuberFinserve',
    metaDescription:
      'Machinery loan from 9.25% p.a.* Funding up to ₹15 Crore for new & used equipment. Manufacturing & medical devices. Subject to eligibility.',
    keywords:
      'machinery loan, equipment finance, plant machinery loan, industrial equipment loan, KuberFinserve',
  },
}

export const LOAN_SLUG_ORDER = [
  'home-loan',
  'loan-against-property',
  'new-car-loan',
  'used-car-loan',
  'personal-loan',
  'business-loan',
  'working-capital',
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

export function getRelatedLoans(slug: string, count = 4): LoanProduct[] {
  const idx = LOAN_SLUG_ORDER.indexOf(slug as (typeof LOAN_SLUG_ORDER)[number])
  const related: LoanProduct[] = []
  for (let i = 1; i <= LOAN_SLUG_ORDER.length && related.length < count; i++) {
    const next = LOAN_SLUG_ORDER[(idx + i) % LOAN_SLUG_ORDER.length]
    if (next !== slug) related.push(LOANS[next]!)
  }
  return related
}
