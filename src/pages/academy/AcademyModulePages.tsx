import { useMemo, useState } from 'react'
import { Copy, Download } from 'lucide-react'
import { AcademyShell } from '@/components/academy/AcademyShell'
import { AcademyAiPanel } from '@/components/academy/AcademyAiWidget'
import {
  ACADEMY_APP,
  ALL_COURSES,
  COMMUNITY_POSTS,
  CRM_LESSONS,
  DEMO_PROFILE,
  DOWNLOAD_CATEGORIES,
  DOWNLOAD_ITEMS,
  LEADERBOARD,
  LEADERBOARD_TABS,
  SALES_SCRIPTS,
  SUCCESS_STORIES,
  TOOLKIT_CATEGORIES,
  TOOLKIT_ITEMS,
} from '@/data/academy'
import { Link } from 'react-router-dom'
import { SITE } from '@/data/site'
import { cn } from '@/utils/cn'

function FilterChips({
  items,
  value,
  onChange,
}: {
  items: readonly string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onChange('All')}
        className={cn(
          'shrink-0 rounded-full px-3 py-1.5 text-xs font-bold',
          value === 'All' ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600',
        )}
      >
        All
      </button>
      {items.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={cn(
            'shrink-0 rounded-full px-3 py-1.5 text-xs font-bold',
            value === c ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600',
          )}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

export function AcademyDownloadsPage() {
  const [cat, setCat] = useState('All')
  const items = useMemo(
    () => (cat === 'All' ? DOWNLOAD_ITEMS : DOWNLOAD_ITEMS.filter((i) => i.category === cat)),
    [cat],
  )
  return (
    <AcademyShell title="Download Center" subtitle="Brochures, handbooks, checklists and presentation packs.">
      <FilterChips items={DOWNLOAD_CATEGORIES} value={cat} onChange={setCat} />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase text-brand-700">{item.category}</p>
            <h3 className="font-heading mt-1 font-bold text-navy-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700"
            >
              <Download className="h-4 w-4" />
              Download {item.format}
            </button>
          </div>
        ))}
      </div>
    </AcademyShell>
  )
}

export function AcademyToolkitPage() {
  const [cat, setCat] = useState('All')
  const items = useMemo(
    () => (cat === 'All' ? TOOLKIT_ITEMS : TOOLKIT_ITEMS.filter((i) => i.category === cat)),
    [cat],
  )
  return (
    <AcademyShell
      title="Marketing Toolkit"
      subtitle="Ready creatives and templates aligned to the Kuber brand."
    >
      <FilterChips items={TOOLKIT_CATEGORIES} value={cat} onChange={setCat} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm"
          >
            <p className="text-[11px] font-bold uppercase text-brand-700">{item.category}</p>
            <h3 className="font-heading mt-1 font-bold text-navy-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            <p className="mt-3 text-xs font-semibold text-slate-500">{item.format}</p>
          </div>
        ))}
      </div>
    </AcademyShell>
  )
}

export function AcademySalesScriptsPage() {
  const cats = useMemo(
    () => Array.from(new Set(SALES_SCRIPTS.map((s) => s.category))),
    [],
  )
  const [cat, setCat] = useState('All')
  const [copied, setCopied] = useState<string | null>(null)
  const items = cat === 'All' ? SALES_SCRIPTS : SALES_SCRIPTS.filter((s) => s.category === cat)

  return (
    <AcademyShell title="Sales Scripts" subtitle="Telephone, WhatsApp, LinkedIn and profession-specific scripts.">
      <FilterChips items={cats} value={cat} onChange={setCat} />
      <div className="space-y-3">
        {items.map((script) => (
          <article key={script.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-bold uppercase text-brand-700">
                  {script.category} · {script.channel}
                </p>
                <h3 className="font-heading mt-1 font-bold text-navy-900">{script.title}</h3>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(script.body)
                  setCopied(script.id)
                  setTimeout(() => setCopied(null), 1500)
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-navy-800"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied === script.id ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
              {script.body}
            </p>
          </article>
        ))}
      </div>
    </AcademyShell>
  )
}

export function AcademyCrmTrainingPage() {
  const [active, setActive] = useState(CRM_LESSONS[0].id)
  const lesson = CRM_LESSONS.find((l) => l.id === active) || CRM_LESSONS[0]
  return (
    <AcademyShell
      title="CRM Training"
      subtitle="Interactive walkthroughs for KuberOne lead, pipeline, documents and reports."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-1">
          {CRM_LESSONS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setActive(l.id)}
              className={cn(
                'w-full rounded-xl border px-3 py-3 text-left text-sm font-semibold',
                active === l.id
                  ? 'border-brand-500 bg-brand-50 text-brand-900'
                  : 'border-slate-200 bg-white text-navy-900',
              )}
            >
              {l.title}
            </button>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
          <h2 className="font-heading text-xl font-bold text-navy-900">{lesson.title}</h2>
          <p className="mt-1 text-sm text-slate-600">{lesson.description}</p>
          <ol className="mt-4 space-y-3">
            {lesson.steps.map((step, i) => (
              <li key={step} className="flex gap-3 rounded-xl bg-slate-50 px-3 py-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-700 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
          <Link
            to={SITE.partnerLoginUrl}
            className="mt-5 inline-flex rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white"
          >
            Open Partner Login / CRM
          </Link>
        </div>
      </div>
    </AcademyShell>
  )
}

export function AcademyVideoLibraryPage() {
  const videos = ALL_COURSES.flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons.map((l) => ({
        ...l,
        course: c.title,
        href: `${ACADEMY_APP}/learning/${c.slug}/lesson/${l.id}`,
      })),
    ),
  )
  return (
    <AcademyShell title="Video Library" subtitle="All academy lessons in one searchable list.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <Link
            key={v.id}
            to={v.href}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-brand-300 hover:shadow-md"
          >
            <div className="mb-3 aspect-video rounded-xl bg-gradient-to-br from-brand-800 to-brand-500" />
            <p className="line-clamp-1 text-[11px] font-bold uppercase text-brand-700">{v.course}</p>
            <h3 className="font-heading mt-1 text-sm font-bold text-navy-900">{v.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{v.durationMin} min</p>
          </Link>
        ))}
      </div>
    </AcademyShell>
  )
}

