import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Servicios',    href: '#servicios' },
  { label: 'Por qué KOVA', href: '#por-que-kova' },
  { label: 'ARIA',         href: '#aria' },
  { label: 'Contacto',     href: '#contacto' },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [onHero,    setOnHero]    = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const update = () => {
      const y  = window.scrollY
      const vh = window.innerHeight
      setScrolled(y > 60)
      // Hero is 2nd section, starts after ARIA (~100vh), ends around 200vh
      setOnHero(y >= vh * 0.75 && y <= vh * 2.1)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  // Color scheme: white text over Hero (dark bg), dark text everywhere else
  const dark = onHero
  const textColor  = dark ? 'text-white'                          : 'text-kova-dark'
  const mutedColor = dark ? 'text-white/60 hover:text-white'      : 'text-kova-gray hover:text-kova-dark'
  const bgClass    = dark
    ? 'bg-transparent'
    : scrolled
      ? 'bg-kova-bg/95 backdrop-blur-sm border-b border-kova-dark/8'
      : 'bg-transparent'

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">

          <a href="/" className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${textColor}`}>
            KOVA
          </a>

          <nav className="hidden md:flex items-center gap-10">
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

          {/* "Hablemos" — ghost border, nunca naranja */}
          <a
            href="#contacto"
            className={`hidden md:inline-flex text-xs font-medium px-5 py-2.5 tracking-[0.12em] uppercase border transition-all duration-300 ${
              dark
                ? 'border-white/40 text-white hover:border-white hover:bg-white/5'
                : 'border-kova-dark/30 text-kova-dark hover:border-kova-dark hover:bg-kova-dark/5'
            }`}
          >
            Hablemos
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Menú"
          >
            <span className={`block w-6 h-px transition-colors duration-300 ${dark ? 'bg-white' : 'bg-kova-dark'}`} />
            <span className={`block w-6 h-px transition-colors duration-300 ${dark ? 'bg-white' : 'bg-kova-dark'}`} />
            <span className={`block w-4 h-px transition-colors duration-300 ${dark ? 'bg-white' : 'bg-kova-dark'}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-kova-bg border-b border-kova-dark/10 px-6 py-10 flex flex-col gap-8"
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
              Hablemos
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
