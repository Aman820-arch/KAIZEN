import PageGlow from '../components/ui/PageGlow'
import { Link } from 'react-router-dom'
import IridescentBackdrop from '../components/ui/IridescentBackdrop'
import GradientText from '../components/ui/GradientText'
import Eyebrow from '../components/ui/Eyebrow'
import Button from '../components/ui/Button'
import CountUp from '../components/ui/CountUp'
import Reveal from '../components/ui/Reveal'
import WatchPlate from '../components/ui/WatchPlate'
import { craftSteps, founderQuote, philosophy } from '../data/content'

const stats = [
  { value: '1', label: 'Watchmaker per piece' },
  { value: '5', label: 'Build stages' },
  { value: '3', label: 'Collections' },
  { value: '48h', label: 'Minimum power reserve' },
]

export default function Maison() {
  return (
    <PageGlow>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-14 lg:px-8 lg:pt-24 lg:pb-20">
        <Eyebrow>Maison</Eyebrow>
        <h1 className="text-h1 mt-4 max-w-2xl text-ink">
          Continuous refinement, applied to a wristwatch.
        </h1>
        <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-stone">
          KAIZEN began three years ago as a disagreement with the idea that
          a young watch brand needs an invented heritage. We would rather
          be honest about our age and specific about our standards.
        </p>
      </section>

      <div className="border-y border-line bg-ivory">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-serif text-3xl text-ink">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-1 text-[12px] tracking-[0.06em] text-stone">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Founding story */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow>Fig. 04 — Case, side profile</Eyebrow>
            <div className="mt-4 aspect-[2/1]">
              <WatchPlate variant="profile" caption={null} />
            </div>
          </div>
          <div className="max-w-md">
            <h2 className="text-h2 text-ink">Why the name.</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-stone">
              Kaizen — the practice of continuous, incremental
              improvement — was born on Japanese manufacturing floors and
              has since been borrowed by almost every industry that makes
              physical things well. We borrowed it too, because it
              describes watchmaking more honestly than most of the
              language the industry uses on itself.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-stone">
              We do not claim two centuries of history. We claim close
              attention: to a chamfer, a regulation curve, a clasp
              mechanism, revised one small step at a time until it earns
              the next reference number.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Craftsmanship — full process */}
      <section className="border-y border-line bg-ivory">
        <Reveal className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <Eyebrow>The process</Eyebrow>
          <h2 className="text-h1 mt-4 max-w-lg text-ink">Five stages, one watchmaker.</h2>
          <ol className="mt-14 grid gap-x-12 gap-y-12 divide-y divide-line border-t border-line sm:grid-cols-2 sm:divide-y-0 sm:border-t-0">
            {craftSteps.map((step) => (
              <li key={step.index} className="pt-10 first:pt-0 sm:border-t sm:border-line sm:pt-10">
                <span className="font-serif text-3xl text-stone">{step.index}</span>
                <h3 className="mt-3 text-ink">{step.title}</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-stone">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Founder quote */}
      <Reveal as="section" className="mx-auto max-w-4xl px-6 py-24 lg:py-32">
        <p className="text-h2 text-ink">“{founderQuote.quote}”</p>
        <p className="mt-8 text-[13px] tracking-[0.1em] text-stone uppercase">
          {founderQuote.name} — {founderQuote.role}
        </p>
      </Reveal>

      {/* Values in practice */}
      <section className="border-t border-line bg-ivory">
        <Reveal className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
          <Eyebrow>In practice</Eyebrow>
          <h2 className="text-h2 mt-4 max-w-lg text-ink">
            {philosophy.statement}
          </h2>
          <div className="mt-14 grid gap-12 border-t border-line pt-12 md:grid-cols-3 md:gap-8">
            {philosophy.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="text-ink">{pillar.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-stone">{pillar.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Reveal as="section" className="relative overflow-hidden text-ivory">
        <IridescentBackdrop />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-24 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-32">
          <h2 className="text-h1 max-w-lg text-ivory">
            <GradientText>Come see a reference before you decide.</GradientText>
          </h2>
          <Button
            as={Link}
            to="/contact"
            variant="outline"
            className="border-ivory/30 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink"
          >
            Request an appointment
          </Button>
        </div>
      </Reveal>
    </PageGlow>
  )
}
