import { useParams, Navigate } from 'react-router-dom'
import { SeoHead } from '@/components/SeoHead'
import { LoanProductView } from '@/components/loan/LoanProductView'
import { LOANS } from '@/data/loans'
import { getDefaultLoanType, loanTypeFromProduct } from '@/data/forms'

export function LoanPage() {
  const { slug } = useParams<{ slug: string }>()
  const loan = slug ? LOANS[slug] : undefined

  if (!loan) return <Navigate to="/" replace />

  const defaultLoanType = getDefaultLoanType(slug) || loanTypeFromProduct(loan)

  return (
    <>
      <SeoHead title={loan.metaTitle} description={loan.metaDescription} path={`/loans/${loan.slug}`} />
      <LoanProductView loan={loan} defaultLoanType={defaultLoanType} />
    </>
  )
}
