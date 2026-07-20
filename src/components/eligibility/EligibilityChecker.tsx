import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Calculator,
  ArrowRight,
  RefreshCw,
  Phone,
} from 'lucide-react'
import {
  checkEligibility,
  ELIGIBILITY_PRODUCTS,
  EMPLOYMENT_OPTIONS,
  type EligibilityProduct,
  type EmploymentCategory,
  type EligibilityResult,
  formatINR,
} from '@/utils/eligibility'
import { EMI_DEFAULTS } from '@/utils/emi'
import { CityInput } from '@/components/ui/CityInput'
import { SITE } from '@/data/site'
import { submitContact } from '@/utils/leads'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/utils/cn'

const VERDICT_STYLES: Record<
  EligibilityResult['verdict'],
  { bg: string; ring: string; icon: typeof CheckCircle2 }
> = {
  strong: { bg: 'from-emerald-600 to-brand-700', ring: 'ring-emerald-400/40', icon: CheckCircle2 },
  moderate: { bg: 'from-brand-600 to-brand-800', ring: 'ring-brand-400/40', icon: CheckCircle2 },
  limited: { bg: 'from-amber-600 to-orange-700', ring: 'ring-amber-400/40', icon: AlertTriangle },
  'not-eligible': { bg: 'from-slate-600 to-navy-800', ring: 'ring-slate-400/30', icon: XCircle },
}

