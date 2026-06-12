import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { siteConfig } from '../../config/siteConfig'

export default function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
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
    <section className="relative w-full h-[55vh] md:h-[70vh] lg:h-[80vh] overflow-hidden -mt-16 md:-mt-20">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {siteConfig.heroSlides.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, rgba(44,62,45,0.75) 0%, rgba(44,62,45,0.3) 100%)' }}
              />
              <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center justify-center md:items-end md:justify-start md:pb-24">
                <div className="text-center md:text-left max-w-xl">
                  {selected === i && (
                    <>
                      <motion.h1
                        key={`h-${i}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-[28px] md:text-5xl font-bold text-white leading-tight whitespace-pre-line"
                      >
                        {slide.headline}
                      </motion.h1>
                      <motion.p
                        key={`s-${i}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm md:text-lg text-white/85 mt-3"
                      >
                        {slide.subheadline}
                      </motion.p>
                      <motion.div
                        key={`c-${i}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-6"
                      >
                        <Link
                          to={slide.ctaLink}
                          className="inline-block bg-accent-500 hover:bg-accent-600 hover:scale-105 text-white px-8 py-3 rounded-full font-semibold transition-all"
                        >
                          {slide.cta}
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows — desktop only */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 w-[52px] h-[52px] items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/40 text-white transition-colors"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 w-[52px] h-[52px] items-center justify-center rounded-full bg-white/20 backdrop-blur hover:bg-white/40 text-white transition-colors"
      >
        <ChevronRight size={26} />
      </button>

      {/* Slide dots */}
      <div className="absolute bottom-5 inset-x-0 flex justify-center gap-2">
        {siteConfig.heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${selected === i ? 'bg-accent-500' : 'bg-white/50'}`}
          />
        ))}
      </div>

      {/* Progress bar — resets each slide change via key */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/20">
        <div key={selected} className="h-full bg-accent-500 hero-progress" />
      </div>
    </section>
  )
}
