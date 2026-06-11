import { useState } from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    name: 'Diagnóstico',
    desc: 'Analizamos tu operación completa — procesos, herramientas, cuellos de botella. Identificamos exactamente dónde la IA genera más impacto.',
  },
  {
    num: '02',
    name: 'Construcción',
    desc: 'Diseñamos y construimos los sistemas a medida: agentes de IA, automatizaciones, integraciones. Sin soluciones genéricas.',
  },
  {
    num: '03',
    name: 'Entrega',
    desc: 'Lanzamos, medimos y optimizamos. Tu operación corre sola. Nosotros seguimos iterando para que siempre funcione al máximo.',
  },
]

function StepRow({ step, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '1px solid rgba(10,10,10,0.1)',
        padding: '40px 0',
        display: 'grid',
        gridTemplateColumns: '64px 1fr 1fr',
        alignItems: 'center',
        gap: '32px',
        cursor: 'default',
        transition: 'padding-left 0.35s ease',
        paddingLeft: hovered ? '20px' : '0px',
        borderLeft: hovered ? '2px solid #0A0A0A' : '2px solid transparent',
      }}
    >
      {/* Number */}
      <span
        style={{
          fontSize: '11px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          letterSpacing: '0.2em',
          color: hovered ? '#0A0A0A' : '#aaaaaa',
          transition: 'color 0.3s ease',
          userSelect: 'none',
        }}
      >
        {step.num}
      </span>

      {/* Step name */}
      <h3
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5.5vw, 80px)',
          color: '#0A0A0A',
          lineHeight: 1,
          letterSpacing: '-1px',
          textTransform: 'uppercase',
          margin: 0,
          transition: 'transform 0.35s ease',
          transform: hovered ? 'translateX(6px)' : 'translateX(0)',
        }}
      >
        {step.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          lineHeight: 1.65,
          color: hovered ? '#555555' : '#888888',
          margin: 0,
          maxWidth: '360px',
          transition: 'color 0.3s ease',
        }}
      >
        {step.desc}
      </p>
    </motion.div>
  )
}

export default function Proceso() {
  return (
    <section
      id="proceso"
      style={{ background: '#F8F7F4', padding: '100px 0 80px' }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '1px', background: '#0A0A0A' }} />
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: '#888888',
              }}
            >
              Cómo trabajamos
            </span>
          </div>
          <p
            style={{
              fontSize: '13px',
              fontFamily: 'Inter, sans-serif',
              color: '#aaaaaa',
              margin: 0,
            }}
          >
            Tres pasos. Sin vueltas.
          </p>
        </motion.div>

        {/* Steps */}
        {STEPS.map((step, i) => (
          <StepRow key={step.num} step={step} index={i} />
        ))}

        {/* Bottom line */}
        <div style={{ borderTop: '1px solid rgba(10,10,10,0.1)' }} />
      </div>
    </section>
  )
}
