import { motion } from 'framer-motion'
import { fadeUp } from '@/animations/variants'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={cn('mb-12 max-w-3xl', align === 'center' && 'mx-auto text-center')}
    >
      {eyebrow && (
        <span
          className={cn(
            'mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider',
            light ? 'bg-white/10 text-brand-400' : 'bg-brand-600/10 text-brand-600',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.5rem]',
          light ? 'text-white' : 'text-brand-700',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed md:text-lg',
            light ? 'text-gray-300' : 'text-gray-600',
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
