import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Mail,
  Phone,
  QrCode,
  Smartphone,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react'
import { SITE, FOOTER_LINKS, LOAN_NAV } from '@/data/site'
import { BrandLogo } from '@/components/BrandLogo'
import { SocialLinks } from '@/components/SocialLinks'
import { OfficeMap } from '@/components/OfficeMap'
import { downloadMobileApp, openMobileApp } from '@/utils/partnerApp'
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
        'mb-4 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white',
        className,
      )}
    >
      <span className="h-4 w-0.5 rounded-full bg-gradient-to-b from-brand-400 to-brand-600" />
      {children}
    </h3>
  )
}

function FooterLink({
  to,
  children,
  highlight,
  external,
}: {
  to: string
  children: ReactNode
  highlight?: boolean
  external?: boolean
}) {
  const className = cn(
    'group inline-flex items-center gap-2 text-[13px] leading-snug transition-all duration-200',
    highlight
      ? 'font-medium text-brand-300 hover:text-brand-200'
      : 'text-slate-400 hover:translate-x-0.5 hover:text-white',
  )

  if (external || to.startsWith('http') || to.startsWith('tel:') || to.startsWith('mailto:')) {
    return (
      <a
        href={to}
        className={className}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        <span className="h-px w-0 bg-brand-400 transition-all duration-200 group-hover:w-2.5" />
        {children}
      </a>
    )
  }

  return (
    <Link to={to} className={className}>
      <span className="h-px w-0 bg-brand-400 transition-all duration-200 group-hover:w-2.5" />
      {children}
    </Link>
  )
}

const QUICK_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  { label: 'EMI Calculator', path: '/emi-calculator' },
  { label: 'Apply Loan', path: '/apply-loan' },
  { label: 'Contact Us', path: '/contact-us' },
  { label: 'Partner Login', path: SITE.partnerLoginUrl },
] as const

