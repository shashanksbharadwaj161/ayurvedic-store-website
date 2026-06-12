import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import CategoryPills from '../components/ui/CategoryPills'
import ProductCard from '../components/ui/ProductCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import QuickViewModal from '../components/ui/QuickViewModal'
import { useCategories } from '../hooks/useWooCommerce'
import { getProducts, getProductsByCategory, MOCK_CATEGORIES } from '../services/woocommerce'

const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'date',       label: 'Newest' },
  { value: 'price',      label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

const PAGE_SIZE = 12

export function ProductGridPage({ categorySlug: forcedCategory, categoryName, categoryDescription, breadcrumb }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const urlCategory = searchParams.get('category') || 'all'
  const activeCategory = forcedCategory || urlCategory

  const { categories } = useCategories()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sort, setSort] = useState('popularity')
  const [maxPrice, setMaxPrice] = useState(2000)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [quickView, setQuickView] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setVisibleCount(PAGE_SIZE)

    const fetcher = activeCategory && activeCategory !== 'all'
      ? getProductsByCategory(activeCategory, 100)
      : getProducts({ per_page: 100 })

    fetcher
      .then(data => { if (active) setProducts(data) })
      .finally(() => { if (active) setLoading(false) })

    return () => { active = false }
  }, [activeCategory])

  const sorted = useMemo(() => {
    const list = products.filter(p => {
      const price = parseFloat(p.sale_price || p.price || 0)
      return price <= maxPrice
    })
    const priceOf = p => parseFloat(p.sale_price || p.price || 0)
    switch (sort) {
      case 'price':      return [...list].sort((a, b) => priceOf(a) - priceOf(b))
      case 'price-desc': return [...list].sort((a, b) => priceOf(b) - priceOf(a))
      case 'date':       return [...list].sort((a, b) => b.id - a.id)
      default:           return list
    }
  }, [products, sort, maxPrice])

  const visible = sorted.slice(0, visibleCount)
  const filtersActive = (sort !== 'popularity' ? 1 : 0) + (maxPrice < 2000 ? 1 : 0)

  const pillCategories = [
    { id: 0, name: 'All', slug: 'all', count: undefined },
    ...(categories.length ? categories : MOCK_CATEGORIES).filter(c => c.slug !== 'all'),
  ]

  const handleCategoryChange = (slug) => {
    if (forcedCategory) {
      navigate(slug === 'all' ? '/shop' : `/shop/${slug}`)
      return
    }
    if (slug === 'all') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', slug)
    }
    setSearchParams(searchParams, { replace: true })
  }

  const title = categoryName || 'All Products'

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-20 md:pb-10 min-h-[60vh]">
        {breadcrumb}

        <div className="mb-4">
          <h1 className="font-display text-3xl text-bark">{title}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {loading ? 'Loading products…' : `${sorted.length} products`}
          </p>
          {categoryDescription && (
            <p className="text-gray-500 text-sm mt-2 max-w-2xl">{categoryDescription}</p>
          )}
        </div>

        {/* Sticky filter bar */}
        <div className="sticky top-16 md:top-20 z-30 bg-cream/95 backdrop-blur py-3 -mx-4 px-4 space-y-3">
          <CategoryPills
            categories={pillCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          <div className="flex items-center gap-4 flex-wrap">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              aria-label="Sort products"
              className="h-11 bg-white border border-primary-200 rounded-full px-4 text-sm text-primary-700 outline-none focus:border-primary-400"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Price filter — desktop only */}
            <div className="hidden md:flex items-center gap-3 text-sm text-gray-500">
              <span>Max price: ₹{maxPrice.toLocaleString('en-IN')}</span>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-40 accent-primary-500"
              />
            </div>

            {filtersActive > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-accent-50 text-accent-600 text-xs font-medium rounded-full px-3 py-1.5">
                <SlidersHorizontal size={12} />
                {filtersActive} {filtersActive === 1 ? 'filter' : 'filters'} active
              </span>
            )}
          </div>
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : visible.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found in this category.</p>
        ) : (
          <>
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
              <AnimatePresence mode="popLayout">
                {visible.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} onQuickView={setQuickView} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {visibleCount < sorted.length && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full px-10 py-3 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </PageWrapper>
  )
}

export default function ShopPage() {
  return <ProductGridPage />
}
