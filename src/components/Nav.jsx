import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso',   href: '#proceso'   },
  { label: 'ARIA',      href: '#aria'      },
  { label: 'Contacto',  href: '#contacto'  },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [onHero,   setOnHero]   = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const update = () => {
      const y  = window.scrollY
      const vh = window.innerHeight
      setScrolled(y > 60)
      // Hero section: starts after AriaChat (~100vh), ends before Servicios (~200vh).
      // Range 0.9–1.85 keeps white text strictly inside the dark hero photo.
      setOnHero(y >= vh * 0.9 && y <= vh * 1.85)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  const dark = onHero
  const textColor  = dark ? 'text-white'                     : 'text-kova-dark'
  const mutedColor = dark ? 'text-white/60 hover:text-white' : 'text-kova-gray hover:text-kova-dark'
  const bgClass    = dark
    ? 'bg-transparent'
    : scrolled
      ? 'bg-kova-bg/95 backdrop-blur-sm border-b border-kova-border'
      : 'bg-transparent'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${bgClass}`}>
        <div className="px-6 md:px-12 h-16 md:h-20 grid grid-cols-3 items-center">

          <a href="/" className="flex flex-col gap-[2px] leading-none group justify-self-start">
            <span className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${textColor}`}>
              VORA
            </span>
            <span
              className="text-[7px] font-medium tracking-[0.55em] uppercase transition-colors duration-300"
              style={{ color: dark ? 'rgba(255,255,255,0.35)' : 'rgba(42,42,42,0.35)' }}
            >
              ARIA
            </span>
          </a>

          <nav className="hidden md:flex items-center justify-center gap-10">
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={`text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${mutedColor}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className={`hidden md:inline-flex justify-self-end text-xs font-medium px-5 py-2.5 tracking-[0.12em] uppercase border transition-all duration-300 ${
              dark
                ? 'border-white/40 text-white hover:border-white hover:bg-white/5'
                : 'border-kova-dark/30 text-kova-dark hover:border-kova-dark hover:bg-kova-dark/5'
            }`}
          >
            Contacto
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 col-start-3 justify-self-end"
            aria-label="Menú"
          >
            <span className={`block w-6 h-px transition-colors duration-300 ${dark ? 'bg-white' : 'bg-kova-dark'}`} />
            <span className={`block w-6 h-px transition-colors duration-300 ${dark ? 'bg-white' : 'bg-kova-dark'}`} />
            <span className={`block w-4 h-px transition-colors duration-300 ${dark ? 'bg-white' : 'bg-kova-dark'}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-[9998] bg-kova-bg border-b border-kova-border px-6 py-10 flex flex-col gap-8"
          >
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl text-kova-dark font-bold"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium border border-kova-dark/30 text-kova-dark px-6 py-4 text-center tracking-[0.1em] uppercase"
            >
              Contacto
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
