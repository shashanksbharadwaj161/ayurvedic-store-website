import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../services/woocommerce'
import { siteConfig } from '../../config/siteConfig'

export default function CartDrawer({ open, onClose }) {
  const { items, cartCount, cartTotal, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  const remaining = siteConfig.freeShipping - cartTotal
  const progress = Math.min(100, (cartTotal / siteConfig.freeShipping) * 100)

  const goCheckout = () => {
    onClose()
    navigate('/cart')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.aside
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-display text-lg text-bark">Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h2>
              <button onClick={onClose} aria-label="Close cart" className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-bark">
                <X size={22} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag size={56} className="text-primary-200" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => { onClose(); navigate('/shop') }}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full px-8 py-3 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map(item => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 60 }}
                        className="flex gap-3"
                      >
                        {item.image ? (
                          <img src={item.image} alt="" className="w-[60px] h-[60px] rounded-lg object-cover bg-primary-50 shrink-0" />
                        ) : (
                          <div className="w-[60px] h-[60px] rounded-lg bg-primary-500 flex items-center justify-center text-white font-display text-xs shrink-0">AYU</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-bark truncate">{item.name}</p>
                          {item.category && <p className="text-xs text-gray-400">{item.category}</p>}
                          <p className="text-sm text-primary-600 font-semibold mt-0.5">{formatPrice(String(item.price))}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:border-primary-400"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-600 hover:border-primary-400"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                              className="ml-auto w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                {remaining > 0 ? (
                  <div>
                    <p className="text-xs text-gray-500 mb-1.5">
                      Add <span className="font-semibold text-accent-500">{formatPrice(String(remaining))}</span> more for FREE shipping 🚚
                    </p>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-primary-600 font-medium">🎉 You've unlocked FREE shipping!</p>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-bark">{formatPrice(String(cartTotal))}</span>
                </div>
                <button
                  onClick={goCheckout}
                  className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button onClick={onClose} className="w-full text-sm text-gray-500 hover:text-bark py-2 transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
