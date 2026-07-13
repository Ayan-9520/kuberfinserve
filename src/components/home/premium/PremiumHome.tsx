import { HeroSection } from './HeroSection'
import { TrustStrip } from './TrustStrip'
import { PartnersMarquee } from './PartnersMarquee'
import { ServicesGrid } from './ServicesGrid'
import { WhyChoose } from './WhyChoose'
import { KuberOneSection } from './KuberOneSection'
import { LoanProcess } from './LoanProcess'
import { EmiCalculator } from './EmiCalculator'
import { TestimonialsPremium } from './TestimonialsPremium'
import { FaqPremium } from './FaqPremium'
import { LeadCta } from './LeadCta'
import { CustomerAppCta } from '@/components/CustomerAppCta'
import { ConnectSection } from '@/components/home/HomeSections'

export function PremiumHome() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesGrid />
      <WhyChoose />
      <KuberOneSection />
      <LoanProcess />
      <EmiCalculator />
      <TestimonialsPremium />
      <PartnersMarquee />
      <FaqPremium />
      <LeadCta />
      <CustomerAppCta />
      <ConnectSection />
    </>
  )
}
