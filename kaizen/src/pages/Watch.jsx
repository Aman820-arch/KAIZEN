import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import SpecList from '../components/ui/SpecList'
import WatchPlate from '../components/ui/WatchPlate'
import { cn } from '../lib/cn'
import { formatPrice } from '../lib/format'
import { getProductBySlug, getProductsByCollection } from '../data/products'
import PagePlaceholder from '../components/ui/PagePlaceholder'

const VIEWS = [
  { id: 'face', label: 'Dial' },
  { id: 'profile', label: 'Profile' },
]

export default function Watch() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)
  const [view, setView] = useState('face')
  const [strap, setStrap] = useState(product?.strapOptions?.[0])

  const related = useMemo(() => {
    if (!product) return []
    return getProductsByCollection(product.collection)
      .filter((item) => item.id !== product.id)
      .slice(0, 3)
  }, [product])

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
    <>
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-24 lg:px-8 lg:pt-14 lg:pb-32">
        <nav className="text-[12px] text-stone" aria-label="Breadcrumb">
          <Link to="/collection" className="hover:text-ink">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <WatchPlate
              variant={view === 'face' ? product.collection : 'profile'}
              diameter={product.specs.diameter?.replace('mm', '')}
              thickness={product.specs.thickness?.replace('mm', '')}
              caption={`Fig. ${view === 'face' ? '01' : '02'} — ${product.name}, ${view === 'face' ? 'dial' : 'case profile'}`}
              className="aspect-[4/5] w-full"
            />
            <div className="mt-4 flex gap-3">
              {VIEWS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  className={cn(
                    'border px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-300',
                    view === v.id
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-line text-stone hover:border-ink hover:text-ink',
                  )}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="plate-caption">{product.reference}</p>
            <h1 className="text-h1 mt-3 text-ink">{product.name}</h1>
            <p className="mt-4 text-xl text-ink">
              {formatPrice(product.price, product.currency)}
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone">
              {product.description}
            </p>

            {product.strapOptions?.length ? (
              <div className="mt-8">
                <p className="text-[11px] font-medium tracking-[0.16em] text-ink uppercase">
                  Strap — {strap}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.strapOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setStrap(option)}
                      className={cn(
                        'border px-3.5 py-2 text-[12px] transition-colors duration-300',
                        strap === option
                          ? 'border-ink bg-ink text-ivory'
                          : 'border-line text-stone hover:border-ink hover:text-ink',
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                as={Link}
                to={`/contact?ref=${encodeURIComponent(product.reference)}`}
                className="sm:w-fit"
              >
                Enquire about this piece
              </Button>
              <Button as={Link} to="/contact" variant="outline" className="sm:w-fit">
                Book a fitting
              </Button>
            </div>

            <div className="mt-14">
              <h2 className="text-[11px] font-medium tracking-[0.16em] text-ink uppercase">
                Specification
              </h2>
              <div className="mt-4">
                <SpecList specs={product.specs} caliber={product.caliber} />
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-[11px] font-medium tracking-[0.16em] text-ink uppercase">
                The piece
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-stone">{product.story}</p>
            </div>

            <div className="mt-10 border-t border-line pt-6 text-[13px] leading-relaxed text-stone">
              Two-year movement warranty. Complimentary sizing and a
              first service reminder at year three, arranged directly with
              the atelier.
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <Reveal as="section" className="border-t border-line bg-ivory">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
            <p className="plate-caption">Also in this line</p>
            <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </Reveal>
      ) : null}
    </>
  )
}
