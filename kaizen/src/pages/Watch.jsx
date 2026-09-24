import { Link, useParams } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { formatPrice } from '../lib/format'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function Watch() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <PagePlaceholder eyebrow="Archive" title="This timepiece is not listed.">
        <p>The reference could not be found in the current collection.</p>
        <Link
          to="/collection"
          className="mt-8 inline-block text-[12px] tracking-[0.18em] uppercase text-ink"
        >
          Return to collection
        </Link>
      </PagePlaceholder>
    )
  }

  return (
    <PagePlaceholder eyebrow={product.reference} title={product.name}>
      <p>{product.description}</p>
      <p className="mt-4 text-ink">
        {formatPrice(product.price, product.currency)}
      </p>
      <p className="mt-8 text-sm">
        Full product storytelling and imagery will be designed next.
      </p>
    </PagePlaceholder>
  )
}
