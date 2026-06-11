import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

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

  return (
    <section id="contacto" className="bg-kova-bg py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <p className="text-kova-accent text-xs tracking-[0.3em] uppercase mb-4">
            Empezamos cuando querés
          </p>

          {/* Orange line — grows left to right */}
          <motion.div
            className="h-px mb-8"
            style={{ background: '#E8501A' }}
            initial={{ width: 0 }}
            whileInView={{ width: '40px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-kova-dark leading-[0.88] mb-6">
            Hablemos.
          </h2>
          <p className="text-kova-gray text-base md:text-lg leading-relaxed max-w-lg">
            Contanos sobre tu negocio. En menos de 24 horas te respondemos
            con un diagnóstico claro y un plan concreto.
          </p>
        </motion.div>

        {/* Two-col: form + CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === 'ok' ? (
              <div className="py-16 border-t border-kova-dark/10">
                <p className="font-serif text-2xl font-bold text-kova-dark mb-3">
                  Mensaje recibido.
                </p>
                <p className="text-kova-gray text-sm">
                  Te respondemos en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                <div className="border-t border-kova-dark/10 py-5 flex flex-col gap-1">
                  <label className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase">
                    Nombre
                  </label>
                  <input
                    name="nombre"
                    type="text"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className="bg-transparent text-kova-dark text-base outline-none placeholder-kova-dark/20 pt-1"
                  />
                </div>

                <div className="border-t border-kova-dark/10 py-5 flex flex-col gap-1">
                  <label className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="hola@tuempresa.com"
                    className="bg-transparent text-kova-dark text-base outline-none placeholder-kova-dark/20 pt-1"
                  />
                </div>

                <div className="border-t border-kova-dark/10 py-5 flex flex-col gap-1">
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

                <div className="border-t border-kova-dark/10 pt-6 flex items-center gap-6">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-3 bg-kova-accent text-white text-xs font-medium tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#c43d12] disabled:opacity-50 transition-colors"
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

          {/* Right: direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-10">
              <div className="border-t border-kova-dark/10 pt-6">
                <p className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase mb-3">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/5493468649674"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-kova-accent text-white text-xs font-medium tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#c43d12] transition-colors"
                >
                  Escribinos directo →
                </a>
              </div>

              <div className="border-t border-kova-dark/10 pt-6">
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

              <div className="border-t border-kova-dark/10 pt-6">
                <p className="text-[10px] font-medium tracking-[0.2em] text-kova-gray uppercase mb-3">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/kovasystems_ia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-kova-dark text-base hover:text-kova-gray transition-colors"
                >
                  @kovasystems_ia
                </a>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-kova-dark/10">
              <p className="text-kova-dark/25 text-xs">
                Respondemos en menos de 24h · Buenos Aires, Argentina
              </p>
            </div>
          </motion.div>

        </div>

        {/* Footer */}
        <div className="mt-24 md:mt-32 pt-8 border-t border-kova-dark/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-serif font-bold text-kova-dark text-lg">KOVA</span>
          <span className="text-kova-dark/20 text-xs tracking-wide">
            © 2026 KOVA Systems · Argentina
          </span>
        </div>

      </div>
    </section>
  )
}
