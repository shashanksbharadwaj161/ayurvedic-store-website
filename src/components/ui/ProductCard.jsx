import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Star } from 'lucide-react'
import { formatPrice } from '../../services/woocommerce'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

export default function ProductCard({ product, showBadge = false, onQuickView }) {
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [imgFailed, setImgFailed] = useState(false)
  const [added, setAdded] = useState(false)

  const wishlisted = isWishlisted(product.id)
  const imageSrc   = product.images?.[0]?.src
  const onSale     = Boolean(product.sale_price)
  const category   = product.categories?.[0]
  const price      = product.sale_price || product.price
  const noPrice    = !price || price === '0'

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col h-full"
    >
      {/* Image area */}
      <Link to={`/product/${product.slug}`} className="relative block h-[220px] bg-primary-50 overflow-hidden">
        {imageSrc && !imgFailed ? (
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary-500 flex items-center justify-center">
            <span className="font-display text-2xl text-white tracking-widest">AYU</span>
          </div>
        )}

        {showBadge && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-semibold rounded-full px-2 py-1">
            BESTSELLER
          </span>
        )}
        {onSale && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
            SALE
          </span>
        )}

        {/* Quick view hover overlay */}
        {onQuickView && (
          <div className="absolute inset-0 bg-bark/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-end justify-center pb-4">
            <motion.button
              initial={false}
              onClick={(e) => { e.preventDefault(); onQuickView(product) }}
              className="bg-white text-bark text-sm font-semibold px-5 py-2.5 rounded-full translate-y-5 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary-50"
            >
              Quick View
            </motion.button>
          </div>
        )}
      </Link>

      {/* Content area */}
      <div className="p-4 flex flex-col flex-1">
        {category && (
          <span className="self-start bg-primary-50 text-primary-600 text-xs rounded px-2 py-0.5 mb-2">
            {category.name}
          </span>
        )}

        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-bark text-sm font-semibold line-clamp-2 min-h-[40px] hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2">
          {noPrice ? (
            <span className="text-gray-400 italic text-sm">Price on Request</span>
          ) : onSale ? (
            <>
              <span className="text-accent-500 font-bold text-lg">{formatPrice(product.sale_price)}</span>
              <span className="line-through text-gray-400 text-sm ml-1">{formatPrice(product.regular_price)}</span>
            </>
          ) : (
            <span className="text-primary-600 font-bold text-lg">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-gray-400 ml-1">
            {product.average_rating || '4.8'} ({product.rating_count || 0})
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 mt-auto pt-3">
          <button
            onClick={handleAdd}
            className={`flex-1 h-11 rounded-lg font-medium text-sm text-white transition-colors ${
              added ? 'bg-primary-700' : 'bg-primary-500 hover:bg-primary-600'
            }`}
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </button>
          <motion.button
            onClick={() => toggleWishlist(product)}
            whileTap={{ scale: 1.3 }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-11 h-11 shrink-0 flex items-center justify-center rounded-lg border border-primary-200 hover:border-accent-400 transition-colors"
          >
            <Heart
              size={19}
              className={wishlisted ? 'fill-red-500 text-red-500' : 'text-primary-600'}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
