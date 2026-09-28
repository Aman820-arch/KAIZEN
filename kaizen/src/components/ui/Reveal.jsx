import { motion, useReducedMotion } from 'framer-motion'

/**
 * A single, deliberate reveal for a section as it enters the viewport.
 * Intentionally not used per-card or per-list-item — see frontend design
 * notes: scattered per-item reveals read as generic. Apply this once at
 * the section or section-heading level.
 */
export default function Reveal({
  as = 'div',
  delay = 0,
  y = 18,
  className,
  children,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  // `motion` exposes every intrinsic tag dynamically (motion.section,
  // motion.div, ...) — resolving the string here (rather than accepting
  // a raw tag name as the rendered Component) is what makes the
  // whileInView/initial props below actually take effect.
  const Component = motion[as] ?? motion.div

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
