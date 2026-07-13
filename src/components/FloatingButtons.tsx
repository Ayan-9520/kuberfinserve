import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Phone } from 'lucide-react'
import { WHATSAPP_PARTNER_MESSAGE } from '@/data/partners'
import { SITE } from '@/data/site'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden focusable="false">
      <path
        fill="currentColor"
        d="M19.11 17.36c-.27-.14-1.6-.79-1.85-.88-.25-.09-.44-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.37-.81-.72-1.36-1.6-1.52-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.06-.22-.53-.45-.46-.62-.46l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.27s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.58.66.21 1.27.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.62.23-1.16.16-1.28-.07-.12-.25-.2-.52-.34Zm-3.03 10.04h-.01a12.2 12.2 0 0 1-6.21-1.7l-.45-.27-4.62 1.21 1.23-4.5-.29-.47a12.17 12.17 0 0 1-1.88-6.47C3.86 8.55 9.4 3 16.21 3c3.3 0 6.4 1.28 8.73 3.62A12.2 12.2 0 0 1 28.55 15.4c0 6.82-5.55 12.37-12.47 12.0ZM26.05 5.5A13.88 13.88 0 0 0 16.21 1.5C8.3 1.5 1.86 7.95 1.86 15.86c0 2.52.66 4.98 1.91 7.15L1.5 30.5l7.67-2.01a14.62 14.62 0 0 0 7.04 1.79h.01c7.91 0 14.35-6.44 14.35-14.35 0-3.83-1.5-7.44-4.52-10.43Z"
      />
    </svg>
  )
}

export function FloatingButtons() {
  const location = useLocation()
  const [showTop, setShowTop] = useState(false)
  const isPartnersPage =
    location.pathname === '/partners' ||
    location.pathname === '/become-partner' ||
    location.pathname === '/partner-login'
  const whatsappHref = isPartnersPage
    ? `https://wa.me/${SITE.whatsapp}?text=${WHATSAPP_PARTNER_MESSAGE}`
    : `https://wa.me/${SITE.whatsapp}`

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6 md:bottom-6">
      <motion.a
        href={`tel:${SITE.phone.replace(/\s/g, '')}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-900/30"
        aria-label="Call us"
      >
        <Phone className="h-5 w-5" />
      </motion.a>
      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.05 }}
        whileHover={{ scale: 1.08 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-500/30"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </motion.a>
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-900 text-white shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
