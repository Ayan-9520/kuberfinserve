import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SUCCESS_STORIES } from '@/data/homePremium'

export function SuccessStories() {
  return (
    <section id="success-stories" className="scroll-mt-28 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Success Stories</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-navy-900 md:text-4xl">
            Real Customers, Real Approvals
          </h2>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {SUCCESS_STORIES.map((story, i) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_40px_rgb(15_23_42/0.08)]"
            >
              <div className="bg-gradient-to-br from-brand-50 via-white to-emerald-50 p-6">
                <p className="font-heading text-3xl font-bold text-brand-700">{story.amount}</p>
                <p className="mt-1 font-semibold text-navy-900">{story.product}</p>
                <p className="mt-3 flex items-center gap-2 text-sm text-brand-700">
                  <Clock className="h-4 w-4" />
                  {story.timeline}
                </p>
              </div>
              <div className="flex items-center gap-4 p-5">
                <img
                  src={story.image}
                  alt={story.name}
                  className="h-14 w-14 rounded-full border-2 border-brand-200 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="font-heading font-bold text-navy-900">{story.name}</p>
                  <p className="text-sm text-gray-500">{story.city}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/success-stories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            View all success stories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
