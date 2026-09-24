import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * Parses a value like "48h" into a leading number and a trailing unit,
 * counts the number up once when it enters the viewport, then renders the
 * unit as static text. Falls back to the plain value under
 * prefers-reduced-motion or if the value has no leading number.
 */
export default function CountUp({ value, duration = 1.1, className }) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(String(value))
  const target = match ? parseFloat(match[1]) : null
  const suffix = match ? match[2] : ''
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const [display, setDisplay] = useState(reduceMotion || target === null ? target ?? value : 0)

  useEffect(() => {
    if (target === null || reduceMotion || !inView) return undefined
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, target, duration, reduceMotion])

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    )
  }

  const rounded = Number.isInteger(target) ? Math.round(display) : Math.round(display * 10) / 10

  return (
    <span ref={ref} className={className}>
      {rounded}
      {suffix}
    </span>
  )
}
