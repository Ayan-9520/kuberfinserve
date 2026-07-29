import type { LearningLevel, Course, QuizQuestion, CertificateTier } from './types'

export const LEARNING_LEVELS: LearningLevel[] = [
  {
    id: 1,
    slug: 'foundation',
    title: 'Level 1 — Foundation',
    focus: 'Foundation',
    description: 'Financial products overview, ethics, partner role and customer discovery.',
    videoCount: 12,
    durationHours: 6,
    quizCount: 2,
    progress: 100,
    certificate: 'Bronze',
    courseSlug: 'foundation',
  },
  {
    id: 2,
    slug: 'home-loan-specialist',
    title: 'Level 2 — Home Loan Specialist',
    focus: 'Home Loan Specialist',
    description: 'Eligibility, documents, bank products, FOIR and home loan closing skills.',
    videoCount: 18,
    durationHours: 10,
    quizCount: 3,
    progress: 72,
    certificate: 'Silver',
    courseSlug: 'home-loan-specialist',
  },
  {
    id: 3,
    slug: 'loan-against-property',
    title: 'Level 3 — Loan Against Property',
    focus: 'Loan Against Property',
    description: 'Property valuation, LTV, legal checks and LAP underwriting conversations.',
    videoCount: 14,
    durationHours: 8,
    quizCount: 2,
    progress: 35,
    certificate: 'Silver',
    courseSlug: 'loan-against-property',
  },
  {
    id: 4,
    slug: 'business-loan-specialist',
    title: 'Level 4 — Business Loan Specialist',
    focus: 'Business Loan Specialist',
    description: 'GST-based lending, working capital, MSME products and cash-flow storytelling.',
    videoCount: 16,
    durationHours: 9,
    quizCount: 3,
    progress: 10,
    certificate: 'Gold',
    courseSlug: 'business-loan-specialist',
  },
  {
    id: 5,
    slug: 'insurance-advisor',
    title: 'Level 5 — Insurance Advisor',
    focus: 'Insurance Advisor',
    description: 'Life, health and general insurance positioning with responsible advice.',
    videoCount: 15,
    durationHours: 8,
    quizCount: 2,
    progress: 0,
    certificate: 'Gold',
    courseSlug: 'insurance-advisor',
  },
  {
    id: 6,
    slug: 'crm-expert',
    title: 'Level 6 — CRM Expert',
    focus: 'CRM Expert',
    description: 'KuberOne pipeline mastery, follow-ups, documentation and commission hygiene.',
    videoCount: 12,
    durationHours: 7,
    quizCount: 2,
    progress: 0,
    certificate: 'Gold',
    courseSlug: 'crm-expert',
  },
  {
    id: 7,
    slug: 'digital-marketing',
    title: 'Level 7 — Digital Marketing',
    focus: 'Digital Marketing',
    description: 'Local SEO, Meta ads basics, WhatsApp funnels and content calendars for partners.',
    videoCount: 14,
    durationHours: 8,
    quizCount: 2,
    progress: 0,
    certificate: 'Platinum',
    courseSlug: 'digital-marketing',
  },
  {
    id: 8,
    slug: 'ai-for-finance',
    title: 'Level 8 — AI for Finance',
    focus: 'AI for Finance',
    description: 'Use AI for pitches, proposals, objection handling and daily partner workflows.',
    videoCount: 10,
    durationHours: 6,
    quizCount: 2,
    progress: 0,
    certificate: 'Platinum',
    courseSlug: 'ai-for-finance',
  },
  {
    id: 9,
    slug: 'leadership',
    title: 'Level 9 — Leadership',
    focus: 'Leadership',
    description: 'Build a partner team, SOPs, coaching rhythms and quality control.',
    videoCount: 11,
    durationHours: 7,
    quizCount: 2,
    progress: 0,
    certificate: 'Diamond',
    courseSlug: 'leadership',
  },
  {
    id: 10,
    slug: 'master-partner',
    title: 'Level 10 — Master Partner',
    focus: 'Master Partner',
    description: 'Capstone: multi-product advisory business plan, ethics board and final viva.',
    videoCount: 8,
    durationHours: 10,
    quizCount: 1,
    progress: 0,
    certificate: 'Diamond',
    courseSlug: 'master-partner',
  },
]

