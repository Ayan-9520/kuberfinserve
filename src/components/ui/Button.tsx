import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface ButtonProps {
  children: React.ReactNode
  to?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  variant?: Variant
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-brand-700 to-brand-600 text-white shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 hover:scale-[1.02]',
  secondary:
    'bg-brand-900 text-white hover:bg-brand-800 shadow-md',
  outline:
    'border-2 border-brand-600 text-brand-700 hover:bg-brand-50',
  ghost: 'text-brand-900 hover:bg-brand-50',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm font-semibold',
  lg: 'px-8 py-3.5 text-base font-semibold',
}

export function Button({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  size = 'md',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300',
    variants[variant],
    sizes[size],
    className,
  )

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
