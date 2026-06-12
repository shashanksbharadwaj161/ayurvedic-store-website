import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

const STORAGE_KEY = 'ayu_cart'

const loadCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage unavailable (private mode) — cart lives in memory only
    }
  }, [items])

  const addItem = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
      }
      const price = parseFloat(product.sale_price || product.price || 0) || 0
      return [...prev, {
        id:       product.id,
        name:     product.name,
        slug:     product.slug,
        price,
        image:    product.images?.[0]?.src || null,
        category: product.categories?.[0]?.name || '',
        quantity,
      }]
    })
    toast.success(`${product.name} added to cart`)
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQuantity = (id, qty) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
  }

  const clearCart = () => setItems([])

  const cartCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const cartTotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
