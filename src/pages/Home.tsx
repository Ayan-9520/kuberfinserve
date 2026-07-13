import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { PremiumHome } from '@/components/home/premium/PremiumHome'
import { PREMIUM_FAQ } from '@/data/homePremium'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PREMIUM_FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export function Home() {
  return (
    <>
      <SeoHead
        title="KuberFinserve | India's AI Powered Financial Distribution Platform"
        description="India's AI powered financial distribution platform. Home loans, business loans, LAP, personal loans, insurance & credit cards from 50+ lenders. Build your financial business with KuberOne."
        path="/"
        keywords="KuberFinserve, financial distribution platform India, AI loan matching, home loan, business loan, loan against property, KuberOne, become financial partner"
      />
      <JsonLd data={faqSchema} id="jsonld-faq" />
      <PremiumHome />
    </>
  )
}
