import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface PageBannerProps {
  title: string
  subtitle?: string
  breadcrumb?: { label: string; path?: string }[]
}

export function PageBanner({ title, subtitle, breadcrumb = [] }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-brand-100 bg-gradient-to-b from-slate-50 via-white to-brand-50/40 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_10%,rgba(13,107,87,0.1),transparent_55%)]" />
      <div className="absolute -left-20 top-1/2 h-64 w-64 rounded-full bg-brand-400/10 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="container relative mx-auto px-4">
        {breadcrumb.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="flex items-center gap-1 hover:text-brand-700">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumb.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-slate-300" />
                {item.path ? (
                  <Link to={item.path} className="hover:text-brand-700">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-brand-700">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl font-bold text-navy-900 md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-slate-600"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
