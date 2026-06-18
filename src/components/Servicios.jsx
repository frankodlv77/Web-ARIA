import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

/* ── Desktop card (sin cambios) ── */
function DesktopCard({ pkg, i }) {
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
      <span style={{
        fontSize: '10px', fontWeight: 500, letterSpacing: '0.3em',
        color: '#AAAAAA', display: 'block', marginBottom: '28px',
      }}>
        {pkg.num}
      </span>
      <h3 style={{
        fontSize: 'clamp(22px, 2.5vw, 34px)',
        fontWeight: 700, color: '#2A2A2A', lineHeight: 1.15, marginBottom: '12px',
      }}>
        {pkg.name}
      </h3>
      <p style={{ fontSize: '14px', color: '#888888', lineHeight: 1.6, marginBottom: '32px' }}>
        {pkg.tagline}
      </p>
      <div style={{ height: '1px', background: '#E5E2DC', marginBottom: '24px' }} />
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

/* ── Mobile accordion item ── */
function AccordionItem({ pkg, i }) {
  const [open, setOpen] = useState(i === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      style={{ borderBottom: '1px solid #E5E2DC' }}
    >
      {/* Header tap */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
          {/* Número como badge */}
          <span style={{
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em',
            color: open ? '#2A2A2A' : '#AAAAAA',
            background: open ? '#F0EDE6' : '#F5F2EB',
            padding: '5px 10px',
            borderRadius: '999px',
            flexShrink: 0,
            transition: 'all 0.25s ease',
          }}>
            {pkg.num}
          </span>
          {/* Nombre */}
          <span style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#2A2A2A',
            lineHeight: 1.2,
          }}>
            {pkg.name}
          </span>
        </div>
        {/* Chevron */}
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: '22px',
            fontWeight: 300,
            color: open ? '#2A2A2A' : '#AAAAAA',
            flexShrink: 0,
            lineHeight: 1,
            display: 'block',
            userSelect: 'none',
          }}
        >
          +
        </motion.span>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: '28px' }}>
              {/* Tagline */}
              <p style={{
                fontSize: '13px',
                color: '#888888',
                lineHeight: 1.65,
                marginBottom: '20px',
                fontStyle: 'italic',
              }}>
                {pkg.tagline}
              </p>
              {/* Items como tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {pkg.items.map(item => (
                  <span key={item} style={{
                    fontSize: '12px',
                    color: '#2A2A2A',
                    background: '#F0EDE6',
                    border: '1px solid #E5E2DC',
                    borderRadius: '999px',
                    padding: '6px 14px',
                    letterSpacing: '0.01em',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 700, color: '#2A2A2A', lineHeight: 1.1, maxWidth: '640px' }}>
            Construimos. Automatizamos.<br />
            <em className="not-italic" style={{ color: '#AAAAAA' }}>Posicionamos.</em>
          </h2>
        </motion.div>

        {/* Mobile: accordion */}
        <div className="md:hidden" style={{ borderTop: '1px solid #E5E2DC' }}>
          {PACKAGES.map((pkg, i) => (
            <AccordionItem key={pkg.num} pkg={pkg} i={i} />
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-px" style={{ background: '#E5E2DC' }}>
          {PACKAGES.map((pkg, i) => (
            <DesktopCard key={pkg.num} pkg={pkg} i={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