function lesson(
  id: string,
  title: string,
  durationMin: number,
  summary: string,
  completed = false,
): Course['modules'][0]['lessons'][0] {
  return {
    id,
    title,
    durationMin,
    type: 'video',
    completed,
    summary,
    transcript: `${summary} In this lesson you will practice real customer conversations used by Kuber Financial Partners across Delhi NCR and pan-India.`,
  }
}

export const COURSES: Course[] = [
  {
    slug: 'foundation',
    title: 'Foundation: Building a Financial Advisory Practice',
    level: 1,
    subtitle: 'Mindset, products map, compliance basics and first customer conversations.',
    overview:
      'Start here if you are a CA, GST consultant, property advisor, insurance agent or working professional entering financial distribution. You will learn how Kuber Partners create long-term advisory relationships—not one-time loan closures.',
    durationHours: 6,
    videoCount: 12,
    progress: 100,
    certificate: 'Bronze',
    modules: [
      {
        id: 'f1',
        title: 'Partner mindset',
        lessons: [
          lesson('f1-1', 'From agent to advisor', 14, 'Shift from product pushing to trust-led advisory.', true),
          lesson('f1-2', 'Ethics and disclosure', 12, 'Transparent fee talk, consent and fair practice.', true),
          lesson('f1-3', 'Ideal partner personas', 16, 'How CAs, builders and consultants win differently.', true),
        ],
      },
      {
        id: 'f2',
        title: 'Product landscape',
        lessons: [
          lesson('f2-1', 'Home loan vs LAP', 18, 'When to recommend secured housing finance.', true),
          lesson('f2-2', 'Business & working capital', 17, 'GST turnover stories banks actually trust.', true),
          lesson('f2-3', 'Insurance in the journey', 15, 'Protect EMI capacity without overselling.', true),
        ],
      },
    ],
    resources: [
      { title: 'Partner Handbook (PDF)', type: 'PDF', size: '2.4 MB' },
      { title: 'Product comparison sheet', type: 'XLSX', size: '180 KB' },
      { title: 'First-meeting checklist', type: 'PDF', size: '320 KB' },
    ],
    assignments: [
      { title: 'Map 20 warm contacts by profession', dueHint: 'Week 1', status: 'Graded' },
      { title: 'Record a 90-sec partner intro', dueHint: 'Week 1', status: 'Graded' },
    ],
  },
  {
    slug: 'home-loan-specialist',
    title: 'Home Loan Specialist Certification',
    level: 2,
    subtitle: 'Eligibility maths, documents, bank fitment and confident closing.',
    overview:
      'Master salaried and self-employed home loan journeys. Practice FOIR, CIBIL conversations, bank shortlisting and document readiness so customers feel guided—not confused.',
    durationHours: 10,
    videoCount: 18,
    progress: 72,
    certificate: 'Silver',
    modules: [
      {
        id: 'hl1',
        title: 'Eligibility & underwriting',
        lessons: [
          lesson('hl1-1', 'Income assessment frameworks', 20, 'Salaried slips, ITRs and variable pay.', true),
          lesson('hl1-2', 'FOIR and EMI capacity', 22, 'Explain numbers customers understand.', true),
          lesson('hl1-3', 'CIBIL repair conversations', 19, 'Honest timelines without false promises.', false),
        ],
      },
      {
        id: 'hl2',
        title: 'Closing skills',
        lessons: [
          lesson('hl2-1', 'Bank fitment matrix', 21, 'Match profile to product, not preference.', false),
          lesson('hl2-2', 'Document chase playbook', 18, 'Reduce drop-offs with structured follow-ups.', false),
          lesson('hl2-3', 'Handover to disbursement', 16, 'Keep trust through sanction to registry.', false),
        ],
      },
    ],
    resources: [
      { title: 'Home loan document checklist', type: 'PDF', size: '410 KB' },
      { title: 'Bank comparison one-pager', type: 'PDF', size: '290 KB' },
      { title: 'FOIR worksheet', type: 'XLSX', size: '95 KB' },
    ],
    assignments: [
      { title: 'Solve 3 eligibility case studies', dueHint: 'Week 2', status: 'Submitted' },
      { title: 'Draft a sanction explanation note', dueHint: 'Week 3', status: 'Pending' },
    ],
  },
  {
    slug: 'loan-against-property',
    title: 'Loan Against Property Specialist',
    level: 3,
    subtitle: 'Property due diligence, LTV and responsible LAP advisory.',
    overview:
      'Help property owners unlock capital for business growth or consolidation. Learn valuation signals, legal hygiene and when LAP is better than unsecured credit.',
    durationHours: 8,
    videoCount: 14,
    progress: 35,
    certificate: 'Silver',
    modules: [
      {
        id: 'lap1',
        title: 'Property & legal',
        lessons: [
          lesson('lap1-1', 'Acceptable property types', 17, 'Self-occupied, rented and commercial nuances.', true),
          lesson('lap1-2', 'Title and chain basics', 19, 'What partners must flag early.', false),
          lesson('lap1-3', 'LTV conversations', 15, 'Set expectations before valuation day.', false),
        ],
      },
      {
        id: 'lap2',
        title: 'Advisory & closing',
        lessons: [
          lesson('lap2-1', 'When LAP beats unsecured', 16, 'Rate, tenure and cash-flow trade-offs.'),
          lesson('lap2-2', 'End-use monitoring talk', 14, 'Set honest expectations with customers.'),
          lesson('lap2-3', 'Sanction to mortgage', 15, 'MODT, registry and release of funds.'),
        ],
      },
    ],
    resources: [
      { title: 'LAP legal checklist', type: 'PDF', size: '360 KB' },
      { title: 'Valuation prep guide', type: 'PDF', size: '210 KB' },
      { title: 'LAP discovery sheet', type: 'DOCX', size: '85 KB' },
    ],
    assignments: [{ title: 'Prepare a LAP discovery sheet', dueHint: 'Week 1', status: 'Pending' }],
  },
  {
    slug: 'business-loan-specialist',
    title: 'Business Loan Specialist',
    level: 4,
    subtitle: 'GST-based lending, working capital and MSME storytelling.',
    overview:
      'Position working capital and term loans for retailers, manufacturers and professionals using GST, banking and cash-flow narratives banks trust.',
    durationHours: 9,
    videoCount: 16,
    progress: 10,
    certificate: 'Gold',
    modules: [
      {
        id: 'bl1',
        title: 'MSME & cash flow',
        lessons: [
          lesson('bl1-1', 'GST + banking narrative', 16, 'Build a lender-ready business story.'),
          lesson('bl1-2', 'Working capital vs term loan', 15, 'Choose the right structure.'),
          lesson('bl1-3', 'Assessment prep', 12, 'Ready the file before login.'),
        ],
      },
      {
        id: 'bl2',
        title: 'Field closing',
        lessons: [
          lesson('bl2-1', 'Shop-floor discovery', 14, 'Questions that reveal real turnover.'),
          lesson('bl2-2', 'Lender shortlist for MSME', 16, 'Match profile to product appetite.'),
          lesson('bl2-3', 'Query handling week', 13, 'Keep momentum after login.'),
        ],
      },
    ],
    resources: [
      { title: 'MSME document pack', type: 'PDF', size: '520 KB' },
      { title: 'Cash-flow worksheet', type: 'XLSX', size: '110 KB' },
    ],
    assignments: [{ title: 'Build one MSME case narrative', dueHint: 'Week 2', status: 'Pending' }],
  },
  {
    slug: 'insurance-advisor',
    title: 'Insurance Advisor Track',
    level: 5,
    subtitle: 'Life, health and responsible protection advice.',
    overview:
      'Protect EMI capacity and family goals with suitable life and health cover—never oversell.',
    durationHours: 8,
    videoCount: 15,
    progress: 0,
    certificate: 'Gold',
    modules: [
      {
        id: 'ins1',
        title: 'Protection fundamentals',
        lessons: [
          lesson('ins1-1', 'Life cover linked to liability', 14, 'Size cover to loan and dependents.'),
          lesson('ins1-2', 'Health cover for EMI safety', 13, 'Illness should not break repayments.'),
          lesson('ins1-3', 'Suitability checklist', 11, 'Ethics in insurance sales.'),
        ],
      },
      {
        id: 'ins2',
        title: 'Loan-linked protection',
        lessons: [
          lesson('ins2-1', 'Credit life positioning', 12, 'When loan cover helps families.'),
          lesson('ins2-2', 'Objection: insurance is force-sell', 11, 'Rebuild trust with suitability.'),
          lesson('ins2-3', 'Claim support playbook', 13, 'Stay useful after sale.'),
        ],
      },
    ],
    resources: [
      { title: 'Insurance suitability sheet', type: 'PDF', size: '280 KB' },
      { title: 'Claim support checklist', type: 'PDF', size: '190 KB' },
    ],
    assignments: [{ title: 'Complete a suitability worksheet', dueHint: 'Week 1', status: 'Pending' }],
  },
  {
    slug: 'crm-expert',
    title: 'CRM Expert — KuberOne Ops',
    level: 6,
    subtitle: 'Pipeline, docs, tasks and commission hygiene.',
    overview: 'Run your practice inside KuberOne: leads → applications → disbursement → payouts.',
    durationHours: 7,
    videoCount: 12,
    progress: 0,
    certificate: 'Gold',
    modules: [
      {
        id: 'crm1',
        title: 'Daily CRM discipline',
        lessons: [
          lesson('crm1-1', 'Lead entry & tagging', 12, 'Never lose a warm enquiry.'),
          lesson('crm1-2', 'Document & stage hygiene', 14, 'Stages must match reality.'),
          lesson('crm1-3', 'Commission readiness', 13, 'Clean files get paid faster.'),
        ],
      },
      {
        id: 'crm2',
        title: 'Reports & coaching',
        lessons: [
          lesson('crm2-1', 'Weekly pipeline review', 12, 'Spot stuck stages early.'),
          lesson('crm2-2', 'Task & reminder rhythm', 11, 'Make follow-ups automatic.'),
          lesson('crm2-3', 'Team handoff in CRM', 14, 'Scale without losing context.'),
        ],
      },
    ],
    resources: [
      { title: 'CRM daily checklist', type: 'PDF', size: '190 KB' },
      { title: 'Weekly pipeline template', type: 'XLSX', size: '75 KB' },
    ],
    assignments: [{ title: 'Run a Monday pipeline review', dueHint: 'Week 1', status: 'Pending' }],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing for Local Partners',
    level: 7,
    subtitle: 'WhatsApp funnels, Meta basics, SEO and content calendar.',
    overview:
      'Build a predictable local lead engine without agency spend. Learn brand-safe creatives, WhatsApp sequences, Meta ad basics and Google presence for your city.',
    durationHours: 8,
    videoCount: 14,
    progress: 0,
    certificate: 'Platinum',
    modules: [
      {
        id: 'dm1',
        title: 'Local digital foundation',
        lessons: [
          lesson('dm1-1', 'Partner brand kit online', 15, 'Consistent name, photo and offer language.'),
          lesson('dm1-2', 'WhatsApp funnel design', 18, 'From first reply to eligibility call.'),
          lesson('dm1-3', 'Content calendar (4 weeks)', 16, 'What to post without burnout.'),
        ],
      },
      {
        id: 'dm2',
        title: 'Ads & discovery',
        lessons: [
          lesson('dm2-1', 'Meta ads starter', 17, 'Budget, audience and creative tests.'),
          lesson('dm2-2', 'Google Business & SEO', 14, 'Be found for home loan near me.'),
          lesson('dm2-3', 'Compliance in marketing', 12, 'Avoid RBI / brand violations.'),
        ],
      },
    ],
    resources: [
      { title: '4-week content calendar', type: 'XLSX', size: '95 KB' },
      { title: 'WhatsApp funnel scripts', type: 'PDF', size: '240 KB' },
    ],
    assignments: [{ title: 'Publish one compliant weekly post', dueHint: 'Week 1', status: 'Pending' }],
  },
  {
    slug: 'ai-for-finance',
    title: 'AI for Finance Partners',
    level: 8,
    subtitle: 'Pitches, proposals, objections and daily workflow with AI.',
    overview:
      'Use AI as a junior associate: draft WhatsApp follow-ups, FOIR explainers, proposals and objection replies—then edit for accuracy and ethics before sending.',
    durationHours: 6,
    videoCount: 10,
    progress: 0,
    certificate: 'Platinum',
    modules: [
      {
        id: 'ai1',
        title: 'Safe AI workflows',
        lessons: [
          lesson('ai1-1', 'Prompt patterns for partners', 14, 'Clear role, context, tone, output.'),
          lesson('ai1-2', 'Eligibility explainers', 13, 'Simplify FOIR without wrong maths.'),
          lesson('ai1-3', 'Proposal & one-pager draft', 15, 'Structure banks and customers respect.'),
        ],
      },
      {
        id: 'ai2',
        title: 'Field acceleration',
        lessons: [
          lesson('ai2-1', 'Objection reply library', 12, 'Rate, delay, other DSA responses.'),
          lesson('ai2-2', 'Meeting prep brief', 11, '5-minute brief before every visit.'),
          lesson('ai2-3', 'Ethics & data privacy', 12, 'What never goes into a public AI chat.'),
        ],
      },
    ],
    resources: [
      { title: 'Partner AI prompt pack', type: 'PDF', size: '310 KB' },
      { title: 'Privacy do / do not card', type: 'PDF', size: '90 KB' },
    ],
    assignments: [{ title: 'Draft and human-edit one proposal', dueHint: 'Week 1', status: 'Pending' }],
  },
  {
    slug: 'leadership',
    title: 'Leadership — Build a Partner Desk',
    level: 9,
    subtitle: 'SOPs, coaching rhythms, quality control and team growth.',
    overview:
      'Move from solo closer to desk leader. Design SOPs, coach juniors, control file quality and protect brand reputation while scaling disbursement.',
    durationHours: 7,
    videoCount: 11,
    progress: 0,
    certificate: 'Diamond',
    modules: [
      {
        id: 'ld1',
        title: 'Operating system',
        lessons: [
          lesson('ld1-1', 'SOP map for a partner desk', 16, 'Lead to login to sanction to payout.'),
          lesson('ld1-2', 'Weekly coaching cadence', 14, '1:1s that improve conversion.'),
          lesson('ld1-3', 'Quality & ethics board', 15, 'Stop bad files before they hurt brand.'),
        ],
      },
      {
        id: 'ld2',
        title: 'Growth leadership',
        lessons: [
          lesson('ld2-1', 'Hiring & onboarding juniors', 13, 'Academy-first onboarding.'),
          lesson('ld2-2', 'Incentive design basics', 12, 'Motivate without toxic pressure.'),
          lesson('ld2-3', 'Stakeholder management', 14, 'Builders, CAs and lender desks.'),
        ],
      },
    ],
    resources: [
      { title: 'Partner desk SOP pack', type: 'PDF', size: '640 KB' },
      { title: 'Weekly 1:1 template', type: 'DOCX', size: '70 KB' },
    ],
    assignments: [{ title: 'Write your desk SOP one-pager', dueHint: 'Week 2', status: 'Pending' }],
  },
  {
    slug: 'master-partner',
    title: 'Master Partner Capstone',
    level: 10,
    subtitle: 'Multi-product advisory plan, ethics viva and growth thesis.',
    overview:
      'Capstone for elite partners: design a 12-month multi-product advisory business, defend ethics scenarios, and present a growth thesis aligned to Kuber Verified Professional standards.',
    durationHours: 10,
    videoCount: 8,
    progress: 0,
    certificate: 'Diamond',
    modules: [
      {
        id: 'mp1',
        title: 'Business design',
        lessons: [
          lesson('mp1-1', '12-month advisory plan', 20, 'Products, channels and capacity.'),
          lesson('mp1-2', 'Unit economics for partners', 18, 'Time, cost and payout realism.'),
          lesson('mp1-3', 'Brand & profile readiness', 15, 'Public trust assets.'),
        ],
      },
      {
        id: 'mp2',
        title: 'Viva & defence',
        lessons: [
          lesson('mp2-1', 'Ethics case clinic', 16, 'Hard scenarios without shortcuts.'),
          lesson('mp2-2', 'Customer journey defence', 17, 'Walk a file end-to-end.'),
          lesson('mp2-3', 'Capstone presentation', 22, 'Present your growth thesis.'),
        ],
      },
    ],
    resources: [
      { title: 'Capstone brief', type: 'PDF', size: '420 KB' },
      { title: 'Ethics case booklet', type: 'PDF', size: '380 KB' },
      { title: 'Pitch deck template', type: 'PPTX', size: '1.1 MB' },
    ],
    assignments: [{ title: 'Submit growth thesis deck', dueHint: 'Week 4', status: 'Pending' }],
  },
]

