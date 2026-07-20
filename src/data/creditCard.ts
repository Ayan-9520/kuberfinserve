export interface CreditCardType {
  id: string
  title: string
  shortTitle: string
  category: string
  description: string
  annualFee: string
  limitFrom: string
  highlights: string[]
  benefits: string[]
  whoFor: string[]
  idealSpend: string
  eligibility: string[]
  documents: string[]
  chargesNote: string
}

export const CREDIT_CARD_PAGE = {
  title: 'Credit Cards',
  description:
    'Compare cashback, rewards, travel, fuel, lifestyle, UPI and business credit cards from leading banks. Expert guidance to match the right card to your spend — subject to issuer eligibility.',
  heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=85',
  metaTitle: 'Best Credit Cards India — Cashback, Travel, Lifetime Free* | KuberFinserve',
  metaDescription:
    'Compare credit cards from HDFC, ICICI, SBI, Axis & more. Lifetime free*, cashback, lounge access, fuel & business cards. Limit up to ₹50 Lakh*. Subject to eligibility.',
  keywords:
    'credit card, cashback credit card, travel credit card, lifetime free credit card, fuel credit card, business credit card, UPI credit card, best credit card India, KuberFinserve',
} as const

export const CREDIT_CARD_TYPES: CreditCardType[] = [
  {
    id: 'lifetime-free',
    title: 'Lifetime Free Credit Cards',
    shortTitle: 'Lifetime Free',
    category: 'Entry / Free',
    description:
      'Zero joining & annual fee cards for eligible profiles — ideal first cards or low-maintenance everyday spend with essential rewards.',
    annualFee: 'Lifetime Free*',
    limitFrom: 'Up to ₹2 Lakh*',
    highlights: [
      'No joining / annual fee*',
      'Essential reward points or cashback',
      'Online & offline acceptance',
      'EMI conversion on select spends*',
      'Digital application support',
    ],
    benefits: ['Zero fee burden', 'Build credit history', 'Basic welcome offers*'],
    whoFor: ['First-time card users', 'Students (issuer specific)', 'Salaried beginners'],
    idealSpend: 'Everyday spends, online shopping, bills',
    eligibility: ['Age 21–60*', 'Stable income preferred', 'Good credit history preferred'],
    documents: ['PAN & Aadhaar', 'Salary slips / ITR', 'Bank statements'],
    chargesNote: 'Forex, late payment and cash withdrawal charges apply as per issuer T&C.',
  },
  {
    id: 'cashback',
    title: 'Cashback Credit Cards',
    shortTitle: 'Cashback',
    category: 'Rewards',
    description:
      'Earn cashback on groceries, online shopping, utilities and more. Popular for users who prefer direct money-back over points.',
    annualFee: 'Starting from Lifetime Free*',
    limitFrom: 'Up to ₹5 Lakh*',
    highlights: [
      'Cashback on select categories*',
      'Milestone / welcome cashback*',
      'Easy redemption to statement',
      'Fuel surcharge waiver on select cards*',
      'App-based tracking',
    ],
    benefits: ['Direct cash value', 'Category boosters*', 'No complex points maths'],
    whoFor: ['Online shoppers', 'Utility bill payers', 'Daily spenders'],
    idealSpend: 'Amazon, Flipkart, UPI, groceries, bills',
    eligibility: ['Age 21–65*', 'Income as per card tier', 'CIBIL preferred 700+'],
    documents: ['KYC', 'Income proof', 'Bank statements 3–6 months'],
    chargesNote: 'Cashback caps and merchant exclusions apply. Read offer terms carefully.',
  },
  {
    id: 'rewards',
    title: 'Reward Points Cards',
    shortTitle: 'Rewards',
    category: 'Rewards',
    description:
      'Earn accelerated reward points on shopping and convert to vouchers, merchandise or travel. Best when you redeem strategically.',
    annualFee: 'Starting from ₹499*',
    limitFrom: 'Up to ₹10 Lakh*',
    highlights: [
      'Accelerated points on partner brands*',
      'Voucher & catalogue redemption',
      'Bonus on milestones*',
      'Transfer partners on select cards*',
      'Complimentary add-ons*',
    ],
    benefits: ['Flexible redemptions', 'Lifestyle perks*', 'Higher earn rates*'],
    whoFor: ['Frequent shoppers', 'Brand-loyal spenders'],
    idealSpend: 'Malls, e-commerce, dining',
    eligibility: ['Salaried / self employed', 'Minimum income as per issuer'],
    documents: ['PAN, Aadhaar', 'Income proof', 'Photograph'],
    chargesNote: 'Points may expire. Redemption value varies by catalogue.',
  },
  {
    id: 'travel',
    title: 'Travel & Lounge Cards',
    shortTitle: 'Travel',
    category: 'Premium',
    description:
      'Airport lounge access, air miles, travel insurance and forex benefits for frequent travellers — domestic and international.',
    annualFee: 'Starting from ₹1,000*',
    limitFrom: 'Up to ₹25 Lakh*',
    highlights: [
      'Domestic / international lounge visits*',
      'Air miles or hotel points*',
      'Travel insurance cover*',
      'Complimentary golf / concierge*',
      'Lower forex markup on select cards*',
    ],
    benefits: ['Lounge comfort', 'Miles accumulation', 'Premium lifestyle access'],
    whoFor: ['Frequent flyers', 'Business travellers', 'High spenders'],
    idealSpend: 'Flights, hotels, overseas spends',
    eligibility: ['Higher income slabs*', 'Strong credit profile preferred'],
    documents: ['KYC', 'Salary / ITR', 'Bank statements'],
    chargesNote: 'Lounge visits capped per year/quarter. Conditions apply.',
  },
  {
    id: 'fuel',
    title: 'Fuel Credit Cards',
    shortTitle: 'Fuel',
    category: 'Utility',
    description:
      'Save on fuel surcharge and earn points/cashback at petrol pumps and fleet spends — popular with daily commuters.',
    annualFee: 'Starting from Lifetime Free*',
    limitFrom: 'Up to ₹3 Lakh*',
    highlights: [
      'Fuel surcharge waiver*',
      'Extra rewards at partner pumps*',
      'Grocery / utility add-ons*',
      'Easy digital statements',
    ],
    benefits: ['Lower effective fuel cost', 'Everyday utility rewards'],
    whoFor: ['Car / bike owners', 'Cab & fleet users'],
    idealSpend: 'Petrol, diesel, CNG stations',
    eligibility: ['Age 21–65*', 'Stable income'],
    documents: ['KYC', 'Income proof'],
    chargesNote: 'Waiver usually capped per month/transaction. Issuer rules apply.',
  },
  {
    id: 'shopping',
    title: 'Shopping & Lifestyle Cards',
    shortTitle: 'Shopping',
    category: 'Lifestyle',
    description:
      'Co-branded and lifestyle cards with vouchers, movie offers, dining discounts and shopping festivals.',
    annualFee: 'Starting from ₹500*',
    limitFrom: 'Up to ₹8 Lakh*',
    highlights: [
      'Brand vouchers & sale offers*',
      'Dining / movie discounts*',
      'EMI on big purchases*',
      'Welcome gift vouchers*',
    ],
    benefits: ['Festive savings', 'Partner brand value'],
    whoFor: ['Mall shoppers', 'Foodies', 'Entertainment seekers'],
    idealSpend: 'Apparel, electronics, restaurants',
    eligibility: ['Income as per card', 'Resident Indian'],
    documents: ['KYC', 'Income proof'],
    chargesNote: 'Offer validity and merchant list change periodically.',
  },
  {
    id: 'upi-rupay',
    title: 'UPI / RuPay Credit Cards',
    shortTitle: 'UPI Credit',
    category: 'Digital',
    description:
      'Link RuPay credit to UPI and pay merchants via QR — combine credit convenience with everyday UPI usability.',
    annualFee: 'Starting from Lifetime Free*',
    limitFrom: 'Up to ₹5 Lakh*',
    highlights: [
      'UPI payments on credit line*',
      'QR merchant acceptance',
      'Cashback / rewards on UPI*',
      'App-based controls',
    ],
    benefits: ['Cashless convenience', 'Credit without physical swipe'],
    whoFor: ['UPI-first users', 'Small ticket spenders'],
    idealSpend: 'Kirana, restaurants, local merchants',
    eligibility: ['Bank account + KYC', 'Issuer UPI eligibility'],
    documents: ['PAN, Aadhaar', 'Income proof as required'],
    chargesNote: 'UPI credit availability depends on issuer & NPCI rules.',
  },
  {
    id: 'business',
    title: 'Business Credit Cards',
    shortTitle: 'Business',
    category: 'Business',
    description:
      'Cards for proprietors, freelancers and SMEs — higher limits, GST-friendly spends, employee cards and expense controls.',
    annualFee: 'Starting from ₹1,000*',
    limitFrom: 'Up to ₹50 Lakh*',
    highlights: [
      'Higher credit limits*',
      'GST invoice / expense tools*',
      'Add-on employee cards*',
      'Rewards on business categories*',
      'Milestone fee waivers*',
    ],
    benefits: ['Working capital float', 'Spend segregation', 'Business rewards'],
    whoFor: ['Business owners', 'Freelancers', 'SMEs'],
    idealSpend: 'Vendor payments, travel, office supplies',
    eligibility: ['Business vintage preferred', 'ITR / GST as applicable', 'Strong banking'],
    documents: ['Business KYC / GST', 'ITR', 'Bank statements', 'PAN'],
    chargesNote: 'Underwriting is stricter. Limits subject to turnover & bureau.',
  },
  {
    id: 'secured',
    title: 'Secured / FD-Backed Cards',
    shortTitle: 'Secured',
    category: 'Credit Build',
    description:
      'Credit cards against fixed deposit — useful for thin-file or rebuilding credit with controlled limits.',
    annualFee: 'Often Lifetime Free*',
    limitFrom: 'Up to 80–90% of FD*',
    highlights: [
      'FD-backed limit*',
      'Helps build credit history',
      'Lower approval friction*',
      'Upgrade path to unsecured*',
    ],
    benefits: ['Easier approval odds*', 'Disciplined credit use'],
    whoFor: ['New to credit', 'Low CIBIL rebuilding', 'Students with FD'],
    idealSpend: 'Controlled monthly spends',
    eligibility: ['FD with issuer bank*', 'KYC compliant'],
    documents: ['KYC', 'FD receipt / bank account'],
    chargesNote: 'Limit linked to FD. Premature FD closure rules apply.',
  },
  {
    id: 'premium-metal',
    title: 'Premium & Metal Cards',
    shortTitle: 'Premium / Metal',
    category: 'Premium',
    description:
      'Ultra-premium metal cards with concierge, unlimited lounges, golf, and exclusive lifestyle privileges for high-income profiles.',
    annualFee: 'Starting from ₹10,000*',
    limitFrom: 'Up to ₹50 Lakh*',
    highlights: [
      'Metal / premium card design',
      'Unlimited or high lounge access*',
      'Concierge & golf*',
      'Luxury brand offers*',
      'High welcome bonuses*',
    ],
    benefits: ['Status benefits', 'Travel elite perks', 'Highest reward rates*'],
    whoFor: ['HNIs', 'CXOs', 'Very high spenders'],
    idealSpend: 'Luxury, travel, fine dining',
    eligibility: ['High income / relationship criteria*', 'Excellent credit'],
    documents: ['KYC', 'High income proof', 'Bank statements'],
    chargesNote: 'Fee waiver usually needs high annual spend milestones.',
  },
]

