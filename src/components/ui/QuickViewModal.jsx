import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { formatPrice } from '../../services/woocommerce'
import { useCart } from '../../context/CartContext'

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart()
  const navigate = useNavigate()

  const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '')

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          {/* Desktop: centered modal. Mobile: bottom sheet. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 inset-x-0 bottom-0 max-h-[80vh] rounded-t-3xl md:rounded-3xl md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full bg-white overflow-hidden shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-3 right-3 z-10 w-11 h-11 flex items-center justify-center bg-white/80 rounded-full text-gray-500 hover:text-bark shadow"
            >
              <X size={20} />
            </button>
            <div className="grid md:grid-cols-2 overflow-y-auto max-h-[80vh]">
              <div className="aspect-square bg-primary-50">
                {product.images?.[0]?.src ? (
                  <img src={product.images[0].src} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary-500 flex items-center justify-center">
                    <span className="font-display text-3xl text-white tracking-widest">AYU</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col">
                {product.categories?.[0] && (
                  <span className="self-start bg-primary-50 text-primary-600 text-xs rounded px-2 py-0.5 mb-2">
                    {product.categories[0].name}
                  </span>
                )}
                <h2 className="font-display text-xl text-bark font-semibold">{product.name}</h2>
                <div className="mt-2">
                  {product.sale_price ? (
                    <>
                      <span className="text-accent-500 font-bold text-2xl">{formatPrice(product.sale_price)}</span>
                      <span className="line-through text-gray-400 text-sm ml-2">{formatPrice(product.regular_price)}</span>
                    </>
                  ) : (
                    <span className="text-primary-600 font-bold text-2xl">{formatPrice(product.price)}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                  {stripHtml(product.short_description) || stripHtml(product.description)}
                </p>
                <div className="mt-auto pt-5 space-y-2.5">
                  <button
                    onClick={() => { addItem(product); onClose() }}
                    className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => { onClose(); navigate(`/product/${product.slug}`) }}
                    className="w-full h-12 border border-primary-300 text-primary-700 hover:bg-primary-50 font-semibold rounded-xl transition-colors"
                  >
                    View Full Product
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
