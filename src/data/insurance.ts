export interface InsuranceProduct {
  id: string
  title: string
  shortTitle: string
  category: 'Life' | 'Health' | 'Motor' | 'Property' | 'Travel' | 'Business'
  description: string
  coverFrom: string
  highlights: string[]
  benefits: string[]
  whoFor: string[]
  documents: string[]
  claimsNote: string
}

export const INSURANCE_PAGE = {
  title: 'Insurance Plans',
  description:
    'Compare life, health, motor, home, travel and business insurance from leading insurers. Expert guidance to choose the right cover — premiums and benefits subject to insurer underwriting.',
  heroImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=85',
  metaTitle: 'Life, Health, Motor & Home Insurance | Compare Plans | KuberFinserve',
  metaDescription:
    'Get insurance quotes for term life, health, car, bike, home, travel & business cover. Compare plans from trusted insurers with expert assistance. Subject to underwriting.',
  keywords:
    'life insurance, health insurance, motor insurance, car insurance, home insurance, term plan, family floater, travel insurance, business insurance, KuberFinserve',
} as const

/** @deprecated use INSURANCE_PAGE.description */
export const INSURANCE_HERO_SUBTITLE = INSURANCE_PAGE.description

export const INSURANCE_PRODUCTS: InsuranceProduct[] = [
  {
    id: 'life-term',
    title: 'Term Life Insurance',
    shortTitle: 'Term Life',
    category: 'Life',
    description:
      'Pure protection cover that pays a lump sum to your nominees in case of untimely demise. High cover at affordable premiums for income replacement and family security.',
    coverFrom: 'Starting from ₹50 Lakh*',
    highlights: [
      'High sum assured at low premium',
      'Critical illness riders available',
      'Accidental death benefit options',
      'Tax benefits under applicable sections*',
      'Online & offline issuance support',
    ],
    benefits: [
      'Financial security for dependents',
      'Flexible policy terms (10–40 years*)',
      'Optional return of premium variants*',
      'Easy claim assistance guidance',
    ],
    whoFor: ['Salaried professionals', 'Business owners', 'Self employed', 'Primary family earners'],
    documents: ['PAN & Aadhaar', 'Income proof (as applicable)', 'Photograph', 'Medicals if required by insurer'],
    claimsNote: 'Claims are settled by the respective life insurer as per policy terms. We assist with documentation guidance only.',
  },
  {
    id: 'life-savings',
    title: 'Savings & ULIP Plans',
    shortTitle: 'Savings / ULIP',
    category: 'Life',
    description:
      'Life cover with savings or market-linked investment components. Suitable for long-term goals with protection — subject to market risks for ULIPs.',
    coverFrom: 'Flexible premium*',
    highlights: [
      'Protection + wealth creation options',
      'Goal-based planning support',
      'Fund choices in ULIP plans*',
      'Maturity / survival benefits as per plan',
    ],
    benefits: [
      'Disciplined long-term savings',
      'Life cover throughout policy term',
      'Tax treatment as per current laws*',
    ],
    whoFor: ['Long-term savers', 'Parents planning goals', 'Investors seeking life cover'],
    documents: ['KYC', 'Income proof', 'Bank details', 'Risk profile (for ULIP)'],
    claimsNote: 'ULIP returns are market-linked and not guaranteed. Read offer documents carefully.',
  },
  {
    id: 'health-individual',
    title: 'Health Insurance',
    shortTitle: 'Health',
    category: 'Health',
    description:
      'Individual and family floater mediclaim plans covering hospitalisation, daycare procedures and related expenses from leading health insurers.',
    coverFrom: 'Starting from ₹3 Lakh*',
    highlights: [
      'Cashless hospital network*',
      'Family floater options',
      'Pre & post hospitalisation cover*',
      'No-claim bonus on select plans*',
      'Maternity & OPD add-ons (plan specific)',
    ],
    benefits: [
      'Protection against rising medical costs',
      'Tax benefits under Section 80D*',
      'Restore benefit on select policies*',
      'Portability support guidance',
    ],
    whoFor: ['Individuals', 'Families', 'Senior citizens (plan specific)', 'Self employed'],
    documents: ['KYC', 'Age proof', 'Previous policy (if porting)', 'Medical reports if asked'],
    claimsNote: 'Cashless/reimbursement as per insurer network and policy conditions. Pre-authorisation may be required.',
  },
  {
    id: 'motor-car',
    title: 'Car Insurance',
    shortTitle: 'Car',
    category: 'Motor',
    description:
      'Comprehensive and third-party motor insurance for private cars — own damage, third-party liability and add-ons like zero depreciation*.',
    coverFrom: 'Third-party from IRDAI rates*',
    highlights: [
      'Comprehensive & TP only options',
      'Zero dep / engine protect add-ons*',
      'Cashless garage network*',
      'Quick renewal & policy copy support',
      'IDV guidance for fair valuation',
    ],
    benefits: [
      'Mandatory TP liability compliance',
      'Own damage cover on comprehensive',
      'Personal accident cover for owner-driver*',
    ],
    whoFor: ['Private car owners', 'New car buyers', 'Used car owners'],
    documents: ['RC copy', 'Previous policy (renewal)', 'KYC', 'Invoice (new vehicle)'],
    claimsNote: 'Survey and settlement by the motor insurer. Keep FIR/photos as advised for claim filing.',
  },
  {
    id: 'motor-bike',
    title: 'Two-Wheeler Insurance',
    shortTitle: 'Bike',
    category: 'Motor',
    description:
      'Affordable third-party and comprehensive cover for bikes and scooters with optional add-ons for better protection.',
    coverFrom: 'Low annual premium*',
    highlights: [
      'TP & comprehensive plans',
      'Long-term TP options available*',
      'Quick digital policy assistance',
      'Add-on covers on select insurers*',
    ],
    benefits: ['Legal compliance', 'Own damage protection*', 'PA cover options*'],
    whoFor: ['Bike & scooter owners', 'First-time riders'],
    documents: ['RC', 'Previous policy', 'KYC'],
    claimsNote: 'Claims processed by insurer as per motor tariff and policy wording.',
  },
  {
    id: 'home',
    title: 'Home Insurance',
    shortTitle: 'Home',
    category: 'Property',
    description:
      'Protect your home structure and contents against fire, burglary, natural calamities and related perils as defined in the policy.',
    coverFrom: 'Flexible sum insured*',
    highlights: [
      'Building & contents cover',
      'Burglary & fire protection*',
      'Natural calamity covers (plan specific)',
      'Jewellery / valuables add-ons*',
    ],
    benefits: ['Asset protection', 'Alternate accommodation (select plans)*', 'Peace of mind for homeowners'],
    whoFor: ['Homeowners', 'Landlords', 'Apartment residents'],
    documents: ['Property proof', 'KYC', 'Contents list (if required)', 'Valuation details'],
    claimsNote: 'Claims subject to survey, exclusions and underinsurance clauses in the policy.',
  },
  {
    id: 'travel',
    title: 'Travel Insurance',
    shortTitle: 'Travel',
    category: 'Travel',
    description:
      'Domestic and international travel cover for medical emergencies abroad, trip delay, baggage loss and related risks*.',
    coverFrom: 'Single trip & annual*',
    highlights: [
      'International medical cover*',
      'Trip cancellation / delay*',
      'Baggage & passport loss*',
      'Student & family travel plans',
    ],
    benefits: ['Travel with confidence', 'Emergency assistance helplines*', 'Visa-supportive covers on select plans'],
    whoFor: ['International travellers', 'Students going abroad', 'Domestic tourists'],
    documents: ['Passport / ID', 'Travel itinerary', 'Visa (if applicable)', 'KYC'],
    claimsNote: 'Overseas claims often require assistance partner approval. Keep medical bills and reports.',
  },
  {
    id: 'business',
    title: 'Business & Shop Insurance',
    shortTitle: 'Business',
    category: 'Business',
    description:
      'Shopkeepers, SME and commercial covers for stock, premises, liability and related business risks — tailored to your trade.',
    coverFrom: 'As per risk assessment*',
    highlights: [
      'Fire & burglary for premises/stock*',
      'Public liability options*',
      'Machinery / electronic equipment*',
      'Package policies for shops & offices',
    ],
    benefits: ['Business continuity support', 'Asset & liability protection', 'Customisable sum insured'],
    whoFor: ['Shop owners', 'SMEs', 'Offices & clinics', 'Warehouse operators'],
    documents: ['Business KYC / GST', 'Premises proof', 'Stock declaration', 'Previous policy if any'],
    claimsNote: 'Underwriting and claims depend on occupancy, fire safety and declared values.',
  },
]

