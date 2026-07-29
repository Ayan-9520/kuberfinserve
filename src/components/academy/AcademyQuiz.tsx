import { useMemo, useState } from 'react'
import { CheckCircle2, Timer, Trophy } from 'lucide-react'
import type { QuizQuestion } from '@/data/academy'
import { cn } from '@/utils/cn'

const PASS_PERCENT = 70

export function AcademyQuiz({
  title,
  questions,
  onPass,
}: {
  title: string
  questions: QuizQuestion[]
  onPass?: () => void
}) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [secondsLeft] = useState(12 * 60)

  const current = questions[index]
  const score = useMemo(() => {
    let correct = 0
    for (const q of questions) {
      if (answers[q.id] === q.correctIndex) correct += 1
    }
    return Math.round((correct / questions.length) * 100)
  }, [answers, questions])

  const passed = submitted && score >= PASS_PERCENT
  const mins = Math.floor(secondsLeft / 60)
  const secs = String(secondsLeft % 60).padStart(2, '0')

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-bold text-navy-900">{title}</h3>
          <p className="text-sm text-slate-500">
            MCQ · Case · Scenario · Pass at {PASS_PERCENT}% to unlock certificate
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-800">
          <Timer className="h-3.5 w-3.5" />
          {mins}:{secs}
        </div>
      </div>

      {!submitted ? (
        <>
          <div className="mb-3 flex flex-wrap gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'h-8 w-8 rounded-lg text-xs font-bold',
                  i === index
                    ? 'bg-brand-700 text-white'
                    : answers[q.id] !== undefined
                      ? 'bg-brand-100 text-brand-800'
                      : 'bg-slate-100 text-slate-500',
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            {current.type === 'mcq' ? 'Multiple choice' : current.type === 'case' ? 'Case study' : 'Scenario'}
          </p>
          <p className="font-heading text-base font-semibold text-navy-900 md:text-lg">{current.prompt}</p>
          <div className="mt-4 space-y-2">
            {current.options.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAnswers((a) => ({ ...a, [current.id]: i }))}
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-left text-sm transition',
                  answers[current.id] === i
                    ? 'border-brand-500 bg-brand-50 text-brand-900'
                    : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50',
                )}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex((i) => i - 1)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-navy-800 disabled:opacity-40"
            >
              Previous
            </button>
            {index < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setIndex((i) => i + 1)}
                className="rounded-xl bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSubmitted(true)
                  const s = Math.round(
                    (questions.filter((q) => answers[q.id] === q.correctIndex).length / questions.length) *
                      100,
                  )
                  if (s >= PASS_PERCENT) onPass?.()
                }}
                className="rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-4 py-2 text-sm font-bold text-white shadow-md shadow-brand-600/25"
              >
                Submit quiz
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-white p-6 text-center ring-1 ring-brand-100">
          {passed ? (
            <Trophy className="mx-auto h-10 w-10 text-brand-600" />
          ) : (
            <CheckCircle2 className="mx-auto h-10 w-10 text-slate-400" />
          )}
          <p className="font-heading mt-3 text-2xl font-extrabold text-navy-900">{score}%</p>
          <p className="mt-1 text-sm text-slate-600">
            {passed
              ? 'Passed. Certificate unlock is ready for this level.'
              : `Score below ${PASS_PERCENT}%. Review lessons and retry.`}
          </p>
          <div className="mt-4 space-y-2 text-left">
            {questions.map((q) => (
              <div key={q.id} className="rounded-xl border border-slate-100 p-3 text-sm">
                <p className="font-semibold text-navy-900">{q.prompt}</p>
                <p className="mt-1 text-slate-600">{q.explanation}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false)
              setAnswers({})
              setIndex(0)
            }}
            className="mt-4 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold"
          >
            Retake quiz
          </button>
        </div>
      )}
    </div>
  )
}
