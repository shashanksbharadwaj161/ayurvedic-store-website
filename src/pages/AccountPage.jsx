import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, LogOut, MapPin, Package, User } from 'lucide-react'
import toast from 'react-hot-toast'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import { useWishlist } from '../context/WishlistContext'
import { siteConfig } from '../config/siteConfig'

// Guest-mode account: email is stored locally only — no real authentication.

const EMAIL_KEY   = 'ayu_account_email'
const ADDRESS_KEY = 'ayu_saved_address'

const inputClass = 'w-full h-12 px-4 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary-400 bg-white'

export default function AccountPage() {
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_KEY) || '')
  const [formEmail, setFormEmail] = useState('')
  const [formPassword, setFormPassword] = useState('')
  const [address, setAddress] = useState(() => localStorage.getItem(ADDRESS_KEY) || '')
  const [addressDraft, setAddressDraft] = useState(address)
  const { wishlistCount } = useWishlist()

  const signIn = (e) => {
    e.preventDefault()
    const value = formEmail.trim()
    if (!value) return
    localStorage.setItem(EMAIL_KEY, value)
    setEmail(value)
    toast.success('Welcome! You are signed in as a guest.')
  }

  const continueAsGuest = () => {
    localStorage.setItem(EMAIL_KEY, 'guest')
    setEmail('guest')
  }

  const signOut = () => {
    localStorage.removeItem(EMAIL_KEY)
    setEmail('')
    setFormEmail('')
    setFormPassword('')
    toast('Signed out. See you soon! 🌿')
  }

  const saveAddress = (e) => {
    e.preventDefault()
    localStorage.setItem(ADDRESS_KEY, addressDraft)
    setAddress(addressDraft)
    toast.success('Address saved')
  }

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-24 md:pb-12 min-h-[60vh]">
        <h1 className="font-display text-3xl text-bark mb-6">My Account</h1>

        {!email ? (
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm max-w-md mx-auto">
            <div className="w-14 h-14 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-4">
              <User size={26} className="text-primary-600" />
            </div>
            <h2 className="text-center font-semibold text-bark text-lg mb-1">Sign In</h2>
            <p className="text-center text-xs text-gray-400 mb-6">
              Guest mode — your email is stored only on this device
            </p>
            <form onSubmit={signIn} className="space-y-4">
              <input
                type="email"
                required
                value={formEmail}
                onChange={e => setFormEmail(e.target.value)}
                placeholder="Email address"
                className={inputClass}
              />
              <input
                type="password"
                value={formPassword}
                onChange={e => setFormPassword(e.target.value)}
                placeholder="Password"
                className={inputClass}
              />
              <button type="submit" className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors">
                Continue
              </button>
            </form>
            <button onClick={continueAsGuest} className="w-full text-center text-sm text-gray-500 hover:text-bark mt-4 transition-colors">
              Continue as Guest
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="bg-primary-500 rounded-2xl p-6 text-white flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs">Welcome back,</p>
                <p className="font-display text-xl">{email === 'guest' ? 'Guest' : email}</p>
              </div>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-sm font-medium rounded-full px-5 py-2.5 transition-colors"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>

            {/* Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Package size={20} className="text-primary-600" />
                <h2 className="font-semibold text-bark">Order History</h2>
              </div>
              <p className="text-sm text-gray-500">Your orders will appear here after purchase.</p>
              <a
                href={`${siteConfig.wcUrl}/my-account/orders`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-sm text-accent-500 font-medium hover:underline"
              >
                View orders on our store →
              </a>
            </div>

            {/* Saved address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={20} className="text-primary-600" />
                <h2 className="font-semibold text-bark">Saved Address</h2>
              </div>
              <form onSubmit={saveAddress} className="space-y-3">
                <textarea
                  value={addressDraft}
                  onChange={e => setAddressDraft(e.target.value)}
                  placeholder="House no, street, city, state, PIN code"
                  rows={3}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary-400 resize-none"
                />
                <button type="submit" className="h-11 px-6 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-xl transition-colors">
                  Save Address
                </button>
              </form>
              {address && <p className="text-xs text-gray-400 mt-2">Saved locally on this device.</p>}
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-primary-600" />
                <div>
                  <h2 className="font-semibold text-bark">Wishlist</h2>
                  <p className="text-sm text-gray-500">{wishlistCount} saved {wishlistCount === 1 ? 'item' : 'items'}</p>
                </div>
              </div>
              <Link to="/wishlist" className="text-sm text-accent-500 font-medium hover:underline">
                View →
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </PageWrapper>
  )
}
