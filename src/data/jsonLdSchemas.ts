import { SITE } from '@/data/site'
import type { ProductFaq } from '@/data/productFaqs'

const BASE = 'https://kuberfinserve.com'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: SITE.name,
  url: 'https://kuberfinserve.com',
  logo: 'https://kuberfinserve.com/logo.png',
  description: SITE.tagline,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: 'Free consultation',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '2500',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address,
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110055',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.6448,
    longitude: 77.2066,
  },
  areaServed: { '@type': 'Country', name: 'India' },
  sameAs: [SITE.facebook, SITE.instagram, SITE.linkedin, SITE.twitter],
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: BASE,
} as const

export function buildBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.path}`,
    })),
  }
}

export function buildFaqSchema(faqs: readonly ProductFaq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

export function buildLoanProductSchema(input: {
  name: string
  description: string
  path: string
  rateFrom: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: input.name,
    description: input.description,
    url: `${BASE}${input.path}`,
    provider: {
      '@type': 'FinancialService',
      name: SITE.name,
      url: BASE,
    },
    areaServed: { '@type': 'Country', name: 'India' },
    ...(input.image ? { image: input.image.startsWith('http') ? input.image : `${BASE}${input.image}` } : {}),
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: input.rateFrom.replace(/[^\d.]/g, '') || '0',
        unitText: 'percent per annum',
      },
      eligibleRegion: { '@type': 'Country', name: 'IN' },
      availability: 'https://schema.org/InStock',
    },
  }
}
