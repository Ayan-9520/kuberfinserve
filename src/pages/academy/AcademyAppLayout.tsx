import { Link, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { SeoHead } from '@/components/SeoHead'
import { AcademyAiFloatingWidget } from '@/components/academy/AcademyAiWidget'
import { PageSkeleton } from '@/components/SkeletonLoader'
import { ACADEMY_APP, ACADEMY_SEO } from '@/data/academy'

/** LMS shell under MainLayout — sidebar lives inside each page via AcademyShell */
export function AcademyAppLayout() {
  return (
    <>
      <SeoHead
        title={`Academy App | ${ACADEMY_SEO.title}`}
        description={ACADEMY_SEO.description}
        path={ACADEMY_APP}
        keywords={ACADEMY_SEO.keywords}
      />
      <Suspense fallback={<PageSkeleton />}>
        <Outlet />
      </Suspense>
      <AcademyAiFloatingWidget />
    </>
  )
}

export function AcademyStatGrid({
  items,
}: {
  items: { label: string; value: string; hint: string }[]
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/40 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{s.label}</p>
          <p className="font-heading mt-1 text-2xl font-extrabold text-navy-900">{s.value}</p>
          <p className="mt-1 text-xs text-slate-500">{s.hint}</p>
        </div>
      ))}
    </div>
  )
}

export function AcademyEmptyAction({
  to,
  label,
}: {
  to: string
  label: string
}) {
  return (
    <Link
      to={to}
      className="inline-flex rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white hover:bg-brand-800"
    >
      {label}
    </Link>
  )
}
