import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { ACADEMY_BASE, ACADEMY_SEO } from '@/data/academy'
import {
  AcademyHero,
  AcademyPersonas,
  AcademyRoadmapPreview,
  AcademyWhyJoin,
} from '@/components/academy/landing/AcademyLandingSections'

export function PartnerAcademyLanding() {
  return (
    <>
      <SeoHead
        title={ACADEMY_SEO.title}
        description={ACADEMY_SEO.description}
        path={ACADEMY_BASE}
        keywords={ACADEMY_SEO.keywords}
      />
      <JsonLd
        id="jsonld-partner-academy"
        data={{
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: 'Kuber Partner Academy',
          description: ACADEMY_SEO.description,
          provider: {
            '@type': 'Organization',
            name: 'KuberFinserve',
            sameAs: 'https://kuberfinserve.com',
          },
          url: `https://kuberfinserve.com${ACADEMY_BASE}`,
        }}
      />
      <div className="overflow-x-hidden bg-white pb-8">
        <AcademyHero />
        <AcademyWhyJoin />
        <AcademyPersonas />
        <AcademyRoadmapPreview />
      </div>
    </>
  )
}
