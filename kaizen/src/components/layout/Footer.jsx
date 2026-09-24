import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Maison',
    links: [
      { to: '/maison', label: 'Our story' },
      { to: '/collection', label: 'Timepieces' },
      { to: '/contact', label: 'Ateliers' },
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
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8 lg:py-20">
        <div>
          <Link
            to="/"
            className="font-serif text-3xl tracking-[0.28em] text-ink"
          >
            KAIZEN
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone">
            Continuous refinement. Timepieces made with patience, proportion,
            and a quiet sense of craft.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-ink">
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
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-[11px] tracking-[0.14em] uppercase text-stone sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} KAIZEN Maison</p>
          <p>Crafted in small series</p>
        </div>
      </div>
    </footer>
  )
}
