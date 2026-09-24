import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import PagePlaceholder from '../components/ui/PagePlaceholder'

export default function Home() {
  return (
    <PagePlaceholder eyebrow="KAIZEN" title="The maison website begins here.">
      <p>
        This is a structural placeholder. The cinematic homepage will be designed
        in the next phase.
      </p>
      <Button as={Link} to="/collection" className="mt-10">
        View collection
      </Button>
    </PagePlaceholder>
  )
}
