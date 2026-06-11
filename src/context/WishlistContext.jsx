import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext(null)

const STORAGE_KEY = 'ayu_wishlist'

const loadWishlist = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlist)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable — wishlist lives in memory only
    }
  }, [items])

  const toggleWishlist = (product) => {
    setItems(prev => {
      const exists = prev.some(i => i.id === product.id)
      if (exists) {
        toast(`${product.name} removed from wishlist`, { icon: '💔' })
        return prev.filter(i => i.id !== product.id)
      }
      toast(`${product.name} added to wishlist`, { icon: '❤️' })
      return [...prev, product]
    })
  }

  const isWishlisted = (id) => items.some(i => i.id === id)

  const wishlistCount = useMemo(() => items.length, [items])

  return (
    <WishlistContext.Provider value={{ items, toggleWishlist, isWishlisted, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
