import AuroraBackground from './AuroraBackground'

// A moving aurora behind the top of a page: glow at z-0, content at z-10,
// so the layout's paper background can't cover it.
export default function PageGlow({ children }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[620px] overflow-hidden"
        style={{
          mixBlendMode: 'multiply',
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      >
        <AuroraBackground preset="paper" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}