function FooterAppRow({
  label,
  target,
}: {
  label: string
  target: 'customer' | 'partner'
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-3 rounded-xl border border-emerald-200/60 bg-white/70 p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700 ring-1 ring-emerald-600/20">
          <Smartphone className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold text-navy-900">{label}</p>
          <p className="text-[11px] text-slate-600">
            {target === 'customer' ? 'Apply on mobile' : `Powered by ${SITE.platformName}`}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => downloadMobileApp(target)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-3 py-2 text-[11px] font-extrabold text-white shadow-md shadow-emerald-600/20 transition-transform hover:scale-[1.02] sm:flex-none sm:px-4"
        >
          Download
        </button>
        <button
          type="button"
          onClick={() => openMobileApp(target)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-emerald-200/70 bg-white px-3 py-2 text-[11px] font-bold text-emerald-900 transition-colors hover:bg-emerald-50 sm:flex-none sm:px-4"
        >
          <ExternalLink className="h-3 w-3" />
          Open
        </button>
      </div>
    </div>
  )
}

function FooterAppBand() {
  return (
    <div className="relative border-b border-white/10">
      <div
        className="absolute inset-0 bg-gradient-to-r from-white via-emerald-50 to-white"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.55),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(20,184,166,0.45),transparent_55%)]"
        aria-hidden
      />
      <div className="container relative mx-auto px-4 py-5 md:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
          <div className="shrink-0 lg:max-w-[12rem]">
            <h3 className="mb-1 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em] text-navy-900">
              <span className="h-4 w-0.5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
              Mobile Apps
            </h3>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Same CRM on web &amp; app
            </p>
            <div className="mt-2.5 flex gap-2">
              <a
                href={SITE.customerApp.androidStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-emerald-200/70 bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 transition-colors hover:bg-white"
              >
                Android
              </a>
              <a
                href={SITE.customerApp.iosStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-emerald-200/70 bg-white/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 transition-colors hover:bg-white"
              >
                iOS
              </a>
            </div>
          </div>

          <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-2">
            <FooterAppRow label="Customer App" target="customer" />
            <FooterAppRow label="Partner App" target="partner" />
          </div>

          <div
            className="flex shrink-0 items-center gap-3 self-center rounded-xl border border-dashed border-emerald-200/60 bg-white/70 px-4 py-3 lg:flex-col lg:px-3 lg:py-4"
            aria-hidden
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-emerald-200/60 bg-white text-emerald-700 shadow-sm">
              <QrCode className="h-6 w-6 stroke-[1.25]" />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 lg:text-center">
              Scan to download
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-950 text-slate-400">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,195,137,0.1),transparent)]"
        aria-hidden
      />

      {/* Apps — footer ke andar, sabse upar (pre-footer band) */}
      <FooterAppBand />

      <div className="container relative mx-auto px-4 py-12 md:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <div className="rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
                <BrandLogo variant="light" className="!h-14 !w-14 lg:!h-16 lg:!w-16" linkToHome={false} />
              </div>
              <div>
                <BrandName className="font-heading text-xl font-bold tracking-tight text-white" />
                <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-500">
                  A unit of MoneyMines Infosource &amp; E-Services
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-[1.7] text-slate-500">
              India&apos;s AI powered financial distribution platform — helping customers find the
              right financial solutions while empowering professionals to build successful businesses.
            </p>
            <Link
              to={SITE.becomePartnerUrl}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-2 text-xs font-semibold text-brand-300 transition-all hover:border-brand-400/40 hover:bg-brand-500/15 hover:text-brand-200"
            >
              Become a Partner
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <div className="mt-6">
              <SocialLinks size="sm" align="start" />
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <FooterHeading>Quick Links</FooterHeading>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.path}>
                    <FooterLink to={link.path}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterHeading>Loans</FooterHeading>
              <ul className="space-y-2.5">
                {LOAN_NAV.map((loan) => (
                  <li key={loan.path}>
                    <FooterLink to={loan.path}>{loan.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FooterHeading>More</FooterHeading>
              <ul className="space-y-2.5">
                <li>
                  <FooterLink to="/insurance">Insurance</FooterLink>
                </li>
                <li>
                  <FooterLink to="/credit-card">Credit Cards</FooterLink>
                </li>
                <li>
                  <FooterLink to={SITE.becomePartnerUrl} highlight>
                    Become Partner
                  </FooterLink>
                </li>
                {FOOTER_LINKS.legal.slice(0, 3).map((link) => (
                  <li key={link.path}>
                    <FooterLink to={link.path}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-colors hover:border-brand-500/20 hover:bg-white/[0.05]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 pt-0.5 text-sm text-slate-300 group-hover:text-white">
                    {SITE.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-colors hover:border-brand-500/20 hover:bg-white/[0.05]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 break-all pt-0.5 text-sm text-slate-300 group-hover:text-white">
                    {SITE.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={SITE.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 transition-colors hover:border-brand-500/20 hover:bg-white/[0.05]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0 pt-0.5 text-sm leading-snug text-slate-300 group-hover:text-white">
                    {SITE.address}
                  </span>
                </a>
              </li>
            </ul>
            <div className="relative mt-4 overflow-hidden rounded-xl border border-white/10">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              <OfficeMap heightClass="h-32 w-full grayscale-[25%]" />
              <a
                href={SITE.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 rounded-md bg-navy-900/90 px-2 py-1 text-[10px] font-medium text-brand-300 ring-1 ring-white/10 backdrop-blur-sm hover:text-brand-200"
              >
                Directions
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 lg:flex-row">
          <p className="text-center text-xs text-slate-500 lg:text-left">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
            {FOOTER_LINKS.legal.map((link, i) => (
              <span key={link.path} className="inline-flex items-center">
                {i > 0 && <span className="mx-2 hidden text-slate-700 sm:inline">·</span>}
                <Link
                  to={link.path}
                  className="px-1 text-xs text-slate-500 transition-colors hover:text-brand-300"
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
