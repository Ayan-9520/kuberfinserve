import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BookOpen,
  Bot,
  Briefcase,
  ChartColumnIncreasing,
  ClipboardCheck,
  Megaphone,
  Sparkles,
} from 'lucide-react'
import { LEARNING_LEVELS, TARGET_PERSONAS, WHY_JOIN } from '@/data/academy'
import { AcademyProgressBar } from '@/components/academy/AcademyProgressBar'
import { AcademyAccessButtons } from '@/components/academy/AcademyAccessButtons'
import { ACADEMY_LOGIN_PATH } from '@/utils/academyAccess'
import { SITE } from '@/data/site'

const WHY_ICONS = [Award, Briefcase, Megaphone, BookOpen, Bot, ChartColumnIncreasing, ClipboardCheck, Sparkles]

export function AcademyHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-brand-50/40">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-brand-700/10 blur-3xl" />
      <div className="container relative mx-auto px-4 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
            {SITE.platformName} · Partner Academy
          </p>
          <h1 className="font-heading mt-3 text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl">
            Become a Certified{' '}
            <span className="bg-gradient-to-r from-brand-800 via-brand-600 to-brand-500 bg-clip-text text-transparent">
              Kuber Financial Partner
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 md:text-lg">
            Learn. Earn. Grow.
            <br />
            Build your own Financial Services Business.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">
            Academy dashboard, courses and certificates open in the{' '}
            <strong className="text-navy-900">KuberOne partner app</strong> after login — not on this website.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <AcademyAccessButtons className="justify-center" />
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy-800 hover:border-brand-300 hover:bg-brand-50"
            >
              Book Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function AcademyWhyJoin() {
  return (
    <section className="border-t border-slate-100 bg-white py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-2xl font-extrabold text-navy-900 md:text-3xl">
            Why Join Kuber Partner Academy
          </h2>
          <p className="mt-2 text-slate-600">
            Built for professionals who want an advisory practice—not just loan closures.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_JOIN.map((item, i) => {
            const Icon = WHY_ICONS[i % WHY_ICONS.length]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50/80 p-5 shadow-sm shadow-slate-200/40"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading mt-3 text-base font-bold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function AcademyPersonas() {
  return (
    <section className="bg-gradient-to-b from-brand-50/40 to-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-center text-xl font-extrabold text-navy-900 md:text-2xl">
          Built for India&apos;s financial professionals
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {TARGET_PERSONAS.map((p) => (
            <span
              key={p}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AcademyRoadmapPreview() {
  return (
    <section className="border-t border-slate-100 bg-white py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-navy-900 md:text-3xl">
              Learning Roadmap
            </h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Ten levels from Foundation to Master Partner. Log in to the KuberOne app to watch lessons,
              take quizzes and unlock certificates.
            </p>
          </div>
          <Link
            to={ACADEMY_LOGIN_PATH}
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800"
          >
            Login to start learning <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {LEARNING_LEVELS.map((level, i) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-700">
                    Level {level.id}
                  </p>
                  <h3 className="font-heading mt-0.5 text-lg font-bold text-navy-900">{level.focus}</h3>
                  <p className="mt-1 text-sm text-slate-600">{level.description}</p>
                </div>
                <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                  {level.certificate}
                </span>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-500">
                  <span>In-app progress</span>
                  <span>Unlock after login</span>
                </div>
                <AcademyProgressBar value={0} />
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
                <span>{level.videoCount} videos</span>
                <span>{level.durationHours}h</span>
                <span>{level.quizCount} quiz</span>
                <span>Certificate</span>
              </div>
              <Link
                to={ACADEMY_LOGIN_PATH}
                className="mt-4 inline-flex text-sm font-bold text-brand-700"
              >
                Login to open course
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-brand-800 to-brand-600 p-6 text-center text-white md:p-8">
          <h3 className="font-heading text-xl font-bold md:text-2xl">Ready to start learning?</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/85">
            Partner login unlocks Academy inside the KuberOne DSA app. New here? Become a partner first.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to={ACADEMY_LOGIN_PATH}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-brand-800"
            >
              Partner Login → Academy
            </Link>
            <Link
              to={SITE.becomePartnerUrl}
              className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-bold text-white"
            >
              Become Partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
