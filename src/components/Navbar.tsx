import { useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { LOAN_NAV, SITE } from '@/data/site'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'
import { BrandLogo } from '@/components/BrandLogo'

const MAIN_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Insurance', path: '/insurance' },
  { label: 'EMI Calculator', path: '/emi-calculator' },
  { label: 'Check Eligibility', path: '/check-eligibility' },
  { label: 'CIBIL', path: '/cibil' },
  { label: 'About Us', path: '/about-us' },
  { label: 'Contact', path: '/contact-us' },
  { label: 'Become Partner', path: SITE.becomePartnerUrl },
  { label: 'Partner Login', path: SITE.partnerLoginUrl },
] as const

function NavItem({
  to,
  children,
  onClick,
}: {
  to: string
  children: ReactNode
  onClick?: () => void
}) {
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

function MobileNavLink({
  to,
  children,
  onClick,
}: {
  to: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'block rounded-2xl px-4 py-3 text-center text-[15px] font-semibold tracking-tight transition-all',
          isActive
            ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
            : 'text-navy-900 hover:bg-brand-50 hover:text-brand-800',
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
  const [mobileLoansOpen, setMobileLoansOpen] = useState(true)
  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={cn(
          'sticky z-50 transition-all duration-300 lg:top-7',
          scrolled
            ? 'top-0 border-b border-slate-200/80 bg-white/95 shadow-[0_8px_32px_rgb(15_23_42/0.08)] backdrop-blur-xl'
            : 'top-0 border-b border-slate-200/70 bg-white',
        )}
      >
        <div className="container relative mx-auto flex items-center justify-between gap-3 px-4 py-2.5 lg:py-2">
          <div className="relative z-10">
            <BrandLogo showName compact />
          </div>

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
                    className="absolute left-0 top-full z-50 mt-2 max-h-[min(70vh,22rem)] w-60 overflow-y-auto rounded-2xl border border-slate-200/80 bg-white py-2 shadow-xl"
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
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-navy-900 ring-1 ring-brand-100 transition hover:bg-brand-100 2xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
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
              className="fixed inset-0 z-[60] bg-navy-900/45 backdrop-blur-md 2xl:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed inset-x-3 bottom-3 top-[max(0.75rem,env(safe-area-inset-top))] z-[70] flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-white via-white to-brand-50/40 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.35)] ring-1 ring-brand-900/10 2xl:hidden sm:inset-x-6"
            >
              <div className="relative border-b border-brand-100/80 bg-white/90 px-5 pb-4 pt-5 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close menu"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-navy-900 transition hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex flex-col items-center gap-2.5 pr-6">
                  <img
                    src={SITE.logoUrl}
                    alt=""
                    className="h-11 w-11 object-contain"
                    width={44}
                    height={44}
                  />
                  <p className="font-heading text-base font-bold tracking-tight text-navy-900">
                    {SITE.name}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-700">
                    Menu
                  </p>
                </div>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-5">
                <div className="mx-auto flex max-w-sm flex-col items-stretch gap-1.5">
                  <MobileNavLink to="/" onClick={closeMobile}>
                    Home
                  </MobileNavLink>

                  <button
                    type="button"
                    onClick={() => setMobileLoansOpen((v) => !v)}
                    className="mt-3 flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400"
                  >
                    Loans
                    <ChevronDown
                      className={cn(
                        'h-3.5 w-3.5 transition-transform',
                        mobileLoansOpen && 'rotate-180',
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileLoansOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mb-2 grid grid-cols-1 gap-1 rounded-2xl bg-slate-50/80 p-2 ring-1 ring-slate-100">
                          {LOAN_NAV.map((loan) => (
                            <Link
                              key={loan.path}
                              to={loan.path}
                              onClick={closeMobile}
                              className="rounded-xl px-3 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-white hover:text-brand-800 hover:shadow-sm"
                            >
                              {loan.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-2 space-y-1">
                    {MAIN_LINKS.slice(1).map((link) => (
                      <MobileNavLink key={link.path} to={link.path} onClick={closeMobile}>
                        {link.label}
                      </MobileNavLink>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="space-y-2.5 border-t border-brand-100/80 bg-white/95 px-5 py-4 backdrop-blur-sm">
                <Link
                  to={SITE.applyLoanUrl}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/25"
                >
                  Apply Now
                </Link>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-brand-100 bg-brand-50/60 py-3 text-sm font-semibold text-brand-900"
                >
                  <Phone className="h-4 w-4" />
                  {SITE.phone}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
