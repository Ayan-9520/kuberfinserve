import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { SeoHead } from '@/components/SeoHead'
import { SITE } from '@/data/site'

export function NotFound() {
  return (
    <>
      <SeoHead
        title="Page Not Found | KuberFinserve"
        description="The page you are looking for could not be found."
        path="/404"
        noindex
      />
      <div className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <p className="font-heading text-6xl font-bold text-brand-600">404</p>
          <h1 className="mt-2 font-heading text-2xl font-bold text-navy-900">Page not found</h1>
          <p className="mt-2 text-sm text-slate-600">
            The page you requested doesn&apos;t exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-700 to-brand-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              to={SITE.applyLoanUrl}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-navy-900"
            >
              <Search className="h-4 w-4" />
              Apply for loan
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
