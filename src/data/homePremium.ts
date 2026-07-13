export const PREMIUM_STATS = [
  { label: 'Loans Disbursed', value: '₹500+', suffix: 'Crore', numeric: 500 },
  { label: 'Customers Served', value: 25000, suffix: '+', numeric: 25000 },
  { label: 'Lending Partners', value: 50, suffix: '+', numeric: 50 },
  { label: 'Customer Rating', value: '4.9', suffix: '★', numeric: 4.9 },
] as const

export const PARTNER_BANKS = [
  { name: 'HDFC Bank', logo: '/partners/hdfc.png' },
  { name: 'ICICI Bank', logo: '/partners/icici.png' },
  { name: 'Axis Bank', logo: '/partners/axis.png' },
  { name: 'State Bank of India', logo: '/partners/sbi.png' },
  { name: 'Punjab National Bank', logo: '/partners/pnb.png' },
  { name: 'Yes Bank', logo: '/partners/yes.png' },
  { name: 'Union Bank', logo: '/partners/union.png' },
  { name: 'Bank of Baroda', logo: '/partners/bob.png' },
] as const

export const PREMIUM_SERVICES = [
  {
    title: 'Home Loan',
    description: 'Purchase, construction & balance transfer with lowest rates from 50+ lenders.',
    path: '/loans/home-loan',
    icon: 'home',
    gradient: 'from-emerald-500/20 to-teal-600/10',
  },
  {
    title: 'Loan Against Property',
    description: 'Unlock property value with high loan amounts & flexible tenure.',
    path: '/loans/loan-against-property',
    icon: 'building',
    gradient: 'from-violet-500/20 to-purple-600/10',
  },
  {
    title: 'Business Loan',
    description: 'Expansion funding for SMEs with fast turnaround & expert guidance.',
    path: '/loans/business-loan',
    icon: 'briefcase',
    gradient: 'from-cyan-500/20 to-blue-600/10',
  },
  {
    title: 'Personal Loan',
    description: 'Quick funds for life goals with minimal documentation.',
    path: '/loans/personal-loan',
    icon: 'user',
    gradient: 'from-amber-500/20 to-orange-600/10',
  },
  {
    title: 'Working Capital',
    description: 'Fuel daily operations & cash flow with flexible working capital solutions.',
    path: '/loans/business-loan',
    icon: 'trending',
    gradient: 'from-teal-500/20 to-emerald-600/10',
  },
  {
    title: 'Credit Cards',
    description: 'Premium cards from top banks with expert comparison.',
    path: '/credit-card',
    icon: 'card',
    gradient: 'from-rose-500/20 to-pink-600/10',
  },
  {
    title: 'Insurance',
    description: 'Life & general insurance tailored to protect what matters.',
    path: '/insurance',
    icon: 'shield',
    gradient: 'from-sky-500/20 to-indigo-600/10',
  },
  {
    title: 'Balance Transfer',
    description: 'Switch to lower rates & reduce your EMI burden effortlessly.',
    path: '/loans/home-loan',
    icon: 'refresh',
    gradient: 'from-indigo-500/20 to-blue-600/10',
  },
  {
    title: 'Top Up Loan',
    description: 'Additional funding on your existing loan at competitive rates.',
    path: '/apply-loan',
    icon: 'plus',
    gradient: 'from-lime-500/20 to-green-600/10',
  },
  {
    title: 'EMI Calculator',
    description: 'Plan your loan with instant EMI, interest & tenure calculations.',
    path: '/emi-calculator',
    icon: 'calculator',
    gradient: 'from-fuchsia-500/20 to-purple-600/10',
  },
  {
    title: 'CIBIL Assistance',
    description: 'Expert guidance to improve your credit score & loan eligibility.',
    path: '/contact-us',
    icon: 'gauge',
    gradient: 'from-orange-500/20 to-red-600/10',
  },
  {
    title: 'Financial Resources',
    description: 'Guides, tools & expert insights for smarter financial decisions.',
    path: '/about-us',
    icon: 'book',
    gradient: 'from-slate-500/20 to-gray-600/10',
  },
] as const

export const PREMIUM_BENEFITS = [
  { title: 'AI Powered Loan Matching', description: 'Smart algorithms match you with the best lender for your profile.', icon: 'sparkles' },
  { title: '50+ Lending Partners', description: 'Compare offers from India\'s leading banks & NBFCs in one place.', icon: 'building' },
  { title: 'Multiple Insurance Partners', description: 'Life & general insurance from trusted insurers nationwide.', icon: 'shield' },
  { title: 'Fast Processing', description: 'Digital workflows with approvals within 24–72 hours.', icon: 'zap' },
  { title: 'Dedicated Relationship Managers', description: 'Single point of contact from application to disbursement.', icon: 'user-check' },
  { title: 'Digital Documentation', description: 'Upload KYC & income docs securely from your phone.', icon: 'file' },
  { title: 'Transparent Process', description: 'No hidden charges — clear fee communication upfront.', icon: 'eye' },
  { title: 'PAN India Service', description: 'Serving customers across India with nationwide coverage.', icon: 'globe' },
  { title: 'Dedicated Operations Team', description: 'Expert ops support from qualification to disbursal.', icon: 'headphones' },
] as const

