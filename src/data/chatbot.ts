import { SITE } from '@/data/site'

export interface ChatLink {
  label: string
  path: string
}

export interface BotReply {
  text: string
  links?: ChatLink[]
}

type Lang = 'en' | 'hinglish'

export type ProductKey =
  | 'home-loan'
  | 'lap'
  | 'personal-loan'
  | 'business-loan'
  | 'car-loan'
  | 'education-loan'
  | 'machinery-loan'
  | 'insurance'
  | 'credit-card'
  | 'unknown'

export interface BotState {
  lang?: Lang
  product?: ProductKey
  pending?: 'ask_product_for_rates' | 'ask_product_for_docs' | 'ask_product_for_eligibility' | null
  // Lead capture
  leadMode?: boolean
  leadStep?:
    | 'product'
    | 'name'
    | 'phone'
    | 'email'
    | 'city'
    | 'employment'
    | 'income'
    | 'amount'
    | 'message'
    | 'done'
    | null
  leadDraft?: {
    product?: ProductKey
    name?: string
    phone?: string
    email?: string
    city?: string
    employmentType?: string
    monthlyIncome?: string
    amount?: string
    message?: string
  }
}

export const CHAT_QUICK_ACTIONS = [
  { id: 'apply', label: '📋 Apply Loan', payload: 'apply loan' },
  { id: 'home', label: '🏠 Home Loan', payload: 'home loan' },
  { id: 'personal', label: '💰 Personal Loan', payload: 'personal loan' },
  { id: 'rates', label: '📊 Interest Rates', payload: 'interest rates' },
  { id: 'contact', label: '📞 Contact Us', payload: 'contact' },
] as const

const DEFAULT_LINKS: ChatLink[] = [
  { label: 'Apply Loan', path: '/apply-loan' },
  { label: 'Contact Us', path: '/contact-us' },
]

function detectLang(input: string): Lang {
  // Devanagari => Hindi/Hinglish intent
  if (/[\u0900-\u097F]/.test(input)) return 'hinglish'

  const q = input.toLowerCase()
  // Lightweight Hinglish heuristic (roman hindi words users commonly type)
  const tokens = [
    'kya',
    'kaise',
    'ka',
    'ki',
    'ke',
    'mera',
    'meri',
    'mujhe',
    'hum',
    'ham',
    'nahi',
    'haan',
    'ha',
    'pls',
    'krdo',
    'kardo',
    'batao',
    'btao',
    'kitna',
    'kab',
    'kaha',
    'kyu',
    'kyun',
    'chahiye',
    'apply',
    'cibil',
  ]

  return tokens.some((tok) => q.includes(tok)) ? 'hinglish' : 'en'
}

/** Replies are English-only (Hinglish locale strings retired). */
function t(_lang: Lang, en: string, _hinglish?: string) {
  return en
}

function greeting(lang: Lang): BotReply {
  return {
    text: t(
      lang,
      `Hello! 👋 Welcome to ${SITE.name}. I'm your virtual assistant. Ask about loans, rates, documents, or tap a quick option below.`,
      `Hello! 👋 Welcome to ${SITE.name}. Main aapka virtual assistant hoon. Loan, rates, documents ya eligibility ke baare me puch sakte ho—ya neeche quick option choose karo.`,
    ),
    links: [
      { label: 'Apply Online', path: '/apply-loan' },
    ],
  }
}

function detectProduct(q: string): ProductKey {
  if (/home|house|housing/.test(q) && !/against|lap/.test(q)) return 'home-loan'
  if (/lap|loan against|mortgage|property loan/.test(q)) return 'lap'
  if (/personal/.test(q)) return 'personal-loan'
  if (/business|sme|working capital|od|cc|overdraft|cash credit/.test(q)) return 'business-loan'
  if (/car|auto|vehicle/.test(q)) return 'car-loan'
  if (/education|study|college|student/.test(q)) return 'education-loan'
  if (/machinery|equipment/.test(q)) return 'machinery-loan'
  if (/insurance|life|health|motor insurance/.test(q)) return 'insurance'
  if (/credit card/.test(q)) return 'credit-card'
  return 'unknown'
}

