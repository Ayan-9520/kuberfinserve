import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react'
import { SITE, FOOTER_LINKS, LOAN_NAV } from '@/data/site'
import { SocialLinks } from '@/components/SocialLinks'
import { OfficeMap } from '@/components/OfficeMap'
import { StoreBadges } from '@/components/StoreBadges'
import { openMobileApp } from '@/utils/partnerApp'
import { cn } from '@/utils/cn'

const BRAND_FIN_COLOR = '#00c389'

function BrandName({ className }: { className?: string }) {
  const name = SITE.name
  const finIndex = name.toLowerCase().indexOf('fin')
  const beforeFin = finIndex >= 0 ? name.slice(0, finIndex) : name
  const fin = finIndex >= 0 ? name.slice(finIndex, finIndex + 3) : ''
  const afterFin = finIndex >= 0 ? name.slice(finIndex + 3) : ''

  return (
    <p className={className}>
      {beforeFin}
      {fin && <span style={{ color: BRAND_FIN_COLOR }}>{fin}</span>}
      {afterFin}
    </p>
  )
}

function FooterHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={cn(
        'mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400',
        className,
      )}
    >
      {children}
    </h3>
  )
}

function FooterLink({
  to,
  children,
  highlight,
  external,
  centered,
}: {
  to: string
  children: ReactNode
  highlight?: boolean
  external?: boolean
  centered?: boolean
}) {
  const className = cn(
    'group inline-flex items-center gap-2 text-[13px] leading-snug transition-all duration-200',
    centered && 'justify-center',
    highlight
      ? 'font-medium text-brand-700 hover:text-brand-800'
      : 'text-slate-600 hover:translate-x-0.5 hover:text-navy-900',
  )

  if (external || to.startsWith('http') || to.startsWith('tel:') || to.startsWith('mailto:')) {
    return (
      <a
        href={to}
        className={className}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {!centered && (
          <span className="h-px w-0 bg-brand-400 transition-all duration-200 group-hover:w-2.5" />
        )}
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={className}>
      {!centered && (
        <span className="h-px w-0 bg-brand-400 transition-all duration-200 group-hover:w-2.5" />
      )}
      {children}
    </Link>
  )
}

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'EMI Calculator', path: '/emi-calculator' },
  { label: 'Check Eligibility', path: '/check-eligibility' },
  { label: 'CIBIL Assistance', path: '/cibil' },
  { label: 'Apply Loan', path: '/apply-loan' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Become Partner', path: SITE.becomePartnerUrl },
  { label: 'Partner Login', path: SITE.partnerLoginUrl },
] as const

