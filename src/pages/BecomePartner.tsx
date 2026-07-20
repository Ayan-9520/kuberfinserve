import { useLocation } from 'react-router-dom'
import { JsonLd } from '@/components/JsonLd'
import { SeoHead } from '@/components/SeoHead'
import {
  AttractionStripSection,
  BottomApplySection,
  EarningsHookSection,
  FinalCtaSection,
  JourneyTimelineSection,
  KuberOnePlatformSection,
  ModelComparisonSection,
  PartnerFaqSection,
  PartnerJumpNav,
  PartnerLandingHero,
  PartnerStickyConvertBar,
  PartnerSuccessSection,
  RankingRewardsSection,
  RealIncomeSection,
  TechWorkflowSection,
  WhyEarnMoreSection,
  WhyKuberSection,
  WhySwitchingSection,
} from '@/components/partners/landing/PartnerLandingSections'
import { PartnerAppCta } from '@/components/PartnerAppCta'
import { LANDING_FAQ, LANDING_SEO } from '@/data/partnerLanding'

/**
 * Conversion-first partner landing.
 * Order: attract → prove earnings → compare → platform → apply again → close.
 */
export function BecomePartner() {
  const location = useLocation()
  const seoPath = location.pathname === '/partners' ? '/partners' : LANDING_SEO.path

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: LANDING_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  return (
    <div className="overflow-x-hidden bg-white pb-16 md:pb-0">
      <SeoHead
        title={LANDING_SEO.title}
        description={LANDING_SEO.description}
        path={seoPath}
        keywords={LANDING_SEO.keywords}
      />
      <JsonLd
        id="jsonld-become-partner-page"
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: LANDING_SEO.title,
          description: LANDING_SEO.description,
          url: `https://kuberfinserve.com${seoPath}`,
        }}
      />
      <JsonLd id="jsonld-become-partner-faq" data={faqPageSchema} />

      {/* 1. Attraction + form above the fold */}
      <PartnerLandingHero />
      <PartnerJumpNav />

      {/* 2. Quick reasons + earnings hook (before long compare) */}
      <AttractionStripSection />
      <EarningsHookSection />

      {/* 3. Deeper persuasion */}
      <WhySwitchingSection />
      <ModelComparisonSection />
      <WhyKuberSection />
      <RealIncomeSection />
      <WhyEarnMoreSection />
      <JourneyTimelineSection />
      <RankingRewardsSection />
      <KuberOnePlatformSection />
      <TechWorkflowSection />
      <PartnerSuccessSection />
      <PartnerFaqSection />

      {/* 4. Catch scrollers who want to connect at the end */}
      <BottomApplySection />
      <PartnerAppCta />
      <FinalCtaSection />

      <PartnerStickyConvertBar />
    </div>
  )
}
