import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(() => sessionStorage.getItem('ayu_announcement_closed') !== '1')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!visible) return
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % siteConfig.announcements.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [visible])

  const close = () => {
    setVisible(false)
    sessionStorage.setItem('ayu_announcement_closed', '1')
  }

  if (!visible) return null

  return (
    <div className="relative z-50 h-10 bg-primary-500 text-white text-[13px] font-medium overflow-hidden">
      {/* Mobile: continuous marquee */}
      <div className="md:hidden h-full flex items-center overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...siteConfig.announcements, ...siteConfig.announcements].map((msg, i) => (
            <span key={i} className="mx-8">{msg}</span>
          ))}
        </div>
      </div>

      {/* Desktop: crossfade between messages */}
      <div className="hidden md:flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {siteConfig.announcements[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      <button
        onClick={close}
        aria-label="Close announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-primary-600 rounded-full transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}
