import { useMemo, useState } from 'react'
import { Download, QrCode } from 'lucide-react'
import { AcademyShell } from '@/components/academy/AcademyShell'
import { CERTIFICATE_TIERS, DEMO_PROFILE } from '@/data/academy'
import { SITE } from '@/data/site'

export function AcademyCertificationsPage() {
  const [selected, setSelected] = useState(CERTIFICATE_TIERS[0].tier)
  const verifyCode = useMemo(
    () => `KFS-CERT-${selected.slice(0, 2).toUpperCase()}-${DEMO_PROFILE.partnerCode}`,
    [selected],
  )

  return (
    <AcademyShell
      title="Certifications"
      subtitle="Bronze to Diamond certificates with QR verification for clients and partners."
      actions={
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white print:hidden"
        >
          <Download className="h-4 w-4" />
          Download / Print PDF
        </button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 print:hidden">
        {CERTIFICATE_TIERS.map((t) => (
          <button
            key={t.tier}
            type="button"
            onClick={() => setSelected(t.tier)}
            className={`rounded-2xl border p-4 text-left shadow-sm ${
              selected === t.tier ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white'
            }`}
          >
            <p className="font-heading text-lg font-bold" style={{ color: t.color }}>
              {t.tier}
            </p>
            <p className="mt-1 text-xs text-slate-600">{t.requirement}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border-2 border-brand-700/30 bg-gradient-to-br from-white via-brand-50/40 to-white p-8 shadow-lg print:border-0 print:shadow-none">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-700">
            {SITE.name} Partner Academy
          </p>
          <h2 className="font-heading mt-3 text-2xl font-extrabold text-navy-900 md:text-3xl">
            Certificate of Achievement
          </h2>
          <p className="mt-6 text-sm text-slate-600">This certifies that</p>
          <p className="font-heading mt-1 text-2xl font-bold text-brand-800 md:text-3xl">
            {DEMO_PROFILE.name}
          </p>
          <p className="mt-4 max-w-lg text-sm text-slate-600">
            has successfully completed the requirements for the{' '}
            <strong className="text-navy-900">{selected} Partner</strong> credential and demonstrated
            professional standards in financial partner practice.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-xs text-slate-500">Partner code</p>
              <p className="font-semibold text-navy-900">{DEMO_PROFILE.partnerCode}</p>
            </div>
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl border border-dashed border-brand-400 bg-white">
              <QrCode className="h-10 w-10 text-brand-700" />
              <p className="mt-1 text-[9px] font-semibold text-slate-500">QR verify</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500">Verification ID</p>
              <p className="max-w-[10rem] break-all font-mono text-xs font-semibold text-navy-900">
                {CERTIFICATE_TIERS.find((t) => t.tier === selected)?.verifyId ?? verifyCode}
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-slate-500">
            Verify at kuberfinserve.com/partner-academy · Issued by KuberFinserve Academy
          </p>
        </div>
      </div>
    </AcademyShell>
  )
}
