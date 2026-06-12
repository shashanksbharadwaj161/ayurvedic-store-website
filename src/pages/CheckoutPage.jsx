import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Landmark, Lock, ShieldCheck, Smartphone, Wallet } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../services/woocommerce'
import { siteConfig } from '../config/siteConfig'

// UI MOCKUP ONLY — nothing is collected or submitted.
// "Pay Now" redirects to the real WooCommerce checkout.

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal',
]

const BANKS = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda']

const PAYMENT_TABS = [
  { id: 'card',    label: 'Card',        Icon: CreditCard },
  { id: 'upi',     label: 'UPI',         Icon: Smartphone },
  { id: 'netbank', label: 'Net Banking', Icon: Landmark },
  { id: 'wallet',  label: 'Wallet',      Icon: Wallet },
]

const inputClass = 'w-full h-12 px-4 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary-400 bg-white'

export default function CheckoutPage() {
  const { items, cartTotal } = useCart()
  const [step, setStep] = useState(1)
  const [payTab, setPayTab] = useState('card')

  const shippingFree = cartTotal >= siteConfig.freeShipping
  const shipping = items.length > 0 && !shippingFree ? 99 : 0
  const total = cartTotal + shipping

  const handlePayNow = () => {
    window.location.href = siteConfig.checkoutUrl
  }

  return (
    <PageWrapper>
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-24 md:pb-12 min-h-[60vh]">
        <h1 className="font-display text-3xl text-bark mb-2">Checkout</h1>
        <p className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
          <Lock size={13} className="text-primary-600" /> Secure checkout — your order is completed safely on our store
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Step indicator */}
            <div className="flex items-center gap-3">
              {[1, 2].map(n => (
                <button
                  key={n}
                  onClick={() => setStep(n)}
                  className={`flex items-center gap-2 text-sm font-medium ${step === n ? 'text-primary-600' : 'text-gray-400'}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === n ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>{n}</span>
                  {n === 1 ? 'Contact & Shipping' : 'Payment Method'}
                  {n === 1 && <span className="w-10 h-px bg-gray-200 ml-1" />}
                </button>
              ))}
            </div>

            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <h2 className="font-semibold text-bark">Contact & Shipping</h2>
                <input type="email" placeholder="Email address" className={inputClass} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Full name" className={inputClass} />
                  <input type="tel" placeholder="Phone number" className={inputClass} />
                </div>
                <input placeholder="Address line 1" className={inputClass} />
                <input placeholder="Address line 2 (optional)" className={inputClass} />
                <div className="grid sm:grid-cols-3 gap-4">
                  <input placeholder="City" className={inputClass} />
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>State</option>
                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <input placeholder="PIN code" inputMode="numeric" className={inputClass} />
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input type="checkbox" className="accent-primary-500 w-4 h-4" />
                  Save this address for next time
                </label>
                <button
                  onClick={() => setStep(2)}
                  className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-bark">Payment Method</h2>
                  <Lock size={16} className="text-primary-600" />
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {PAYMENT_TABS.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setPayTab(id)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition-colors ${
                        payTab === id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 text-gray-500 hover:border-primary-300'
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </button>
                  ))}
                </div>

                {payTab === 'card' && (
                  <div className="space-y-4">
                    <input placeholder="Card number" inputMode="numeric" className={inputClass} />
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="MM / YY" className={inputClass} />
                      <input placeholder="CVV" inputMode="numeric" className={inputClass} />
                    </div>
                    <input placeholder="Name on card" className={inputClass} />
                  </div>
                )}
                {payTab === 'upi' && (
                  <input placeholder="yourname@upi" className={inputClass} />
                )}
                {payTab === 'netbank' && (
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>Select your bank</option>
                    {BANKS.map(b => <option key={b}>{b}</option>)}
                  </select>
                )}
                {payTab === 'wallet' && (
                  <div className="grid grid-cols-3 gap-3">
                    {['PhonePe', 'Paytm', 'Google Pay'].map(w => (
                      <button key={w} className="py-4 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary-400 transition-colors">
                        {w}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={handlePayNow}
                  className="w-full py-3.5 mt-6 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-xl transition-colors"
                >
                  Pay Now · {formatPrice(String(total))}
                </button>
                <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 mt-3">
                  <ShieldCheck size={13} className="text-primary-600" />
                  Secured by our store checkout — you'll complete payment there
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-fit lg:sticky lg:top-28">
            <h2 className="font-display text-lg text-bark mb-4">Order Summary</h2>
            {items.length === 0 ? (
              <div className="text-sm text-gray-400">
                Your cart is empty.{' '}
                <Link to="/shop" className="text-primary-600 hover:underline">Shop now</Link>
              </div>
            ) : (
              <>
                <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {items.map(item => (
                    <li key={item.id} className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-primary-50 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center text-white font-display text-[10px] shrink-0">AYU</div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-bark truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-400">Qty {item.quantity}</p>
                      </div>
                      <span className="text-xs font-semibold">{formatPrice(String(item.price * item.quantity))}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(String(cartTotal))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    {shippingFree ? <span className="text-primary-600 font-semibold">FREE</span> : <span>₹99</span>}
                  </div>
                  <div className="flex justify-between text-base font-bold text-bark pt-1">
                    <span>Total</span>
                    <span>{formatPrice(String(total))}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  )
}
