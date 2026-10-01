import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuroraBackground from '../components/ui/AuroraBackground'
import GradientText from '../components/ui/GradientText'
import Eyebrow from '../components/ui/Eyebrow'
import Button from '../components/ui/Button'
import IridescentBackdrop from '../components/ui/IridescentBackdrop'
import ProductCard from '../components/ui/ProductCard'
import Reveal from '../components/ui/Reveal'
import WatchPlate from '../components/ui/WatchPlate'
import { journal, philosophy } from '../data/content'
import { collections, getFeaturedProducts, getProductBySlug } from '../data/products'
import { formatPrice } from '../lib/format'

export default function Home() {
  const featured = getFeaturedProducts()
  const spotlight = getProductBySlug('horizon-40')

  return (
    <>
      {/* ————— Hero ————— */}
      <section className="relative overflow-hidden">
        <AuroraBackground preset="paper" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-8 lg:pt-20 lg:pb-28">
          <div>
            <Eyebrow>Est. this decade — Atelier watches</Eyebrow>
            <h1 className="text-display mt-6 max-w-xl text-ink">
              Time, refined in small steps.
            </h1>
            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-stone">
              KAIZEN builds a small number of references and revises each one
              until the proportions stop asking for changes. No seasonal
              drops, no seven-figure heritage claims — just a steel case
              drawn slightly better than the last one.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Button as={Link} to="/collection">
                View the collection
              </Button>
              <Link
                to="/maison"
                className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] text-ink uppercase"
              >
                Read the philosophy
                <ArrowRight
                  size={14}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div className="relative">
            <WatchPlate
              variant="horizon"
              live
              caption="Fig. 01 — Horizon 40, Ref. KZ.HZ.40.01"
              className="aspect-4/5 w-full"
            />
          </div>
        </div>
      </section>

      {/* ————— Intro statement ————— */}
      <section className="border-y border-line bg-ivory">
        <Reveal className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
          <p className="text-h2 mx-auto max-w-3xl text-ink">
            Three collections. One habit: get the details a little more
            right than the reference before it.
          </p>
        </Reveal>
      </section>

      {/* ————— Featured watch spotlight ————— */}
      {spotlight ? (
        <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <WatchPlate
              variant={spotlight.collection}
              caption={`Fig. 02 — ${spotlight.name}`}
              className="aspect-4/5 w-full lg:aspect-3/4"
            />
            <div className="flex flex-col justify-center">
              <p className="plate-caption">{spotlight.reference}</p>
              <h2 className="text-h1 mt-4 text-ink">{spotlight.name}</h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone">
                {spotlight.story}
              </p>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-lg text-ink">
                  {formatPrice(spotlight.price, spotlight.currency)}
                </span>
                <span className="text-[13px] text-stone">
                  Caliber {spotlight.caliber}
                </span>
              </div>
              <Button
                as={Link}
                to={`/watches/${spotlight.slug}`}
                variant="outline"
                className="mt-8 w-fit"
              >
                View reference
              </Button>
            </div>
          </div>
        </Reveal>
      ) : null}

      {/* ————— Collection showcase — varied composition, not a card grid ————— */}
      <section className="relative overflow-hidden text-ivory">
        <IridescentBackdrop />
        <Reveal className="relative z-10 mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <Eyebrow tone="dark">The collections</Eyebrow>
        </Reveal>
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-px bg-ivory/15 px-6 pb-16 sm:grid-cols-2 lg:px-8 lg:pb-24">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to="/collection"
              className={`group relative flex flex-col justify-end overflow-hidden bg-ink/25 p-8 backdrop-blur-[2px] ${
                index === 0 ? 'sm:col-span-2 aspect-16/8' : 'aspect-4/3'
              }`}
            >
              <div
                className={`absolute inset-y-0 right-0 flex items-center justify-center opacity-90 transition-opacity duration-500 group-hover:opacity-100 ${
                  index === 0 ? 'w-1/2 lg:w-2/5' : 'w-3/5'
                }`}
              >
                <div className="aspect-square w-full max-w-60">
                  <WatchPlate variant={collection.slug} live frame={false} className="h-full w-full drop-shadow-[0_10px_30px_rgba(20,15,60,0.45)]" />
                </div>
              </div>
              <div className="relative">
                <h3 className="font-serif text-2xl text-ivory lg:text-3xl">
                  {collection.name}
                </h3>
                <p className="mt-2 max-w-xs text-sm text-ivory/85">{collection.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] text-ivory uppercase">
                  Explore
                  <ArrowRight
                    size={13}
                    strokeWidth={1.6}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ————— Craftsmanship teaser ————— */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="aspect-square w-full max-w-sm">
            <WatchPlate variant="movement" caption="Fig. 03 — Movement schematic" />
          </div>
          <div>
            <Eyebrow>In the atelier</Eyebrow>
            <h2 className="text-h1 mt-4 max-w-sm text-ink">
              One watchmaker, from first sketch to final timing.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-stone">
              Every case passes through five stages before it earns a
              reference number, and the same person who cases the movement
              also wears it for a week before signing off.
            </p>
            <Link
              to="/maison"
              className="group mt-8 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.18em] text-ink uppercase"
            >
              See how it's made
              <ArrowRight
                size={14}
                strokeWidth={1.6}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Reveal>

      {/* ————— Philosophy pillars ————— */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <p className="plate-caption">{philosophy.kicker}</p>
          <p className="text-h2 mt-4 text-ink">{philosophy.statement}</p>
        </div>
        <div className="mt-16 grid gap-12 border-t border-line pt-12 md:grid-cols-3 md:gap-8">
          {philosophy.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="text-ink">{pillar.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-stone">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ————— Featured products ————— */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Current references</Eyebrow>
            <h2 className="text-h1 mt-4 text-ink">A small, considered lineup.</h2>
          </div>
          <Link
            to="/collection"
            className="text-[12px] font-medium tracking-[0.18em] text-ink uppercase"
          >
            View all
          </Link>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Reveal>

      {/* ————— Journal teaser ————— */}
      <section className="border-t border-line bg-ivory">
        <Reveal className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-28">
          <Eyebrow>Notes</Eyebrow>
          <h2 className="text-h2 mt-4 max-w-lg text-ink">
            Occasional writing on design, movements, and manufacturing.
          </h2>
          <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-3">
            {journal.map((entry) => (
              <div key={entry.title}>
                <p className="plate-caption">{entry.tag}</p>
                <h3 className="mt-3 font-serif text-xl text-ink">{entry.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-stone">{entry.excerpt}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ————— Closing CTA ————— */}
      <Reveal as="section" className="relative overflow-hidden text-ivory">
        <IridescentBackdrop />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-32">
          <h2 className="text-h1 max-w-lg text-ivory">
            <GradientText>See a reference in person, by appointment.</GradientText>
          </h2>
          <Button as={Link} to="/contact" variant="outline" className="border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink">
            Request an appointment
          </Button>
        </div>
      </Reveal>
    </>
  )
}
