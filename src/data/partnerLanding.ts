/**
 * Conversion-focused partner landing content.
 * Figures are illustrative examples for education — not guaranteed earnings.
 */

export const LANDING_SEO = {
  title: 'Become a Financial Partner | Build Your Business | KuberFinserve',
  description:
    "Join India's AI-Powered Financial Distribution Network. Register, learn in Kuber Academy, run your business on KuberOne, and grow with weekly payouts — banks, NBFCs, certifications and AI tools included.",
  keywords:
    'become financial partner, financial entrepreneur India, partner academy, KuberOne operating system, loan fulfillment, weekly payouts, independent financial professional',
  path: '/become-partner',
} as const

export const HERO = {
  eyebrow: 'Financial Partner Program · Powered by KuberOne',
  title: 'Build Your Financial Business',
  subtitleLines: ['Learn. Grow. Earn.', 'Own Your Customers.', 'Scale Your Network.'],
  tagline: 'Become a financial entrepreneur — not just another job.',
  lead: "Join KuberFinserve's nationwide partner ecosystem. Access banks & NBFCs, train in Kuber Academy, fulfill loans on KuberOne, and grow with weekly payouts — on your terms.",
  primaryCta: 'Become a Partner',
  secondaryCta: 'Explore KuberOne',
  demoCta: 'Book a Demo',
} as const

/** Above-the-fold hooks — visible before long scroll */
export const HERO_HOOKS = [
  { value: 'Up to 100%', label: 'Deal potential', hint: 'Platform cut ~20–25%' },
  { value: '50+', label: 'Banks & NBFCs', hint: 'Multi-lender access' },
  { value: '0', label: 'Branch required', hint: 'Work from anywhere' },
  { value: '48 hrs', label: 'Onboarding response', hint: 'Fast partner support' },
] as const

export const HERO_EARNING = {
  label: 'Partner income mindset',
  headline: 'Keep more. Grow more.',
  detail: 'On KuberOne, partners can earn up to 100% of deal potential — with a typical platform share of only 20%–25%. Corporate growth often stays within 2X–3X of salary.',
} as const

export const ATTRACTION_POINTS = [
  { title: 'Own your business', desc: 'Build equity in your financial practice — not just a salary role.' },
  { title: 'Increase your revenue', desc: 'Higher partner share with transparent weekly payouts.' },
  { title: 'Technology included', desc: 'Loan fulfillment, wallet, Academy & AI tools on KuberOne.' },
  { title: 'Start part-time', desc: 'Grow your network first — scale to full-time when ready.' },
] as const

export const PAGE_JUMPS = [
  { label: 'Why Join', href: '#why-kuber' },
  { label: 'Income', href: '#earnings-hook' },
  { label: 'Plans', href: '#partner-plans' },
  { label: 'Products', href: '#products' },
  { label: 'KuberOne', href: '#crm-features' },
  { label: 'Academy', href: '#academy' },
  { label: 'Starter Kit', href: '#starter-kit' },
  { label: 'Register', href: '#apply' },
] as const

export const SWITCHING = {
  title: 'Why Professionals Choose to Build Their Own Financial Business',
  corporate: {
    title: 'Traditional Job',
    points: [
      'Fixed Salary',
      'Limited Growth',
      'Office Politics',
      'Dependent on Company',
      'Single Lender / Product Limit',
    ],
  },
  partner: {
    title: 'Kuber Financial Partner',
    points: [
      'Own Your Business',
      'Higher Revenue Potential',
      'Flexible Work',
      'Expand Your Network',
      'Multiple Lenders',
    ],
  },
  cta: 'Become a Financial Entrepreneur',
} as const

export const MODEL_COMPARE = {
  title: 'Corporate Model vs Kuber Model',
  subtitle: 'Same lender payout. Completely different take-home story.',
  payoutLabel: 'Bank / NBFC Payout (example)',
  payoutAmount: '₹1,00,000',
  corporate: {
    title: "Today's Corporate Model",
    tagline: 'Many layers. Many expenses. Less in your pocket.',
    overheads: [
      'Corporate Overheads',
      'Marketing',
      'Operations Team',
      'Branch Cost',
      'Managers / Incentives',
      'Sales Managers',
      'Employee Salary Layers',
    ],
    takeHomeLabel: 'Employee Take Home',
    takeHome: '₹18,000–₹25,000',
    note: 'Salary + incentive after many corporate layers. Most earnings stay with the company.',
  },
  partner: {
    title: 'The KuberFinserve Partner Model',
    tagline: 'Fewer layers. Lower costs. More for you.',
    flow: [
      'Bank / NBFC',
      'Kuber Technology',
      'Independent Partner',
      'Referring Partner',
      'City / Zone Leadership',
      'Partner Support & Training',
      'Partner Earnings',
    ],
    takeHomeLabel: 'What You Take Home',
    takeHome: '₹85,000–₹90,000+',
    note: 'Lower overheads. Higher partner share. Typical platform cut ~20%–25% — you keep the majority (up to ~100% of deal potential as per agreement).',
  },
  disclaimer:
    'Illustrative example for education only (₹1,00,000 payout case). Actual payouts & partner share vary by product, lender, agreement & case status. Not a guaranteed income.',
} as const

