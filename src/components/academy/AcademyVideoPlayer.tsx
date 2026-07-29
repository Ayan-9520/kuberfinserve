import { useMemo, useState } from 'react'
import { Bookmark, Download, Gauge, ListVideo, NotebookPen, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2] as const

export function AcademyVideoPlayer({
  title,
  summary,
  transcript,
  onAskAi,
}: {
  title: string
  summary: string
  transcript: string
  onAskAi?: () => void
}) {
  const [speed, setSpeed] = useState(1)
  const [tab, setTab] = useState<'notes' | 'transcript' | 'downloads'>('notes')
  const [bookmarked, setBookmarked] = useState(false)
  const [notes, setNotes] = useState('')

  const posterGradient = useMemo(
    () => 'linear-gradient(135deg, #0a4f42 0%, #0d6b57 45%, #00c389 100%)',
    [],
  )

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-navy-950 shadow-xl shadow-navy-950/20">
      <div className="relative aspect-video w-full" style={{ background: posterGradient }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Continue Watching
          </span>
          <h2 className="font-heading max-w-xl text-xl font-bold text-white md:text-2xl">{title}</h2>
          <p className="max-w-lg text-sm text-white/80">{summary}</p>
          <button
            type="button"
            className="mt-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-800 shadow-lg"
          >
            Play lesson
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="h-1 overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[42%] rounded-full bg-brand-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-white/10 bg-navy-900 px-3 py-2.5">
        <button
          type="button"
          onClick={() => setBookmarked((v) => !v)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/10',
            bookmarked && 'bg-brand-600/30 text-brand-300',
          )}
        >
          <Bookmark className="h-3.5 w-3.5" />
          Bookmark
        </button>
        <label className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/90">
          <Gauge className="h-3.5 w-3.5" />
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="rounded bg-white/10 px-1 py-0.5 text-white outline-none"
          >
            {SPEEDS.map((s) => (
              <option key={s} value={s} className="text-navy-900">
                {s}x
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/10"
        >
          <ListVideo className="h-3.5 w-3.5" />
          Next lesson
        </button>
        <button
          type="button"
          onClick={onAskAi}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-brand-600/90 px-2.5 py-1.5 text-xs font-bold text-white hover:bg-brand-500"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Ask
        </button>
      </div>

      <div className="bg-white">
        <div className="flex border-b border-slate-100">
          {(
            [
              ['notes', 'Notes', NotebookPen],
              ['transcript', 'Transcript', ListVideo],
              ['downloads', 'Downloads', Download],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold sm:text-sm',
                tab === id ? 'border-b-2 border-brand-600 text-brand-800' : 'text-slate-500',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
        <div className="p-4 text-sm text-slate-700">
          {tab === 'notes' && (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write lesson notes here…"
              className="min-h-28 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15"
            />
          )}
          {tab === 'transcript' && <p className="leading-relaxed text-slate-600">{transcript}</p>}
          {tab === 'downloads' && (
            <ul className="space-y-2">
              <li className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                <span>Lesson slide deck</span>
                <span className="text-xs font-semibold text-brand-700">PDF</span>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                <span>Practice worksheet</span>
                <span className="text-xs font-semibold text-brand-700">XLSX</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