export const LOAN_PROCESS_STEPS = [
  { step: 1, title: 'Check Eligibility', description: 'Share basic details for instant AI-powered eligibility assessment.' },
  { step: 2, title: 'Upload Documents', description: 'Submit KYC, income & property documents digitally.' },
  { step: 3, title: 'Bank Verification', description: 'Lender reviews your profile & conducts verification.' },
  { step: 4, title: 'Loan Approval', description: 'Receive sanction letter with final terms & rates.' },
  { step: 5, title: 'Disbursement', description: 'Funds credited to your account — hassle-free.', icon: 'check' },
] as const

export const SUCCESS_STORIES = [
  {
    amount: '₹85 Lakh',
    product: 'Home Loan',
    timeline: 'Approved in 48 Hours',
    name: 'Rahul Sharma',
    city: 'Delhi',
    image: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=0B5D4B&color=fff&size=128',
  },
  {
    amount: '₹1.2 Crore',
    product: 'Business Loan',
    timeline: 'Approved in 5 Days',
    name: 'Priya Mehta',
    city: 'Gurgaon',
    image: 'https://ui-avatars.com/api/?name=Priya+Mehta&background=00C389&color=fff&size=128',
  },
  {
    amount: '₹45 Lakh',
    product: 'Loan Against Property',
    timeline: 'Approved in 72 Hours',
    name: 'Amit Verma',
    city: 'Noida',
    image: 'https://ui-avatars.com/api/?name=Amit+Verma&background=0F172A&color=fff&size=128',
  },
] as const

export const PREMIUM_TESTIMONIALS = [
  {
    quote: 'KuberFinserve helped me compare multiple banks and close my home loan at the best rate. Highly professional team.',
    name: 'Mr. Neeraj Kumar',
    city: 'Delhi',
    loanType: 'Home Loan',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Neeraj+Kumar&background=0B5D4B&color=fff&size=96',
  },
  {
    quote: 'Quick business loan approval with transparent process. My RM handled everything end to end.',
    name: 'Mr. Sachin Agarwal',
    city: 'Faridabad',
    loanType: 'Business Loan',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Sachin+Agarwal&background=00C389&color=fff&size=96',
  },
  {
    quote: 'Expert guidance on Loan Against Property — saved time and got a better offer than going directly to the bank.',
    name: 'Mukesh Sharma',
    city: 'Jaipur',
    loanType: 'Loan Against Property',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Mukesh+Sharma&background=0F172A&color=fff&size=96',
  },
  {
    quote: 'Credit card & insurance both sorted in one place. Smooth experience and fast response.',
    name: 'Anita Singh',
    city: 'Ghaziabad',
    loanType: 'Credit Card',
    rating: 5,
    image: 'https://ui-avatars.com/api/?name=Anita+Singh&background=22C55E&color=fff&size=96',
  },
] as const

export const PREMIUM_FAQ = [
  {
    q: 'What is KuberFinserve?',
    a: 'KuberFinserve is India\'s AI-powered financial distribution platform. We help customers find the right financial solutions while empowering professionals to build successful financial businesses — powered by KuberOne technology.',
  },
  {
    q: 'What is the minimum CIBIL score for a home loan?',
    a: 'Most lenders prefer a CIBIL score of 650+. Higher scores unlock better interest rates. Our AI-powered matching helps improve eligibility with the right lender.',
  },
  {
    q: 'How fast can I get loan approval?',
    a: 'Eligibility can be checked within minutes. Sanction timelines vary by product — home loans typically 48–72 hours after complete documentation.',
  },
  {
    q: 'Is KuberFinserve a bank or NBFC?',
    a: 'KuberFinserve is an authorized financial distribution platform. We compare products from 50+ banks and NBFCs — we are not a lender ourselves.',
  },
  {
    q: 'Can I become a partner and build my own financial business?',
    a: 'Yes! Join our partner program to build your own financial services business with KuberOne technology, multiple products, training, and operational support. Visit our Partners page to learn more.',
  },
  {
    q: 'Are there hidden charges?',
    a: 'We maintain transparent fee communication upfront. Processing fees and charges depend on the selected lender and are disclosed before you proceed.',
  },
] as const

export const HERO_TRUST_BADGES = [
  '50+ Lending Partners',
  'AI Powered Matching',
  'Approval Within 24 Hours',
  'Transparent Process',
] as const
