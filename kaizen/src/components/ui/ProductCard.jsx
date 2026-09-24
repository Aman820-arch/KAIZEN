import { Link } from 'react-router-dom'
import { formatPrice } from '../../lib/format'
import { cn } from '../../lib/cn'
import TiltCard from './TiltCard'
import WatchPlate from './WatchPlate'

export default function ProductCard({ product, className }) {
  return (
    <Link
      to={`/watches/${product.slug}`}
      className={cn('group block', className)}
    >
      <TiltCard maxTilt={4} className="relative aspect-[4/5] overflow-hidden bg-ivory">
        <WatchPlate
          variant={product.collection}
          frame={false}
          className="h-full w-full transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 border border-line transition-colors duration-500 group-hover:border-ink/40" />
        {product.isNew || product.limited ? (
          <span className="absolute left-4 top-4 plate-caption bg-paper/90 px-2 py-1">
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
