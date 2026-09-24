import { Link } from 'react-router-dom'
import { products } from '../data/products'
import { formatPrice } from '../lib/format'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function Collection() {
  return (
    <PagePlaceholder
      eyebrow="Timepieces"
      title="A small, considered collection."
    >
      <p>Catalog presentation will be built next. The mock catalog is already wired.</p>
      <ul className="mt-12 flex flex-col gap-4 text-ink">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              to={`/watches/${product.slug}`}
              className="group flex flex-wrap items-baseline justify-between gap-4 border-b border-line py-4"
            >
              <span className="font-serif text-2xl group-hover:text-sage">
                {product.name}
              </span>
              <span className="text-[12px] tracking-[0.16em] uppercase text-stone">
                {formatPrice(product.price, product.currency)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PagePlaceholder>
  )
}
