import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const links = [
  { to: '/collection', label: 'Collection' },
  { to: '/maison', label: 'Maison' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-paper/95 backdrop-blur transition-[border-color] duration-500',
        scrolled ? 'border-line' : 'border-transparent',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-300 lg:px-8',
          scrolled ? 'h-14 lg:h-16' : 'h-16 lg:h-18',
        )}
      >
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
              className="group relative py-2 text-[11px] font-medium tracking-[0.22em] text-stone uppercase transition-colors duration-300 hover:text-ink"
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-ink' : ''}>{link.label}</span>
                  <span
                    className={cn(
                      'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-editorial group-hover:scale-x-100',
                      isActive && 'scale-x-100',
                    )}
                  />
                </>
              )}
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

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-5 px-6 py-6">
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
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
