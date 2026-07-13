import { motion } from 'framer-motion'
import { PARTNERS, PARTNERS_DESCRIPTION } from '@/data/home'
import { PartnersHandshakeGraphic } from '@/components/PartnersHandshakeGraphic'

export function PartnerLogos() {
  return (
    <section className="bg-brand-50/40 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Left: title, text, logo grid */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-2xl font-bold text-brand-900 md:text-[1.75rem]"
            >
              Our Partners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 md:text-[15px]"
            >
              {PARTNERS_DESCRIPTION}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-5 sm:gap-5 md:mt-10"
            >
              {PARTNERS.map((partner, i) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="flex justify-center"
                >
                  <div className="flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border-[1.5px] border-brand-200 bg-white p-2.5 shadow-[0_4px_14px_rgba(36,94,78,0.12)] sm:h-[4.75rem] sm:w-[4.75rem] md:h-[5.25rem] md:w-[5.25rem] md:p-3">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-7 w-auto max-w-[85%] object-contain sm:h-8 md:h-9"
                      width={72}
                      height={36}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: brand handshake graphic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <PartnersHandshakeGraphic />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
