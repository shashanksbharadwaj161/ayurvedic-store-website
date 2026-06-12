import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const BADGES = [
  { icon: '🌿', title: '100% Natural',  subtitle: 'Zero chemicals, zero compromise' },
  { icon: '🔬', title: 'Lab Tested',    subtitle: 'Quality certified every batch' },
  { icon: '🚚', title: 'Free Shipping', subtitle: 'On orders above ₹999' },
  { icon: '🔄', title: 'Easy Returns',  subtitle: '30-day hassle-free returns' },
  { icon: '📞', title: 'Expert Support',subtitle: 'Ayurvedic consultation available' },
]

export default function TrustBadges() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="bg-primary-500">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="flex flex-col items-center text-center gap-1.5"
          >
            <span className="text-[32px] leading-none">{badge.icon}</span>
            <p className="text-white font-semibold text-sm">{badge.title}</p>
            <p className="text-white/70 text-xs">{badge.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
