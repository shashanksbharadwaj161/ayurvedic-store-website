import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import PageWrapper from '../components/ui/PageWrapper'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/ui/ProductCard'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

export default function WishlistPage() {
  const { items, toggleWishlist, wishlistCount } = useWishlist()
  const { addItem } = useCart()

  const addAllToCart = () => {
    items.forEach(product => addItem(product))
  }

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-24 md:pb-12 min-h-[60vh]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <h1 className="font-display text-3xl text-bark">
            My Wishlist ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
          </h1>
          {items.length > 0 && (
            <button
              onClick={addAllToCart}
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-full px-6 py-3 transition-colors"
            >
              <ShoppingBag size={16} />
              Add All to Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-4">
            <Heart size={72} className="text-primary-200" />
            <p className="text-gray-500 text-lg">Your wishlist is empty</p>
            <p className="text-gray-400 text-sm max-w-xs">
              Tap the heart on any product to save it here for later.
            </p>
            <Link
              to="/shop"
              className="mt-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full px-10 py-3 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(product => (
              <div key={product.id} className="flex flex-col gap-2">
                <ProductCard product={product} />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="h-11 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Remove from Wishlist
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </PageWrapper>
  )
}
