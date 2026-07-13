import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { PageSkeleton } from '@/components/SkeletonLoader'

const Home = lazy(() => import('@/pages/Home').then((m) => ({ default: m.Home })))
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Insurance = lazy(() => import('@/pages/Insurance').then((m) => ({ default: m.Insurance })))
const CreditCardPage = lazy(() =>
  import('@/pages/CreditCard').then((m) => ({ default: m.CreditCardPage })),
)
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })))
const EmiCalculatorPage = lazy(() =>
  import('@/pages/EmiCalculator').then((m) => ({ default: m.EmiCalculatorPage })),
)
const ApplyLoan = lazy(() => import('@/pages/ApplyLoan').then((m) => ({ default: m.ApplyLoan })))
const LoanPage = lazy(() => import('@/pages/LoanPage').then((m) => ({ default: m.LoanPage })))
const Partners = lazy(() => import('@/pages/Partners').then((m) => ({ default: m.Partners })))
const BecomePartner = lazy(() =>
  import('@/pages/BecomePartner').then((m) => ({ default: m.BecomePartner })),
)
const PartnerLogin = lazy(() =>
  import('@/pages/PartnerLogin').then((m) => ({ default: m.PartnerLogin })),
)
const AppOpen = lazy(() => import('@/pages/AppOpen').then((m) => ({ default: m.AppOpen })))
const LegalDisclaimer = lazy(() =>
  import('@/pages/Legal').then((m) => ({ default: m.Disclaimer })),
)
const LegalPrivacy = lazy(() =>
  import('@/pages/Legal').then((m) => ({ default: m.PrivacyPolicy })),
)
const LegalTerms = lazy(() =>
  import('@/pages/Legal').then((m) => ({ default: m.TermsConditions })),
)
const LegalChannel = lazy(() =>
  import('@/pages/Legal').then((m) => ({ default: m.ChannelPartner })),
)
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))
const SuccessStoriesPage = lazy(() =>
  import('@/pages/SuccessStories').then((m) => ({ default: m.SuccessStoriesPage })),
)

function LazyWrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageSkeleton />}>{children}</Suspense>
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<LazyWrap><Home /></LazyWrap>} />
        <Route path="partners" element={<LazyWrap><Partners /></LazyWrap>} />
        <Route path="become-partner" element={<LazyWrap><BecomePartner /></LazyWrap>} />
        <Route path="partner-login" element={<LazyWrap><PartnerLogin /></LazyWrap>} />
        <Route path="app/partner" element={<LazyWrap><AppOpen /></LazyWrap>} />
        <Route path="app/customer" element={<LazyWrap><AppOpen /></LazyWrap>} />
        <Route path="app/open" element={<LazyWrap><AppOpen /></LazyWrap>} />
        <Route path="about-us" element={<LazyWrap><About /></LazyWrap>} />
        <Route path="insurance" element={<LazyWrap><Insurance /></LazyWrap>} />
        <Route path="credit-card" element={<LazyWrap><CreditCardPage /></LazyWrap>} />
        <Route path="emi-calculator" element={<LazyWrap><EmiCalculatorPage /></LazyWrap>} />
        <Route path="contact-us" element={<LazyWrap><Contact /></LazyWrap>} />
        <Route path="apply-loan" element={<LazyWrap><ApplyLoan /></LazyWrap>} />
        <Route path="loans/:slug" element={<LazyWrap><LoanPage /></LazyWrap>} />
        <Route path="disclaimer" element={<LazyWrap><LegalDisclaimer /></LazyWrap>} />
        <Route path="privacy-policy" element={<LazyWrap><LegalPrivacy /></LazyWrap>} />
        <Route path="terms-conditions" element={<LazyWrap><LegalTerms /></LazyWrap>} />
        <Route path="success-stories" element={<LazyWrap><SuccessStoriesPage /></LazyWrap>} />
        <Route path="channel-partner-agreement" element={<LazyWrap><LegalChannel /></LazyWrap>} />
        <Route path="*" element={<LazyWrap><NotFound /></LazyWrap>} />
      </Route>
    </Routes>
  )
}
