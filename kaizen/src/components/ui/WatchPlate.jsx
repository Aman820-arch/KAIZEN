import { useEffect, useId, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

/**
 * KAIZEN has no product photography yet. Rather than leave broken <img>
 * tags or generic placeholder blocks, every "image" slot in this build is
 * a hand-drawn technical plate — line-work dials, case profiles, and
 * movement schematics in the vein of a watchmaker's own patent drawings.
 * This is the brand's visual signature until real photography exists.
 *
 * To swap in real photography later: replace <WatchPlate variant="..." />
 * with an <img> inside the same aspect-ratio container. No layout changes
 * needed elsewhere.
 */

// 10:08 is the trade's own convention for a balanced, legible face — used
// whenever a plate isn't showing the real time (or `live` is off).
const DEMO_HOUR_ANGLE = ((10 % 12) / 12) * Math.PI * 2 - Math.PI / 2 + (8 / 60) * (Math.PI / 6)
const DEMO_MINUTE_ANGLE = (8 / 60) * Math.PI * 2 - Math.PI / 2

function angleFromDate(date) {
  const hours = date.getHours() % 12
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return {
    hourAngle: (hours / 12) * Math.PI * 2 - Math.PI / 2 + (minutes / 60) * (Math.PI / 6),
    minuteAngle: (minutes / 60) * Math.PI * 2 - Math.PI / 2 + (seconds / 60) * (Math.PI / 30),
    secondAngle: (seconds / 60) * Math.PI * 2 - Math.PI / 2,
  }
}

// Ticks once a second rather than animating continuously — a real
// mechanical seconds hand steps, it doesn't glide. That keeps this a
// discrete, restrained detail rather than a constantly-moving element,
// and it switches itself off under prefers-reduced-motion.
function useLiveAngles(enabled) {
  const [angles, setAngles] = useState(() =>
    enabled ? angleFromDate(new Date()) : { hourAngle: DEMO_HOUR_ANGLE, minuteAngle: DEMO_MINUTE_ANGLE },
  )

  useEffect(() => {
    if (!enabled) return undefined
    const id = setInterval(() => setAngles(angleFromDate(new Date())), 1000)
    return () => clearInterval(id)
  }, [enabled])

  return angles
}

const TICKS = Array.from({ length: 60 }, (_, i) => i)

function DialTicks({ cx, cy, r, stroke = 'var(--color-ink)' }) {
  return (
    <g>
      {TICKS.map((i) => {
        const angle = (i / 60) * Math.PI * 2 - Math.PI / 2
        const isHour = i % 5 === 0
        const outer = r
        const inner = r - (isHour ? 14 : 6)
        const x1 = cx + Math.cos(angle) * outer
        const y1 = cy + Math.sin(angle) * outer
        const x2 = cx + Math.cos(angle) * inner
        const y2 = cy + Math.sin(angle) * inner
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth={isHour ? 1.4 : 0.6}
            strokeLinecap="round"
            opacity={isHour ? 0.85 : 0.35}
          />
        )
      })}
    </g>
  )
}

function Hands({ cx, cy, hourAngle, minuteAngle, secondAngle, accent = 'var(--color-sage)' }) {
  const hourLen = 62
  const minLen = 92
  const hx = cx + Math.cos(hourAngle) * hourLen
  const hy = cy + Math.sin(hourAngle) * hourLen
  const mx = cx + Math.cos(minuteAngle) * minLen
  const my = cy + Math.sin(minuteAngle) * minLen

  return (
    <g strokeLinecap="round">
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="var(--color-ink)" strokeWidth={4} />
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="var(--color-ink)" strokeWidth={2.6} />
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(minuteAngle + Math.PI) * 20}
        y2={cy + Math.sin(minuteAngle + Math.PI) * 20}
        stroke={accent}
        strokeWidth={1.6}
      />
      {typeof secondAngle === 'number' ? (
        <line
          x1={cx + Math.cos(secondAngle + Math.PI) * 14}
          y1={cy + Math.sin(secondAngle + Math.PI) * 14}
          x2={cx + Math.cos(secondAngle) * 98}
          y2={cy + Math.sin(secondAngle) * 98}
          stroke={accent}
          strokeWidth={0.9}
        />
      ) : null}
      <circle cx={cx} cy={cy} r={5} fill="var(--color-ink)" />
      <circle cx={cx} cy={cy} r={1.6} fill={accent} />
    </g>
  )
}

