import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Button from '../components/ui/Button'
import WatchPlate from '../components/ui/WatchPlate'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const reference = searchParams.get('ref')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 py-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8 lg:py-24">
      <div>
        <p className="plate-caption">Enquiries</p>
        <h1 className="text-h1 mt-4 max-w-sm text-ink">
          Appointments and questions.
        </h1>
        <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-stone">
          There is no showroom yet — appointments happen at the atelier,
          by request. Write ahead and we will find a time that suits.
        </p>

        <div className="mt-12 max-w-xs">
          <WatchPlate variant="profile" frame={false} className="aspect-[2/1]" />
        </div>

        <dl className="mt-10 space-y-6 border-t border-line pt-8">
          <div>
            <dt className="text-[11px] font-medium tracking-[0.16em] text-ink uppercase">
              Atelier
            </dt>
            <dd className="mt-1 text-[14px] text-stone">By appointment only</dd>
          </div>
          <div>
            <dt className="text-[11px] font-medium tracking-[0.16em] text-ink uppercase">
              Care & service
            </dt>
            <dd className="mt-1 text-[14px] text-stone">care@kaizen.example</dd>
          </div>
        </dl>
      </div>

      <div>
        {submitted ? (
          <div className="border border-line p-10">
            <p className="text-h3 text-ink">Thank you — noted.</p>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-stone">
              Someone from the atelier will reply within two working days,
              usually with a few appointment times to choose from.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {reference ? (
              <p className="border border-line px-4 py-3 text-[13px] text-stone">
                Regarding reference <span className="text-ink">{reference}</span>
              </p>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Full name" name="name" type="text" required />
              <Field label="Email address" name="email" type="email" required />
            </div>
            <Field label="City" name="city" type="text" />
            <div>
              <label
                htmlFor="message"
                className="text-[11px] font-medium tracking-[0.16em] text-ink uppercase"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-3 w-full border border-line bg-transparent px-4 py-3 text-[14px] text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
                placeholder="Tell us what you'd like to see, or when you're free to visit."
              />
            </div>
            <Button type="submit">Send enquiry</Button>
          </form>
        )}
      </div>
    </section>
  )
}

function Field({ label, name, type, required }) {
  return (
    <div>
      <label htmlFor={name} className="text-[11px] font-medium tracking-[0.16em] text-ink uppercase">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-3 w-full border border-line bg-transparent px-4 py-3 text-[14px] text-ink placeholder:text-stone/60 focus:border-ink focus:outline-none"
      />
    </div>
  )
}
