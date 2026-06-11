import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const POINTS = [
  'Sourced from certified organic farms across India',
  'Formulated by experienced Ayurvedic practitioners',
  'Every batch lab-tested for purity and potency',
  'Traditional methods, modern quality standards',
]

export default function FeaturedSection() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="bg-bark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-accent-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Pure Ayurveda</p>
          <h2 className="font-display text-3xl md:text-4xl text-white leading-snug">
            Ancient Formulations for Modern Life
          </h2>
          <p className="text-white/70 mt-4 text-sm md:text-base leading-relaxed">
            For thousands of years, Ayurveda has offered a holistic path to wellness.
            We honour that legacy by crafting every product with authentic ingredients,
            time-tested recipes, and uncompromising quality control.
          </p>
          <ul className="mt-6 space-y-3">
            {POINTS.map(point => (
              <li key={point} className="flex items-start gap-3 text-white/85 text-sm">
                <CheckCircle2 size={18} className="text-primary-300 shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            to="/shop"
            className="inline-block mt-8 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
          >
            Explore All Products
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-3 rounded-3xl bg-primary-500/30 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=900&q=80"
            alt="Ayurvedic herbs and botanicals"
            loading="lazy"
            className="relative w-full aspect-[4/3] object-cover rounded-3xl border-2 border-primary-400/40 animate-float"
          />
        </motion.div>
      </div>
    </section>
  )
}
