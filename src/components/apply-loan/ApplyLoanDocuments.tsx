import { FileText, CreditCard, Landmark, FileSpreadsheet, FileCheck2 } from 'lucide-react'
import { APPLY_DOCUMENTS } from '@/data/applyLoanPage'

const DOC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  id: CreditCard,
  bank: Landmark,
  doc: FileText,
}

export function ApplyLoanDocuments() {
  return (
    <aside className="flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgb(15_23_42/0.08)]">
      <div className="shrink-0 overflow-hidden bg-gradient-to-br from-brand-50 to-silver-100">
        <img
          src="/images/apply-loan-documents.svg"
          alt="Loan documents — PAN, Aadhaar, bank statement and application forms"
          className="h-36 w-full object-cover object-center md:h-40"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="flex flex-col p-4 md:p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
            <FileCheck2 className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-heading text-lg font-bold text-navy-900">Documents You May Need</h2>
            <p className="text-xs text-gray-500">Clear scan or PDF for each item</p>
          </div>
        </div>

        <ul className="mt-3 flex flex-col gap-1.5">
          {APPLY_DOCUMENTS.map((doc) => {
            const Icon = DOC_ICONS[doc.icon] ?? FileSpreadsheet
            return (
              <li
                key={doc.id}
                className="flex items-center gap-2.5 rounded-lg border border-slate-100 bg-silver-50 px-2.5 py-2 transition hover:border-brand-200 hover:bg-brand-50/50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-brand-700 shadow-sm">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-navy-900">{doc.label}</p>
                  <p className="text-[11px] text-gray-500">Scan or PDF</p>
                </div>
              </li>
            )
          })}
        </ul>

        <p className="mt-3 border-t border-slate-100 pt-3 text-[11px] leading-relaxed text-gray-500">
          Exact checklist depends on loan type. Our team will guide you after you submit the
          application.
        </p>
      </div>
    </aside>
  )
}
