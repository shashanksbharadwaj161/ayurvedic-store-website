import { motion } from 'framer-motion'

const CATEGORY_EMOJI = {
  all:           '🌿',
  'tablet-vati': '💊',
  churna:        '🥄',
  cosmetics:     '🧴',
  drops:         '💧',
  miscellaneous: '✨',
}

export default function CategoryPills({ categories = [], activeCategory = 'all', onCategoryChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 px-1">
      {categories.map((cat, i) => {
        const active = activeCategory === cat.slug
        return (
          <motion.button
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 20, delay: i * 0.06 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onCategoryChange?.(cat.slug)}
            className={`shrink-0 h-11 md:h-12 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium border transition-colors ${
              active
                ? 'bg-primary-500 text-white border-transparent'
                : 'bg-white border-primary-200 text-primary-700 hover:border-primary-400'
            }`}
          >
            <span>{CATEGORY_EMOJI[cat.slug] || '🌱'}</span>
            {cat.name}
            {typeof cat.count === 'number' && cat.count > 0 && (
              <span className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 ${
                active ? 'bg-white/25 text-white' : 'bg-primary-50 text-primary-600'
              }`}>
                {cat.count}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