export const CREDIT_CARD_TYPE_OPTIONS = CREDIT_CARD_TYPES.map((c) => c.title)

export const CREDIT_CARD_PROCESS = [
  { step: '01', title: 'Choose Card Type', desc: 'Cashback, travel, fuel, business & more.' },
  { step: '02', title: 'Share Profile', desc: 'Income, city and spend preference.' },
  { step: '03', title: 'Compare Offers', desc: 'We match issuer options to your profile.' },
  { step: '04', title: 'Apply Securely', desc: 'Complete KYC with the bank — subject to approval.' },
] as const

export const CREDIT_CARD_WHY = [
  'Compare cards across HDFC, ICICI, SBI, Axis & more',
  'Match card to your real spend pattern',
  'Clear talk on fees, forex & lounge caps',
  'Dedicated advisor — no spam calls',
  'Business & secured card guidance',
  'PAN India digital assistance',
] as const

export const CREDIT_CARD_DISCLAIMER =
  '*Credit cards are issued solely by partner banks / NBFCs. Annual fees, limits, rewards, lounge access and approvals are indicative and subject to issuer underwriting, income, credit bureau and product policy. KuberFinserve provides comparison and application assistance only and does not guarantee card issuance, limit or benefits. Multiple applications may impact your credit score.'

/** Legacy shape used elsewhere */
export const CREDIT_CARD_PRODUCT = {
  slug: 'credit-card',
  title: CREDIT_CARD_PAGE.title,
  shortTitle: 'Credit Card',
  description: CREDIT_CARD_PAGE.description,
  rateFrom: 'Lifetime Free*',
  creditLimit: 'Up to ₹50 Lakh*',
  heroImage: CREDIT_CARD_PAGE.heroImage,
  features: CREDIT_CARD_TYPES.map((c) => c.shortTitle),
  benefits: [...CREDIT_CARD_WHY],
  eligibility: [
    'Age: 21–70 years (issuer specific)',
    'Resident Indian',
    'Stable income — salaried or self employed',
    'Good credit history preferred',
  ],
  documents: [
    'Identity: PAN, Aadhaar',
    'Address proof',
    'Income: Salary slips / ITR / Bank statements',
    'Business proof (for business cards)',
  ],
  metaTitle: CREDIT_CARD_PAGE.metaTitle,
  metaDescription: CREDIT_CARD_PAGE.metaDescription,
  keywords: CREDIT_CARD_PAGE.keywords,
} as const

export const CREDIT_CARD_HERO_SUBTITLE = CREDIT_CARD_PAGE.description
