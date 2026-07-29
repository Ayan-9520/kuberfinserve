import type {
  ToolkitItem,
  DownloadItem,
  SalesScript,
  CrmLesson,
  LeaderboardEntry,
  CommunityPost,
  PartnerProfile,
} from './types'

export const TOOLKIT_CATEGORIES = [
  'Facebook Posts',
  'Instagram Creatives',
  'LinkedIn Templates',
  'WhatsApp Templates',
  'Festival Creatives',
  'Canva Templates',
  'Reels',
  'Sales Deck',
  'Email Templates',
  'Visiting Cards',
  'Letterheads',
  'Proposal Formats',
  'Business Cards',
] as const

export const TOOLKIT_ITEMS: ToolkitItem[] = [
  { id: 'tk1', category: 'WhatsApp Templates', title: 'Home loan warm intro', format: 'TXT', description: 'Short bilingual-ready English template for first outreach to homeowners.' },
  { id: 'tk2', category: 'Instagram Creatives', title: 'EMI myth-busting carousel', format: 'PNG Pack', description: '5-slide carousel explaining FOIR in plain language.' },
  { id: 'tk3', category: 'LinkedIn Templates', title: 'CA partnership announcement', format: 'DOCX', description: 'Professional post for Chartered Accountants joining as Kuber Partners.' },
  { id: 'tk4', category: 'Festival Creatives', title: 'Diwali home loan offer frame', format: 'PSD + PNG', description: 'Brand-safe festival creative with editable partner name.' },
  { id: 'tk5', category: 'Sales Deck', title: 'Partner value proposition deck', format: 'PPTX', description: '12-slide deck for builders, architects and consultants.' },
  { id: 'tk6', category: 'Email Templates', title: 'Document pending reminder', format: 'HTML', description: 'Polite follow-up that reduces drop-offs without pressure.' },
  { id: 'tk7', category: 'Proposal Formats', title: 'LAP advisory proposal', format: 'DOCX', description: 'Structured proposal with eligibility assumptions and next steps.' },
  { id: 'tk8', category: 'Reels', title: '60-sec “Who should apply for LAP”', format: 'MP4 Script', description: 'Shot list + caption pack for Reels and Shorts.' },
  { id: 'tk9', category: 'Canva Templates', title: 'Local area lead magnet', format: 'Canva Link', description: 'Editable checklist lead magnet for property consultants.' },
  { id: 'tk10', category: 'Visiting Cards', title: 'Partner visiting card set', format: 'PDF Print', description: 'Front/back designs aligned to Kuber brand colours.' },
  { id: 'tk11', category: 'Letterheads', title: 'Official partner letterhead', format: 'DOCX', description: 'For sanction explanations and client confirmation notes.' },
  { id: 'tk12', category: 'Business Cards', title: 'Digital NFC card layout', format: 'PDF', description: 'QR to partner referral link and KuberOne profile.' },
  { id: 'tk13', category: 'Facebook Posts', title: 'Business loan GST story', format: 'PNG', description: 'Single-image post for MSME audiences.' },
]

export const DOWNLOAD_CATEGORIES = [
  'Product Brochures',
  'Partner Handbook',
  'Starter Kit',
  'Sales Scripts',
  'Eligibility Checklists',
  'Bank Documents',
  'Customer Forms',
  'Marketing PDFs',
  'Presentation Templates',
] as const

export const DOWNLOAD_ITEMS: DownloadItem[] = [
  { id: 'dl1', category: 'Starter Kit', title: 'Kuber Partner Starter Kit', format: 'ZIP', description: 'Handbook, scripts, checklists and intro creatives in one pack.' },
  { id: 'dl2', category: 'Partner Handbook', title: 'Partner operating handbook 2026', format: 'PDF', description: 'SOPs for lead entry, document chase and escalation.' },
  { id: 'dl3', category: 'Product Brochures', title: 'Home loan customer brochure', format: 'PDF', description: 'Plain-language brochure for first meetings.' },
  { id: 'dl4', category: 'Eligibility Checklists', title: 'Salaried vs self-employed checklist', format: 'PDF', description: 'Document readiness before bank login.' },
  { id: 'dl5', category: 'Bank Documents', title: 'Common KYC & income pack list', format: 'PDF', description: 'Pan-India common list with notes for exceptions.' },
  { id: 'dl6', category: 'Customer Forms', title: 'Consent & authorisation form', format: 'PDF', description: 'Customer consent template for lead processing.' },
  { id: 'dl7', category: 'Sales Scripts', title: 'Objection handling pocket guide', format: 'PDF', description: 'Rate, tenure, processing fee and delay objections.' },
  { id: 'dl8', category: 'Marketing PDFs', title: 'Local partner one-pager', format: 'PDF', description: 'Shareable authority piece for networking.' },
  { id: 'dl9', category: 'Presentation Templates', title: 'Builder channel pitch', format: 'PPTX', description: 'For site offices and channel partner desks.' },
]

