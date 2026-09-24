import { Link } from 'react-router-dom'
import WatchPlate from '../components/ui/WatchPlate'

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8 lg:py-32">
      <div>
        <p className="plate-caption">404</p>
        <h1 className="text-h1 mt-4 max-w-sm text-ink">
          This page has been set aside.
        </h1>
        <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-stone">
          The reference you're looking for isn't part of the current
          collection — or the address has a typo.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-[12px] font-medium tracking-[0.18em] text-ink uppercase"
        >
          Return home
        </Link>
      </div>
      <WatchPlate variant="nocturne" frame={false} className="aspect-square w-full max-w-sm opacity-60" />
    </section>
  )
}
