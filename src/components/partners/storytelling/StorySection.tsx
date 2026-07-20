import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface StorySectionProps {
  eyebrow: string
  title: string
  subtitle: string
  caption: string
  variant: 'dark' | 'light'
  reverse?: boolean
  illustration: React.ReactNode
  id?: string
}

export function StorySection({
  eyebrow,
  title,
  subtitle,
  caption,
  variant,
  reverse = false,
  illustration,
  id,
}: StorySectionProps) {
  const isDark = variant === 'dark'

  return (
    <section
      id={id}
      className={cn('pf-section overflow-hidden', isDark ? 'pf-section-dark' : 'pf-section-white')}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'grid items-center gap-8 lg:grid-cols-2 lg:gap-12',
            reverse && 'lg:[&>*:first-child]:order-2',
          )}
        >
          <motion.div
            initial={{ opacity: 0, x: reverse ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p
              className={cn(
                'text-[10px] font-bold uppercase tracking-[0.2em]',
                isDark ? 'text-[var(--pf-primary)]' : 'text-[#0d9488]',
              )}
            >
              {eyebrow}
            </p>
            <h2
              className={cn(
                'mt-3 font-heading text-2xl font-extrabold leading-tight md:text-3xl lg:text-4xl',
                isDark ? 'text-[var(--pf-text)]' : 'text-navy-900',
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                'mt-4 text-sm leading-relaxed md:text-base',
                isDark ? 'text-[var(--pf-text-secondary)]' : 'text-[#64748b]',
              )}
            >
              {subtitle}
            </p>
            <blockquote
              className={cn(
                'mt-6 border-l-4 pl-4 font-heading text-lg font-bold italic md:text-xl',
                isDark ? 'border-[var(--pf-primary)] text-[var(--pf-primary)]' : 'border-[#0d9488] text-[#0d9488]',
              )}
            >
              {caption.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div
              className={cn(
                'overflow-hidden rounded-2xl border shadow-2xl',
                isDark
                  ? 'border-[var(--pf-border)] shadow-black/30'
                  : 'border-[#e2e8f0] shadow-[#0d9488]/10',
              )}
            >
              {illustration}
            </div>
            <div
              className={cn(
                'pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-40 blur-2xl',
                isDark ? 'bg-[var(--pf-primary)]/20' : 'bg-[#0d9488]/15',
              )}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
