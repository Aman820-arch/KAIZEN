import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const links = [
  { to: '/collection', label: 'Collection' },
  { to: '/maison', label: 'Maison' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:h-[4.5rem] lg:px-8">
        <Link
          to="/"
          className="font-serif text-[1.35rem] tracking-[0.28em] text-ink"
          onClick={() => setOpen(false)}
        >
          KAIZEN
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'text-[11px] font-medium tracking-[0.22em] uppercase text-stone transition-colors duration-300 hover:text-ink',
                  isActive && 'text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden text-ink transition-opacity duration-300 hover:opacity-60 md:inline-flex"
            aria-label="Search"
          >
            <Search size={18} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            className="text-ink transition-opacity duration-300 hover:opacity-60"
            aria-label="Bag"
          >
            <ShoppingBag size={18} strokeWidth={1.4} />
          </button>
          <button
            type="button"
            className="text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} strokeWidth={1.4} /> : <Menu size={20} strokeWidth={1.4} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line px-6 py-6 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-5">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'text-[12px] font-medium tracking-[0.22em] uppercase text-stone',
                      isActive && 'text-ink',
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
