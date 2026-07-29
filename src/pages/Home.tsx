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
        title="KuberFinserve | India's AI-Powered Financial Distribution Network"
        description="India's AI-Powered Financial Distribution Network. Connecting customers, financial professionals and lending institutions through trust, technology and a nationwide partner ecosystem — powered by KuberOne."
        path="/"
        keywords="KuberFinserve, AI financial distribution network India, KuberOne, become financial partner, financial entrepreneur, partner academy, loan fulfillment, weekly payouts"
      />
      <JsonLd data={faqSchema} id="jsonld-faq" />
      <PremiumHome />
    </>
  )
}
