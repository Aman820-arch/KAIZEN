import { Link } from 'react-router-dom'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function NotFound() {
  return (
    <PagePlaceholder eyebrow="404" title="The page has been set aside.">
      <p>This path is not part of the maison site.</p>
      <Link
        to="/"
        className="mt-8 inline-block text-[12px] tracking-[0.18em] uppercase text-ink"
      >
        Return home
      </Link>
    </PagePlaceholder>
  )
}
