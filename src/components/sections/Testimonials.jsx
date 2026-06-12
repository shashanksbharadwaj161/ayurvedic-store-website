import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useInView } from '../../hooks/useInView'

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Bengaluru',
    text: 'The Ashwagandha churna has genuinely improved my sleep and stress levels. Authentic quality you can feel from the first week.',
    rating: 5,
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    text: 'I have tried many brands, but the purity here is unmatched. The Triphala tablets work wonders for digestion.',
    rating: 5,
  },
  {
    name: 'Anita Desai',
    location: 'Mumbai',
    text: 'Fast delivery, beautiful packaging, and the neem face wash cleared my skin in three weeks. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur',
    text: 'Their customer support helped me pick the right products for my dosha. That personal touch makes all the difference.',
    rating: 4,
  },
  {
    name: 'Meena Iyer',
    location: 'Chennai',
    text: 'The Brahmi drops have become part of my daily routine. Calm focus without any side effects — exactly as promised.',
    rating: 5,
  },
]

export default function Testimonials() {
  const [sectionRef, inView] = useInView()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  )
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-primary-50/60 py-14"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl text-bark">What Our Customers Say</h2>
          <p className="text-gray-500 text-sm mt-2">Real stories from our wellness community</p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0">
                <div className="bg-white rounded-2xl p-6 shadow-md h-full flex flex-col">
                  <Quote size={28} className="text-primary-200 mb-3" />
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">“{t.text}”</p>
                  <div className="flex items-center gap-1 mt-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-semibold text-bark text-sm mt-2">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${selected === i ? 'bg-primary-500' : 'bg-primary-200'}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}
