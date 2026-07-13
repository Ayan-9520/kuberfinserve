import { SITE } from '@/data/site'

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
  url: 'https://kuberfinserve.com',
} as const