/** Poster “Why Join” — six core value props (shown first in Why Kuber) */
export const WHY_JOIN_CORE = [
  {
    title: 'Higher Earnings',
    description: 'More take-home, fewer deduction layers — keep more of every deal.',
    icon: 'wallet' as const,
  },
  {
    title: 'Fast Growth',
    description: 'Scale income month after month with multi-lender access.',
    icon: 'rocket' as const,
  },
  {
    title: 'Be Your Own Boss',
    description: 'Work on your own terms — part-time or full-time.',
    icon: 'crown' as const,
  },
  {
    title: 'End-to-End Technology',
    description: 'KuberOne digital platform makes leads, docs & payouts easy.',
    icon: 'cpu' as const,
  },
  {
    title: 'Trusted Lender Network',
    description: 'Access to multiple Banks & NBFCs from one partner desk.',
    icon: 'building' as const,
  },
  {
    title: 'Dedicated Partner Support',
    description: 'Ops & partner support at every step of the journey.',
    icon: 'headset' as const,
  },
] as const

export const WHY_KUBER = {
  title: 'Why Join KuberFinserve?',
  subtitle: 'Higher earnings, faster growth, full technology & lender access — built for partners.',
  items: [
    { title: 'Higher Earnings', icon: 'wallet' },
    { title: 'Fast Growth', icon: 'rocket' },
    { title: 'Be Your Own Boss', icon: 'crown' },
    { title: 'End to End Technology', icon: 'cpu' },
    { title: 'Trusted Lender Network', icon: 'building' },
    { title: 'Dedicated Partner Support', icon: 'headset' },
    { title: 'CRM Included', icon: 'layout' },
    { title: 'WhatsApp Automation', icon: 'message' },
    { title: 'Marketing Creatives', icon: 'megaphone' },
    { title: 'AI Loan Assistant', icon: 'sparkles' },
    { title: 'Commission Wallet', icon: 'coins' },
    { title: 'Training Academy', icon: 'graduation' },
    { title: 'Analytics Dashboard', icon: 'chart' },
    { title: 'Website', icon: 'globe' },
    { title: 'Mobile App', icon: 'smartphone' },
    { title: 'Digital Visiting Card', icon: 'id' },
    { title: 'Case Tracking', icon: 'clipboard' },
    { title: 'Referral System', icon: 'share' },
    { title: 'Insurance Module', icon: 'shield' },
    { title: 'Builder Module', icon: 'home' },
    { title: 'Property Module', icon: 'landmark' },
    { title: 'Reports', icon: 'file' },
  ],
} as const

export const REAL_INCOME = {
  title: 'Real Income Example',
  scenario: 'Suppose you close',
  deal: '₹1 Crore LAP',
  payoutRate: 'Approx 1.5% average lender payout*',
  gross: '≈ ₹1,50,000',
  grossLabel: 'Total Gross Payout (illustrative)',
  employee: {
    title: 'If You Work As Employee',
    incomeLabel: 'Fixed Monthly Salary',
    income: '₹50,000–₹60,000',
    points: [
      'Fixed income',
      'Limited growth (often 2X–3X on salary over a career)',
      'Company decides increment',
      "Performance doesn't always increase earnings",
    ],
  },
  partner: {
    title: 'If You Become Kuber Partner',
    incomeLabel: 'Approx partner earnings*',
    income: '₹80,000–₹1,00,000+',
    badge: 'Up to 100% potential · cut ~20–25%',
    basedOn: 'Based on business volume & agreement — no fixed salary ceiling',
    points: [
      'Higher earnings potential',
      'Own business',
      'Unlimited income potential',
      'Multiple lender access',
      'Commission on every deal',
      'Technology support',
    ],
  },
  banner: 'Same effort. Better earnings. Greater freedom.',
  disclaimer:
    '*Illustrative scenario for education (₹1 Cr LAP example). Actual earnings depend on performance, products, lender payouts & partner agreement. Platform share typically ~20%–25%. Not a guarantee or income promise.',
} as const

