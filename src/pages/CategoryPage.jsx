import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ProductGridPage } from './ShopPage'
import { useCategories } from '../hooks/useWooCommerce'

const CATEGORY_DESCRIPTIONS = {
  'tablet-vati':  'Traditional herbal tablets and vati prepared following classical Ayurvedic texts for daily wellness support.',
  churna:         'Pure single-herb and compound powders, stone-ground to preserve the full potency of every botanical.',
  cosmetics:      'Natural skin and hair care rooted in Vedic beauty rituals — free from harsh chemicals.',
  drops:          'Concentrated herbal extracts and drops for targeted, convenient daily dosing.',
  miscellaneous:  'Oils, tonics, and specialty Ayurvedic preparations for complete holistic care.',
}

export default function CategoryPage() {
  const { category } = useParams()
  const { categories } = useCategories()

  const match = categories.find(c => c.slug === category)
  const name = match?.name || category
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const breadcrumb = (
    <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
      <ChevronRight size={12} />
      <Link to="/shop" className="hover:text-primary-600 transition-colors">Shop</Link>
      <ChevronRight size={12} />
      <span className="text-primary-600 font-medium">{name}</span>
    </nav>
  )

  return (
    <ProductGridPage
      key={category}
      categorySlug={category}
      categoryName={name}
      categoryDescription={CATEGORY_DESCRIPTIONS[category]}
      breadcrumb={breadcrumb}
    />
  )
}
