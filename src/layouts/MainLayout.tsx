import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { TrustBar } from '@/components/layout/TrustBar'
import { ScrollProgress } from '@/components/ScrollProgress'
import { FloatingButtons } from '@/components/FloatingButtons'
import { FloatingApplyBar } from '@/components/conversion/FloatingApplyBar'
import { LeadCaptureModal } from '@/components/conversion/LeadCaptureModal'
import { VisitorInterestModal } from '@/components/conversion/VisitorInterestModal'
import { Chatbot } from '@/components/Chatbot'
import { ScrollToTop } from '@/components/ScrollToTop'
import { pageTransition } from '@/animations/variants'
import { JsonLd } from '@/components/JsonLd'
import { organizationSchema, websiteSchema } from '@/data/jsonLdSchemas'
import { cn } from '@/utils/cn'

export function MainLayout() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isApplyLoan = location.pathname === '/apply-loan'
  const isPartners =
    location.pathname === '/partners' ||
    location.pathname === '/become-partner' ||
    location.pathname === '/partner-login'
  const showConversionModals = isHome || isApplyLoan
  const hideMobileBar = isApplyLoan || isPartners

  return (
    <div className={cn('flex min-h-screen flex-col', isPartners ? 'bg-[#F8FAFC]' : 'bg-white')}>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <JsonLd data={organizationSchema} id="jsonld-organization" />
      <JsonLd data={websiteSchema} id="jsonld-website" />
      <ScrollProgress />
      <TrustBar />
      <Navbar />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
      <FloatingButtons />
      {!hideMobileBar && <FloatingApplyBar />}
      <VisitorInterestModal />
      {showConversionModals && <LeadCaptureModal />}
    </div>
  )
}
