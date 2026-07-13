export const SITE = {
  name: 'KuberFinserve',
  tagline: 'Build Your Financial Business. From Anywhere.',
  platformName: 'KuberOne',
  platformTagline: "India's Financial Distribution Operating System",
  usp: "More Than a Job. It's Your Business.",
  phone: '+91 7982953129',
  landline: '011 4752 1261',
  email: 'info@kuberfinserve.com',
  emailAlt: 'info@kuberfinserve.co.in',
  leadsEmail: 'loanleads@kuberfinserve.com',
  whatsapp: '917982953129',
  address: '292, Anarkali Complex, Jhandewalan Ext. New Delhi-110055',
  mapDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=292+Anarkali+Complex+Jhandewalan+New+Delhi+110055',
  logoUrl: '/logo.png',
  logoMarkUrl: '/logo.png',
  logoLightUrl: '/logo-footer.png',
  logoIconUrl: '/logo.png',
  partnerCrmUrl: '/partner-login',
  partnersUrl: '/become-partner',
  becomePartnerUrl: '/become-partner',
  partnerLoginUrl: '/partner-login',
  applyLoanUrl: '/apply-loan',
  appBaseUrl: 'https://kuberfinserve.com',
  partnerApp: {
    androidPackage: 'com.kuberone.app',
    iosBundleId: 'com.kuberone.app',
    androidDeepLink: 'kuberone://login',
    iosDeepLink: 'kuberone://login',
    universalLoginPath: '/app/partner',
    androidStoreUrl: 'https://play.google.com/store/apps/details?id=com.kuberone.app',
    iosStoreUrl: 'https://apps.apple.com/in/app/kuberone/id0000000000',
  },
  customerApp: {
    androidPackage: 'com.kuberfinserve.app',
    iosBundleId: 'com.kuberfinserve.app',
    androidDeepLink: 'kuberfinserve://apply',
    iosDeepLink: 'kuberfinserve://apply',
    universalOpenPath: '/app/customer',
    androidStoreUrl: 'https://play.google.com/store/apps/details?id=com.kuberfinserve.app',
    iosStoreUrl: 'https://apps.apple.com/in/app/kuberfinserve/id0000000000',
  },
  facebook: 'https://www.facebook.com/profile.php?id=61566110111017',
  instagram: 'https://www.instagram.com/kuberfinserve2026/',
  linkedin: 'https://www.linkedin.com/in/kuber-finserve-b98b99328/',
  twitter: 'https://x.com/kuberfinse82770',
} as const

export { DELHI_NCR_CITIES as CITIES } from '@/data/cities'

export const EMPLOYMENT_TYPES = ['Salaried', 'Self Employed', 'Professional'] as const

export const LOAN_TYPES_FORM = [
  'Home Loan',
  'Loan Against Property',
  'Auto Loan (New Car)',
  'Auto Loan (Used Car)',
  'Personal Loan',
  'Business Loan',
  'Education Loan',
  'Machinery Loan',
  'Insurance',
  'Credit Card',
] as const

/** Navbar order: Home, About → Loans dropdown → Insurance, Credit Card */
export const NAV_LINKS_BEFORE_LOANS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
] as const

export const NAV_LINKS_AFTER_LOANS = [
  { label: 'Insurance', path: '/insurance' },
  { label: 'Credit Card', path: '/credit-card' },
] as const

export const CONTACT_NAV = { label: 'Contact Us', path: '/contact-us' } as const

export const LOAN_NAV = [
  { label: 'Home Loan', path: '/loans/home-loan' },
  { label: 'Loan Against Property', path: '/loans/loan-against-property' },
  { label: 'New Car Loan', path: '/loans/new-car-loan' },
  { label: 'Used Car Loan', path: '/loans/used-car-loan' },
  { label: 'Personal Loan', path: '/loans/personal-loan' },
  { label: 'Business Loan', path: '/loans/business-loan' },
  { label: 'Education Loan', path: '/loans/education-loan' },
  { label: 'Machinery Loan', path: '/loans/machinery-loan' },
] as const

export const FOOTER_LINKS = {
  legal: [
    { label: 'Disclaimer', path: '/disclaimer' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
    { label: 'Terms & Conditions', path: '/terms-conditions' },
    { label: 'Channel Partner Agreement', path: '/channel-partner-agreement' },
    { label: 'Make Payment', path: '/contact-us' },
  ],
  loans: LOAN_NAV,
} as const

export const ABOUT_TEXT =
  'KuberFinserve is authorized channel partners & broking company, facilities indian consumers in matters to personal finance & comparing the products in the emerging markets. As incomes and online access increases, more peoples demand better financial services, Technology can help to solve both issues.'
