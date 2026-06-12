import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, ChevronDown, Heart, Minus, Plus, Star, Truck } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import ProductCarousel from '../components/ui/ProductCarousel'
import SkeletonCard from '../components/ui/SkeletonCard'
import { useProduct } from '../hooks/useWooCommerce'
import { getProductsByCategory, formatPrice } from '../services/woocommerce'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { siteConfig } from '../config/siteConfig'

const RECENT_KEY = 'ayu_recently_viewed'

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-bark text-sm">{title}</span>
        <ChevronDown size={18} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-gray-600 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const { product, loading } = useProduct(slug)
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [related, setRelated] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [showStickyBar, setShowStickyBar] = useState(false)
  const addToCartRef = useRef(null)

  const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '')

  // Track recently viewed in localStorage
  useEffect(() => {
    if (!product) return
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
      setRecentlyViewed(stored.filter(p => p.id !== product.id).slice(0, 8))
      const entry = {
        id: product.id, name: product.name, slug: product.slug,
        price: product.price, sale_price: product.sale_price, regular_price: product.regular_price,
        images: product.images?.slice(0, 1) || [], categories: product.categories?.slice(0, 1) || [],
        average_rating: product.average_rating, rating_count: product.rating_count,
      }
      const next = [entry, ...stored.filter(p => p.id !== product.id)].slice(0, 12)
      localStorage.setItem(RECENT_KEY, JSON.stringify(next))
    } catch {
      // storage unavailable — skip recently viewed
    }
  }, [product])

  // Related products from the same category
  useEffect(() => {
    if (!product?.categories?.[0]) return
    let active = true
    getProductsByCategory(product.categories[0].slug, 12).then(data => {
      if (active) setRelated(data.filter(p => p.id !== product.id))
    })
    return () => { active = false }
  }, [product])

  // Sticky mobile add-to-cart bar appears when the main button scrolls out of view
  useEffect(() => {
    const el = addToCartRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [product])

  useEffect(() => {
    setQuantity(1)
    setActiveImage(0)
    window.scrollTo(0, 0)
  }, [slug])

  if (loading || !product) {
    return (
      <PageWrapper>
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
          <div className="aspect-square rounded-2xl skeleton-shimmer" />
          <div className="space-y-4">
            <div className="h-6 w-24 rounded skeleton-shimmer" />
            <div className="h-8 w-3/4 rounded skeleton-shimmer" />
            <div className="h-6 w-32 rounded skeleton-shimmer" />
            <div className="h-24 w-full rounded skeleton-shimmer" />
            <div className="h-12 w-full rounded-xl skeleton-shimmer" />
          </div>
        </div>
      </PageWrapper>
    )
  }

  const images = product.images?.length ? product.images : [null]
  const category = product.categories?.[0]
  const onSale = Boolean(product.sale_price)
  const price = parseFloat(product.sale_price || product.price || 0)
  const freeShippingEligible = price * quantity >= siteConfig.freeShipping

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-24 md:pb-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-primary-600">Shop</Link>
          {category && (
            <>
              <ChevronRight size={12} />
              <Link to={`/shop/${category.slug}`} className="hover:text-primary-600">{category.name}</Link>
            </>
          )}
          <ChevronRight size={12} />
          <span className="text-primary-600 font-medium truncate max-w-[180px]">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
          {/* Image gallery */}
          <div>
            <div className="aspect-square rounded-2xl overflow-hidden bg-primary-50 group">
              {images[activeImage]?.src ? (
                <img
                  src={images[activeImage].src}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                  <span className="font-display text-4xl text-white tracking-widest">AYU</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-3 overflow-x-auto hide-scrollbar">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-colors ${
                      activeImage === i ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    {img?.src
                      ? <img src={img.src} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full bg-primary-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {category && (
              <Link
                to={`/shop/${category.slug}`}
                className="inline-block bg-primary-50 text-primary-600 text-xs rounded px-2.5 py-1 mb-3 hover:bg-primary-100 transition-colors"
              >
                {category.name}
              </Link>
            )}
            <h1 className="font-display text-[28px] leading-snug text-bark font-semibold">{product.name}</h1>

            <div className="flex items-center gap-1.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
              ))}
              <span className="text-sm text-gray-400 ml-1">
                {product.average_rating || '4.8'} · {product.rating_count || 0} reviews
              </span>
            </div>

            <div className="mt-4">
              {!product.price || product.price === '0' ? (
                <span className="text-gray-400 italic">Price on Request</span>
              ) : onSale ? (
                <>
                  <span className="text-accent-500 font-bold text-3xl">{formatPrice(product.sale_price)}</span>
                  <span className="line-through text-gray-400 ml-2">{formatPrice(product.regular_price)}</span>
                </>
              ) : (
                <span className="text-primary-600 font-bold text-3xl">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              {stripHtml(product.short_description) || stripHtml(product.description)}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-sm text-gray-500">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-primary-600"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-primary-600"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3" ref={addToCartRef}>
              <button
                onClick={() => addItem(product, quantity)}
                className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className="w-full py-3.5 border border-primary-300 text-primary-700 hover:bg-primary-50 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Heart size={18} className={isWishlisted(product.id) ? 'fill-red-500 text-red-500' : ''} />
                {isWishlisted(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
              </button>
              <a
                href={`${siteConfig.wcUrl}/checkout/?add-to-cart=${product.id}`}
                className="block w-full py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors text-center"
              >
                Buy Now
              </a>
            </div>

            {/* Delivery info */}
            <div className="flex items-center gap-2 mt-5 text-sm">
              <Truck size={18} className="text-primary-600" />
              {freeShippingEligible ? (
                <span className="text-primary-600 font-medium">Eligible for FREE shipping 🎉</span>
              ) : (
                <span className="text-gray-500">
                  Free shipping on orders above {formatPrice(String(siteConfig.freeShipping))}
                </span>
              )}
            </div>

            {/* Accordions */}
            <div className="mt-8">
              <Accordion title="Description" defaultOpen>
                {stripHtml(product.description) || 'Premium quality Ayurvedic product crafted following traditional Vedic formulations for holistic wellness.'}
              </Accordion>
              <Accordion title="Ingredients">
                Made with 100% natural, ethically sourced herbs and botanicals. See product label for the complete ingredient list and composition.
              </Accordion>
              <Accordion title="How to Use">
                Take as directed on the label, or as advised by your Ayurvedic practitioner. Best taken consistently as part of your daily wellness routine.
              </Accordion>
              <Accordion title="Benefits">
                Supports holistic wellness following time-tested Ayurvedic principles. Individual results may vary — consult a practitioner for personalised guidance.
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <ProductCarousel
          title="You May Also Like"
          subtitle={category ? `More from ${category.name}` : undefined}
          products={related}
          viewAllLink={category ? `/shop/${category.slug}` : '/shop'}
        />
      )}

      {/* Recently viewed */}
      {recentlyViewed.length > 0 && (
        <ProductCarousel
          title="Recently Viewed"
          products={recentlyViewed}
        />
      )}

      <Footer />

      {/* Sticky mobile add-to-cart bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="md:hidden fixed bottom-16 inset-x-0 z-30 bg-white border-t border-primary-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] px-4 py-2.5 flex items-center gap-3"
          >
            <span className="flex-1 text-sm font-medium text-bark truncate">{product.name}</span>
            <button
              onClick={() => addItem(product, quantity)}
              className="shrink-0 h-11 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg px-6 transition-colors"
            >
              Add to Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
