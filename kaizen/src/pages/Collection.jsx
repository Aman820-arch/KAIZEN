import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import { cn } from '../lib/cn'
import { collections, products } from '../data/products'

export default function Collection() {
  const [active, setActive] = useState('all')
  const reduceMotion = useReducedMotion()

  const filtered = useMemo(() => {
    if (active === 'all') return products
    return products.filter((product) => product.collection === active)
  }, [active])

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 lg:px-8 lg:pt-24">
        <p className="plate-caption">Timepieces</p>
        <h1 className="text-h1 mt-4 max-w-xl text-ink">
          A small, considered collection.
        </h1>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-stone">
          Four references across three lines. Each is kept in production
          until a genuine improvement is ready to replace it — not on a
          seasonal calendar.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-line py-4">
          <button
            type="button"
            onClick={() => setActive('all')}
            className={cn(
              'text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-300',
              active === 'all' ? 'text-ink' : 'text-stone hover:text-ink',
            )}
          >
            All references
          </button>
          {collections.map((collection) => (
            <button
              key={collection.id}
              type="button"
              onClick={() => setActive(collection.slug)}
              className={cn(
                'text-[12px] font-medium tracking-[0.16em] uppercase transition-colors duration-300',
                active === collection.slug ? 'text-ink' : 'text-stone hover:text-ink',
              )}
            >
              {collection.name}
            </button>
          ))}
        </div>
      </section>

      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        {filtered.length ? (
          <motion.div layout={!reduceMotion} className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <motion.div
                  key={product.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p className="text-stone">No references in this line yet.</p>
        )}
      </Reveal>
    </>
  )
}
