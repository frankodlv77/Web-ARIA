import { useState } from 'react'
import { motion } from 'framer-motion'

const PACKAGES = [
  {
    num: '01',
    name: 'Diseño & Desarrollo',
    tagline: 'Tu presencia digital, construida para convertir.',
    items: ['Páginas web', 'Apps web', 'Software a medida', 'Branding e Identidad'],
  },
  {
    num: '02',
    name: 'Automatización e IA',
    tagline: 'Sistemas que trabajan mientras vos dormís.',
    items: ['Automatizaciones con n8n', 'Agentes de IA', 'Integraciones a medida'],
  },
  {
    num: '03',
    name: 'Marketing & Crecimiento',
    tagline: 'Visibilidad, comunidad y ventas en escala.',
    items: ['Marketing digital', 'Gestión de RRSS', 'Publicidad en Ads', 'SEO & Posicionamiento'],
  },
]

function PackageCard({ pkg, i }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#F0EDE6' : '#FAFAF8',
        borderColor: hovered ? '#2A2A2A' : '#E5E2DC',
        transition: 'background 0.3s ease, border-color 0.3s ease',
        padding: '40px 36px 48px',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Número */}
      <span style={{
        fontSize: '10px', fontWeight: 500, letterSpacing: '0.3em',
        color: '#AAAAAA', display: 'block', marginBottom: '28px',
      }}>
        {pkg.num}
      </span>

      {/* Nombre */}
      <h3 style={{
        fontSize: 'clamp(22px, 2.5vw, 34px)',
        fontWeight: 700,
        color: '#2A2A2A',
        lineHeight: 1.15,
        marginBottom: '12px',
      }}>
        {pkg.name}
      </h3>

      {/* Tagline */}
      <p style={{
        fontSize: '14px',
        color: '#888888',
        lineHeight: 1.6,
        marginBottom: '32px',
      }}>
        {pkg.tagline}
      </p>

      {/* Divisor */}
      <div style={{ height: '1px', background: '#E5E2DC', marginBottom: '24px' }} />

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {pkg.items.map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '10px', color: hovered ? '#2A2A2A' : '#AAAAAA', transition: 'color 0.3s ease' }}>→</span>
            <span style={{ fontSize: '13px', color: '#555555', letterSpacing: '0.01em' }}>{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Servicios() {
  return (
    <section id="servicios" style={{ background: '#FAFAF8' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-24 md:pb-36">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: '32px', height: '1px', background: '#2A2A2A' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#888' }}>
              Lo que hacemos
            </span>
          </div>
          <h2
            style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 700, color: '#2A2A2A', lineHeight: 1.1, maxWidth: '640px' }}
          >
            Construimos. Automatizamos.<br />
            <em className="not-italic" style={{ color: '#AAAAAA' }}>Posicionamos.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#E5E2DC' }}>
          {PACKAGES.map((pkg, i) => (
            <PackageCard key={pkg.num} pkg={pkg} i={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