function FooterAppCard({
  label,
  blurb,
  target,
}: {
  label: string
  blurb: string
  target: 'customer' | 'partner'
}) {
  return (
    <div className="group flex min-w-0 flex-col items-center gap-5 rounded-2xl bg-white/90 p-5 text-center ring-1 ring-brand-900/[0.06] transition duration-300 hover:shadow-[0_12px_40px_-12px_rgba(13,107,87,0.18)] hover:ring-brand-600/20 sm:items-start sm:p-6 sm:text-left">
      <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-emerald-50 ring-1 ring-brand-100">
          <img
            src={SITE.platformLogoUrl}
            alt=""
            className="h-7 w-7 object-contain"
            width={28}
            height={28}
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
            <p className="font-heading text-base font-bold tracking-tight text-navy-900">{label}</p>
            <button
              type="button"
              onClick={() => openMobileApp(target)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 transition-colors hover:text-brand-900"
            >
              Open app
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{blurb}</p>
        </div>
      </div>
      <StoreBadges target={target} size="sm" className="justify-center sm:justify-start" />
    </div>
  )
}

function FooterAppBand() {
  return (
    <div className="relative border-b border-brand-100/80">
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,#f3faf7_0%,#ffffff_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent"
        aria-hidden
      />
      <div className="container relative mx-auto px-4 py-8 md:py-10 lg:py-11">
        <div className="mb-6 flex flex-col items-center gap-2 text-center sm:mb-7 sm:items-end sm:justify-between sm:gap-4 sm:text-left md:flex-row">
          <div className="sm:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              Mobile apps
            </p>
            <h3 className="mt-1.5 font-heading text-xl font-bold tracking-tight text-navy-900 md:text-2xl">
              Take {SITE.platformName} with you
            </h3>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-500">
            Same CRM on web and app — apply, track, and manage from anywhere.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <FooterAppCard
            label="Customer App"
            blurb="Apply for loans and track your application on the go."
            target="customer"
          />
          <FooterAppCard
            label="Partner App"
            blurb="Manage leads, cases, and payouts with your partner desk."
            target="partner"
          />
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-100/80 bg-white text-slate-600">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(13,107,87,0.05),transparent)]"
        aria-hidden
      />

      <FooterAppBand />

      <div className="container relative mx-auto px-4 py-14 md:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
            <Link
              to="/"
              className="group inline-flex max-w-full flex-col items-center gap-3.5 transition-opacity hover:opacity-95 sm:flex-row lg:items-center"
              aria-label={SITE.name}
            >
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50/80 ring-1 ring-brand-100">
                <img
                  src={SITE.logoUrl}
                  alt=""
                  className="h-9 w-9 object-contain"
                  width={36}
                  height={36}
                />
              </span>
              <div className="min-w-0">
                <BrandName className="font-heading text-xl font-bold leading-tight tracking-tight text-navy-900" />
                <p className="mt-1 text-[11px] font-medium leading-snug tracking-wide text-slate-500">
                  A unit of MoneyMines Infosource &amp; E-Services
                </p>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-[1.75] text-slate-500">
              India&apos;s AI-powered financial distribution platform — helping customers find the
              right solutions while empowering professionals to grow.
            </p>
            <Link
              to={SITE.becomePartnerUrl}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:bg-brand-700"
            >
              Become a Partner
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <div className="mt-7">
              <SocialLinks size="sm" align="center" className="lg:justify-start" />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-5">
            <div className="text-center sm:text-left">
              <FooterHeading className="justify-center sm:justify-start">Quick Links</FooterHeading>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.path} className="flex justify-center sm:justify-start">
                    <FooterLink to={link.path} centered>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <FooterHeading>Loans</FooterHeading>
              <ul className="space-y-3">
                {LOAN_NAV.map((loan) => (
                  <li key={loan.path} className="flex justify-center sm:justify-start">
                    <FooterLink to={loan.path} centered>
                      {loan.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <FooterHeading>More</FooterHeading>
              <ul className="space-y-3">
                <li className="flex justify-center sm:justify-start">
                  <FooterLink to="/insurance" centered>
                    Insurance
                  </FooterLink>
                </li>
                <li className="flex justify-center sm:justify-start">
                  <FooterLink to="/credit-card" centered>
                    Credit Cards
                  </FooterLink>
                </li>
                <li className="flex justify-center sm:justify-start">
                  <FooterLink to={SITE.becomePartnerUrl} highlight centered>
                    Become Partner
                  </FooterLink>
                </li>
                <li className="flex justify-center sm:justify-start">
                  <FooterLink to={`${SITE.becomePartnerUrl}#academy`} centered>
                    Partner Academy
                  </FooterLink>
                </li>
                {FOOTER_LINKS.legal.slice(0, 3).map((link) => (
                  <li key={link.path} className="flex justify-center sm:justify-start">
                    <FooterLink to={link.path} centered>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading className="text-center lg:text-left">Contact</FooterHeading>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="group flex items-start justify-center gap-3 transition-colors lg:justify-start"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 pt-1.5 text-sm text-slate-600 group-hover:text-navy-900">
                    {SITE.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start justify-center gap-3 transition-colors lg:justify-start"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 break-all pt-1.5 text-sm text-slate-600 group-hover:text-navy-900">
                    {SITE.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mx-auto flex max-w-xs items-start justify-center gap-3 transition-colors lg:mx-0 lg:max-w-none lg:justify-start"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 pt-1.5 text-left text-sm leading-relaxed text-slate-600 group-hover:text-navy-900">
                    {SITE.address}
                  </span>
                </a>
              </li>
            </ul>
            <div className="relative mx-auto mt-6 max-w-sm overflow-hidden rounded-2xl ring-1 ring-brand-900/[0.06] lg:mx-0 lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
              <OfficeMap heightClass="h-28 w-full grayscale-[20%]" />
              <a
                href={SITE.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2.5 right-2.5 z-20 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-brand-800 shadow-sm ring-1 ring-brand-100 hover:text-brand-900"
              >
                Directions
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 lg:flex-row">
          <p className="text-center text-xs text-slate-400 lg:text-left">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            {FOOTER_LINKS.legal.map((link, i) => (
              <span key={link.path} className="inline-flex items-center">
                {i > 0 && <span className="mx-2.5 hidden text-slate-200 sm:inline">·</span>}
                <Link
                  to={link.path}
                  className="px-1 text-xs text-slate-400 transition-colors hover:text-brand-700"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
