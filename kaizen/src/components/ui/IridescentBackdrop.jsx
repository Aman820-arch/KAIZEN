import { useReducedMotion } from 'framer-motion'
import Iridescence from './Iridescence'
import { cn } from '../../lib/cn'

// A single "sapphire" tint — evokes the sapphire-crystal glass every
// KAIZEN case uses, and reads as jewel-toned rather than a full RGB
// rainbow because the shader's internal hue variation is scaled by this
// one muted, mostly-blue triple.
const SAPPHIRE = [0.5, 0.56, 0.86]

const STATIC_FALLBACK =
  'radial-gradient(120% 90% at 15% 10%, rgba(60,81,120,0.9), transparent 60%), radial-gradient(120% 90% at 85% 90%, rgba(107,53,65,0.7), transparent 60%), #241a2e'

export default function IridescentBackdrop({ className, scrim = true, speed = 0.5, amplitude = 0.06 }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} style={{ background: '#241a2e' }}>
      {reduceMotion ? (
        <div className="h-full w-full" style={{ background: STATIC_FALLBACK }} />
      ) : (
        <Iridescence className="h-full w-full" color={SAPPHIRE} speed={speed} amplitude={amplitude} mouseReact />
      )}
      {scrim ? <div className="absolute inset-0 bg-[#1e1a3a]/15" /> : null}
    </div>
  )
}
