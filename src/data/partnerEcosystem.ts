/**
 * Unified Partner ecosystem content for the Become Partner landing.
 * Post-login dashboard lives in KuberOne DSA app — website only previews & converts.
 */

export const ONBOARDING_FUNNEL = {
  eyebrow: 'Partner journey',
  title: 'From visitor to growing financial business',
  subtitle: 'One clear path — register, get verified, learn, serve customers, and receive weekly payouts.',
  steps: [
    { label: 'Become Partner', hint: 'Join the network' },
    { label: 'Complete KYC', hint: 'Upload documents' },
    { label: 'Get Verified', hint: 'Partner desk approval' },
    { label: 'Kuber Academy', hint: 'Learn & certify' },
    { label: 'Serve Customers', hint: 'Own relationships' },
    { label: 'Submit Cases', hint: 'Loan fulfillment' },
    { label: 'Track Progress', hint: 'Case timeline' },
    { label: 'Weekly Payouts', hint: 'Grow revenue' },
  ],
} as const

export const PARTNER_PLANS = {
  eyebrow: 'Partner plans',
  title: 'Choose how you want to grow',
  subtitle: 'Start lean, then unlock higher support as you scale — exact commercials in your agreement.',
  plans: [
    {
      name: 'Starter Partner',
      badge: 'Most popular entry',
      headline: 'Part-time · Learn & earn',
      points: [
        'Partner Academy Foundation track',
        'KuberOne CRM for personal leads',
        'Starter marketing kit',
        'WhatsApp & email support',
      ],
      cta: 'Register as Starter',
    },
    {
      name: 'Growth Partner',
      badge: 'Recommended',
      headline: 'Full-time · Multi-product',
      points: [
        'All Academy levels + certifications',
        'Priority ops queue',
        'Full marketing toolkit & creatives',
        'AI Assistant + commission wallet',
      ],
      cta: 'Register as Growth',
      featured: true,
    },
    {
      name: 'Elite Partner',
      badge: 'By invitation',
      headline: 'Team · City leadership',
      points: [
        'Diamond Academy path',
        'Dedicated partner desk',
        'Co-branded campaigns',
        'Team / referral hierarchy tools',
      ],
      cta: 'Talk to sales',
    },
  ],
} as const

export const PRODUCTS_YOU_OFFER = {
  eyebrow: 'Products',
  title: 'Products you can offer',
  subtitle: 'One partner brand across loans, insurance and cards — subject to bank / insurer panels.',
  items: [
    { title: 'Home Loan', desc: 'Salaried & self-employed purchase and balance transfer.' },
    { title: 'Loan Against Property', desc: 'LAP for business expansion and personal needs.' },
    { title: 'Business Loan', desc: 'Unsecured / secured MSME funding.' },
    { title: 'Working Capital', desc: 'CC, OD and invoice-linked facilities.' },
    { title: 'Personal Loan', desc: 'Eligibility-first personal funding.' },
    { title: 'Auto Loan', desc: 'New and used car financing.' },
    { title: 'Insurance', desc: 'Life, health and general — advisory attach.' },
    { title: 'Credit Cards', desc: 'Panel card sourcing with documentation support.' },
  ],
} as const

export const CRM_FEATURES_PREVIEW = {
  eyebrow: 'CRM features',
  title: 'Run every case on KuberOne CRM',
  subtitle: 'Lead pipeline, documents, tasks and commissions — the same stack you train on in Academy.',
} as const

export const DASHBOARD_NAV_PREVIEW = {
  eyebrow: 'After approval',
  title: 'Your Partner Dashboard (in KuberOne)',
  subtitle:
    'Courses, certificates and learning progress require Partner Login. The full dashboard opens in the KuberOne DSA app — not as a separate website portal.',
  groups: [
    {
      title: 'Work',
      items: ['Dashboard', 'CRM', 'Customers', 'Leads'],
    },
    {
      title: 'Learn',
      items: ['Academy', 'Courses', 'Certifications'],
    },
    {
      title: 'Grow',
      items: ['Marketing Toolkit', 'Downloads', 'AI Assistant'],
    },
    {
      title: 'Earn',
      items: [
        'Earnings Dashboard',
        'Bank Reconciliation',
        'Dynamic Revenue Distribution',
        'Raise Invoice',
        'Wallet',
        'TDS · GST · Statements',
      ],
    },
    {
      title: 'Connect',
      items: ['Community', 'Events', 'Support', 'Settings'],
    },
  ],
} as const

export const STARTER_KIT = {
  eyebrow: 'Starter kit',
  title: 'Download the Partner Starter Kit',
  subtitle:
    'Handbook overview, sales scripts, eligibility checklists and intro creatives — preview free, full pack after registration.',
  bullets: [
    'Partner operating overview (PDF)',
    'WhatsApp & call scripts pack',
    'Document checklists (salaried / self-employed)',
    'Local partner one-pager',
  ],
  primaryCta: 'Request Starter Kit',
  secondaryCta: 'Register Now',
} as const

export const BOOK_DEMO = {
  eyebrow: 'Book a demo',
  title: 'See KuberOne + Academy in 15 minutes',
  subtitle: 'Walk through CRM, Academy roadmap and commission wallet with our partner desk.',
  primaryCta: 'Book Demo on WhatsApp',
  secondaryCta: 'Register Now',
} as const
