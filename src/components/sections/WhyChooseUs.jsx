import { motion } from 'framer-motion'
import { Leaf, FlaskConical, Award, HeartHandshake } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const FEATURES = [
  {
    Icon: Leaf,
    title: 'Pure Ingredients',
    text: 'Handpicked herbs and botanicals sourced directly from trusted organic farms across India.',
  },
  {
    Icon: FlaskConical,
    title: 'Scientifically Validated',
    text: 'Traditional formulations verified through modern lab testing for purity and potency.',
  },
  {
    Icon: Award,
    title: 'Certified Quality',
    text: 'GMP-certified manufacturing with rigorous quality checks at every stage of production.',
  },
  {
    Icon: HeartHandshake,
    title: 'Holistic Care',
    text: 'Expert Ayurvedic guidance to help you choose the right products for your dosha and lifestyle.',
  },
]

export default function WhyChooseUs() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h2 className="font-display text-2xl md:text-3xl text-bark">Why Choose Us</h2>
        <p className="text-gray-500 text-sm mt-2">Wellness rooted in tradition, delivered with care</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map(({ Icon, title, text }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <Icon size={26} className="text-primary-600" />
            </div>
            <h3 className="font-display text-lg text-bark font-semibold">{title}</h3>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