function productOptionsLinks(): ChatLink[] {
  return [
    // Use payload: prefix to make these behave like quick-reply buttons in chat
    { label: 'Home Loan', path: 'payload:home loan' },
    { label: 'Loan Against Property', path: 'payload:lap' },
    { label: 'Personal Loan', path: 'payload:personal loan' },
    { label: 'Business Loan', path: 'payload:business loan' },
    { label: 'Education Loan', path: 'payload:education loan' },
    { label: 'Car Loan', path: 'payload:car loan' },
    { label: 'Machinery Loan', path: 'payload:machinery loan' },
    { label: 'Insurance', path: 'payload:insurance' },
    { label: 'Credit Card', path: 'payload:credit card' },
  ]
}

function productLabel(key: ProductKey): string {
  switch (key) {
    case 'home-loan':
      return 'Home Loan'
    case 'lap':
      return 'Loan Against Property'
    case 'personal-loan':
      return 'Personal Loan'
    case 'business-loan':
      return 'Business Loan'
    case 'car-loan':
      return 'Auto Loan (New Car)'
    case 'education-loan':
      return 'Education Loan'
    case 'machinery-loan':
      return 'Machinery Loan'
    case 'insurance':
      return 'Insurance'
    case 'credit-card':
      return 'Credit Card'
    default:
      return 'Loan'
  }
}

function extractPhone(text: string): string | null {
  const digits = text.replace(/\D/g, '')
  const m = digits.match(/(?:91)?([6-9]\d{9})/)
  return m?.[1] ?? null
}

function extractEmail(text: string): string | null {
  const m = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
  return m?.[0] ?? null
}

