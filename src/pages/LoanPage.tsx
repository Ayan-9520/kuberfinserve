import { useParams, Navigate } from 'react-router-dom'
import { SeoHead } from '@/components/SeoHead'
import { JsonLd } from '@/components/JsonLd'
import { LoanProductView } from '@/components/loan/LoanProductView'
import { LOANS } from '@/data/loans'
import { getDefaultLoanType, loanTypeFromProduct } from '@/data/forms'
import { PRODUCT_FAQS } from '@/data/productFaqs'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildLoanProductSchema,
} from '@/data/jsonLdSchemas'

export function LoanPage() {
  const { slug } = useParams<{ slug: string }>()
  const loan = slug ? LOANS[slug] : undefined

  if (!loan) return <Navigate to="/" replace />

  const defaultLoanType = getDefaultLoanType(slug) || loanTypeFromProduct(loan)
  const path = `/loans/${loan.slug}`
  const faqs = PRODUCT_FAQS[loan.slug] ?? []

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Loans', path: '/#loans' },
    { name: loan.shortTitle, path },
  ])

  const productSchema = buildLoanProductSchema({
    name: loan.title,
    description: loan.metaDescription,
    path,
    rateFrom: loan.rateFrom,
    image: loan.heroImage,
  })

  return (
    <>
      <SeoHead
        title={loan.metaTitle}
        description={loan.metaDescription}
        path={path}
        keywords={loan.keywords}
        image={loan.heroImage?.startsWith('http') ? loan.heroImage : undefined}
      />
      <JsonLd data={breadcrumb} id={`breadcrumb-${loan.slug}`} />
      <JsonLd data={productSchema} id={`product-${loan.slug}`} />
      {faqs.length > 0 && <JsonLd data={buildFaqSchema(faqs)} id={`faq-${loan.slug}`} />}
      <LoanProductView loan={loan} defaultLoanType={defaultLoanType} />
    </>
  )
}
