import { useReducedMotion } from 'framer-motion'
import Aurora from './Aurora'
import { cn } from '../../lib/cn'

// Two curated presets rather than exposing every shader knob — sage +
// brass on paper for light sections, sage + wine on ink for dark ones.
// Both stay inside KAIZEN's existing palette rather than introducing an
// unrelated "hero gradient" color.
const PRESETS = {
  paper: {
    color1: '#b9a2ea',
    color2: '#4f9db5',
    lightMode: true,
    brightness: 0.4,
    scale: 1.5,
    speed: 0.35,
    noiseAmplitude: 1.0,
    bandSpread: 1.0,
    bandHeight: 0.5,
    mouseInfluence: 0.06,
    blend: 'multiply',
  },
  ink: {
    color1: '#4f6058',
    color2: '#8a4a56',
    lightMode: false,
    brightness: 1.3,
    scale: 1.6,
    speed: 0.3,
    noiseAmplitude: 1.0,
    bandSpread: 1.0,
    bandHeight: 0.5,
    mouseInfluence: 0.05,
    blend: 'screen',
  },
}

const STATIC_FALLBACK = {
  paper: 'radial-gradient(120% 90% at 15% 0%, rgba(150,120,220,0.18), transparent 60%), radial-gradient(120% 90% at 85% 100%, rgba(60,130,160,0.16), transparent 60%)',
  ink: 'radial-gradient(120% 90% at 20% 10%, rgba(59,70,64,0.55), transparent 60%), radial-gradient(120% 90% at 80% 90%, rgba(107,53,65,0.5), transparent 60%)',
}

export default function AuroraBackground({ preset = 'paper', className, fade = true, fadeShape = '100% 100% at 50% 50%' }) {
  const reduceMotion = useReducedMotion()
  const { blend, ...settings } = PRESETS[preset] ?? PRESETS.paper

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{
        mixBlendMode: blend,
        ...(fade
          ? { maskImage: `radial-gradient(${fadeShape}, black 55%, transparent 100%)`, WebkitMaskImage: `radial-gradient(${fadeShape}, black 55%, transparent 100%)` }
          : {}),
      }}
    >
      {reduceMotion ? (
        <div className="h-full w-full" style={{ background: STATIC_FALLBACK[preset] ?? STATIC_FALLBACK.paper }} />
      ) : (
        <Aurora className="h-full w-full" {...settings} />
      )}
    </div>
  )
}
