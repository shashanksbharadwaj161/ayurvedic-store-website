import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, BookOpen, Sparkles, ShieldCheck } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import { useInView } from '../hooks/useInView'
import { siteConfig } from '../config/siteConfig'

const PILLARS = [
  {
    Icon: Leaf,
    title: 'Purity',
    text: 'Every herb is sourced from certified organic farms and tested for purity before it ever reaches our formulations.',
  },
  {
    Icon: BookOpen,
    title: 'Tradition',
    text: 'Our recipes follow classical Ayurvedic texts, prepared the way they have been for thousands of years.',
  },
  {
    Icon: Sparkles,
    title: 'Efficacy',
    text: 'Modern lab validation ensures every batch delivers the potency that traditional wisdom promises.',
  },
]

function Section({ children, className = '' }) {
  const [ref, inView] = useInView()
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative bg-bark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1600&q=80)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
          <p className="text-accent-400 text-xs font-semibold tracking-[0.25em] uppercase mb-4">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
            Ancient Wisdom,<br />Carried Forward with Care
          </h1>
          <p className="text-white/75 mt-5 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {siteConfig.description}
          </p>
        </div>
      </section>

      {/* Brand story */}
      <Section className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="font-display text-2xl md:text-3xl text-bark mb-5">Rooted in Tradition</h2>
        <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4 text-left md:text-center">
          <p>
            Our journey began with a simple belief: that the time-tested wisdom of Ayurveda deserves
            a place in every modern home. What started as a small family practice grounded in
            classical formulations has grown into a trusted source of authentic Ayurvedic medicines.
          </p>
          <p>
            We work directly with farmers and herb collectors across India, honouring seasonal
            harvesting practices that preserve each plant's natural potency. Every churna, vati,
            and oil is prepared in small batches, the traditional way — then verified with modern
            quality testing.
          </p>
        </div>
      </Section>

      {/* 3 pillars */}
      <Section className="bg-primary-50/60 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl text-bark text-center mb-10">What We Stand For</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map(({ Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-md text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-4">
                  <Icon size={26} className="text-primary-600" />
                </div>
                <h3 className="font-display text-xl text-bark font-semibold">{title}</h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Expertise */}
      <Section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://images.unsplash.com/photo-1577467014381-aa7c13dbf331?w=900&q=80"
          alt="Ayurvedic preparation"
          loading="lazy"
          className="w-full aspect-[4/3] object-cover rounded-3xl"
        />
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-bark">Guided by Experience</h2>
          <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
            Our formulations are developed and reviewed by experienced Ayurvedic practitioners
            who understand both the classical texts and the needs of modern life. From dosha-specific
            guidance to seasonal wellness routines, our team is here to help you find what truly works
            for your body.
          </p>
          <div className="flex items-start gap-3 mt-6 bg-primary-50 rounded-2xl p-5">
            <ShieldCheck size={22} className="text-primary-600 shrink-0 mt-0.5" />
            <p className="text-sm text-primary-800">
              <span className="font-semibold">Our quality commitment:</span> every batch is lab tested,
              GMP-manufactured, and backed by a 30-day hassle-free return policy.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div className="bg-bark rounded-3xl px-6 py-12">
          <h2 className="font-display text-2xl md:text-3xl text-white">Begin Your Wellness Journey</h2>
          <p className="text-white/70 text-sm mt-3 max-w-md mx-auto">
            Explore our complete range of authentic Ayurvedic medicines and wellness products.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-6 bg-accent-500 hover:bg-accent-600 text-white font-semibold px-10 py-3.5 rounded-full transition-colors"
          >
            Shop Our Products
          </Link>
        </div>
      </Section>

      <Footer />
    </PageWrapper>
  )
}
