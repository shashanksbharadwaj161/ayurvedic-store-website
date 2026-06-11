import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Search, ShoppingBag, Heart, Instagram, Facebook, Youtube } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const NAV_LINKS = [
  { label: 'Home',          to: '/' },
  { label: 'Shop',          to: '/shop' },
  { label: 'Tablet & Vati', to: '/shop/tablet-vati' },
  { label: 'Churna',        to: '/shop/churna' },
  { label: 'Cosmetics',     to: '/shop/cosmetics' },
  { label: 'Drops',         to: '/shop/drops' },
  { label: 'About',         to: '/about' },
  { label: 'Contact',       to: '/contact' },
]

export default function Navbar({ onCartOpen, onSearchOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const solid = scrolled || !isHome

  const Logo = () => (
    logoFailed ? (
      <span className="font-display text-primary-600 text-xl md:text-2xl font-semibold whitespace-nowrap">
        {siteConfig.brandName}
      </span>
    ) : (
      <img
        src={siteConfig.logoUrl}
        alt={siteConfig.brandName}
        onError={() => setLogoFailed(true)}
        className="h-[52px] md:h-[64px] w-auto object-contain"
      />
    )
  )

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          solid ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden w-11 h-11 flex items-center justify-center text-bark"
          >
            <Menu size={24} />
          </button>

          {/* Logo — centered on mobile, left on desktop */}
          <Link to="/" className="lg:mr-8 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Logo />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `nav-link text-sm hover:text-accent-500 transition-colors ${
                    isActive ? 'text-primary-600 font-semibold' : 'text-bark'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={onSearchOpen}
              aria-label="Search"
              className="w-11 h-11 flex items-center justify-center text-bark hover:text-primary-600 transition-colors"
            >
              <Search size={21} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative w-11 h-11 hidden sm:flex items-center justify-center text-bark hover:text-primary-600 transition-colors"
            >
              <Heart size={21} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={onCartOpen}
              aria-label="Cart"
              className="relative w-11 h-11 flex items-center justify-center text-bark hover:text-primary-600 transition-colors"
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-bark z-50 lg:hidden flex flex-col p-8"
            >
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="self-end w-11 h-11 flex items-center justify-center text-white/80 hover:text-white"
              >
                <X size={26} />
              </button>
              <div className="flex flex-col gap-5 mt-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `text-2xl font-display ${isActive ? 'text-accent-400' : 'text-white'} hover:text-accent-300 transition-colors`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex gap-5">
                <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white/70 hover:text-accent-400 transition-colors"><Instagram size={22} /></a>
                <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="text-white/70 hover:text-accent-400 transition-colors"><Facebook size={22} /></a>
                <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-white/70 hover:text-accent-400 transition-colors"><Youtube size={22} /></a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
