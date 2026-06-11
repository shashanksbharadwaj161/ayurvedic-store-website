import axios from 'axios'

const WC_URL    = import.meta.env.VITE_WC_URL    || 'https://whitesmoke-zebra-795108.hostingersite.com'
const WC_KEY    = import.meta.env.VITE_WC_KEY    || ''
const WC_SECRET = import.meta.env.VITE_WC_SECRET || ''

const auth = {
  username: WC_KEY,
  password: WC_SECRET,
}

const api = axios.create({
  baseURL: `${WC_URL}/wp-json/wc/v3`,
  auth,
  timeout: 10000,
})

// MOCK DATA — used when API is unavailable (dev/preview)
export const MOCK_CATEGORIES = [
  { id: 1, name: 'All',          slug: 'all',         count: 150, image: null },
  { id: 2, name: 'Tablet & Vati',slug: 'tablet-vati', count: 45,  image: null },
  { id: 3, name: 'Churna',       slug: 'churna',      count: 32,  image: null },
  { id: 4, name: 'Cosmetics',    slug: 'cosmetics',   count: 28,  image: null },
  { id: 5, name: 'Drops',        slug: 'drops',       count: 25,  image: null },
  { id: 6, name: 'Miscellaneous',slug: 'miscellaneous',count: 20, image: null },
]

export const MOCK_PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id:          i + 1,
  name:        ['Ashwagandha Churna 100g', 'Triphala Tablets', 'Neem Face Wash', 'Brahmi Drops', 'Giloy Vati', 'Turmeric Capsules', 'Amla Powder', 'Shatavari Churna', 'Arjuna Tablets', 'Rose Face Pack'][i % 10],
  slug:        `product-${i + 1}`,
  price:       String(Math.floor(Math.random() * 400 + 150)),
  regular_price: String(Math.floor(Math.random() * 500 + 200)),
  sale_price:  i % 3 === 0 ? String(Math.floor(Math.random() * 300 + 100)) : '',
  categories:  [MOCK_CATEGORIES[(i % 5) + 1]],
  images:      [{ src: `https://images.unsplash.com/photo-${['1556228578-dd539282b964', '1600857544200-b2f666a9a2ec', '1512621776951-a57141f2eefd', '1596040033229-a9821ebd058d', '1571781926291-c477ebfd024b'][i % 5]}?w=400&q=80` }],
  description: 'Premium quality Ayurvedic product crafted following traditional Vedic formulations for holistic wellness.',
  short_description: 'Pure & Natural Ayurvedic formulation.',
  stock_status: 'instock',
  average_rating: '4.8',
  rating_count: Math.floor(Math.random() * 200 + 50),
}))

// API FUNCTIONS — fallback to mock data on error
export const getProducts = async (params = {}) => {
  try {
    const res = await api.get('/products', { params: { per_page: 20, status: 'publish', ...params } })
    return res.data
  } catch {
    return MOCK_PRODUCTS
  }
}

export const getProduct = async (slug) => {
  try {
    const res = await api.get('/products', { params: { slug } })
    return res.data[0] || null
  } catch {
    return MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0]
  }
}

export const getCategories = async () => {
  try {
    const res = await api.get('/products/categories', { params: { per_page: 100, hide_empty: true } })
    return res.data
  } catch {
    return MOCK_CATEGORIES
  }
}

export const searchProducts = async (query) => {
  try {
    const res = await api.get('/products', { params: { search: query, per_page: 10 } })
    return res.data
  } catch {
    return MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
  }
}

export const getProductsByCategory = async (categorySlug, perPage = 12) => {
  try {
    const cats = await getCategories()
    const cat  = cats.find(c => c.slug === categorySlug)
    if (!cat) return []
    const res = await api.get('/products', { params: { category: cat.id, per_page: perPage } })
    return res.data
  } catch {
    return MOCK_PRODUCTS.filter(p => p.categories.some(c => c.slug === categorySlug))
  }
}

export const formatPrice = (price) => {
  if (!price || price === '0') return 'Price on Request'
  return `₹${parseFloat(price).toLocaleString('en-IN')}`
}