export const SALES_SCRIPTS: SalesScript[] = [
  {
    id: 'ss1',
    category: 'Telephone Scripts',
    title: 'First call — home loan enquiry',
    channel: 'Phone',
    body: 'Hello {{name}}, this is {{partner}} from KuberFinserve. You enquired about a home loan for {{city}}. I will take 4 minutes to understand income, existing EMIs and property stage, then share realistic eligibility—not a random max amount. Is now a good time?',
  },
  {
    id: 'ss2',
    category: 'WhatsApp Scripts',
    title: 'Document reminder',
    channel: 'WhatsApp',
    body: 'Hi {{name}}, sharing the exact list for your home loan file: PAN, Aadhaar, last 3 salary slips, 6-month bank statement, and Form 16/ITR. Upload on the link I shared—once complete I will shortlist banks that fit your profile.',
  },
  {
    id: 'ss3',
    category: 'LinkedIn Scripts',
    title: 'CA collaboration note',
    channel: 'LinkedIn',
    body: 'Hello {{name}}, I help CA practices offer structured loan and LAP guidance to clients without becoming a full-time DSA desk. Happy to share our Partner Academy curriculum and compliance-first process if useful for your clients.',
  },
  {
    id: 'ss4',
    category: 'Property Dealer Scripts',
    title: 'Site visit partnership',
    channel: 'In-person',
    body: 'When a buyer loves a project but EMI comfort is unclear, I run a 10-minute eligibility check on-site so you do not lose the booking to confusion. I only recommend what clears FOIR and documentation.',
  },
  {
    id: 'ss5',
    category: 'Builder Scripts',
    title: 'Channel desk introduction',
    channel: 'Meeting',
    body: 'We support your channel partners with eligibility pre-checks, document completeness and transparent bank fitment so inventory conversions do not stall at finance.',
  },
  {
    id: 'ss6',
    category: 'CA Scripts',
    title: 'Client referral framing',
    channel: 'Phone',
    body: 'For your client needing working capital or LAP, I will review GST and banking with the same seriousness you apply to filings—then recommend products that match cash flows.',
  },
  {
    id: 'ss7',
    category: 'GST Scripts',
    title: 'MSME growth capital opener',
    channel: 'WhatsApp',
    body: 'Saw consistent GST filing on your business—many owners unlock better working capital once banking narrative is clean. I can review anonymised statements and tell you realistic options.',
  },
  {
    id: 'ss8',
    category: 'Insurance Scripts',
    title: 'EMI protection framing',
    channel: 'Phone',
    body: 'Before finalising the loan, we should protect EMI capacity for the family. I will explain cover options without pushing products you do not need.',
  },
  {
    id: 'ss9',
    category: 'Objection Handling',
    title: '“Rates are lower on Google”',
    channel: 'Any',
    body: 'Advertised rates assume a profile. Your effective rate depends on income stability, obligations and property. I will show 2–3 realistic lender fits with total cost—not just headline rate.',
  },
  {
    id: 'ss10',
    category: 'Negotiation',
    title: 'Processing fee conversation',
    channel: 'Any',
    body: 'We can compare net cost after fee waivers or reimbursements. I will not promise waivers I cannot deliver—only what the shortlisted bank can consider for your file.',
  },
  {
    id: 'ss11',
    category: 'Closing',
    title: 'Sanction acceptance close',
    channel: 'Meeting',
    body: 'You have a clear sanction amount, rate band and conditions. Next step is accepting the offer and completing property/legal checkpoints. I will stay with you till disbursement.',
  },
  {
    id: 'ss12',
    category: 'Referral Selling',
    title: 'Ask for introductions',
    channel: 'WhatsApp',
    body: 'If someone in your circle is planning a home purchase, business expansion or property-backed funding, I am happy to give them a no-pressure eligibility review—same process I used for you.',
  },
]

