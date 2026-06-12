import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import SkeletonCard from './SkeletonCard'
import { useInView } from '../../hooks/useInView'

export default function ProductCarousel({ title, subtitle, products = [], loading = false, viewAllLink, showBadge = false, onQuickView }) {
  const [sectionRef, inView] = useInView()
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false, dragFree: true })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const slideClass = 'flex-[0_0_66%] sm:flex-[0_0_40%] lg:flex-[0_0_calc(25%-12px)] min-w-0'

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4 py-10"
    >
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl text-bark">{title}</h2>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        {viewAllLink && (
          <Link to={viewAllLink} className="text-accent-500 text-sm font-medium hover:underline whitespace-nowrap">
            View All →
          </Link>
        )}
      </div>

      <div className="relative">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No products found</p>
        ) : (
          <>
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-4">
                {products.map(product => (
                  <div key={product.id} className={slideClass}>
                    <ProductCard product={product} showBadge={showBadge} onQuickView={onQuickView} />
                  </div>
                ))}
              </div>
            </div>

            {canPrev && (
              <button
                onClick={() => emblaApi?.scrollPrev()}
                aria-label="Previous products"
                className="hidden lg:flex absolute -left-6 top-1/2 -translate-y-1/2 w-[52px] h-[52px] items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 text-primary-600 hover:bg-primary-50 transition-colors z-10"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {canNext && (
              <button
                onClick={() => emblaApi?.scrollNext()}
                aria-label="Next products"
                className="hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 w-[52px] h-[52px] items-center justify-center bg-white rounded-full shadow-lg border border-gray-200 text-primary-600 hover:bg-primary-50 transition-colors z-10"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </>
        )}
      </div>
    </motion.section>
  )
}
