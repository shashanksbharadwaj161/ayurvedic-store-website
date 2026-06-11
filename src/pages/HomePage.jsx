import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import HeroBanner from '../components/sections/HeroBanner'
import TrustBadges from '../components/sections/TrustBadges'
import FeaturedSection from '../components/sections/FeaturedSection'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import StatCounter from '../components/sections/StatCounter'
import Testimonials from '../components/sections/Testimonials'
import Newsletter from '../components/sections/Newsletter'
import Footer from '../components/layout/Footer'
import CategoryPills from '../components/ui/CategoryPills'
import ProductCarousel from '../components/ui/ProductCarousel'
import QuickViewModal from '../components/ui/QuickViewModal'
import { useCategories } from '../hooks/useWooCommerce'
import { useInView } from '../hooks/useInView'
import { getProducts, getProductsByCategory, MOCK_CATEGORIES } from '../services/woocommerce'
import { siteConfig } from '../config/siteConfig'

function useCarouselProducts(fetcher) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetcher()
      .then(data => { if (active) setProducts(data) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { products, loading }
}

export default function HomePage() {
  const navigate = useNavigate()
  const { categories } = useCategories()
  const [quickView, setQuickView] = useState(null)
  const [igRef, igInView] = useInView()

  const bestsellers = useCarouselProducts(() => getProducts({ orderby: 'popularity', per_page: 16 }))
  const tabletVati  = useCarouselProducts(() => getProductsByCategory('tablet-vati', 12))
  const churna      = useCarouselProducts(() => getProductsByCategory('churna', 12))
  const cosmetics   = useCarouselProducts(() => getProductsByCategory('cosmetics', 12))

  const pillCategories = [
    { id: 0, name: 'All', slug: 'all', count: undefined },
    ...(categories.length ? categories : MOCK_CATEGORIES).filter(c => c.slug !== 'all'),
  ]

  const handleCategoryChange = (slug) => {
    navigate(slug === 'all' ? '/shop' : `/shop/${slug}`)
  }

  return (
    <PageWrapper>
      <HeroBanner />
      <TrustBadges />

      {/* Category pills — visible immediately below hero */}
      <section className="max-w-7xl mx-auto px-4 pt-8 pb-2">
        <h2 className="font-display text-2xl md:text-3xl text-bark mb-4">Shop by Category</h2>
        <CategoryPills
          categories={pillCategories}
          activeCategory="all"
          onCategoryChange={handleCategoryChange}
        />
      </section>

      <ProductCarousel
        title="Our Bestsellers"
        subtitle="Most loved by our wellness community"
        products={bestsellers.products}
        loading={bestsellers.loading}
        viewAllLink="/shop"
        showBadge
        onQuickView={setQuickView}
      />

      <ProductCarousel
        title="Tablets & Vati"
        subtitle="Traditional herbal tablets for daily wellness"
        products={tabletVati.products}
        loading={tabletVati.loading}
        viewAllLink="/shop/tablet-vati"
        onQuickView={setQuickView}
      />

      <FeaturedSection />

      <ProductCarousel
        title="Churna & Powders"
        subtitle="Pure herbal powders, the classical way"
        products={churna.products}
        loading={churna.loading}
        viewAllLink="/shop/churna"
        onQuickView={setQuickView}
      />

      <ProductCarousel
        title="Natural Cosmetics"
        subtitle="Ayurvedic skin and hair care"
        products={cosmetics.products}
        loading={cosmetics.loading}
        viewAllLink="/shop/cosmetics"
        onQuickView={setQuickView}
      />

      <WhyChooseUs />
      <StatCounter />
      <Testimonials />

      {/* Instagram section */}
      <motion.section
        ref={igRef}
        initial={{ opacity: 0, y: 30 }}
        animate={igInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 py-14"
      >
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl text-bark">Follow Our Journey</h2>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-accent-500 text-sm font-medium mt-2 hover:underline"
          >
            <Instagram size={16} /> @ayurvedicmedicines
          </a>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <a
              key={i}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="aspect-square rounded-xl bg-gradient-to-br from-primary-100 to-primary-300 flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Instagram size={24} className="text-primary-600/60" />
            </a>
          ))}
        </div>
      </motion.section>

      <Newsletter />
      <Footer />

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </PageWrapper>
  )
}
