import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Adapted from React Bits' GradientText (reactbits.dev, MIT + Commons
 * Clause). Same technique — an oversized gradient slid behind clipped
 * text via useAnimationFrame — trimmed to an inline headline span
 * (the original is styled as a pill badge) and made reduced-motion safe.
 */
export default function GradientText({
  children,
  className,
  colors = ['#ffffff', '#f0e7ff', '#c8ecff', '#ffe3f1'],
  speed = 10,
}) {
  const reduceMotion = useReducedMotion()
  const progress = useMotionValue(0)
  const elapsed = useRef(0)
  const last = useRef(null)

  useAnimationFrame((time) => {
    if (reduceMotion) return
    if (last.current === null) {
      last.current = time
      return
    }
    elapsed.current += time - last.current
    last.current = time
    const cycle = speed * 1000
    const t = (elapsed.current % (cycle * 2)) / cycle
    progress.set((t <= 1 ? t : 2 - t) * 100)
  })

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`)
  const gradient = `linear-gradient(to right, ${[...colors, colors[0]].join(', ')})`

  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: gradient,
        backgroundSize: '300% 100%',
        backgroundPosition,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {children}
    </motion.span>
  )
}