function HorizonDial({ id, hourAngle, minuteAngle, secondAngle }) {
  const cx = 200
  const cy = 200
  const r = 150

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-labelledby={id}>
      <title id={id}>Line drawing of the Horizon dial, sunburst minute track, 10:08</title>
      <defs>
        <radialGradient id={`${id}-sun`} cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="var(--color-ivory)" />
          <stop offset="100%" stopColor="var(--color-paper)" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="var(--color-ink)" strokeWidth={1.2} opacity={0.5} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-sun)`} stroke="var(--color-ink)" strokeWidth={1.4} />
      {Array.from({ length: 48 }, (_, i) => {
        const angle = (i / 48) * Math.PI * 2
        const x2 = cx + Math.cos(angle) * (r - 2)
        const y2 = cy + Math.sin(angle) * (r - 2)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="var(--color-line)"
            strokeWidth={0.5}
          />
        )
      })}
      <DialTicks cx={cx} cy={cy} r={r - 10} />
      <text x={cx} y={cy - 62} textAnchor="middle" fontFamily="var(--font-serif)" fontSize="15" letterSpacing="0.16em" fill="var(--color-stone)">
        KAIZEN
      </text>
      <Hands cx={cx} cy={cy} hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />
    </svg>
  )
}

function AtelierDial({ id, hourAngle, minuteAngle, secondAngle }) {
  const cx = 200
  const cy = 200
  const r = 150

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-labelledby={id}>
      <title id={id}>Line drawing of the Atelier chronograph dial with two subdials</title>
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="var(--color-ink)" strokeWidth={1.2} opacity={0.5} />
      <circle cx={cx} cy={cy} r={r} fill="var(--color-ivory)" stroke="var(--color-ink)" strokeWidth={1.4} />
      {Array.from({ length: 60 }, (_, i) => {
        const angle = (i / 60) * Math.PI * 2
        const x1 = cx + Math.cos(angle) * (r - 4)
        const y1 = cy + Math.sin(angle) * (r - 4)
        const x2 = cx + Math.cos(angle) * (r - (i % 5 === 0 ? 16 : 9))
        const y2 = cy + Math.sin(angle) * (r - (i % 5 === 0 ? 16 : 9))
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-ink)" strokeWidth={i % 5 === 0 ? 1.2 : 0.5} opacity={i % 5 === 0 ? 0.8 : 0.3} />
        )
      })}
      {[{ x: cx - 55, y: cy }, { x: cx + 55, y: cy }].map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r={34} fill="none" stroke="var(--color-stone)" strokeWidth={1} />
          {Array.from({ length: 12 }, (_, j) => {
            const angle = (j / 12) * Math.PI * 2
            const x1 = pos.x + Math.cos(angle) * 30
            const y1 = pos.y + Math.sin(angle) * 30
            const x2 = pos.x + Math.cos(angle) * 25
            const y2 = pos.y + Math.sin(angle) * 25
            return <line key={j} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-stone)" strokeWidth={0.6} />
          })}
          <line x1={pos.x} y1={pos.y} x2={pos.x + 18} y2={pos.y - 8} stroke="var(--color-sage)" strokeWidth={1.4} strokeLinecap="round" />
        </g>
      ))}
      <Hands cx={cx} cy={cy} hourAngle={hourAngle} minuteAngle={minuteAngle} secondAngle={secondAngle} />
    </svg>
  )
}

function NocturneDial({ id, hourAngle, minuteAngle, secondAngle }) {
  const cx = 200
  const cy = 200
  const r = 150

  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-labelledby={id}>
      <title id={id}>Line drawing of the Nocturne dial with a moon-phase aperture at twelve</title>
      <circle cx={cx} cy={cy} r={r + 8} fill="none" stroke="var(--color-ivory)" strokeWidth={1.2} opacity={0.6} />
      <circle cx={cx} cy={cy} r={r} fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth={1.4} />
      <DialTicks cx={cx} cy={cy} r={r - 10} stroke="var(--color-ivory)" />
      <g>
        <path
          d={`M ${cx - 34} ${cy - 92} a 34 34 0 1 0 68 0 a 26 26 0 1 1 -68 0`}
          fill="var(--color-paper)"
          opacity={0.9}
        />
        <circle cx={cx} cy={cy - 92} r={38} fill="none" stroke="var(--color-ivory)" strokeWidth={1} opacity={0.5} />
      </g>
      <g strokeLinecap="round">
        <line x1={cx} y1={cy} x2={cx + Math.cos(hourAngle) * 62} y2={cy + Math.sin(hourAngle) * 62} stroke="var(--color-ivory)" strokeWidth={4} />
        <line x1={cx} y1={cy} x2={cx + Math.cos(minuteAngle) * 92} y2={cy + Math.sin(minuteAngle) * 92} stroke="var(--color-ivory)" strokeWidth={2.6} />
        {typeof secondAngle === 'number' ? (
          <line
            x1={cx + Math.cos(secondAngle + Math.PI) * 14}
            y1={cy + Math.sin(secondAngle + Math.PI) * 14}
            x2={cx + Math.cos(secondAngle) * 98}
            y2={cy + Math.sin(secondAngle) * 98}
            stroke="var(--color-sage)"
            strokeWidth={0.9}
          />
        ) : null}
        <circle cx={cx} cy={cy} r={5} fill="var(--color-ivory)" />
      </g>
    </svg>
  )
}

function MovementSchematic({ id }) {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-labelledby={id}>
      <title id={id}>Exploded line schematic of an automatic movement — barrel, gear train, and balance</title>
      <path
        d="M70 130 C70 90 110 60 160 60 L260 60 C310 60 340 100 335 150 L330 260 C328 300 300 340 250 340 L120 340 C85 340 60 310 62 270 Z"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={1.1}
        opacity={0.5}
      />
      <circle cx={150} cy={150} r={55} fill="none" stroke="var(--color-ink)" strokeWidth={1.4} />
      <circle cx={150} cy={150} r={6} fill="var(--color-ink)" />
      <circle cx={255} cy={140} r={34} fill="none" stroke="var(--color-stone)" strokeWidth={1.1} />
      <circle cx={255} cy={140} r={4} fill="var(--color-stone)" />
      <circle cx={230} cy={225} r={22} fill="none" stroke="var(--color-stone)" strokeWidth={1.1} />
      <circle cx={230} cy={225} r={3} fill="var(--color-stone)" />
      <circle cx={280} cy={250} r={62} fill="none" stroke="var(--color-sage)" strokeWidth={1.6} />
      <circle cx={280} cy={250} r={44} fill="none" stroke="var(--color-sage)" strokeWidth={0.7} opacity={0.6} />
      {Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2
        const x1 = 280 + Math.cos(angle) * 62
        const y1 = 250 + Math.sin(angle) * 62
        const x2 = 280 + Math.cos(angle) * 68
        const y2 = 250 + Math.sin(angle) * 68
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-sage)" strokeWidth={1} />
      })}
      {[
        [150, 150],
        [255, 140],
        [230, 225],
        [190, 190],
        [110, 220],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill="var(--color-ink)" opacity={0.7} />
      ))}
      <line x1={150} y1={150} x2={255} y2={140} stroke="var(--color-line)" strokeWidth={0.6} />
      <line x1={255} y1={140} x2={230} y2={225} stroke="var(--color-line)" strokeWidth={0.6} />
      <line x1={230} y1={225} x2={280} y2={250} stroke="var(--color-line)" strokeWidth={0.6} />
    </svg>
  )
}

function CaseProfile({ id, diameter = '40', thickness = '10.2' }) {
  return (
    <svg viewBox="0 0 420 220" className="h-full w-full" role="img" aria-labelledby={id}>
      <title id={id}>Side profile drawing of the case with dimension lines</title>
      <path
        d="M60 110 C60 96 72 86 90 86 L100 70 C104 62 112 58 120 58 L280 58 C288 58 296 62 300 70 L310 86 C328 86 340 96 340 110 C340 124 328 134 310 134 L300 150 C296 158 288 162 280 162 L120 162 C112 162 104 158 100 150 L90 134 C72 134 60 124 60 110 Z"
        fill="var(--color-ivory)"
        stroke="var(--color-ink)"
        strokeWidth={1.3}
      />
      <circle cx={342} cy={104} r={7} fill="none" stroke="var(--color-sage)" strokeWidth={1.3} />
      <rect x="349" y="99" width="10" height="10" rx="2" fill="none" stroke="var(--color-sage)" strokeWidth={1.1} />
      <line x1={60} y1={40} x2={340} y2={40} stroke="var(--color-stone)" strokeWidth={0.7} />
      <line x1={60} y1={34} x2={60} y2={46} stroke="var(--color-stone)" strokeWidth={0.7} />
      <line x1={340} y1={34} x2={340} y2={46} stroke="var(--color-stone)" strokeWidth={0.7} />
      <text x="200" y="30" textAnchor="middle" fontSize="11" letterSpacing="0.08em" fill="var(--color-stone)" fontFamily="var(--font-sans)">
        ⌀ {diameter}mm
      </text>
      <line x1={362} y1={86} x2={362} y2={134} stroke="var(--color-stone)" strokeWidth={0.7} />
      <line x1={356} y1={86} x2={368} y2={86} stroke="var(--color-stone)" strokeWidth={0.7} />
      <line x1={356} y1={134} x2={368} y2={134} stroke="var(--color-stone)" strokeWidth={0.7} />
      <text x="372" y="113" fontSize="10" letterSpacing="0.02em" fill="var(--color-stone)" fontFamily="var(--font-sans)">
        {thickness}mm
      </text>
    </svg>
  )
}

const VARIANTS = {
  horizon: HorizonDial,
  atelier: AtelierDial,
  nocturne: NocturneDial,
  movement: MovementSchematic,
  profile: CaseProfile,
}

// Local custom-property overrides so a single illustration can sit on a
// dark section (e.g. the collection showcase) without a second set of
// SVGs — the shapes are identical, only the token values are swapped.
const DARK_TONE_VARS = {
  '--color-ink': 'var(--color-ivory)',
  '--color-ivory': 'var(--color-ink)',
  '--color-paper': 'var(--color-ink)',
  '--color-stone': '#a8a49a',
  '--color-line': 'rgba(250, 248, 244, 0.18)',
}

export default function WatchPlate({
  variant = 'horizon',
  className,
  frame = true,
  tone = 'light',
  live = false,
  caption,
  diameter,
  thickness,
  ...rest
}) {
  const Illustration = VARIANTS[variant] ?? HorizonDial
  const reactId = useId()
  const id = `plate-${variant}-${reactId.replace(/[^a-zA-Z0-9]/g, '')}`
  const isDark = tone === 'dark'
  const reduceMotion = useReducedMotion()
  const hasHands = variant === 'horizon' || variant === 'atelier' || variant === 'nocturne'
  const { hourAngle, minuteAngle, secondAngle } = useLiveAngles(live && hasHands && !reduceMotion)

  return (
    <div
      style={isDark ? DARK_TONE_VARS : undefined}
      className={cn(
        'relative flex flex-col justify-between overflow-hidden',
        frame && (isDark ? 'bg-ink corner-ticks border border-ivory/15' : 'bg-ivory corner-ticks border border-line'),
        className,
      )}
    >
      <div className="flex flex-1 items-center justify-center p-6">
        <Illustration
          id={id}
          diameter={diameter}
          thickness={thickness}
          hourAngle={hourAngle}
          minuteAngle={minuteAngle}
          secondAngle={live && hasHands && !reduceMotion ? secondAngle : undefined}
          {...rest}
        />
      </div>
      {caption ? (
        <div
          className={cn(
            'flex items-center justify-between border-t px-4 py-2.5',
            isDark ? 'border-ivory/15' : 'border-line',
          )}
        >
          <span className={cn('plate-caption', isDark && 'text-ivory/50')}>{caption}</span>
        </div>
      ) : null}
    </div>
  )
}
