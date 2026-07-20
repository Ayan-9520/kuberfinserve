import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Car, Home, Briefcase, GraduationCap, Building2, Wallet, Landmark, Wrench, TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const iconMap: Record<string, LucideIcon> = {
  'new-car-loan': Car,
  'used-car-loan': Car,
  'home-loan': Home,
  'personal-loan': Wallet,
  'business-loan': Briefcase,
  'working-capital': TrendingUp,
  'loan-against-property': Building2,
  'education-loan': GraduationCap,
  'machinery-loan': Wrench,
}

interface LoanCardProps {
  slug: string
  title: string
  description: string
  rateFrom: string
  path: string
  features?: string[]
  className?: string
}

export function LoanCard({
  slug,
  title,
  description,
  rateFrom,
  path,
  features = [],
  className,
}: LoanCardProps) {
  const Icon = iconMap[slug] ?? Landmark

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_8px_30px_rgb(31_61_52/0.08)] transition-shadow hover:shadow-[0_16px_48px_rgb(46_204_113/0.2)]',
        className,
      )}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-brand-700/10 to-brand-400/10 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-900 to-brand-600 text-white shadow-lg">
          <Icon className="h-7 w-7" />
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-600">
          From {rateFrom}
        </span>
      </div>
      <h3 className="font-heading text-xl font-bold text-brand-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{description}</p>
      {features.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
              {f}
            </li>
          ))}
        </ul>
      )}
      <Link
        to={path}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-brand-700 to-brand-600 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-brand-600/30"
      >
        Apply Now
      </Link>
    </motion.article>
  )
}
