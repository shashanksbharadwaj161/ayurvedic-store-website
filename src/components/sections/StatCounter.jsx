import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'

const STATS = [
  { value: 10000, suffix: '+', label: 'Happy Customers' },
  { value: 150,   suffix: '+', label: 'Products' },
  { value: 5,     suffix: '',  label: 'Years of Excellence' },
  { value: 100,   suffix: '%', label: 'Natural Ingredients' },
]

function CountUp({ target, suffix, start }) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!start) return
    const duration = 1800
    const t0 = performance.now()

    const tick = (now) => {
      const progress = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [start, target])

  return <>{value.toLocaleString('en-IN')}{suffix}</>
}

export default function StatCounter() {
  const [ref, inView] = useInView()

  return (
    <section ref={ref} className="bg-primary-500">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {STATS.map(stat => (
          <div key={stat.label}>
            <p className="font-display text-[32px] md:text-5xl font-bold text-white">
              <CountUp target={stat.value} suffix={stat.suffix} start={inView} />
            </p>
            <p className="text-white/70 text-sm mt-1.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
