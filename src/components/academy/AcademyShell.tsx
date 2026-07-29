import { NavLink, Link } from 'react-router-dom'
import {
  Award,
  BookOpen,
  Clapperboard,
  Download,
  Kanban,
  LayoutDashboard,
  LifeBuoy,
  Menu,
  MessageSquareText,
  Palette,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  X,
  GraduationCap,
} from 'lucide-react'
import { useState, type ComponentType } from 'react'
import { ACADEMY_BASE, ACADEMY_NAV } from '@/data/academy'
import { cn } from '@/utils/cn'

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  BookOpen,
  Award,
  Download,
  Kanban,
  Palette,
  MessageSquareText,
  Clapperboard,
  Sparkles,
  Users,
  Trophy,
  LifeBuoy,
  UserRound,
}

export function AcademySidebar({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  const nav = (
    <nav className="flex flex-col gap-1 p-3" aria-label="Partner Academy">
      <Link
        to={ACADEMY_BASE}
        className="mb-3 flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-800 to-brand-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-900/20"
        onClick={() => setOpen(false)}
      >
        <GraduationCap className="h-4 w-4" />
        Academy Home
      </Link>
      {ACADEMY_NAV.map((item) => {
        const Icon = ICONS[item.icon] || BookOpen
        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-600/10 text-brand-800'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-navy-900',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0 opacity-80" />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )

  return (
    <>
      <button
        type="button"
        className="mb-3 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-navy-900 shadow-sm lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open academy menu"
      >
        <Menu className="h-4 w-4" />
        Academy Menu
      </button>

      <aside
        className={cn(
          'hidden w-64 shrink-0 rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm shadow-slate-200/50 lg:block',
          className,
        )}
      >
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">{nav}</div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy-950/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(100%,18rem)] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <span className="font-heading text-sm font-bold text-navy-900">Partner Academy</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">{nav}</div>
          </div>
        </div>
      )}
    </>
  )
}

export function AcademyShell({
  title,
  subtitle,
  children,
  actions,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50 via-white to-brand-50/20">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <AcademySidebar />
          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">
                  Kuber Partner Academy
                </p>
                <h1 className="font-heading mt-1 text-2xl font-extrabold text-navy-900 md:text-3xl">
                  {title}
                </h1>
                {subtitle ? <p className="mt-1 max-w-2xl text-sm text-slate-600 md:text-base">{subtitle}</p> : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
