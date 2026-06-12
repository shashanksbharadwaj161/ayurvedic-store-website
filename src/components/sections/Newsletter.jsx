import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { Mail } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

export default function Newsletter() {
  const [ref, inView] = useInView()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    toast.success('Welcome to our wellness community! 🌿')
    setEmail('')
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto px-4 py-14"
    >
      <div className="bg-primary-500 rounded-3xl px-6 py-10 md:px-12 text-center">
        <Mail size={32} className="mx-auto text-white/80 mb-3" />
        <h2 className="font-display text-2xl md:text-3xl text-white">Join Our Wellness Journey</h2>
        <p className="text-white/75 text-sm mt-2 max-w-md mx-auto">
          Subscribe for Ayurvedic tips, seasonal wellness guides, and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 h-12 rounded-full px-5 text-sm text-bark placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-accent-400"
          />
          <button
            type="submit"
            className="h-12 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-full px-8 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </motion.section>
  )
}
