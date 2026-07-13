import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, MessageCircle, Printer, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  calculateEmi,
  EMI_DEFAULTS,
  formatINR,
  LOAN_TAB_LABELS,
  type LoanCalculatorType,
} from '@/utils/emi'
import { EmiPieChart } from '@/components/emi/EmiPieChart'
import { SITE } from '@/data/site'

const TABS: LoanCalculatorType[] = ['home', 'personal', 'business', 'lap']

export function EmiCalculatorTool({
  showApplyCta = true,
  simple = false,
  showSchedule = true,
}: {
  showApplyCta?: boolean
  /** Minimal sliders + EMI only */
  simple?: boolean
  /** Year-by-year / month table below calculator */
  showSchedule?: boolean
}) {
  const [tab, setTab] = useState<LoanCalculatorType>('home')
  const defaults = EMI_DEFAULTS[tab]
  const [amount, setAmount] = useState(defaults.amount)
  const [rate, setRate] = useState(defaults.rate)
  const [tenure, setTenure] = useState(defaults.tenure)
  const [showAllRows, setShowAllRows] = useState(false)

  const switchTab = (id: LoanCalculatorType) => {
    setTab(id)
    const d = EMI_DEFAULTS[id]
    setAmount(d.amount)
    setRate(d.rate)
    setTenure(d.tenure)
    setShowAllRows(false)
  }

  const { emi, total, interest, schedule } = useMemo(
    () => calculateEmi(amount, rate, tenure),
    [amount, rate, tenure],
  )

  const summaryText = `${LOAN_TAB_LABELS[tab]} EMI — ${SITE.name}
Loan Amount: ${formatINR(amount)}
Interest Rate: ${rate}% p.a.
Tenure: ${tenure} years
Monthly EMI: ${formatINR(emi)}
Total Interest: ${formatINR(interest)}
Total Payable: ${formatINR(total)}`

  const shareWhatsApp = () => {
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(summaryText)}`, '_blank')
  }

  const emailResult = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent('EMI Calculation - KuberFinserve')}&body=${encodeURIComponent(summaryText)}`
  }

  const downloadResult = () => {
    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `emi-${tab}-kuberfinserve.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const printPdf = () => {
    const w = window.open('', '_blank')
    if (!w) return
    const rows = schedule
      .slice(0, 24)
      .map(
        (r) =>
          `<tr><td>${r.month}</td><td>${formatINR(r.emi)}</td><td>${formatINR(r.principal)}</td><td>${formatINR(r.interest)}</td><td>${formatINR(r.balance)}</td></tr>`,
      )
      .join('')
    w.document.write(`<!DOCTYPE html><html><head><title>EMI Summary</title>
      <style>body{font-family:system-ui;padding:24px}h1{color:#0b5d4b}table{width:100%;border-collapse:collapse;margin-top:16px}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f1f5f9}</style></head>
      <body><h1>${SITE.name} — EMI Summary</h1>
      <p><strong>${LOAN_TAB_LABELS[tab]}</strong></p>
      <p>Loan: ${formatINR(amount)} | Rate: ${rate}% | Tenure: ${tenure} yrs</p>
      <p><strong>Monthly EMI:</strong> ${formatINR(emi)}</p>
      <p>Total Interest: ${formatINR(interest)} | Total Payable: ${formatINR(total)}</p>
      <h2>Amortization (first 24 months)</h2>
      <table><thead><tr><th>Month</th><th>EMI</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody>${rows}</tbody></table>
      </body></html>`)
    w.document.close()
    w.print()
  }

  const visibleSchedule = showAllRows ? schedule : schedule.slice(0, 12)
  const d = EMI_DEFAULTS[tab]

  if (simple) {
    return (
      <div
        id="emi-tool"
        className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {TABS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => switchTab(id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                tab === id
                  ? 'bg-brand-800 text-white'
                  : 'bg-silver-100 text-gray-600 hover:bg-brand-50'
              }`}
            >
              {LOAN_TAB_LABELS[id]}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          <EmiSlider
            label="Loan Amount"
            value={amount}
            min={d.min}
            max={d.max}
            step={d.step}
            display={formatINR(amount)}
            onChange={setAmount}
          />
          <EmiSlider
            label="Interest Rate (% p.a.)"
            value={rate}
            min={6}
            max={20}
            step={0.1}
            display={`${rate}%`}
            onChange={setRate}
          />
          <EmiSlider
            label="Tenure (Years)"
            value={tenure}
            min={1}
            max={30}
            step={1}
            display={`${tenure} years`}
            onChange={setTenure}
          />
        </div>

        <div className="mt-6 rounded-xl bg-brand-50 px-4 py-5 text-center">
          <p className="text-xs font-medium text-gray-600">Monthly EMI</p>
          <p className="font-heading text-3xl font-bold text-brand-800">{formatINR(emi)}</p>
          <p className="mt-2 text-xs text-gray-500">
            Total payable {formatINR(total)} · Interest {formatINR(interest)}
          </p>
        </div>

        {showApplyCta && (
          <Link
            to="/apply-loan"
            className="mt-5 flex w-full items-center justify-center rounded-lg bg-brand-800 py-3 text-sm font-semibold text-white hover:bg-brand-900"
          >
            Apply for Loan
          </Link>
        )}
      </div>
    )
  }

  return (
    <div id="emi-tool" className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgb(15_23_42/0.08)]">
      <div className="flex flex-wrap gap-2 border-b border-slate-100 bg-silver-50 p-4">
        {TABS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => switchTab(id)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              tab === id
                ? 'bg-brand-900 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-brand-50 hover:text-brand-800'
            }`}
          >
            {LOAN_TAB_LABELS[id]}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="space-y-7 border-b border-slate-100 p-6 md:p-8 lg:border-b-0 lg:border-r">
          <EmiSlider
            label="Loan Amount"
            value={amount}
            min={d.min}
            max={d.max}
            step={d.step}
            display={formatINR(amount)}
            onChange={setAmount}
          />
          <EmiSlider
            label="Interest Rate (% p.a.)"
            value={rate}
            min={6}
            max={20}
            step={0.1}
            display={`${rate}%`}
            onChange={setRate}
          />
          <EmiSlider
            label="Tenure (Years)"
            value={tenure}
            min={1}
            max={30}
            step={1}
            display={`${tenure} years`}
            onChange={setTenure}
          />
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          className="flex flex-col bg-gradient-to-br from-brand-900 via-brand-900 to-navy-900 p-6 text-white md:p-8"
        >
          <p className="text-sm font-medium text-brand-200">Monthly EMI</p>
          <p className="font-heading text-4xl font-bold text-brand-400 md:text-5xl">{formatINR(emi)}</p>
          <p className="text-xs text-slate-400">per month · {LOAN_TAB_LABELS[tab]}</p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <EmiPieChart principal={amount} interest={interest} />
            <div className="flex-1 space-y-3 text-sm min-w-[140px]">
              <ResultRow label="Principal" value={formatINR(amount)} />
              <ResultRow label="Total Interest" value={formatINR(interest)} />
              <ResultRow label="Total Payable" value={formatINR(total)} highlight />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <ShareBtn icon={Download} label="Download" onClick={downloadResult} />
            <ShareBtn icon={Mail} label="Email" onClick={emailResult} />
            <ShareBtn icon={MessageCircle} label="WhatsApp" onClick={shareWhatsApp} />
            <ShareBtn icon={Printer} label="PDF / Print" onClick={printPdf} />
          </div>

          {showApplyCta && (
            <Link
              to="/apply-loan"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-500 px-6 py-3 text-sm font-bold text-navy-900 transition-transform hover:scale-[1.02]"
            >
              Apply With This Plan
            </Link>
          )}
        </motion.div>
      </div>

      {showSchedule && (
      <div className="border-t border-slate-100 p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-heading text-lg font-bold text-navy-900">Amortization Schedule</h3>
          {schedule.length > 12 && (
            <button
              type="button"
              onClick={() => setShowAllRows((v) => !v)}
              className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
            >
              {showAllRows ? (
                <>
                  Show less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show all {schedule.length} months <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
        <div className="max-h-[420px] overflow-auto rounded-xl border border-slate-100">
          <table className="w-full min-w-[520px] text-left text-xs md:text-sm">
            <thead className="sticky top-0 bg-silver-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Month</th>
                <th className="px-4 py-3 font-semibold">EMI</th>
                <th className="px-4 py-3 font-semibold">Principal</th>
                <th className="px-4 py-3 font-semibold">Interest</th>
                <th className="px-4 py-3 font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {visibleSchedule.map((row) => (
                <tr key={row.month} className="border-t border-slate-50 hover:bg-brand-50/30">
                  <td className="px-4 py-2.5 font-medium text-navy-900">{row.month}</td>
                  <td className="px-4 py-2.5">{formatINR(row.emi)}</td>
                  <td className="px-4 py-2.5 text-brand-800">{formatINR(row.principal)}</td>
                  <td className="px-4 py-2.5 text-amber-700">{formatINR(row.interest)}</td>
                  <td className="px-4 py-2.5 text-gray-600">{formatINR(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </div>
  )
}

function EmiSlider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-medium text-navy-900">
        <span>{label}</span>
        <span className="font-semibold text-brand-700">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand-600"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  )
}

function ResultRow({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={`rounded-lg px-3 py-2 ${highlight ? 'bg-white/15' : 'bg-white/8'}`}>
      <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className={`font-semibold ${highlight ? 'text-brand-300' : 'text-white'}`}>{value}</p>
    </div>
  )
}

function ShareBtn({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Download
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-white/20"
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  )
}
