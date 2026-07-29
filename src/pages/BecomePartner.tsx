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
import {
  AiAssistantPreviewSection,
  BookDemoSection,
  CertificationProgramSection,
  CrmFeaturesPreviewSection,
  DashboardPreviewSection,
  MarketingToolkitPreviewSection,
  PartnerAcademyPreviewBlock,
  PartnerOnboardingFunnelSection,
  PartnerPlansSection,
  ProductsYouOfferSection,
  StarterKitSection,
} from '@/components/partners/landing/PartnerEcosystemSections'
import { PartnerAppCta } from '@/components/PartnerAppCta'
import { LANDING_FAQ, LANDING_SEO } from '@/data/partnerLanding'

/**
 * Unified Partner ecosystem landing.
 * Academy / CRM / toolkit are preview sections — full access after Partner Login in KuberOne.
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

      {/* Hero · Register */}
      <PartnerLandingHero />
      <PartnerJumpNav />

      {/* Why join · Income */}
      <AttractionStripSection />
      <EarningsHookSection />
      <WhySwitchingSection />
      <ModelComparisonSection />
      <WhyKuberSection />
      <RealIncomeSection />
      <WhyEarnMoreSection />

      {/* Plans · Products · Journey */}
      <PartnerPlansSection />
      <ProductsYouOfferSection />
      <PartnerOnboardingFunnelSection />
      <JourneyTimelineSection />
      <RankingRewardsSection />

      {/* Technology · CRM */}
      <KuberOnePlatformSection />
      <TechWorkflowSection />
      <CrmFeaturesPreviewSection />

      {/* Academy ecosystem (merged — no separate public Academy page) */}
      <PartnerAcademyPreviewBlock />
      <CertificationProgramSection />
      <MarketingToolkitPreviewSection />
      <AiAssistantPreviewSection />
      <DashboardPreviewSection />

      {/* Social proof · FAQ */}
      <PartnerSuccessSection />
      <PartnerFaqSection />

      {/* Convert */}
      <StarterKitSection />
      <BookDemoSection />
      <BottomApplySection />
      <PartnerAppCta />
      <FinalCtaSection />

      <PartnerStickyConvertBar />
    </div>
  )
}
