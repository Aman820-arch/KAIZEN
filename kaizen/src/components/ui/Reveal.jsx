import { motion, useReducedMotion } from 'framer-motion'

/**
 * A single, deliberate reveal for a section as it enters the viewport.
 * Intentionally not used per-card or per-list-item — see frontend design
 * notes: scattered per-item reveals read as generic. Apply this once at
 * the section or section-heading level.
 */
export default function Reveal({
  as: Component = motion.div,
  delay = 0,
  y = 18,
  className,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion()

  return (
    <Component
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}
