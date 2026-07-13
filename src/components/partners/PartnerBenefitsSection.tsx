import { motion } from 'framer-motion'
import {
  Sparkles,
  Layers,
  Globe,
  FileText,
  GraduationCap,
  Headphones,
  Wallet,
  Megaphone,
  BarChart3,
  Smartphone,
  MessageCircle,
  TrendingUp,
} from 'lucide-react'
import { PARTNER_BENEFITS } from '@/data/partnerHierarchy'
import { PartnersSectionHeading } from './PartnersSectionHeading'

const icons = {
  sparkles: Sparkles,
  layers: Layers,
  globe: Globe,
  file: FileText,
  graduation: GraduationCap,
  headphones: Headphones,
  wallet: Wallet,
  megaphone: Megaphone,
  chart: BarChart3,
  smartphone: Smartphone,
  message: MessageCircle,
  trending: TrendingUp,
} as const

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

export function PartnerBenefitsSection() {
  return (
    <section id="benefits" className="pf-section pf-section-white">
      <div className="container mx-auto px-4">
        <PartnersSectionHeading
          variant="light"
          eyebrow="Partner Benefits"
          title="Everything You Need to Build Your Business"
          subtitle="Technology, products, training & operations — all powered by KuberOne."
        />
        <div className="mx-auto mt-7 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PARTNER_BENEFITS.map((benefit, i) => {
            const Icon = icons[benefit.icon]
            return (
              <motion.div
                key={benefit.title}
                {...fadeUp}
                transition={{ delay: i * 0.03 }}
                className="pf-white-card rounded-xl p-4 transition-shadow hover:shadow-md"
              >
                <div className="pf-icon-box-light flex h-9 w-9 items-center justify-center rounded-lg">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-3 font-heading text-sm font-bold text-[#0F172A]">{benefit.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#64748B]">{benefit.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
