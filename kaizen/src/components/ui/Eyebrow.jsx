import ShinyText from './ShinyText'

// Section eyebrow label: the plate-caption typography with a slow
// brass sheen passing over it. `tone="dark"` is for the jewel-toned
// sections, where the base color is ivory instead of stone.
export default function Eyebrow({ children, tone = 'light', className = '' }) {
  return (
    <p className={`plate-caption ${className}`}>
      <ShinyText
        color={tone === 'dark' ? 'rgba(250,248,244,0.65)' : 'var(--color-stone)'}
        shineColor={tone === 'dark' ? '#ffffff' : 'var(--color-brass)'}
      >
        {children}
      </ShinyText>
    </p>
  )
}
