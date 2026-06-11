import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.15, triggerOnce = true } = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (triggerOnce) observer.disconnect()
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, triggerOnce])

  return [ref, isInView]
}

export default useInView
