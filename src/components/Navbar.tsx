import { useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { LOAN_NAV, SITE } from '@/data/site'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/utils/cn'
import { BrandLogo } from '@/components/BrandLogo'

/**
 * Public IA: Home · Loans (dropdown) · Insurance · Eligibility · EMI · About · Become Partner · Login
 * Partner Academy is not a separate nav item — it lives inside Become Partner + KuberOne app.
 */
const MAIN_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Insurance', path: '/insurance' },
  { label: 'Eligibility', path: '/check-eligibility' },
  { label: 'EMI', path: '/emi-calculator' },
  { label: 'About', path: '/about-us' },
  { label: 'Become Partner', path: SITE.becomePartnerUrl },
  { label: 'Login', path: SITE.partnerLoginUrl },
] as const

const linkBase =
  'relative inline-flex shrink-0 items-center whitespace-nowrap rounded-lg px-2 py-1.5 text-[11.5px] font-semibold tracking-tight transition-colors duration-200 hover:bg-white/90 2xl:px-2.5 2xl:text-[12.5px]'

function NavItem({
  to,
  children,
  onClick,
  title,
}: {
  to: string
  children: ReactNode
  onClick?: () => void
  title?: string
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      onClick={onClick}
      title={title}
      className={({ isActive }) =>
        cn(linkBase, isActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-800')
      }
    >
      {({ isActive }) => (
        <>
          {children}
          {isActive ? (
            <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-brand-700 to-brand-500" />
          ) : null}
        </>
      )}
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
            ? 'bg-gradient-to-r from-brand-700 to-brand-600 text-white shadow-md shadow-brand-600/25'
            : 'text-navy-900 hover:bg-brand-50 hover:text-brand-800',
        )
      }
    >
      {children}
    </NavLink>
  )
}

const MOBILE_LABELS: Record<string, string> = {
  '/emi-calculator': 'EMI Calculator',
  '/check-eligibility': 'Check Eligibility',
  '/about-us': 'About Us',
}

export function Navbar() {
  const scrolled = useScrolled(20)
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loansOpen, setLoansOpen] = useState(false)
  const [mobileLoansOpen, setMobileLoansOpen] = useState(true)
  const closeMobile = () => setMobileOpen(false)
  const loansActive = location.pathname.startsWith('/loans') || location.pathname === '/credit-card'

  return (
    <>
      <header
        className={cn(
          'sticky z-50 transition-all duration-300 lg:top-7',
          scrolled
            ? 'top-0 border-b border-brand-900/8 bg-white/92 shadow-[0_10px_40px_-12px_rgba(5,61,50,0.18)] backdrop-blur-xl'
            : 'top-0 border-b border-slate-200/70 bg-white/97 backdrop-blur-md',
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/35 to-transparent" />

        <div className="mx-auto flex h-[3.25rem] w-full max-w-[1400px] items-center gap-4 px-5 sm:px-6 lg:h-14 lg:gap-6 lg:px-8 xl:px-10">
          <div className="shrink-0">
            <BrandLogo showName compact className="!h-9 !w-9 md:!h-10 md:!w-10" />
          </div>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-x-0.5 xl:flex 2xl:gap-x-1"
            aria-label="Main navigation"
          >
            <div className="inline-flex max-w-full flex-nowrap items-center gap-x-0.5 rounded-2xl bg-slate-50/80 px-2 py-1 ring-1 ring-slate-200/70 2xl:gap-x-1 2xl:px-2.5">
            <NavItem to="/" title="Home">
              Home
            </NavItem>

            <div
              className="relative shrink-0"
              onMouseEnter={() => setLoansOpen(true)}
              onMouseLeave={() => setLoansOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  linkBase,
                  'gap-0.5',
                  loansActive ? 'text-brand-700' : 'text-slate-600 hover:text-brand-800',
                )}
              >
                Loans
                <ChevronDown
                  className={cn('h-3 w-3 opacity-70 transition-transform', loansOpen && 'rotate-180')}
                />
                {loansActive ? (
                  <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-gradient-to-r from-brand-700 to-brand-500" />
                ) : null}
              </button>
              <AnimatePresence>
                {loansOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute left-0 top-full z-50 mt-2 max-h-[min(70vh,22rem)] w-64 overflow-y-auto rounded-2xl border border-brand-100/80 bg-white/97 py-2 shadow-[0_20px_50px_-12px_rgba(5,61,50,0.25)] backdrop-blur-xl"
                  >
                    <p className="px-4 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700/80">
                      Loan products
                    </p>
                    {LOAN_NAV.map((loan) => (
                      <Link
                        key={loan.path}
                        to={loan.path}
                        className="block px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-800"
                      >
                        {loan.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {MAIN_LINKS.filter((l) => l.path !== '/').map((link) => (
              <NavItem key={link.path} to={link.path} title={MOBILE_LABELS[link.path] || link.label}>
                {link.label}
              </NavItem>
            ))}
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 xl:ml-0">
            <Link
              to={SITE.applyLoanUrl}
              className="hidden rounded-xl bg-gradient-to-r from-brand-800 via-brand-700 to-brand-500 px-4 py-2 text-[12px] font-bold text-white shadow-[0_8px_20px_-6px_rgba(0,195,137,0.5)] transition hover:brightness-105 sm:inline-flex 2xl:px-5 2xl:text-sm"
            >
              Apply Now
            </Link>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-navy-900 ring-1 ring-brand-100/80 transition hover:bg-brand-100 xl:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-navy-950/50 backdrop-blur-md xl:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed inset-x-3 bottom-3 top-[max(0.75rem,env(safe-area-inset-top))] z-[70] flex flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-white via-white to-brand-50/50 shadow-[0_24px_80px_-12px_rgba(15,23,42,0.4)] ring-1 ring-brand-900/10 xl:hidden sm:inset-x-6"
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
                    {MAIN_LINKS.filter((l) => l.path !== '/').map((link) => (
                      <MobileNavLink key={link.path} to={link.path} onClick={closeMobile}>
                        {MOBILE_LABELS[link.path] || link.label}
                      </MobileNavLink>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="space-y-2.5 border-t border-brand-100/80 bg-white/95 px-5 py-4 backdrop-blur-sm">
                <Link
                  to={SITE.applyLoanUrl}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-800 to-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-600/30"
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