export const INSURANCE_TYPE_OPTIONS = INSURANCE_PRODUCTS.map((p) => p.title)

export const INSURANCE_WHY = [
  'Compare plans across leading life & general insurers',
  'Dedicated advisor — no spam, clear recommendations',
  'Help with proposal form & documentation',
  'Renewal reminders & policy servicing guidance',
  'Transparent talk on exclusions & waiting periods',
  'PAN India assistance',
] as const

export const INSURANCE_PROCESS = [
  { step: '01', title: 'Select Cover', desc: 'Choose life, health, motor or other insurance type.' },
  { step: '02', title: 'Share Details', desc: 'Submit the form with basic profile & requirements.' },
  { step: '03', title: 'Get Quotes', desc: 'Our experts compare and share suitable options.' },
  { step: '04', title: 'Buy Securely', desc: 'Complete proposal with the insurer — subject to underwriting.' },
] as const

export const INSURANCE_FAQS = [
  {
    q: 'Does KuberFinserve underwrite or issue insurance policies?',
    a: 'No. Policies are issued by IRDAI-registered insurers. KuberFinserve provides comparison and advisory assistance as a distribution partner.',
  },
  {
    q: 'Which insurance products can I apply for?',
    a: 'Term life, savings/ULIP, health, car, two-wheeler, home, travel and business/shop insurance — select the type in the apply form.',
  },
  {
    q: 'Are premiums guaranteed in the quote?',
    a: 'No. Premiums depend on age, sum insured, city, vehicle/property details, medical history and insurer underwriting. Quotes are indicative until the insurer confirms.',
  },
  {
    q: 'Is health insurance cashless everywhere?',
    a: 'Cashless facility is available at the insurer’s network hospitals only, subject to pre-authorisation and policy terms.',
  },
  {
    q: 'Is third-party motor insurance mandatory?',
    a: 'Yes. As per Motor Vehicles Act, third-party liability insurance is mandatory for vehicles plying on Indian roads.',
  },
  {
    q: 'Can I get tax benefits on insurance?',
    a: 'Eligible premiums may qualify for deductions under applicable Income Tax sections (e.g. 80C / 80D) as per current law and your tax situation. Consult a tax advisor.',
  },
  {
    q: 'How do I raise a claim?',
    a: 'Intimate the insurer / assistance partner as per policy. We can guide you on documents and process, but claim decision rests solely with the insurer.',
  },
  {
    q: 'What documents are needed to buy a policy?',
    a: 'Typically KYC (PAN/Aadhaar), age proof, and product-specific papers (RC for motor, medicals for higher health/life covers). Exact list varies by insurer.',
  },
  {
    q: 'Do you charge customers for quotes?',
    a: 'Share your details via the form — our team explains the process transparently. Policy premium is paid to the insurer as per their norms.',
  },
  {
    q: 'Can I port my existing health policy?',
    a: 'Portability may be possible as per IRDAI guidelines and insurer acceptance. Continuity benefits depend on your claim history and waiting periods served.',
  },
] as const

export const INSURANCE_DISCLAIMER =
  '*Insurance is a subject matter of solicitation. Premiums, coverage, exclusions, waiting periods and claim settlements are governed solely by the policy issued by the respective IRDAI-registered insurer. KuberFinserve acts only as an insurance distribution / advisory facilitator and does not underwrite risk or guarantee claim settlement. Investment returns in ULIPs are subject to market risks. Tax benefits are as per prevailing laws and may change.'
