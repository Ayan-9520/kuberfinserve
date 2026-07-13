import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { LOAN_NAV, SITE } from '@/data/site'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'
import { BrandLogo } from '@/components/BrandLogo'

const MAIN_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Insurance', path: '/insurance' },
  { label: 'Credit Cards', path: '/credit-card' },
  { label: 'EMI Calculator', path: '/emi-calculator' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Contact', path: '/contact-us' },
  { label: 'Become Partner', path: SITE.becomePartnerUrl },
  { label: 'Partner Login', path: SITE.partnerLoginUrl },
] as const

function NavItem({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
  const location = useLocation()
  const isHash = to.includes('#')
  const hash = isHash ? to.split('#')[1] : ''
  const path = isHash ? to.split('#')[0] || '/' : to
  const isActive =
    !isHash && location.pathname === path
      ? true
      : isHash && location.pathname === '/' && location.hash === `#${hash}`

  if (isHash) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={cn(
          'rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:text-brand-600',
          isActive ? 'text-brand-600' : 'text-slate-700',
        )}
      >
        {children}
      </Link>
    )
  }

  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive: active }) =>
        cn(
          'rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all',
          active || isActive
            ? 'bg-brand-600/10 text-brand-700'
            : 'text-slate-700 hover:bg-slate-100 hover:text-brand-800',
        )
      }
    >
      {children}
    </NavLink>
  )
}

export function Navbar() {
  const scrolled = useScrolled(20)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loansOpen, setLoansOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={cn(
          'sticky z-50 transition-all duration-300 lg:top-7',
          scrolled
            ? 'top-0 border-b border-slate-200/80 bg-white/90 shadow-[0_8px_32px_rgb(15_23_42/0.08)] backdrop-blur-xl'
            : 'top-0 border-b border-transparent bg-white/80 backdrop-blur-md',
        )}
      >
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-2 lg:py-2">
          <BrandLogo showName compact />

          <nav className="hidden items-center gap-0.5 2xl:flex" aria-label="Main navigation">
            <NavItem to="/">Home</NavItem>

            <div
              className="relative"
              onMouseEnter={() => setLoansOpen(true)}
              onMouseLeave={() => setLoansOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100',
                  loansOpen && 'bg-brand-600/10 text-brand-700',
                )}
              >
                Loans
                <ChevronDown className={cn('h-4 w-4 transition-transform', loansOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {loansOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200/80 bg-white py-2 shadow-xl"
                  >
                    {LOAN_NAV.map((loan) => (
                      <Link
                        key={loan.path}
                        to={loan.path}
                        className="block px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                      >
                        {loan.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {MAIN_LINKS.slice(1).map((link) => (
              <NavItem key={link.path} to={link.path}>
                {link.label}
              </NavItem>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to={SITE.applyLoanUrl}
              className="rounded-lg bg-gradient-to-r from-brand-700 to-brand-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-brand-600/25 transition-transform hover:scale-[1.02]"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-navy-900 2xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-navy-900/50 backdrop-blur-sm 2xl:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[min(320px,88vw)] flex-col bg-white shadow-2xl 2xl:hidden"
            >
              <div className="flex items-center justify-between border-b p-4">
                <span className="font-heading font-bold text-navy-900">Menu</span>
                <button type="button" onClick={closeMobile} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4">
                <NavItem to="/" onClick={closeMobile}>Home</NavItem>
                <p className="mb-2 mt-4 px-3 text-xs font-semibold uppercase text-slate-400">Loans</p>
                {LOAN_NAV.map((loan) => (
                  <Link
                    key={loan.path}
                    to={loan.path}
                    onClick={closeMobile}
                    className="mb-1 block rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    {loan.label}
                  </Link>
                ))}
                {MAIN_LINKS.slice(1).map((link) => (
                  <div key={link.path} className="mt-1">
                    <NavItem to={link.path} onClick={closeMobile}>
                      {link.label}
                    </NavItem>
                  </div>
                ))}
              </nav>
              <div className="space-y-2 border-t p-4">
                <Link
                  to={SITE.applyLoanUrl}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3.5 font-bold text-white"
                >
                  Apply Now
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
