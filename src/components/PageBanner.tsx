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
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-600 py-20 md:py-28">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      <div className="absolute -left-20 top-1/2 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-brand-600/30 blur-3xl" />
      <div className="container relative mx-auto px-4">
        {breadcrumb.length > 0 && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-300">
            <Link to="/" className="flex items-center gap-1 hover:text-white">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumb.map((item) => (
              <span key={item.label} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-gray-500" />
                {item.path ? (
                  <Link to={item.path} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-brand-400">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-gray-300"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
