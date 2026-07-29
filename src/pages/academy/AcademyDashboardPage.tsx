import { Link } from 'react-router-dom'
import { AcademyShell } from '@/components/academy/AcademyShell'
import { AcademyProgressBar } from '@/components/academy/AcademyProgressBar'
import { AcademyStatGrid } from '@/pages/academy/AcademyAppLayout'
import {
  ACADEMY_APP,
  ALL_COURSES,
  COMMUNITY_POSTS,
  DASHBOARD_STATS,
  LEARNING_LEVELS,
} from '@/data/academy'

export function AcademyDashboardPage() {
  const continueCourse = ALL_COURSES.find((c) => c.progress > 0 && c.progress < 100) || ALL_COURSES[1]

  return (
    <AcademyShell
      title="Dashboard"
      subtitle="Real-time view of learning, leads, certificates and partner rank."
      actions={
        <Link
          to={`${ACADEMY_APP}/learning/${continueCourse.slug}`}
          className="rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-brand-600/20"
        >
          Continue learning
        </Link>
      }
    >
      <AcademyStatGrid items={DASHBOARD_STATS} />

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
          <h2 className="font-heading text-lg font-bold text-navy-900">Continue watching</h2>
          <p className="mt-1 text-sm text-slate-600">{continueCourse.title}</p>
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-500">
              <span>Course progress</span>
              <span>{continueCourse.progress}%</span>
            </div>
            <AcademyProgressBar value={continueCourse.progress} size="lg" />
          </div>
          <Link
            to={`${ACADEMY_APP}/learning/${continueCourse.slug}`}
            className="mt-4 inline-flex text-sm font-bold text-brand-700"
          >
            Resume course →
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="font-heading text-lg font-bold text-navy-900">Roadmap snapshot</h2>
          <ul className="mt-3 space-y-3">
            {LEARNING_LEVELS.slice(0, 4).map((l) => (
              <li key={l.id}>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-navy-900">L{l.id} {l.focus}</span>
                  <span className="text-slate-500">{l.progress}%</span>
                </div>
                <AcademyProgressBar value={l.progress} size="sm" className="mt-1" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-heading text-lg font-bold text-navy-900">Community highlights</h2>
          <Link to={`${ACADEMY_APP}/community`} className="text-sm font-bold text-brand-700">
            View all
          </Link>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {COMMUNITY_POSTS.map((p) => (
            <article key={p.id} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
              <p className="text-[11px] font-bold uppercase text-brand-700">{p.tag}</p>
              <h3 className="mt-1 text-sm font-bold text-navy-900">{p.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-slate-600">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </AcademyShell>
  )
}
