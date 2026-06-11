import { motion } from 'framer-motion'

const REASONS = [
  {
    num: '01',
    headline: 'Implementamos.\nNo consultamos.',
    desc: 'El entregable es el sistema corriendo, integrado a tu operación real. Sin diagnósticos interminables, sin PDFs que nadie lee.',
  },
  {
    num: '02',
    headline: 'Sin números,\nsin contrato.',
    desc: 'Medimos tiempo ahorrado, leads procesados, conversiones reales. Si no hay resultado que se mida, no hay trabajo que valga.',
  },
  {
    num: '03',
    headline: 'Tu stack.\nTu ritmo.',
    desc: 'Nos adaptamos a las herramientas que ya usás. Sin migraciones forzadas, sin meses de onboarding, sin sorpresas.',
  },
]

export default function PorQueKova() {
  return (
    <section
      id="por-que-kova"
      className="py-24 md:py-36 overflow-hidden relative"
      style={{
        // Fondo claro con textura de puntos — tech, minimalista
        backgroundColor: '#F2F1EE',
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.09) 1px, transparent 1px)',
        backgroundSize: '26px 26px',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-28"
        >
          <p className="text-kova-accent text-xs tracking-[0.3em] uppercase mb-4">
            Por qué elegirnos
          </p>

          {/* Orange line */}
          <motion.div
            className="h-px mb-6"
            style={{ background: '#E8501A' }}
            initial={{ width: 0 }}
            whileInView={{ width: '40px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <h2 className="font-serif text-4xl md:text-6xl font-bold text-kova-dark max-w-xl leading-tight">
            La competencia<br />
            <em className="not-italic text-kova-gray">todavía lo hace a mano.</em>
          </h2>
        </motion.div>

        {/* Reasons */}
        <div className="divide-y divide-kova-dark/10">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-16 py-14 md:py-16 items-start"
            >
              <span className="text-kova-accent text-xs font-medium tracking-[0.2em]">
                {r.num}
              </span>

              <h3
                className="font-serif font-bold text-kova-dark leading-tight whitespace-pre-line"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                {r.headline}
              </h3>

              <p className="text-kova-gray text-sm md:text-base leading-relaxed lg:pt-2 max-w-md">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-kova-dark/10 flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between"
        >
          <p className="font-serif text-2xl md:text-3xl font-bold text-kova-dark">
            ¿Listo para automatizar?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 border border-kova-dark/25 text-kova-dark text-xs font-medium tracking-[0.15em] uppercase px-8 py-4 hover:border-kova-dark/60 transition-all"
          >
            Hablemos →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
