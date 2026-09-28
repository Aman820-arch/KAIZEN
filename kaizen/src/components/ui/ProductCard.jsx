import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../lib/format'
import { cn } from '../../lib/cn'
import TiltCard from './TiltCard'
import WatchPlate from './WatchPlate'

export default function ProductCard({ product, className }) {
  const plateRef = useRef(null)

  function handleMove(event) {
    const el = plateRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }

  return (
    <Link
      to={`/watches/${product.slug}`}
      className={cn('group block', className)}
      onMouseMove={handleMove}
    >
      <TiltCard maxTilt={4} className="relative aspect-[4/5] overflow-hidden bg-ivory">
        <div
          ref={plateRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(120,110,230,0.22), rgba(80,170,190,0.12) 45%, transparent 70%)' }}
        />
        <WatchPlate
          variant={product.collection}
          frame={false}
          className="h-full w-full transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 border border-line transition-colors duration-500 group-hover:border-ink/40" />
        {product.isNew || product.limited ? (
          <span
            style={{ color: 'var(--color-ivory)' }}
            className={cn(
              'absolute left-4 top-4 plate-caption px-2 py-1',
              product.limited ? 'bg-wine/90' : 'bg-sage/90',
            )}
          >
            {product.limited ? 'Limited' : 'New'}
          </span>
        ) : null}
      </TiltCard>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl text-ink">{product.name}</h3>
          <p className="mt-1 text-[13px] text-stone">{product.reference}</p>
        </div>
        <p className="whitespace-nowrap text-[13px] tracking-[0.06em] text-ink">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  )
}
