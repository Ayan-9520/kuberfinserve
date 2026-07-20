import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator } from 'lucide-react'
import { Link } from 'react-router-dom'
import { calculateEmi, formatINR } from '@/utils/emi'

export function EmiCalculator() {
  const [amount, setAmount] = useState(2500000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const { emi, total, interest } = useMemo(
    () => calculateEmi(amount, rate, tenure),
    [amount, rate, tenure],
  )

  return (
    <section id="emi-calculator" className="scroll-mt-28 bg-silver-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">EMI Calculator</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            Estimate Your EMI
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgb(15_23_42/0.08)]"
        >
          <div className="grid md:grid-cols-2">
            <div className="space-y-5 border-b border-slate-100 p-6 md:border-b-0 md:border-r md:p-7">
              <Slider
                label="Loan Amount"
                value={amount}
                min={100000}
                max={50000000}
                step={100000}
                display={formatINR(amount)}
                onChange={setAmount}
              />
              <Slider
                label="Interest Rate (% p.a.)"
                value={rate}
                min={6}
                max={18}
                step={0.1}
                display={`${rate}%`}
                onChange={setRate}
              />
              <Slider
                label="Tenure (Years)"
                value={tenure}
                min={1}
                max={30}
                step={1}
                display={`${tenure} yrs`}
                onChange={setTenure}
              />
            </div>

            <div className="flex flex-col justify-center border-t border-brand-100 bg-gradient-to-br from-brand-50 via-white to-emerald-50/80 p-6 md:border-t-0 md:border-l md:p-7">
              <div className="flex items-center gap-2 text-brand-700">
                <Calculator className="h-5 w-5 text-brand-600" />
                <span className="text-sm">Monthly EMI</span>
              </div>
              <p className="mt-2 font-heading text-3xl font-bold text-brand-700 md:text-4xl">
                {formatINR(emi)}
              </p>
              <div className="mt-4 space-y-1.5 text-sm">
                <p className="flex justify-between text-slate-600">
                  <span>Total payable</span>
                  <span className="font-medium text-navy-900">{formatINR(total)}</span>
                </p>
                <p className="flex justify-between text-slate-600">
                  <span>Total interest</span>
                  <span className="font-medium text-navy-900">{formatINR(interest)}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-center">
          <Link
            to="/emi-calculator"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-700 to-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-600/20 transition-colors hover:from-brand-800 hover:to-brand-600"
          >
            Full EMI Calculator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Slider({
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
      <div className="mb-1.5 flex justify-between text-sm font-medium text-navy-900">
        <span>{label}</span>
        <span className="text-brand-700">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand-600"
      />
    </div>
  )
}
