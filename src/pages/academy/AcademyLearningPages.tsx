import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { AcademyShell } from '@/components/academy/AcademyShell'
import { AcademyProgressBar } from '@/components/academy/AcademyProgressBar'
import { AcademyVideoPlayer } from '@/components/academy/AcademyVideoPlayer'
import { AcademyQuiz } from '@/components/academy/AcademyQuiz'
import {
  ACADEMY_APP,
  ALL_COURSES,
  getCourse,
  HOME_LOAN_QUIZ,
  LEARNING_LEVELS,
} from '@/data/academy'
import { cn } from '@/utils/cn'

const TABS = [
  'Overview',
  'Video Lessons',
  'Download Notes',
  'Assignments',
  'Practice',
  'Quiz',
  'Certificate',
  'Progress',
  'Discussion',
  'Resources',
] as const

export function AcademyMyLearningPage() {
  return (
    <AcademyShell
      title="My Learning"
      subtitle="Follow the 10-level roadmap. Each level unlocks videos, quizzes and certificates."
    >
      <div className="grid gap-4">
        {LEARNING_LEVELS.map((level) => (
          <div
            key={level.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
                  Level {level.id}
                </p>
                <h2 className="font-heading text-xl font-bold text-navy-900">{level.focus}</h2>
                <p className="mt-1 max-w-2xl text-sm text-slate-600">{level.description}</p>
              </div>
              <Link
                to={`${ACADEMY_APP}/learning/${level.courseSlug}`}
                className="shrink-0 rounded-xl bg-brand-700 px-4 py-2 text-center text-sm font-bold text-white hover:bg-brand-800"
              >
                Open course
              </Link>
            </div>
            <div className="mt-4">
              <AcademyProgressBar value={level.progress} />
              <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                <span>{level.videoCount} videos</span>
                <span>{level.durationHours} hours</span>
                <span>{level.quizCount} quiz</span>
                <span>{level.certificate} certificate</span>
                <span>{level.progress}% complete</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AcademyShell>
  )
}

export function AcademyCoursePage() {
  const { courseSlug = '' } = useParams()
  const course = getCourse(courseSlug) || ALL_COURSES[0]
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview')
  const firstLesson = course.modules[0]?.lessons[0]

  const lessonCount = useMemo(
    () => course.modules.reduce((n, m) => n + m.lessons.length, 0),
    [course],
  )

  return (
    <AcademyShell
      title={course.title}
      subtitle={course.subtitle}
      actions={
        firstLesson ? (
          <Link
            to={`${ACADEMY_APP}/learning/${course.slug}/lesson/${firstLesson.id}`}
            className="rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-4 py-2 text-sm font-bold text-white"
          >
            Start / Continue
          </Link>
        ) : null
      }
    >
      <div className="mb-4 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
        <span>Level {course.level}</span>
        <span>{course.durationHours}h</span>
        <span>{lessonCount} lessons</span>
        <span>{course.certificate} cert track</span>
      </div>
      <AcademyProgressBar value={course.progress} size="lg" className="mb-5" />

      <div className="mb-4 flex gap-1 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'shrink-0 rounded-full px-3 py-1.5 text-xs font-bold',
              tab === t ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {tab === 'Overview' && <p className="text-sm leading-relaxed text-slate-700">{course.overview}</p>}

        {tab === 'Video Lessons' && (
          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id}>
                <h3 className="font-heading font-bold text-navy-900">{mod.title}</h3>
                <ul className="mt-2 space-y-2">
                  {mod.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <Link
                        to={`${ACADEMY_APP}/learning/${course.slug}/lesson/${lesson.id}`}
                        className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-sm hover:border-brand-200 hover:bg-brand-50/40"
                      >
                        <span className="font-semibold text-navy-900">
                          {lesson.completed ? '✓ ' : ''}
                          {lesson.title}
                        </span>
                        <span className="text-xs text-slate-500">{lesson.durationMin} min</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'Download Notes' && (
          <ul className="space-y-2">
            {course.resources.map((r) => (
              <li
                key={r.title}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2.5 text-sm"
              >
                <span className="font-semibold text-navy-900">{r.title}</span>
                <span className="text-xs font-bold text-brand-700">
                  {r.type} · {r.size}
                </span>
              </li>
            ))}
          </ul>
        )}

        {tab === 'Assignments' && (
          <ul className="space-y-2">
            {course.assignments.map((a) => (
              <li key={a.title} className="rounded-xl border border-slate-100 px-3 py-3 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="font-semibold text-navy-900">{a.title}</span>
                  <span className="text-xs font-bold text-brand-700">{a.status}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Due: {a.dueHint}</p>
              </li>
            ))}
          </ul>
        )}

        {tab === 'Practice' && (
          <p className="text-sm text-slate-700">
            Practice mode: use eligibility worksheets, document checklists and role-play scripts from Downloads
            and Sales Scripts. Mark practice complete from your Profile after field application.
          </p>
        )}

        {tab === 'Quiz' && (
          <AcademyQuiz title={`${course.title} assessment`} questions={HOME_LOAN_QUIZ} />
        )}

        {tab === 'Certificate' && (
          <div className="rounded-xl bg-gradient-to-br from-brand-50 to-white p-6 ring-1 ring-brand-100">
            <h3 className="font-heading text-lg font-bold text-navy-900">
              {course.certificate} certificate track
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Pass the quiz at 70%+ and complete all lessons to unlock a downloadable PDF certificate with QR
              verification. Go to Certifications to preview and print.
            </p>
            <Link
              to={`${ACADEMY_APP}/certifications`}
              className="mt-4 inline-flex rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white"
            >
              Open Certifications
            </Link>
          </div>
        )}

        {tab === 'Progress' && (
          <div>
            <AcademyProgressBar value={course.progress} size="lg" />
            <p className="mt-3 text-sm text-slate-600">{course.progress}% of this course completed.</p>
          </div>
        )}

        {tab === 'Discussion' && (
          <p className="text-sm text-slate-700">
            Course discussion lives in Community. Share anonymised cases and tag this course level for peer
            feedback.
          </p>
        )}

        {tab === 'Resources' && (
          <ul className="space-y-2">
            {[...course.resources, { title: 'Partner Handbook link', type: 'PDF', size: '—' }].map((r) => (
              <li key={r.title} className="rounded-xl border border-slate-100 px-3 py-2 text-sm font-semibold">
                {r.title}{' '}
                <span className="font-normal text-slate-500">
                  ({r.type} {r.size})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AcademyShell>
  )
}

export function AcademyLessonPage() {
  const { courseSlug = '', lessonId = '' } = useParams()
  const course = getCourse(courseSlug) || ALL_COURSES[0]
  const lesson =
    course.modules.flatMap((m) => m.lessons).find((l) => l.id === lessonId) ||
    course.modules[0]?.lessons[0]

  if (!lesson) {
    return (
      <AcademyShell title="Lesson not found">
        <Link to={`${ACADEMY_APP}/learning`} className="text-brand-700 font-bold">
          Back to My Learning
        </Link>
      </AcademyShell>
    )
  }

  return (
    <AcademyShell title={lesson.title} subtitle={course.title}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AcademyVideoPlayer
            title={lesson.title}
            summary={lesson.summary}
            transcript={lesson.transcript}
            onAskAi={() => {
              window.location.href = `${ACADEMY_APP}/ai-assistant`
            }}
          />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="font-heading font-bold text-navy-900">Course outline</h3>
          <ul className="mt-3 max-h-[28rem] space-y-2 overflow-y-auto">
            {course.modules.flatMap((m) =>
              m.lessons.map((l) => (
                <li key={l.id}>
                  <Link
                    to={`${ACADEMY_APP}/learning/${course.slug}/lesson/${l.id}`}
                    className={cn(
                      'block rounded-lg px-2 py-2 text-sm',
                      l.id === lesson.id
                        ? 'bg-brand-50 font-bold text-brand-800'
                        : 'text-slate-600 hover:bg-slate-50',
                    )}
                  >
                    {l.title}
                  </Link>
                </li>
              )),
            )}
          </ul>
        </div>
      </div>
    </AcademyShell>
  )
}
