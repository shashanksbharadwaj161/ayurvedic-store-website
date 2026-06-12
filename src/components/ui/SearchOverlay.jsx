import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { searchProducts, formatPrice, MOCK_CATEGORIES } from '../../services/woocommerce'

const POPULAR = ['Ashwagandha', 'Triphala', 'Neem', 'Brahmi', 'Giloy', 'Turmeric']

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setTimeout(() => inputRef.current?.focus(), 80)
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setSearching(true)
    const timer = setTimeout(async () => {
      const data = await searchProducts(query.trim())
      setResults(data.slice(0, 8))
      setSearching(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  const goTo = (slug) => {
    onClose()
    navigate(`/product/${slug}`)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-bark/90 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto px-4 pt-24 pb-12"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close search"
              className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-white/80 hover:text-white"
            >
              <X size={28} />
            </button>

            <div className="relative">
              <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search Ashwagandha, Churna, Face Pack..."
                className="w-full bg-white rounded-2xl pl-14 pr-14 py-4 text-lg text-bark placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-accent-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-gray-400 hover:text-bark"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {!query && (
              <div className="mt-8">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="bg-white/10 hover:bg-white/20 text-white text-sm rounded-full px-4 py-2 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <p className="text-white/60 text-xs uppercase tracking-wider mt-8 mb-3">Suggested Categories</p>
                <div className="flex flex-wrap gap-2">
                  {MOCK_CATEGORIES.filter(c => c.slug !== 'all').map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => { onClose(); navigate(`/shop/${cat.slug}`) }}
                      className="bg-primary-500/40 hover:bg-primary-500/60 text-white text-sm rounded-full px-4 py-2 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query && (
              <div className="mt-6 bg-white rounded-2xl overflow-hidden divide-y divide-gray-100">
                {searching ? (
                  <p className="p-6 text-center text-gray-400 text-sm">Searching…</p>
                ) : results.length === 0 ? (
                  <p className="p-6 text-center text-gray-400 text-sm">No products match “{query}”</p>
                ) : (
                  results.map(p => (
                    <button
                      key={p.id}
                      onClick={() => goTo(p.slug)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-primary-50 transition-colors text-left"
                    >
                      {p.images?.[0]?.src ? (
                        <img src={p.images[0].src} alt="" className="w-12 h-12 rounded-lg object-cover bg-primary-50" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-primary-500 flex items-center justify-center text-white font-display text-xs">AYU</div>
                      )}
                      <span className="flex-1 text-sm text-bark font-medium">{p.name}</span>
                      <span className="text-sm text-primary-600 font-semibold">{formatPrice(p.sale_price || p.price)}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
