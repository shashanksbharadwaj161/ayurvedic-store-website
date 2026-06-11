import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { siteConfig } from './config/siteConfig'

import AnnouncementBar from './components/layout/AnnouncementBar'
import Navbar from './components/layout/Navbar'
import MobileBottomNav from './components/layout/MobileBottomNav'
import ScrollToTop from './components/ui/ScrollToTop'
import CartDrawer from './components/ui/CartDrawer'
import SearchOverlay from './components/ui/SearchOverlay'

import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import WishlistPage from './pages/WishlistPage'
import AccountPage from './pages/AccountPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'

function ScrollRestoration() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function WhatsAppFab() {
  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 14 }}
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      title="Chat with us"
      aria-label="Chat with us on WhatsApp"
      className="fab-pulse fixed bottom-24 right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  )
}

function AppContent() {
  const location = useLocation()
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      <ScrollRestoration />
      <AnnouncementBar />
      <Navbar onCartOpen={() => setCartOpen(true)} onSearchOpen={() => setSearchOpen(true)} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/shop"           element={<ShopPage />} />
          <Route path="/shop/:category" element={<CategoryPage />} />
          <Route path="/product/:slug"  element={<ProductDetailPage />} />
          <Route path="/cart"           element={<CartPage />} />
          <Route path="/checkout"       element={<CheckoutPage />} />
          <Route path="/wishlist"       element={<WishlistPage />} />
          <Route path="/account"        element={<AccountPage />} />
          <Route path="/about"          element={<AboutPage />} />
          <Route path="/contact"        element={<ContactPage />} />
          <Route path="/faq"            element={<FAQPage />} />
        </Routes>
      </AnimatePresence>

      <MobileBottomNav onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ScrollToTop />
      <WhatsAppFab />

      <Toaster
        position="bottom-left"
        toastOptions={{ style: { background: '#2C3E2D', color: '#fff' }, duration: 3000 }}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
