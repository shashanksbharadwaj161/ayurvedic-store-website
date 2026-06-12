import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Tag, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../services/woocommerce'
import { siteConfig } from '../config/siteConfig'

export default function CartPage() {
  const { items, cartTotal, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()
  const [coupon, setCoupon] = useState('')

  const shippingFree = cartTotal >= siteConfig.freeShipping
  const shipping = shippingFree ? 0 : 99
  const total = cartTotal + (items.length > 0 ? shipping : 0)
  const remaining = siteConfig.freeShipping - cartTotal
  const progress = Math.min(100, (cartTotal / siteConfig.freeShipping) * 100)

  const applyCoupon = (e) => {
    e.preventDefault()
    if (!coupon.trim()) return
    toast('Coupons are applied at checkout', { icon: '🏷️' })
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-24 md:pb-12 min-h-[60vh]">
        <h1 className="font-display text-3xl text-bark mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
            <ShoppingBag size={72} className="text-primary-200" />
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400 text-sm max-w-xs">
              Looks like you haven't added any wellness products yet.
            </p>
            <Link
              to="/shop"
              className="mt-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full px-10 py-3 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence initial={false}>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 80 }}
                    className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
                  >
                    {item.image ? (
                      <img src={item.image} alt="" className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover bg-primary-50 shrink-0" />
                    ) : (
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-primary-500 flex items-center justify-center text-white font-display shrink-0">AYU</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.slug}`} className="font-medium text-bark text-sm md:text-base hover:text-primary-600 transition-colors line-clamp-2">
                        {item.name}
                      </Link>
                      {item.category && <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>}
                      <p className="text-sm text-primary-600 font-semibold mt-1">{formatPrice(String(item.price))}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-primary-400"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-primary-400"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="ml-2 w-9 h-9 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-gray-400">Subtotal</p>
                      <p className="font-bold text-bark">{formatPrice(String(item.price * item.quantity))}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm h-fit lg:sticky lg:top-28">
              <h2 className="font-display text-lg text-bark mb-4">Order Summary</h2>

              {!shippingFree && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1.5">
                    Add <span className="font-semibold text-accent-500">{formatPrice(String(remaining))}</span> more for FREE shipping
                  </p>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{formatPrice(String(cartTotal))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  {shippingFree
                    ? <span className="text-primary-600 font-semibold">FREE</span>
                    : <span className="font-medium">₹99</span>}
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between text-base">
                  <span className="font-semibold text-bark">Total</span>
                  <span className="font-bold text-bark">{formatPrice(String(total))}</span>
                </div>
              </div>

              <form onSubmit={applyCoupon} className="flex gap-2 mt-5">
                <div className="relative flex-1">
                  <Tag size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full h-11 pl-9 pr-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary-400"
                  />
                </div>
                <button type="submit" className="h-11 px-4 text-sm font-medium border border-primary-300 text-primary-700 rounded-xl hover:bg-primary-50 transition-colors">
                  Apply
                </button>
              </form>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full h-12 mt-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
              >
                Proceed to Checkout
              </button>
              <Link to="/shop" className="block text-center text-sm text-gray-500 hover:text-bark mt-3 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </PageWrapper>
  )
}
