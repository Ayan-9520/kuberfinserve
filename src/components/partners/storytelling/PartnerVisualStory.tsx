import { STORY_SECTIONS } from '@/data/partnerStorytelling'
import { StorySection } from './StorySection'
import { BuildBusinessIllustration } from '@/components/illustrations/BuildBusinessIllustration'
import { BuildLeadershipIllustration } from '@/components/illustrations/BuildLeadershipIllustration'
import { BuildWealthIllustration } from '@/components/illustrations/BuildWealthIllustration'
import { BuildLegacyIllustration } from '@/components/illustrations/BuildLegacyIllustration'

const illustrations = {
  business: <BuildBusinessIllustration />,
  leadership: <BuildLeadershipIllustration />,
  wealth: <BuildWealthIllustration />,
  legacy: <BuildLegacyIllustration />,
} as const

export function PartnerVisualStory() {
  return (
    <>
      {STORY_SECTIONS.map((section) => (
        <StorySection
          key={section.id}
          id={section.id}
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          caption={section.caption}
          variant={section.variant}
          reverse={section.reverse}
          illustration={illustrations[section.id]}
        />
      ))}
    </>
  )
}