export const ALL_COURSES: Course[] = COURSES

export function getCourse(slug: string): Course | undefined {
  return ALL_COURSES.find((c) => c.slug === slug)
}

export const HOME_LOAN_QUIZ: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'mcq',
    prompt: 'A salaried customer earns ₹85,000/month with existing EMI of ₹18,000. Which statement is most accurate for first screening?',
    options: [
      'Ignore existing EMI; banks only see gross salary',
      'Existing EMI reduces available FOIR capacity for a new home loan',
      'Only net salary after all EMIs is used as income',
      'CIBIL score replaces FOIR entirely',
    ],
    correctIndex: 1,
    explanation: 'Banks assess FOIR on obligations including existing EMIs, so capacity for a new EMI shrinks.',
  },
  {
    id: 'q2',
    type: 'scenario',
    prompt: 'A self-employed retailer has strong GST but irregular bank credits. Best next step?',
    options: [
      'Reject immediately as high risk',
      'Ask for GST returns, ITRs and explain banking pattern before shortlisting lenders',
      'Promise approval based on GST alone',
      'Switch them to credit card only',
    ],
    correctIndex: 1,
    explanation: 'Partners should gather GST + ITR + banking narrative before matching lenders.',
  },
  {
    id: 'q3',
    type: 'case',
    prompt: 'Customer wants maximum loan for a under-construction flat but has thin documentation. Responsible advice?',
    options: [
      'Inflate income documents to clear FOIR',
      'Set realistic eligibility, list missing docs, and timeline for builder stages',
      'Ask them to take personal loan first for down payment without disclosure',
      'Avoid explaining builder NOC requirements',
    ],
    correctIndex: 1,
    explanation: 'Ethics and clarity protect both customer trust and partner reputation.',
  },
]

