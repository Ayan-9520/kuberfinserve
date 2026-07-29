import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { AcademyAccessButtons } from '@/components/academy/AcademyAccessButtons'
import { SITE } from '@/data/site'

/** Become Partner page — Academy entry that requires DSA / Partner login */
export function PartnerAcademyCtaSection() {
  return (
    <section className="border-y border-brand-100 bg-gradient-to-b from-brand-50/50 to-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-3xl border border-brand-100 bg-white p-6 shadow-lg shadow-brand-900/5 md:p-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 to-brand-500 text-white shadow-md">
              <GraduationCap className="h-7 w-7" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                {SITE.platformName} Partner Academy
              </p>
              <h2 className="font-heading mt-1 text-xl font-extrabold text-navy-900 md:text-2xl">
                Already a partner? Start learning in the app
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Courses, CRM training, certificates and AI tools open in the KuberOne DSA app after Partner
                Login — the full Academy dashboard is not on the website.
              </p>
              <AcademyAccessButtons className="mt-5" primaryLabel="Login & Start Learning" compact />
              <p className="mt-3 text-xs text-slate-500">
                New applicant? Complete the form above, then use{' '}
                <Link to={SITE.partnerLoginUrl} className="font-semibold text-brand-700 hover:underline">
                  Partner Login
                </Link>{' '}
                once approved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