export function AcademyAiAssistantPage() {
  return (
    <AcademyShell
      title="AI Assistant"
      subtitle="Draft WhatsApp messages, proposals, pitches and captions. OpenAI API placeholder ready to wire."
    >
      <AcademyAiPanel embedded />
    </AcademyShell>
  )
}

export function AcademyCommunityPage() {
  return (
    <AcademyShell title="Community" subtitle="Discussion forum, events, success stories and recognition.">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {COMMUNITY_POSTS.map((p) => (
            <article key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-brand-700">{p.tag}</p>
              <h3 className="font-heading mt-1 text-lg font-bold text-navy-900">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{p.excerpt}</p>
              <p className="mt-3 text-xs text-slate-500">
                {p.author} · {p.role} · {p.replies} replies · {p.likes} likes
              </p>
            </article>
          ))}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-heading font-bold text-navy-900">Success stories</h3>
            <ul className="mt-3 space-y-3">
              {SUCCESS_STORIES.map((s) => (
                <li key={s.name} className="text-sm">
                  <p className="font-semibold text-navy-900">{s.name}</p>
                  <p className="text-xs text-brand-700">{s.role}</p>
                  <p className="mt-1 text-slate-600">{s.result}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-600 p-4 text-white">
            <h3 className="font-heading font-bold">Monthly webinar</h3>
            <p className="mt-1 text-sm text-white/85">LAP legal red flags — Friday 6:00 PM IST</p>
          </div>
        </div>
      </div>
    </AcademyShell>
  )
}

export function AcademyLeaderboardPage() {
  const [tab, setTab] = useState<(typeof LEADERBOARD_TABS)[number]['id']>('revenue')
  const rows = LEADERBOARD[tab] || []
  return (
    <AcademyShell title="Leaderboard" subtitle="Celebrate top revenue, learning, referrals, marketing and consultants.">
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {LEADERBOARD_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-bold',
              tab === t.id ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Partner</th>
              <th className="px-4 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.rank}-${r.name}`} className="border-t border-slate-100">
                <td className="px-4 py-3 font-bold text-brand-700">#{r.rank}</td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-navy-900">{r.name}</p>
                  <p className="text-xs text-slate-500">
                    {r.role} · {r.city}
                  </p>
                </td>
                <td className="px-4 py-3 font-semibold text-navy-900">
                  {r.score} <span className="text-xs font-normal text-slate-500">{r.metric}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AcademyShell>
  )
}

export function AcademySupportPage() {
  return (
    <AcademyShell title="Support" subtitle="Academy helpdesk, onboarding and product escalations.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-heading font-bold text-navy-900">Contact academy desk</h3>
          <p className="mt-2 text-sm text-slate-600">Email: {SITE.email}</p>
          <p className="text-sm text-slate-600">Phone: {SITE.phone}</p>
          <Link
            to="/contact-us"
            className="mt-4 inline-flex rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white"
          >
            Open contact form
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-heading font-bold text-navy-900">Common topics</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>Certificate not unlocking after quiz</li>
            <li>CRM login / partner OTP</li>
            <li>Marketing asset brand approval</li>
            <li>Commission report mismatch</li>
          </ul>
        </div>
      </div>
    </AcademyShell>
  )
}

export function AcademyProfilePage() {
  const p = DEMO_PROFILE
  return (
    <AcademyShell title="Profile" subtitle="KYC, certificates, learning progress, wallet and referral link.">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-700 to-brand-500 text-2xl font-bold text-white">
            {p.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
          </div>
          <h2 className="font-heading mt-4 text-center text-xl font-bold text-navy-900">{p.name}</h2>
          <p className="text-center text-sm text-slate-500">{p.role}</p>
          <p className="mt-2 text-center text-xs font-bold text-brand-700">
            {p.tier} · KYC {p.kycStatus}
          </p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Code</dt>
              <dd className="font-semibold">{p.partnerCode}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">City</dt>
              <dd className="font-semibold">{p.city}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-slate-500">Phone</dt>
              <dd className="font-semibold">{p.phone}</dd>
            </div>
          </dl>
          <p className="mt-3 text-[11px] text-slate-400">Firebase/Auth placeholder — wire partner session later.</p>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-heading font-bold text-navy-900">Learning & earnings</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Progress</p>
                <p className="text-xl font-extrabold text-navy-900">{p.learningProgress}%</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Hours</p>
                <p className="text-xl font-extrabold text-navy-900">{p.learningHours}h</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Commission</p>
                <p className="text-sm font-extrabold text-navy-900">{p.commissionMonth}</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-heading font-bold text-navy-900">Referral link</h3>
            <p className="mt-2 break-all rounded-xl bg-slate-50 p-3 text-sm text-slate-700">{p.referralLink}</p>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(p.referralLink)}
              className="mt-3 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold"
            >
              Copy link
            </button>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-heading font-bold text-navy-900">Wallet</h3>
            <p className="mt-2 text-sm text-slate-600">
              Wallet ledger connects to KuberOne commission payouts. Placeholder balance: ₹24,500 pending
              settlement.
            </p>
          </div>
        </div>
      </div>
    </AcademyShell>
  )
}
