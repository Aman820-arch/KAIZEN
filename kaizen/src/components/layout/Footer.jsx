import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Maison',
    links: [
      { to: '/maison', label: 'Our story' },
      { to: '/collection', label: 'Timepieces' },
      { to: '/maison', label: 'Craftsmanship' },
    ],
  },
  {
    title: 'Client',
    links: [
      { to: '/contact', label: 'Enquiries' },
      { to: '/contact', label: 'Care' },
      { to: '/contact', label: 'Appointments' },
    ],
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!email) return
    setSent(true)
  }

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-16 md:grid-cols-[1.3fr_0.8fr_0.8fr_1.1fr] lg:px-8 lg:py-20">
        <div>
          <Link to="/" className="font-serif text-3xl tracking-[0.28em] text-ink">
            KAIZEN
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone">
            Continuous refinement. Timepieces made with patience, proportion,
            and a quiet sense of craft.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-[11px] font-medium tracking-[0.22em] text-ink uppercase">
              {column.title}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={`${column.title}-${link.label}`}>
                  <Link
                    to={link.to}
                    className="text-sm text-stone transition-colors duration-300 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-ink uppercase">
            Correspondence
          </p>
          <p className="mt-5 text-sm leading-relaxed text-stone">
            Notes on design, from the atelier, a few times a year. No
            product mail.
          </p>
          {sent ? (
            <p className="mt-4 text-sm text-sage">You are on the list.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex items-end gap-3 border-b border-ink/30 pb-2">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="w-full bg-transparent text-sm text-ink placeholder:text-stone/70 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="shrink-0 text-ink transition-transform duration-300 hover:translate-x-0.5 hover:-translate-y-0.5"
              >
                <ArrowUpRight size={18} strokeWidth={1.4} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-[11px] tracking-[0.14em] text-stone uppercase sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} KAIZEN Maison</p>
          <p>Crafted in small series</p>
        </div>
      </div>
    </footer>
  )
}