export const EARN_MORE = {
  title: 'Why Partners Earn More',
  subtitle: 'Fewer layers. Higher share. No cap on growth.',
  points: [
    'Fewer corporate layers',
    'Higher partner share',
    'Typical platform cut only 20%–25%',
    'Earn up to 100% of deal potential*',
    'Direct lender access',
    'Multiple banks & NBFCs',
    'Achievement ranks + badge bonuses (up to +10%*)',
    'Technology support',
    'Faster processing support',
    'CRM automation',
    'Marketing support',
    'AI assistance',
    'No branch expenses',
    'No salary dependency',
    'No cap on growth',
  ],
} as const

export const JOURNEY = {
  title: 'How Your Journey Grows',
  subtitle: 'Safe transition program — keep your job while you build side income, then go full-time.',
  steps: [
    {
      month: 'Month 1',
      title: 'Learn (Keep Your Job)',
      items: ['Training', 'Learn Products', 'Certification', 'Setup CRM'],
    },
    {
      month: 'Month 2',
      title: 'Side Income Begins',
      items: ['Bring 2–3 Cases', 'Earn Side Income'],
    },
    {
      month: 'Month 3',
      title: 'Side Income > Salary',
      items: ['Bring 5+ Cases', 'Income Starts Growing'],
    },
    {
      month: 'Month 4+',
      title: 'Go Full-Time Partner',
      items: ['Become Full-Time Partner', 'Scale Team', 'Hire Employees', 'Grow Business'],
    },
  ],
} as const

/** Achievement ranking + badge / flag bonus (stack up to 10%) */
export const RANKING_SYSTEM = {
  eyebrow: 'Partner Ranking System',
  title: 'Rank Up. Earn Badges. Unlock Extra Bonus.',
  subtitle:
    'Performance-based ranks and achievement badges reward consistent partners — stack badge & flag bonuses up to an extra 10%*.',
  maxBonusLabel: 'Up to +10%',
  maxBonusHint: 'Extra bonus on achievement badges & flags*',
  ranks: [
    {
      name: 'Bronze',
      flag: 'Starter Flag',
      criteria: 'Onboarding + first certified product',
      perk: 'Base partner share',
      tone: 'bronze' as const,
    },
    {
      name: 'Silver',
      flag: 'Growth Flag',
      criteria: 'Consistent monthly cases & CRM hygiene',
      perk: 'Priority ops queue',
      tone: 'silver' as const,
    },
    {
      name: 'Gold',
      flag: 'Performer Flag',
      criteria: 'Higher volume + multi-product closures',
      perk: 'Faster support + creatives',
      tone: 'gold' as const,
    },
    {
      name: 'Platinum',
      flag: 'Elite Flag',
      criteria: 'Top-quartile performance & quality score',
      perk: 'Dedicated partner desk',
      tone: 'platinum' as const,
    },
    {
      name: 'Diamond',
      flag: "Chairman's Flag",
      criteria: 'Sustained excellence & leadership impact',
      perk: 'Highest recognition tier',
      tone: 'diamond' as const,
    },
  ],
  badges: [
    {
      name: 'First Win Badge',
      bonus: '+1%',
      how: 'First successful disbursement',
      icon: 'trophy' as const,
    },
    {
      name: 'Consistency Flag',
      bonus: '+2%',
      how: 'Hit monthly case targets 3 months in a row',
      icon: 'flag' as const,
    },
    {
      name: 'Multi-Product Badge',
      bonus: '+1.5%',
      how: 'Close across loans + insurance / cards',
      icon: 'layers' as const,
    },
    {
      name: 'Quality Shield',
      bonus: '+2%',
      how: 'Strong documentation & low rejection rate',
      icon: 'shield' as const,
    },
    {
      name: 'Referral Star',
      bonus: '+1.5%',
      how: 'Bring verified partner / customer referrals',
      icon: 'star' as const,
    },
    {
      name: 'Top Performer Crown',
      bonus: '+2%',
      how: 'Leaderboard / city ranking milestones',
      icon: 'crown' as const,
    },
  ],
  stackNote: 'Badges & flags can stack — maximum additional bonus capped at 10%*.',
  howItWorks: [
    'Close cases & hit milestones on KuberOne',
    'Unlock ranks, badges & performance flags',
    'Stack achievement bonuses up to +10%',
    'Track rank & rewards live in your partner wallet',
  ],
  disclaimer:
    '*Illustrative incentive framework. Exact ranks, badge criteria, bonus percentages and eligibility are as per your partner agreement and current program policy. Bonuses are not guaranteed and may change. Subject to disbursed cases & compliance.',
} as const