export const CERTIFICATE_TIERS: {
  tier: CertificateTier
  requirement: string
  color: string
  verifyId: string
}[] = [
  { tier: 'Bronze', requirement: 'Complete Level 1 Foundation + pass quiz (≥70%)', color: '#b45309', verifyId: 'KUB-BRZ-2026-AYA-001' },
  { tier: 'Silver', requirement: 'Complete Levels 2–3 product specialisations', color: '#64748b', verifyId: 'KUB-SLV-PENDING' },
  { tier: 'Gold', requirement: 'Complete Levels 4–6 including CRM Expert', color: '#ca8a04', verifyId: 'KUB-GLD-PENDING' },
  { tier: 'Platinum', requirement: 'Complete Levels 7–8 digital + AI tracks', color: '#0f766e', verifyId: 'KUB-PLT-PENDING' },
  { tier: 'Diamond', requirement: 'Complete Levels 9–10 leadership + master viva', color: '#1e3a8a', verifyId: 'KUB-DIA-PENDING' },
]

export const WHY_JOIN = [
  { title: 'Industry Certification', description: 'Tiered Bronze to Diamond certificates with QR verification for clients and partners.' },
  { title: 'CRM Access', description: 'Learn KuberOne lead pipeline, documents, tasks and commission reports hands-on.' },
  { title: 'Marketing Support', description: 'Ready creatives, WhatsApp templates and festival campaigns for local markets.' },
  { title: 'Sales Training', description: 'Profession-specific scripts for CAs, builders, GST consultants and advisors.' },
  { title: 'AI Tools', description: 'Draft pitches, proposals and objection replies with the Partner AI Assistant.' },
  { title: 'Business Growth', description: 'Move from single-product closures to a multi-product advisory practice.' },
  { title: 'Lead Tracking', description: 'Track every enquiry from first call to disbursement with clear statuses.' },
  { title: 'Multiple Products', description: 'Home loan, LAP, business loan, insurance and credit—one partner brand.' },
]

export const TARGET_PERSONAS = [
  'Chartered Accountants',
  'GST Consultants',
  'Property Consultants',
  'Insurance Advisors',
  'Existing Loan DSAs',
  'Business Consultants',
  'Financial Advisors',
  'Builders',
  'Architects',
  'Interior Designers',
  'Loan Consultants',
  'Women Entrepreneurs',
  'Influencers',
  'Real Estate Agencies',
  'Working Professionals',
]
