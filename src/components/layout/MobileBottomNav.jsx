import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, LayoutGrid, ShoppingBag, User } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function MobileBottomNav({ onCartOpen }) {
  const { cartCount } = useCart()
  const location = useLocation()

  const itemClass = (active) =>
    `flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-[11px] font-medium rounded-lg transition-colors ${
      active ? 'text-primary-600 bg-primary-50' : 'text-gray-400'
    }`

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-white border-t border-primary-100 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] pb-safe">
      <div className="flex h-16 items-stretch px-2 py-1.5 gap-1">
        <motion.div whileTap={{ scale: 0.9 }} className="flex-1">
          <NavLink to="/" end className={({ isActive }) => itemClass(isActive)}>
            <Home size={21} />
            Home
          </NavLink>
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }} className="flex-1">
          <NavLink to="/shop" className={({ isActive }) => itemClass(isActive || location.pathname.startsWith('/shop'))}>
            <LayoutGrid size={21} />
            Shop
          </NavLink>
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }} className="flex-1">
          <button onClick={onCartOpen} className={`${itemClass(false)} relative w-full`}>
            <span className="relative">
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-0.5 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
            Cart
          </button>
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }} className="flex-1">
          <NavLink to="/account" className={({ isActive }) => itemClass(isActive)}>
            <User size={21} />
            Account
          </NavLink>
        </motion.div>
      </div>
    </nav>
  )
}
