import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

type AnnouncementModalProps = {
  storageKey?: string
  sessionKey?: string
  imageSrc: string
  imageAlt: string
  className?: string
}

function readShouldOpen(storageKey: string, sessionKey: string, canUseStorage: boolean): boolean {
  if (typeof window === 'undefined') return false
  const dismissed = canUseStorage ? window.localStorage.getItem(storageKey) === '1' : false
  let shownThisSession = false
  try {
    shownThisSession = window.sessionStorage.getItem(sessionKey) === '1'
  } catch {
    // sessionStorage unavailable
  }
  if (!dismissed && !shownThisSession) {
    try {
      window.sessionStorage.setItem(sessionKey, '1')
    } catch {
      // ignore session storage failures
    }
    return true
  }
  return false
}

export function AnnouncementModal({
  storageKey = 'kfs_announcement_newlook_v1_dismissed',
  sessionKey = 'kfs_announcement_newlook_v1_shown',
  imageSrc,
  imageAlt,
  className,
}: AnnouncementModalProps) {
  const canUseStorage = useMemo(() => {
    try {
      return typeof window !== 'undefined' && !!window.localStorage
    } catch {
      return false
    }
  }, [])

  const [open, setOpen] = useState(() => readShouldOpen(storageKey, sessionKey, canUseStorage))

  const close = useCallback(() => {
    try {
      if (canUseStorage) window.localStorage.setItem(storageKey, '1')
    } catch {
      // ignore storage failures
    }
    setOpen(false)
  }, [canUseStorage, storageKey])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-navy-900/75 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') close()
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Announcement"
        >
          <motion.div
            className={cn(
              'relative w-[min(640px,92vw)] overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-2xl shadow-navy-900/45 ring-1 ring-white/15',
              className,
            )}
            initial={{ y: 18, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.98, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 260 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-navy-900 shadow-md ring-1 ring-black/5 transition hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-b from-white via-white to-silver-50">
              <div className="max-h-[72vh] overflow-auto">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="block h-auto w-full"
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-white px-4 py-3">
              <button
                type="button"
                onClick={close}
                className="rounded-xl bg-gradient-to-r from-navy-900 to-navy-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-navy-800 hover:to-navy-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