export const CRM_LESSONS: CrmLesson[] = [
  {
    id: 'crm1',
    title: 'Lead Entry',
    description: 'Capture clean leads with source, product intent and consent.',
    steps: ['Open KuberOne → New Lead', 'Enter name, mobile, city, product', 'Tag source (website, referral, walk-in)', 'Save and schedule first follow-up task'],
  },
  {
    id: 'crm2',
    title: 'Lead Pipeline',
    description: 'Move leads through New → Contacted → Qualified → Logged → Sanctioned → Disbursed.',
    steps: ['Review kanban columns daily', 'Never skip Qualified without FOIR notes', 'Attach reason codes on lost leads'],
  },
  {
    id: 'crm3',
    title: 'Lead Status',
    description: 'Use statuses that operations and partners both understand.',
    steps: ['Update status after every customer touch', 'Add comment with next action date', 'Escalate stuck files older than SLA'],
  },
  {
    id: 'crm4',
    title: 'Document Upload',
    description: 'Keep KYC and income packs organised per lead.',
    steps: ['Use document checklist', 'Upload clear PDFs only', 'Mark verified vs pending', 'Notify ops when pack is complete'],
  },
  {
    id: 'crm5',
    title: 'Commission Reports',
    description: 'Track expected vs paid payouts.',
    steps: ['Filter by month and product', 'Reconcile disbursed files', 'Raise discrepancy tickets with lead IDs'],
  },
  {
    id: 'crm6',
    title: 'Customer Timeline',
    description: 'One timeline for calls, notes, docs and bank updates.',
    steps: ['Log every call outcome', 'Pin critical legal/bank comments', 'Share timeline snapshot before huddles'],
  },
  {
    id: 'crm7',
    title: 'Task Management',
    description: 'Never rely on memory for follow-ups.',
    steps: ['Create tasks with due dates', 'Batch morning follow-ups', 'Close tasks with outcome notes'],
  },
  {
    id: 'crm8',
    title: 'Reports',
    description: 'Weekly partner scorecard: leads, conversions, aging, learning hours.',
    steps: ['Export weekly summary', 'Compare against leaderboard goals', 'Plan next week focus product'],
  },
]

export const LEADERBOARD_TABS = [
  { id: 'revenue', label: 'Top Revenue' },
  { id: 'learning', label: 'Top Learning' },
  { id: 'referrals', label: 'Top Referrals' },
  { id: 'marketing', label: 'Top Marketing' },
  { id: 'consultant', label: 'Top Consultant' },
] as const