export function EligibilityChecker() {
  const { showSuccess, showError } = useToast()
  const [product, setProduct] = useState<EligibilityProduct>('home')
  const [employment, setEmployment] = useState<EmploymentCategory>('salaried')
  const [age, setAge] = useState(32)
  const [monthlyIncome, setMonthlyIncome] = useState(75_000)
  const [existingEmi, setExistingEmi] = useState(0)
  const [cibilScore, setCibilScore] = useState(720)
  const [requestedAmount, setRequestedAmount] = useState(EMI_DEFAULTS.home.amount)
  const [tenureYears, setTenureYears] = useState(EMI_DEFAULTS.home.tenure)
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [showLead, setShowLead] = useState(false)
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadCity, setLeadCity] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const defaults = EMI_DEFAULTS[product]

  const switchProduct = (id: EligibilityProduct) => {
    setProduct(id)
    const d = EMI_DEFAULTS[id]
    setRequestedAmount(d.amount)
    setTenureYears(d.tenure)
    setResult(null)
  }

  const runCheck = () => {
    const res = checkEligibility({
      product,
      age,
      employment,
      monthlyIncome,
      existingEmi,
      cibilScore,
      requestedAmount,
      tenureYears,
    })
    setResult(res)
    setShowLead(true)
  }

  const reset = () => {
    setResult(null)
    setShowLead(false)
  }

  const canSubmit = useMemo(
    () =>
      age >= 18 &&
      monthlyIncome > 0 &&
      cibilScore >= 300 &&
      cibilScore <= 900 &&
      requestedAmount > 0 &&
      tenureYears >= 1,
    [age, monthlyIncome, cibilScore, requestedAmount, tenureYears],
  )

  const submitLead = async () => {
    if (!leadName.trim() || !/^[6-9]\d{9}$/.test(leadPhone.replace(/\D/g, '').slice(-10))) {
      showError('Enter a valid name and 10-digit mobile number')
      return
    }
    setSubmitting(true)
    try {
      const phone = leadPhone.replace(/\D/g, '').slice(-10)
      const summary = result
        ? `${result.productLabel}: ${result.verdictLabel}, max ${formatINR(result.maxEligibleAmount)}, score ${result.score}/100, req ${formatINR(requestedAmount)}, income ${formatINR(monthlyIncome)}, CIBIL ${cibilScore}`
        : 'Eligibility check lead'
      const res = await submitContact(
        {
          name: leadName.trim(),
          phone,
          email: leadEmail.trim() || `${phone}@noreply.kuberfinserve.com`,
          city: leadCity,
          loanType: result?.productLabel ?? 'Home Loan',
          message: summary,
        },
        'eligibility-check',
      )
      if (res.ok) {
        showSuccess('Thank you! Our advisor will contact you shortly.')
        setShowLead(false)
      } else {
        showError(res.error || 'Could not submit. Please try again or call us.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgb(15_23_42/0.08)]">
      {/* Product tabs — compact chips */}
      <div className="border-b border-slate-100 bg-gradient-to-r from-silver-50 to-white px-3 py-2.5 md:px-4">
        <div className="flex flex-wrap gap-1.5">
          {ELIGIBILITY_PRODUCTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => switchProduct(p.id)}
              className={cn(
                'rounded-lg px-2 py-1 text-[10px] font-semibold leading-tight transition-all sm:px-2.5 sm:py-1.5 sm:text-[11px]',
                product === p.id
                  ? 'bg-brand-900 text-white shadow-sm shadow-brand-900/20'
                  : 'bg-white text-gray-500 ring-1 ring-slate-200/80 hover:bg-brand-50 hover:text-brand-800 hover:ring-brand-200',
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {/* Form */}
        <div className="space-y-5 border-b border-slate-100 p-5 md:p-8 lg:border-b-0 lg:border-r">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Employment Type
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {EMPLOYMENT_OPTIONS.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => setEmployment(e.id)}
                  className={cn(
                    'rounded-xl border px-2 py-2.5 text-xs font-semibold transition-all',
                    employment === e.id
                      ? 'border-brand-600 bg-brand-50 text-brand-800'
                      : 'border-slate-200 text-gray-600 hover:border-brand-200',
                  )}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>

          <NumberField
            label="Age (Years)"
            value={age}
            min={18}
            max={75}
            step={1}
            onChange={setAge}
            display={`${age} yrs`}
          />
          <NumberField
            label="Monthly Income"
            value={monthlyIncome}
            min={10_000}
            max={50_00_000}
            step={5_000}
            onChange={setMonthlyIncome}
            display={formatINR(monthlyIncome)}
          />
          <NumberField
            label="Existing Monthly EMIs"
            value={existingEmi}
            min={0}
            max={20_00_000}
            step={1_000}
            onChange={setExistingEmi}
            display={formatINR(existingEmi)}
          />
          <NumberField
            label="CIBIL / Credit Score"
            value={cibilScore}
            min={300}
            max={900}
            step={5}
            onChange={setCibilScore}
            display={`${cibilScore}`}
            hint="300–900 · Soft estimate only"
          />
          <NumberField
            label="Requested Loan Amount"
            value={requestedAmount}
            min={defaults.min}
            max={defaults.max}
            step={defaults.step}
            onChange={setRequestedAmount}
            display={formatINR(requestedAmount)}
            hint={`Up to ${formatINR(defaults.max)}*`}
          />
          <NumberField
            label="Preferred Tenure"
            value={tenureYears}
            min={defaults.tenureMin}
            max={defaults.tenureMax}
            step={1}
            onChange={setTenureYears}
            display={`${tenureYears} ${tenureYears === 1 ? 'year' : 'years'}`}
            hint={defaults.rateLabel}
          />

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              disabled={!canSubmit}
              onClick={runCheck}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-600/25 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Calculator className="h-4 w-4" />
              Check Eligibility
            </button>
            {result && (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            )}
          </div>
          <p className="text-[11px] leading-relaxed text-gray-400">
            *Indicative only. Does not trigger a credit bureau enquiry. Subject to eligibility & lender
            policy. No approval guarantee.
          </p>
        </div>

        {/* Results */}
        <div className="relative min-h-[320px] bg-gradient-to-br from-brand-900 via-brand-900 to-navy-900 p-5 text-white md:p-8">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-full flex-col items-center justify-center py-12 text-center"
              >
                <Calculator className="mb-4 h-12 w-12 text-brand-400/60" />
                <p className="font-heading text-xl font-bold text-brand-100">Your estimate appears here</p>
                <p className="mt-2 max-w-xs text-sm text-slate-400">
                  Select a product, enter your profile details and tap Check Eligibility for an
                  indicative result.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {(() => {
                  const style = VERDICT_STYLES[result.verdict]
                  const Icon = style.icon
                  return (
                    <div
                      className={cn(
                        'rounded-2xl bg-gradient-to-r p-4 ring-1',
                        style.bg,
                        style.ring,
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                            {result.productLabel}
                          </p>
                          <p className="mt-1 flex items-center gap-2 font-heading text-xl font-bold md:text-2xl">
                            <Icon className="h-6 w-6 shrink-0" />
                            {result.verdictLabel}
                          </p>
                        </div>
                        <div className="rounded-xl bg-white/15 px-3 py-2 text-center">
                          <p className="text-[10px] uppercase text-white/70">Score</p>
                          <p className="font-heading text-2xl font-bold">{result.score}</p>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                <div className="grid grid-cols-2 gap-3">
                  <Stat label="Max Eligible*" value={formatINR(result.maxEligibleAmount)} highlight />
                  <Stat label="Est. Rate" value={`${result.estimatedRate}% p.a.*`} />
                  <Stat label="Est. EMI*" value={formatINR(result.estimatedEmi)} />
                  <Stat label="EMI Headroom" value={formatINR(result.surplusEmiCapacity)} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-200">
                    Assessment Factors
                  </p>
                  <ul className="space-y-2">
                    {result.factors.map((f) => (
                      <li
                        key={f.label}
                        className="flex gap-2 rounded-lg bg-white/8 px-3 py-2 text-xs md:text-sm"
                      >
                        {f.status === 'pass' && (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        )}
                        {f.status === 'warn' && (
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                        )}
                        {f.status === 'fail' && (
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                        )}
                        <span>
                          <span className="font-semibold text-white">{f.label}: </span>
                          <span className="text-slate-300">{f.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {result.tips.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs font-semibold text-brand-200">Next Steps</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                      {result.tips.map((t) => (
                        <li key={t} className="flex gap-2">
                          <span className="text-brand-400">•</span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`/loans/${productToSlug(product)}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-navy-900 transition hover:scale-[1.02] sm:flex-none"
                  >
                    View Product
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/apply-loan"
                    className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20 sm:flex-none"
                  >
                    Apply Now
                  </Link>
                  <a
                    href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20"
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </a>
                </div>

                <p className="text-[10px] leading-relaxed text-slate-500">{result.disclaimer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Lead capture */}
      <AnimatePresence>
        {result && showLead && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-100 bg-brand-50/60"
          >
            <div className="p-5 md:p-6">
              <h3 className="font-heading text-base font-bold text-brand-900 md:text-lg">
                Get a personalised lender match
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Share your details — our advisors will compare offers from multiple banks & NBFCs.
                No approval guarantee.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <input
                  type="text"
                  placeholder="Full name *"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <input
                  type="tel"
                  placeholder="Mobile *"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                <CityInput
                  value={leadCity}
                  onChange={(e) => setLeadCity(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={submitLead}
                  className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
                >
                  {submitting ? 'Submitting…' : 'Talk to Expert'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLead(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Skip for now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function productToSlug(product: EligibilityProduct): string {
  const map: Record<EligibilityProduct, string> = {
    home: 'home-loan',
    lap: 'loan-against-property',
    personal: 'personal-loan',
    business: 'business-loan',
    'working-capital': 'working-capital',
    'new-car': 'new-car-loan',
    'used-car': 'used-car-loan',
    education: 'education-loan',
    machinery: 'machinery-loan',
  }
  return map[product]
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  hint,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  display: string
  hint?: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-navy-900">{label}</label>
        <span className="text-sm font-semibold text-brand-700">{display}</span>
      </div>
      {hint && <p className="mb-1.5 text-[11px] font-medium text-brand-600/80">{hint}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand-600"
      />
    </div>
  )
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className={cn('rounded-xl px-3 py-2.5', highlight ? 'bg-white/15' : 'bg-white/8')}>
      <p className="text-[10px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className={cn('font-semibold', highlight ? 'text-brand-300' : 'text-white')}>{value}</p>
    </div>
  )
}
