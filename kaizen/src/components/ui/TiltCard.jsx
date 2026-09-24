import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/**
 * A restrained pointer-tracked tilt — a few degrees at most, sprung rather
 * than snapped, and disabled entirely under prefers-reduced-motion. Meant
 * to read as "this surface responds to you," not as a gimmick.
 */
export default function TiltCard({ className, maxTilt = 5, children }) {
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 20, mass: 0.6 }
  const sx = useSpring(px, spring)
  const sy = useSpring(py, spring)

  const rotateX = useTransform(sy, [0, 1], [maxTilt, -maxTilt])
  const rotateY = useTransform(sx, [0, 1], [-maxTilt, maxTilt])

  function handleMouseMove(event) {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - bounds.left) / bounds.width)
    py.set((event.clientY - bounds.top) / bounds.height)
  }

  function handleMouseLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