export const LEADERBOARD: Record<string, LeaderboardEntry[]> = {
  revenue: [
    { rank: 1, name: 'Ananya Mehra', city: 'Gurugram', role: 'CA Partner', score: 18.4, metric: '₹ Lakh disbursed' },
    { rank: 2, name: 'Rohit Khanna', city: 'Delhi', role: 'Property Consultant', score: 15.2, metric: '₹ Lakh disbursed' },
    { rank: 3, name: 'Sana Qureshi', city: 'Noida', role: 'Insurance Advisor', score: 12.9, metric: '₹ Lakh disbursed' },
    { rank: 4, name: 'Vikram Shah', city: 'Jaipur', role: 'DSA', score: 11.1, metric: '₹ Lakh disbursed' },
    { rank: 5, name: 'Neha Kapoor', city: 'Chandigarh', role: 'Business Consultant', score: 9.8, metric: '₹ Lakh disbursed' },
  ],
  learning: [
    { rank: 1, name: 'Priya Nair', city: 'Bengaluru', role: 'Working Professional', score: 86, metric: 'Learning hours' },
    { rank: 2, name: 'Aman Gupta', city: 'Lucknow', role: 'GST Consultant', score: 74, metric: 'Learning hours' },
    { rank: 3, name: 'Meera Iyer', city: 'Chennai', role: 'Financial Advisor', score: 69, metric: 'Learning hours' },
  ],
  referrals: [
    { rank: 1, name: 'Kabir Malhotra', city: 'Delhi', role: 'Builder Desk', score: 42, metric: 'Qualified referrals' },
    { rank: 2, name: 'Isha Bansal', city: 'Faridabad', role: 'Interior Designer', score: 31, metric: 'Qualified referrals' },
  ],
  marketing: [
    { rank: 1, name: 'Arjun Desai', city: 'Ahmedabad', role: 'Influencer Partner', score: 128, metric: 'Campaign leads' },
    { rank: 2, name: 'Ritu Jain', city: 'Indore', role: 'Real Estate Agency', score: 97, metric: 'Campaign leads' },
  ],
  consultant: [
    { rank: 1, name: 'Dr. Kavya Rao', city: 'Hyderabad', role: 'Business Consultant', score: 96, metric: 'CSAT score' },
    { rank: 2, name: 'Harsh Patel', city: 'Surat', role: 'Loan Consultant', score: 93, metric: 'CSAT score' },
  ],
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'cp1',
    author: 'Ananya Mehra',
    role: 'CA Partner · Gurugram',
    title: 'How I explain FOIR to first-time buyers in 3 minutes',
    excerpt: 'Sharing the whiteboard method that reduced “rate shopping only” calls for my CA clientele.',
    replies: 24,
    likes: 118,
    tag: 'Sales',
  },
  {
    id: 'cp2',
    author: 'Rohit Khanna',
    role: 'Property Consultant · Delhi',
    title: 'Site-visit eligibility desk — what actually worked',
    excerpt: 'Setup, consent, and how we avoid blocking the sales team when files are weak.',
    replies: 17,
    likes: 86,
    tag: 'Field',
  },
  {
    id: 'cp3',
    author: 'Academy Team',
    role: 'KuberFinserve',
    title: 'Monthly webinar: LAP legal red flags',
    excerpt: 'Live session with ops — bring one anonymised case. Certificate of attendance for Level 3 learners.',
    replies: 41,
    likes: 203,
    tag: 'Events',
  },
]

export const SUCCESS_STORIES = [
  { name: 'Sana Qureshi', role: 'Insurance Advisor → Multi-product Partner', result: 'Cross-sold protection on 38 home loan files in one quarter.' },
  { name: 'Vikram Shah', role: 'DSA → Certified Silver Partner', result: 'Cut document drop-offs by 27% after CRM Training module.' },
  { name: 'Neha Kapoor', role: 'Consultant → Gold track', result: 'Built a CA+builder referral loop using Academy scripts.' },
]

export const DEMO_PROFILE: PartnerProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.partner@example.com',
  phone: '+91 98765 43210',
  city: 'New Delhi',
  role: 'Financial Partner',
  partnerCode: 'KFS-DEL-2048',
  tier: 'Silver',
  learningProgress: 48,
  learningHours: 36,
  commissionMonth: '₹1.85 Lakh (expected)',
  referralLink: 'https://kuberfinserve.com/apply-loan?ref=KFS-DEL-2048',
  kycStatus: 'Verified',
}

export const AI_SUGGESTIONS = [
  'Suggest WhatsApp message for document pending',
  'Generate LAP proposal outline',
  'Explain Home Loan FOIR simply',
  'Explain Loan Against Property vs personal loan',
  'Handle “rates are lower online” objection',
  'Draft loan eligibility summary',
  'Write a 30-second sales pitch',
  'Give a marketing idea for builders',
  'Draft a follow-up email',
  'Write an Instagram caption for EMI education',
]

export const DASHBOARD_STATS = [
  { key: 'leads', label: "Today's Leads", value: '6', hint: '3 need follow-up' },
  { key: 'courses', label: 'Active Courses', value: '3', hint: '1 quiz unlocked' },
  { key: 'progress', label: 'Learning Progress', value: '48%', hint: 'Level 2 in progress' },
  { key: 'certs', label: 'Certificates', value: '1', hint: 'Bronze earned' },
  { key: 'downloads', label: 'Downloads', value: '12', hint: 'Starter kit ready' },
  { key: 'webinar', label: 'Upcoming Webinar', value: 'Fri 6 PM', hint: 'LAP legal red flags' },
  { key: 'commission', label: 'Commission', value: '₹1.85L', hint: 'Expected this month' },
  { key: 'hours', label: 'Learning Hours', value: '36h', hint: 'Last 90 days' },
  { key: 'rank', label: 'Partner Rank', value: '#18', hint: 'Delhi NCR learning' },
  { key: 'alerts', label: 'Notifications', value: '4', hint: '2 document chases' },
]