function match(input: string, prevState: BotState): { reply: BotReply; nextState: BotState } {
  const q = input.toLowerCase().trim()
  const lang = detectLang(input)
  const product = detectProduct(q)
  const nextState: BotState = {
    ...prevState,
    lang,
    product: product !== 'unknown' ? product : prevState.product,
    pending: null,
    leadMode: prevState.leadMode ?? false,
    leadStep: prevState.leadStep ?? null,
    leadDraft: prevState.leadDraft ?? {},
  }

  // Start lead capture on generic "loan" / "apply" intent
  if (!nextState.leadMode && /\bloan\b|apply loan|need loan|loan chahiye|loan chaiye/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'Sure — which product do you need?',
          'Theek hai — aapko kaunsa product chahiye?',
        ),
        links: productOptionsLinks(),
      },
      nextState: { ...nextState, leadMode: true, leadStep: 'product', leadDraft: {} },
    }
  }

  // Lead capture flow (multi-step)
  if (nextState.leadMode) {
    const draft = { ...(nextState.leadDraft ?? {}) }

    // If user wrote a product keyword anytime, capture it.
    if (product !== 'unknown') draft.product = product

    const step = nextState.leadStep ?? 'product'

    if (step === 'product') {
      if (!draft.product || draft.product === 'unknown') {
        return {
          reply: {
            text: t(
              lang,
              'Please choose a product to continue.',
              'Continue karne ke liye product choose karo.',
            ),
            links: productOptionsLinks(),
          },
          nextState: { ...nextState, leadDraft: draft, leadStep: 'product' },
        }
      }
      return {
        reply: {
          text: t(
            lang,
            `Great. Your product: ${productLabel(draft.product)}. What’s your full name?`,
            `Great. Product: ${productLabel(draft.product)}. Aapka full name kya hai?`,
          ),
        },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'name' },
      }
    }

    if (step === 'name') {
      const name = input.trim()
      if (name.length < 2) {
        return {
          reply: { text: t(lang, 'Please enter your full name.', 'Please apna full name likho.') },
          nextState: { ...nextState, leadDraft: draft, leadStep: 'name' },
        }
      }
      draft.name = name
      return {
        reply: { text: t(lang, 'Mobile number?', 'Mobile number?') },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'phone' },
      }
    }

    if (step === 'phone') {
      const phone = extractPhone(input)
      if (!phone) {
        return {
          reply: { text: t(lang, 'Please enter a valid 10-digit mobile number.', 'Valid 10-digit mobile number likho.') },
          nextState: { ...nextState, leadDraft: draft, leadStep: 'phone' },
        }
      }
      draft.phone = phone
      return {
        reply: { text: t(lang, 'Email address?', 'Email address?') },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'email' },
      }
    }

    if (step === 'email') {
      const email = extractEmail(input)
      if (!email) {
        return {
          reply: { text: t(lang, 'Please enter a valid email (example: name@gmail.com).', 'Valid email likho (example: name@gmail.com).') },
          nextState: { ...nextState, leadDraft: draft, leadStep: 'email' },
        }
      }
      draft.email = email
      return {
        reply: { text: t(lang, 'City?', 'City?') },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'city' },
      }
    }

    if (step === 'city') {
      const city = input.trim()
      if (city.length < 2) {
        return {
          reply: { text: t(lang, 'Please enter your city.', 'Apna city likho.') },
          nextState: { ...nextState, leadDraft: draft, leadStep: 'city' },
        }
      }
      draft.city = city
      return {
        reply: {
          text: t(
            lang,
            'Employment type? (Salaried / Self employed / Professional)',
            'Employment type? (Salaried / Self employed / Professional)',
          ),
        },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'employment' },
      }
    }

    if (step === 'employment') {
      draft.employmentType = input.trim()
      return {
        reply: { text: t(lang, 'Monthly income (approx)?', 'Monthly income (approx)?') },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'income' },
      }
    }

    if (step === 'income') {
      draft.monthlyIncome = input.trim()
      return {
        reply: { text: t(lang, 'Required loan amount / cover amount?', 'Required amount kitna hai?') },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'amount' },
      }
    }

    if (step === 'amount') {
      draft.amount = input.trim()
      return {
        reply: { text: t(lang, 'Any message / requirement? (optional)', 'Koi message / requirement? (optional)') },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'message' },
      }
    }

    if (step === 'message') {
      draft.message = input.trim()
      const summary = [
        `Product: ${productLabel(draft.product ?? 'unknown')}`,
        draft.name ? `Name: ${draft.name}` : null,
        draft.phone ? `Mobile: ${draft.phone}` : null,
        draft.email ? `Email: ${draft.email}` : null,
        draft.city ? `City: ${draft.city}` : null,
        draft.employmentType ? `Employment: ${draft.employmentType}` : null,
        draft.monthlyIncome ? `Monthly income: ${draft.monthlyIncome}` : null,
        draft.amount ? `Required amount: ${draft.amount}` : null,
      ].filter(Boolean)

      return {
        reply: {
          text: t(
            lang,
            `Thanks! ✅ I’m submitting your details now.\n\n${summary.join('\n')}\n\nYou’ll get a callback within 24 hours.`,
            `Thanks! ✅ Main abhi aapki details submit kar raha hoon.\n\n${summary.join('\n')}\n\n24 hours me callback aayega.`,
          ),
        },
        nextState: { ...nextState, leadDraft: draft, leadStep: 'done' },
      }
    }
  }

  // If we asked a pending question earlier, treat this input as follow-up.
  if (prevState.pending && product !== 'unknown') {
    if (prevState.pending === 'ask_product_for_rates') {
      return {
        reply: {
          text: t(
            lang,
            `Got it. Rates depend on profile & lender. For ${product.replace('-', ' ')} we’ll share the best available options after a quick check. Want to apply now?`,
            `Theek hai. Rates profile aur lender par depend karti hain. ${product.replace('-', ' ')} ke liye best options quick check ke baad share ho jayenge. Apply karna hai?`,
          ),
          links: [{ label: 'Apply Now', path: '/apply-loan' }],
        },
        nextState,
      }
    }
    if (prevState.pending === 'ask_product_for_docs') {
      return {
        reply: {
          text: t(
            lang,
            'Typically: KYC (Aadhaar/PAN), address proof, income proof, last 6 months bank statements. Product-specific documents differ—apply to get exact list.',
            'Usually: KYC (Aadhaar/PAN), address proof, income proof, last 6 months bank statements. Product-wise docs differ—apply karo, exact list mil jayegi.',
          ),
          links: [{ label: 'Start Application', path: '/apply-loan' }],
        },
        nextState,
      }
    }
    if (prevState.pending === 'ask_product_for_eligibility') {
      return {
        reply: {
          text: t(
            lang,
            'General eligibility: age 21–65, stable income, CIBIL 650+ preferred. Exact eligibility depends on product & lender—share city + employment type for better guidance.',
            'General eligibility: age 21–65, stable income, CIBIL 650+ preferred. Exact eligibility product/lender par depend—city + employment type bata do.',
          ),
          links: [{ label: 'Check & Apply', path: '/apply-loan' }],
        },
        nextState,
      }
    }
  }

  if (/^(hi|hello|hey|namaste|good)/.test(q)) return { reply: greeting(lang), nextState }

  if (/apply|application|form|lead/.test(q)) {
    return {
      reply: {
        text: t(
        lang,
        'You can apply online in 2 minutes. Fill loan amount, employment & income details — our team will call you within 24 hours.',
        'Aap 2 minutes me online apply kar sakte ho. Loan amount, employment aur income details fill karo — hamari team 24 hours me call karegi.',
      ),
        links: [
        { label: 'Apply Now', path: '/apply-loan' },
        { label: 'Personal Loan', path: '/loans/personal-loan' },
        { label: 'Home Loan', path: '/loans/home-loan' },
      ],
      },
      nextState,
    }
  }

  if (/home|house|property purchase/.test(q) && !/against|lap/.test(q)) {
    return {
      reply: {
        text: t(
        lang,
        'Home loans from 8.4% p.a.* for purchase, construction & balance transfer. Tenure up to 30 years.',
        'Home loan 8.4% p.a.* se start ho sakta hai—purchase, construction aur balance transfer ke liye. Tenure 30 years tak.',
      ),
        links: [{ label: 'Apply Home Loan', path: '/loans/home-loan' }],
      },
      nextState: { ...nextState, product: 'home-loan' },
    }
  }

  if (/personal/.test(q)) {
    return {
      reply: {
        text: t(
        lang,
        'Personal loans from 10.5% p.a.* — no collateral, quick disbursal, flexible use.',
        'Personal loan 10.5% p.a.* se start—no collateral, quick disbursal, flexible use.',
      ),
        links: [{ label: 'Apply Personal Loan', path: '/loans/personal-loan' }],
      },
      nextState: { ...nextState, product: 'personal-loan' },
    }
  }

  if (/business|sme|working capital/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'Business loans for SMEs — working capital & term loans from 11% p.a.*',
          'SME/business loans—working capital aur term loans 11% p.a.* se start ho sakte hain.',
        ),
        links: [{ label: 'Apply Business Loan', path: '/loans/business-loan' }],
      },
      nextState: { ...nextState, product: 'business-loan' },
    }
  }

  if (/education|study|college/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'Education loans for India & abroad with moratorium & tax benefits under Section 80E.',
          'Education loan India/abroad ke liye—moratorium + Section 80E tax benefit ke saath.',
        ),
        links: [{ label: 'Apply Education Loan', path: '/loans/education-loan' }],
      },
      nextState: { ...nextState, product: 'education-loan' },
    }
  }

  if (/car|auto|vehicle|new car/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'New & used car loans with flexible tenure and quick approval.',
          'New aur used car loan—flexible tenure aur quick approval ke options.',
        ),
        links: [
          { label: 'New Car Loan', path: '/loans/new-car-loan' },
          { label: 'Used Car Loan', path: '/loans/used-car-loan' },
        ],
      },
      nextState: { ...nextState, product: 'car-loan' },
    }
  }

  if (/lap|loan against|mortgage/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'Loan Against Property from 9% p.a.* — unlock property value for any need.',
          'Loan Against Property 9% p.a.* se start—property value unlock karke kisi bhi need ke liye.',
        ),
        links: [{ label: 'Apply Loan Against Property', path: '/loans/loan-against-property' }],
      },
      nextState: { ...nextState, product: 'lap' },
    }
  }

  if (/insurance|life|health/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'We offer life & general insurance products from trusted partners.',
          'Hum life aur general insurance products trusted partners se provide karte hain.',
        ),
        links: [{ label: 'Explore Insurance', path: '/insurance' }],
      },
      nextState: { ...nextState, product: 'insurance' },
    }
  }

  if (/credit card/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'Compare credit cards from top banks with easy documentation.',
          'Top banks ke credit cards compare karo—easy documentation ke saath.',
        ),
        links: [{ label: 'Credit Card', path: '/credit-card' }],
      },
      nextState: { ...nextState, product: 'credit-card' },
    }
  }

  if (/rate|interest|emi|percent/.test(q)) {
    // If product already known, answer; else ask product (more human-like)
    if (nextState.product && nextState.product !== 'unknown') {
      return {
        reply: {
          text: t(
            lang,
            'Rates depend on profile & lender policy. Share loan type + city + income range for a better estimate.',
            'Rates profile aur lender policy par depend karti hain. Loan type + city + income range bata do, main better estimate bata dunga.',
          ),
          links: [{ label: 'Apply & Get Quote', path: '/apply-loan' }],
        },
        nextState,
      }
    }
    return {
      reply: {
        text: t(
          lang,
          'Sure — which product are you checking rates for? (Home loan / Personal / Business / Loan Against Property / Car / Education / Insurance / Credit card)',
          'Sure — aap kis product ke rates puch rahe ho? (Home loan / Personal / Business / Loan Against Property / Car / Education / Insurance / Credit card)',
        ),
        links: productOptionsLinks(),
      },
      nextState: { ...nextState, pending: 'ask_product_for_rates' },
    }
  }

  if (/document|paper|kyc|proof/.test(q)) {
    if (nextState.product && nextState.product !== 'unknown') {
      return {
        reply: {
          text: t(
            lang,
            'Typically: KYC (Aadhaar/PAN), address proof, income proof, last 6 months bank statements. Product-specific documents vary—apply to get the exact list.',
            'Usually: KYC (Aadhaar/PAN), address proof, income proof, last 6 months bank statements. Product-wise docs differ—apply karo, exact list mil jayegi.',
          ),
          links: [{ label: 'Start Application', path: '/apply-loan' }],
        },
        nextState,
      }
    }
    return {
      reply: {
        text: t(
          lang,
          'Documents depend on product. Which product are you applying for?',
          'Documents product par depend karte hain. Aap kaunsa product apply kar rahe ho?',
        ),
        links: productOptionsLinks(),
      },
      nextState: { ...nextState, pending: 'ask_product_for_docs' },
    }
  }

  if (/eligib|qualif|who can/.test(q)) {
    if (nextState.product && nextState.product !== 'unknown') {
      return {
        reply: {
          text: t(
            lang,
            'General eligibility: age 21–65, stable income, CIBIL 650+ preferred. Exact eligibility depends on product & lender. Share city + employment type for better guidance.',
            'General eligibility: age 21–65, stable income, CIBIL 650+ preferred. Exact eligibility product/lender par depend. City + employment type bata do.',
          ),
          links: [{ label: 'Check & Apply', path: '/apply-loan' }],
        },
        nextState,
      }
    }
    return {
      reply: {
        text: t(
          lang,
          'Eligibility depends on product. Which product are you checking eligibility for?',
          'Eligibility product par depend karti hai. Aap kaunsa product ke liye eligibility check kar rahe ho?',
        ),
        links: productOptionsLinks(),
      },
      nextState: { ...nextState, pending: 'ask_product_for_eligibility' },
    }
  }

  if (/contact|phone|call|email|address|location/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          `📞 ${SITE.phone}\n☎️ ${SITE.landline}\n✉️ ${SITE.email}\n📍 ${SITE.address}`,
          `📞 ${SITE.phone}\n☎️ ${SITE.landline}\n✉️ ${SITE.email}\n📍 ${SITE.address}`,
        ),
        links: [
          { label: 'Contact Page', path: '/contact-us' },
          { label: 'WhatsApp Chat', path: `https://wa.me/${SITE.whatsapp}` },
        ],
      },
      nextState,
    }
  }

  if (/time|hour|open|when/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'Our team is available Mon–Sat, 10:00 AM – 7:00 PM IST. Leave your details in the apply form for a callback.',
          'Hamari team Mon–Sat, 10:00 AM – 7:00 PM IST available hai. Callback ke liye apply form me details leave kar do.',
        ),
        links: [{ label: 'Request Callback', path: '/apply-loan' }],
      },
      nextState,
    }
  }

  if (/partner|crm|agent|kuberone/.test(q)) {
    return {
      reply: {
        text: t(
          lang,
          'Partners can access KuberOne — India\'s Financial Distribution Operating System.',
          'Partners KuberOne access kar sakte hain — India ka Financial Distribution OS.',
        ),
        links: [
          { label: 'Become Partner', path: SITE.partnersUrl },
          { label: 'KuberOne Login', path: SITE.partnerCrmUrl },
        ],
      },
      nextState,
    }
  }

  return {
    reply: {
      text: t(
      lang,
      "I'm not sure about that. Try asking about a specific loan, interest rates, documents, eligibility, or contact details. Or pick an option below:",
      "Main sure nahi hoon. Aap specific loan, interest rates, documents, eligibility ya contact details ke baare me puchho—ya neeche option select karo:",
    ),
      links: DEFAULT_LINKS,
    },
    nextState,
  }
}

export function getBotReply(userMessage: string): BotReply {
  return match(userMessage, {}).reply
}

export function getBotReplyWithState(userMessage: string, state: BotState): { reply: BotReply; state: BotState } {
  const { reply, nextState } = match(userMessage, state)
  return { reply, state: nextState }
}

export const CHAT_WELCOME: BotReply = greeting('en')