export const WHAT_YOU_GET = [
  'Time freedom — work on your terms',
  'Higher take-home vs corporate layers',
  'KuberOne CRM, WhatsApp & wallet',
  'Multi-bank / NBFC product access',
  'Training academy & marketing creatives',
  'Ranks, badges & bonus up to +10%*',
  'Long-term wealth engine — not just a job',
] as const

export const KUBERONE = {
  eyebrow: 'KuberOne',
  title: 'Your Complete Business Operating System',
  subtitle: 'Run leads, documents, commissions, marketing & growth — from one intelligent platform.',
  features: [
    'Lead CRM',
    'WhatsApp Automation',
    'Digital Visiting Card',
    'Document Collection',
    'Case Tracking',
    'Commission Wallet',
    'Training Academy',
    'Marketing Creatives',
    'AI Loan Assistant',
    'Referral Management',
    'Insurance Module',
    'Builder Module',
    'CA Tax Module',
    'Property Module',
    'Analytics Dashboard',
    'Mobile App',
    'Website',
    'Reports',
  ],
} as const

export const TECH_FLOW = {
  title: 'How Technology Helps',
  subtitle: 'From first lead to commission — automated, trackable, transparent.',
  steps: [
    'Lead Received',
    'CRM',
    'Document Collection',
    'Eligibility Check',
    'Bank Comparison',
    'Application',
    'Approval',
    'Disbursement',
    'Commission Wallet',
    'Reports',
  ],
} as const

export const SUCCESS = {
  title: 'Success Stories',
  subtitle: 'Partners building real businesses with KuberFinserve. Illustrative profiles.',
  stories: [
    {
      name: 'Rahul M.',
      role: 'Loan Consultant',
      city: 'Gurugram',
      monthlyBusiness: '₹2.4 Cr',
      income: '₹1.1L+',
      growth: '+68%',
      rating: 5,
      initials: 'RM',
    },
    {
      name: 'Priya S.',
      role: 'Property Consultant',
      city: 'Noida',
      monthlyBusiness: '₹1.8 Cr',
      income: '₹95K+',
      growth: '+52%',
      rating: 5,
      initials: 'PS',
    },
    {
      name: 'Amit V.',
      role: 'Insurance + Loans',
      city: 'Delhi',
      monthlyBusiness: '₹1.2 Cr',
      income: '₹82K+',
      growth: '+41%',
      rating: 5,
      initials: 'AV',
    },
  ],
  note: 'Figures are partner-reported illustrations for inspiration. Individual results vary.',
} as const

export const LANDING_FAQ = [
  {
    q: 'Who can join?',
    a: 'Loan advisors, insurance advisors, property consultants, CAs, freelancers, business owners, retired bankers, fresh graduates, and anyone serious about building an independent financial services business.',
  },
  {
    q: 'Do I need experience?',
    a: 'Prior experience helps but is not mandatory. Motivated partners get product training, certification, and CRM onboarding through our Training Academy.',
  },
  {
    q: 'Is investment required?',
    a: 'Standard onboarding needs documentation and a partner agreement. Any fee structure, if applicable, is shared transparently before you join — no hidden surprises.',
  },
  {
    q: 'How do commissions work?',
    a: 'You earn revenue share on successfully disbursed cases as per your partner agreement. Track case status and payouts in the KuberOne Commission Wallet in near real time.',
  },
  {
    q: 'Is training available?',
    a: 'Yes. Structured product training, certification, marketing creatives, and ongoing support are part of the partner program.',
  },
  {
    q: 'How many banks & NBFCs?',
    a: 'Partners get access to a wide network of leading banks and NBFCs (50+ lending partners). Exact product availability depends on profile, location, and agreement.',
  },
  {
    q: 'What support is available?',
    a: 'Dedicated partner support, operations assistance, CRM & WhatsApp automation, AI tools, and marketing creatives — so you focus on customers while technology handles the heavy lifting.',
  },
  {
    q: 'Can I work part time?',
    a: 'Yes. Many partners start part-time with side income, then scale to full-time as case volume grows. Work on your own terms.',
  },
  {
    q: 'Is there a ranking or bonus system?',
    a: 'Yes. Partners progress through achievement ranks (Bronze to Diamond) and can unlock badges & flags. Achievement bonuses can stack up to an extra 10%, subject to program rules and your partner agreement. Criteria and payouts are tracked on KuberOne.',
  },
] as const

export const FINAL_CTA = {
  title: "Don't Just Work For Money.",
  highlight: 'Build Your Own Wealth Engine.',
  primaryCta: 'Become Partner',
  secondaryCta: 'Schedule Demo',
} as const

export const FOOTER_CTA = {
  title: 'Ready To Build Your Own Financial Services Business?',
  subtitle: 'Become A Kuber Partner Today.',
  website: 'www.kuberfinserve.com',
} as const
