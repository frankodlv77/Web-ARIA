import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contacto() {
  const [form,   setForm]   = useState({ nombre: '', email: '', mensaje: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('err')
      setStatus('ok')
      setForm({ nombre: '', email: '', mensaje: '' })
    } catch {
      setStatus('error')
    }
  }

  const btnStyle = {
    base:      { background: '#1A1A1A', color: '#FAFAF8' },
    hover:     { background: '#F0EDE6', color: '#2A2A2A' },
  }

  return (
    <section id="contacto" className="bg-kova-bg py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: '32px', height: '1px', background: '#2A2A2A' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#888' }}>
              Contacto
            </span>
          </div>

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-kova-dark leading-[0.88] mb-6">
            Trabajemos<br />juntos.
          </h2>
          <p className="text-kova-gray text-base md:text-lg leading-relaxed max-w-lg">
            Contanos qué necesitás. En menos de 24 horas te respondemos
            con un diagnóstico claro y un plan concreto.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === 'ok' ? (
              <div className="py-16 border-t border-kova-border">
                <p className="font-serif text-2xl font-bold text-kova-dark mb-3">
                  Mensaje recibido.
                </p>
                <p className="text-kova-gray text-sm">
                  Te respondemos en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                {[
                  { name: 'nombre', label: 'Nombre',                type: 'text',  placeholder: 'Tu nombre'             },
                  { name: 'email',  label: 'Email',                  type: 'email', placeholder: 'hola@tuempresa.com'    },
                ].map(f => (
                  <div key={f.name} className="border-t border-kova-border py-5 flex flex-col gap-1">
                    <label className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase">
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type={f.type}
                      required
                      value={form[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      className="bg-transparent text-kova-dark text-base outline-none placeholder-kova-dark/20 pt-1"
                    />
                  </div>
                ))}

                <div className="border-t border-kova-border py-5 flex flex-col gap-1">
                  <label className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase">
                    ¿En qué te podemos ayudar?
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={4}
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Contanos sobre tu negocio y lo que necesitás..."
                    className="bg-transparent text-kova-dark text-base outline-none placeholder-kova-dark/20 pt-1 resize-none"
                  />
                </div>

                <div className="border-t border-kova-border pt-6 flex items-center gap-6">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.15em] uppercase px-8 py-4 disabled:opacity-50 transition-all"
                    style={btnStyle.base}
                    onMouseEnter={e => Object.assign(e.currentTarget.style, btnStyle.hover)}
                    onMouseLeave={e => Object.assign(e.currentTarget.style, btnStyle.base)}
                  >
                    {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                    {status !== 'sending' && <span className="text-base">→</span>}
                  </button>
                  {status === 'error' && (
                    <p className="text-red-500 text-xs">
                      Hubo un error. Intentá por WhatsApp.
                    </p>
                  )}
                </div>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-10">
              <div className="border-t border-kova-border pt-6">
                <p className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase mb-3">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/5492615336300"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.15em] uppercase px-8 py-4 transition-all"
                  style={btnStyle.base}
                  onMouseEnter={e => Object.assign(e.currentTarget.style, btnStyle.hover)}
                  onMouseLeave={e => Object.assign(e.currentTarget.style, btnStyle.base)}
                >
                  Escribinos directo →
                </a>
              </div>

              <div className="border-t border-kova-border pt-6">
                <p className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase mb-3">
                  Email
                </p>
                <a
                  href="mailto:hola@kova-systems.com"
                  className="text-kova-dark text-base hover:text-kova-gray transition-colors"
                >
                  hola@kova-systems.com
                </a>
              </div>

              <div className="border-t border-kova-border pt-6">
                <p className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase mb-3">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/kovasystems_ia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kova-dark text-base hover:text-kova-gray transition-colors"
                >
                  @vorastudio
                </a>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-kova-border">
              <p className="text-kova-dark/25 text-xs">
                Respondemos en menos de 24h.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <footer className="mt-24 md:mt-32 pt-12 border-t border-kova-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            {/* Brand */}
            <div>
              <p className="font-bold text-xl text-kova-dark mb-3">VORA</p>
              <p className="text-sm text-kova-gray leading-relaxed max-w-xs mb-5">
                Diseño, desarrollo y automatización con IA para negocios que quieren escalar.
              </p>
              <div style={{ borderTop: '1px solid #E5E2DC', paddingTop: '16px' }}>
                <p style={{ fontSize: '11px', color: '#2A2A2A', fontWeight: 600, marginBottom: '8px' }}>
                  Franco De La Vega — Fundador
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.linkedin.com/in/franco-delavega/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kova-dark transition-colors"
                    style={{ color: '#AAAAAA', display: 'flex', alignItems: 'center', gap: '6px' }}
                    title="LinkedIn"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <span style={{ fontSize: '11px', letterSpacing: '0.05em' }}>LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/franco.de.la.vega/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-kova-dark transition-colors"
                    style={{ color: '#AAAAAA', display: 'flex', alignItems: 'center', gap: '6px' }}
                    title="Instagram"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                    <span style={{ fontSize: '11px', letterSpacing: '0.05em' }}>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '16px' }}>
                Secciones
              </p>
              {[
                { label: 'ARIA',       href: '#aria'       },
                { label: 'Servicios',  href: '#servicios'  },
                { label: 'Proceso',    href: '#proceso'    },
                ].map(l => (
                <a key={l.label} href={l.href}
                  className="block text-sm text-kova-dark hover:text-kova-gray transition-colors mb-2">
                  {l.label}
                </a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '16px' }}>
                Contacto
              </p>
              <a href="https://wa.me/5492615336300" target="_blank" rel="noopener noreferrer"
                className="block text-sm text-kova-dark hover:text-kova-gray transition-colors mb-2">
                WhatsApp
              </a>
              <a href="mailto:hola@kova-systems.com"
                className="block text-sm text-kova-dark hover:text-kova-gray transition-colors mb-2">
                hola@kova-systems.com
              </a>
              <a href="https://www.instagram.com/kovasystems_ia/" target="_blank" rel="noopener noreferrer"
                className="block text-sm text-kova-dark hover:text-kova-gray transition-colors">
                Instagram
              </a>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-t border-kova-border pt-6">
            <span className="text-xs text-kova-dark/25">© 2026 VORA Studio</span>
            <span className="text-xs text-kova-dark/25">Diseño · Desarrollo · IA</span>
          </div>
        </footer>

      </div>
    </section>
  )
}
