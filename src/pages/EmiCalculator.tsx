import { SeoHead } from '@/components/SeoHead'
import { EmiCalculatorTool } from '@/components/emi/EmiCalculatorTool'

export function EmiCalculatorPage() {
  return (
    <>
      <SeoHead
        title="EMI Calculator | Home, Personal & Business Loan | KuberFinserve"
        description="Free EMI calculator with sliders, payment split and instant results for home, personal, business and loan against property."
        path="/emi-calculator"
      />

      <section className="bg-silver-50 py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
              Calculator
            </p>
            <h1 className="mt-2 font-heading text-2xl font-bold text-navy-900 md:text-3xl">
              Home · Personal · Business · Loan Against Property
            </h1>
            <p className="mt-3 text-sm text-gray-600 md:text-base">
              Adjust loan amount, rate &amp; tenure — see EMI, interest &amp; year-by-year repayment.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <EmiCalculatorTool showSchedule={false} />
          </div>
        </div>
      </section>
    </>
  )
}
