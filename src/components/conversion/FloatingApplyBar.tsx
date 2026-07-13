import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/data/site'

export function FloatingApplyBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-600/30 bg-navy-900/95 px-4 py-3 backdrop-blur-lg md:hidden"
    >
      <Link
        to={SITE.applyLoanUrl}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3.5 text-sm font-bold text-navy-900"
      >
        Apply for Loan
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  )
}
