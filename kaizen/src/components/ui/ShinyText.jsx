import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * Adapted from React Bits' ShinyText (reactbits.dev, MIT + Commons
 * Clause): a highlight that periodically sweeps across text, like light
 * moving over a brushed-metal dial. Inline styles instead of a CSS file;
 * holds still under prefers-reduced-motion.
 */
export default function ShinyText({
  children,
  className,
  color = 'var(--color-stone)',
  shineColor = 'var(--color-brass)',
  speed = 3.5,
  pause = 2.5,
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
    const sweep = speed * 1000
    const cycle = sweep + pause * 1000
    const t = elapsed.current % cycle
    progress.set(t < sweep ? (t / sweep) * 100 : 100)
  })

  const backgroundPosition = useTransform(progress, (p) => `${150 - p * 2}% center`)

  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: `linear-gradient(110deg, ${color} 0%, ${color} 38%, ${shineColor} 50%, ${color} 62%, ${color} 100%)`,
        backgroundSize: '200% auto',
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
