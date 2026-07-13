export type CaseStudy = {
  id: string
  amount: string
  product: string
  customer: string
  city: string
  approvalTime: string
  image: string
  problem: string
  solution: string
  result: string
  timeline: { step: string; event: string }[]
  before: string
  after: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'home-85',
    amount: '₹85 Lakh',
    product: 'Home Loan',
    customer: 'Rahul Sharma',
    city: 'Delhi',
    approvalTime: '48 Hours',
    image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0B5D4B&color=fff&size=200',
    before: 'Multiple bank rejections; property booking deadline in 3 days.',
    after: 'Sanction letter received; disbursement before builder timeline.',
    problem:
      'Needed quick sanction for a ready-to-move flat. Direct bank visits took weeks with unclear documentation requirements.',
    solution:
      'KuberFinserve matched an lender with flexible income assessment, coordinated valuation within 24 hours, and handled legal coordination.',
    result: '₹85 Lakh sanctioned at a competitive floating rate. Full disbursement completed within 48 hours of document submission.',
    timeline: [
      { step: 'Day 1', event: 'Eligibility check, lender shortlist & document review' },
      { step: 'Day 2', event: 'Bank submission, legal verification & property valuation' },
      { step: 'Day 3', event: 'Sanction letter issued & disbursement initiated' },
    ],
  },
  {
    id: 'biz-120',
    amount: '₹1.2 Crore',
    product: 'Business Loan',
    customer: 'Priya Mehta',
    city: 'Gurgaon',
    approvalTime: '5 Days',
    image: 'https://ui-avatars.com/api/?name=Priya+Mehta&background=00C389&color=fff&size=200',
    before: 'Seasonal inventory funding needed; traditional bank TAT exceeded 3 weeks.',
    after: '₹1.2 Cr working capital line with flexible drawdown activated.',
    problem:
      'Retail business required urgent working capital before festival season. Existing OD limit was insufficient and renewal was delayed.',
    solution:
      'Structured GST-based lending program with a dedicated relationship manager and digital document collection across lenders.',
    result: '₹1.2 Crore limit approved with staggered drawdown. First tranche disbursed on day 5.',
    timeline: [
      { step: 'Day 1–2', event: 'Financial assessment, GST analysis & lender matching' },
      { step: 'Day 3–4', event: 'Underwriting, field verification & credit committee' },
      { step: 'Day 5', event: 'Limit sanctioned & first drawdown activated' },
    ],
  },
  {
    id: 'lap-45',
    amount: '₹45 Lakh',
    product: 'Loan Against Property',
    customer: 'Amit Verma',
    city: 'Noida',
    approvalTime: '72 Hours',
    image: 'https://ui-avatars.com/api/?name=Amit+Verma&background=0F172A&color=fff&size=200',
    before: 'Business expansion capital needed without selling residential property.',
    after: '₹45 Lakh loan against property disbursed with 15-year tenure option.',
    problem:
      'Required funds for manufacturing expansion. Personal loan limits were too low; selling property was not an option.',
    solution:
      'Loan against property from NBFC partner with competitive LTV, end-to-end legal support, and parallel processing of valuation & credit.',
    result: '₹45 Lakh disbursed at attractive rate with flexible prepayment. Business equipment funded on schedule.',
    timeline: [
      { step: 'Day 1', event: 'Property valuation & title search initiated' },
      { step: 'Day 2', event: 'Credit appraisal & legal clearance' },
      { step: 'Day 3–4', event: 'Sanction & disbursement to business account' },
    ],
  },
  {
    id: 'personal-25',
    amount: '₹25 Lakh',
    product: 'Personal Loan',
    customer: 'Kavita Nair',
    city: 'Ghaziabad',
    approvalTime: '24 Hours',
    image: 'https://ui-avatars.com/api/?name=Kavita+Nair&background=22C55E&color=fff&size=200',
    before: 'Medical emergency fund required; salaried profile with average CIBIL.',
    after: '₹25 Lakh personal loan disbursed same week.',
    problem:
      'Urgent hospital expenses with limited savings. Online aggregator offers had high processing fees and unclear terms.',
    solution:
      'Pre-approved offer from partner bank after soft eligibility check; digital KYC and e-mandate setup.',
    result: '₹25 Lakh at competitive rate with 4-year tenure. Funds credited within 24 hours of final approval.',
    timeline: [
      { step: 'Hour 1–4', event: 'Profile review & instant eligibility' },
      { step: 'Hour 5–12', event: 'Digital KYC & income verification' },
      { step: 'Hour 13–24', event: 'Final approval & disbursement' },
    ],
  },
]

export const TRUST_METRICS = [
  { value: '25,000+', label: 'Happy Customers' },
  { value: '₹500+ Cr', label: 'Loans Facilitated' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '50+', label: 'Lending Partners' },
] as const

export const GOOGLE_REVIEWS = [
  {
    name: 'Mr. Neeraj Kumar',
    rating: 5,
    text: 'Transparent home loan guidance. Best rate we found across three banks.',
    date: '2 weeks ago',
    city: 'Delhi',
  },
  {
    name: 'Mr. Sachin Agarwal',
    rating: 5,
    text: 'Business loan closed in 5 days. Professional team from start to disbursement.',
    date: '1 month ago',
    city: 'Faridabad',
  },
  {
    name: 'Mukesh Sharma',
    rating: 5,
    text: 'Expert loan against property guidance — saved time and got a better offer than going direct.',
    date: '3 weeks ago',
    city: 'Jaipur',
  },
  {
    name: 'Anita Singh',
    rating: 5,
    text: 'Insurance and credit card sorted in one place. Fast response always.',
    date: '1 week ago',
    city: 'Ghaziabad',
  },
] as const
