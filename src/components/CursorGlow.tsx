import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.body.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.body.removeEventListener('mouseleave', leave)
    }
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-[90] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/15 blur-3xl lg:block"
      animate={{ left: pos.x, top: pos.y }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
    />
  )
}
