import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    status: 'Análisis inicial',
    name: 'Diagnóstico',
    duration: '2–3 días',
    desc: 'Mapeamos tu operación completa. Procesos, herramientas, cuellos de botella. Definimos exactamente dónde el impacto es mayor antes de escribir una línea de código.',
    delivers: ['Mapa de procesos', 'Puntos críticos', 'Plan de acción'],
  },
  {
    num: '02',
    status: 'Sprint de build',
    name: 'Construcción',
    duration: '2–4 semanas',
    desc: 'Diseñamos y construimos a medida — web, app, automatización o agente de IA. Todo responde al diagnóstico. Sin genéricos, sin excesos.',
    delivers: ['Sistema funcional', 'Testing en vivo', 'Iteraciones rápidas'],
  },
  {
    num: '03',
    status: 'Activación',
    name: 'Lanzamiento',
    duration: 'Continuo',
    desc: 'Lanzamos, medimos y optimizamos. Tu operación corre sola. Seguimos iterando para que siempre funcione al máximo.',
    delivers: ['Deploy en producción', 'Métricas de impacto', 'Soporte continuo'],
  },
]

const CIRCLE = 44

export default function Proceso() {
  return (
    <section id="proceso" style={{ background: '#F0EDE6' }} className="py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 md:mb-28"
        >
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: '32px', height: '1px', background: '#2A2A2A' }} />
            <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#888888' }}>
              Cómo trabajamos
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700, color: '#2A2A2A', lineHeight: 1.1, margin: 0 }}>
            De cero a sistema<br />
            <span style={{ color: '#AAAAAA', fontWeight: 400 }}>en semanas.</span>
          </h2>
        </motion.div>

        {/* ── Desktop: 3 columnas con línea conectora ── */}
        <div className="hidden md:block relative">
          {/* Línea horizontal entre círculos */}
          <div style={{
            position: 'absolute',
            top: `${CIRCLE / 2}px`,
            left: `calc(100% / 6)`,
            right: `calc(100% / 6)`,
            height: '1px',
            background: '#C8C4BC',
            zIndex: 0,
          }} />

          <div className="grid grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="px-8 pb-4 flex flex-col items-center text-center"
              >
                {/* Círculo numerado */}
                <div style={{ position: 'relative', zIndex: 1, marginBottom: '20px' }}>
                  <div style={{
                    width: `${CIRCLE}px`, height: `${CIRCLE}px`, borderRadius: '50%',
                    background: '#2A2A2A', color: '#FAFAF8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em',
                  }}>
                    {step.num}
                  </div>
                </div>

                {/* Status */}
                <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '14px' }}>
                  {step.status}
                </p>

                {/* Nombre + duración */}
                <div className="flex items-baseline justify-center gap-2 flex-wrap mb-4">
                  <h3 style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 700, color: '#2A2A2A', lineHeight: 1.1, margin: 0 }}>
                    {step.name}
                  </h3>
                  <span style={{
                    fontSize: '10px', fontWeight: 500, color: '#AAAAAA',
                    border: '1px solid #C8C4BC', padding: '2px 9px', borderRadius: '999px', whiteSpace: 'nowrap',
                  }}>
                    {step.duration}
                  </span>
                </div>

                <div style={{ width: '32px', height: '1px', background: '#C8C4BC', marginBottom: '16px' }} />

                {/* Descripción */}
                <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#888888', marginBottom: '20px', maxWidth: '260px' }}>
                  {step.desc}
                </p>

                {/* Entregables */}
                <div className="flex flex-col items-center gap-2">
                  {step.delivers.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', color: '#AAAAAA' }}>→</span>
                      <span style={{ fontSize: '11px', color: '#666666', letterSpacing: '0.02em' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Mobile: stack vertical con línea izquierda ── */}
        <div className="md:hidden">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex gap-6 pb-12"
            >
              {/* Línea vertical hacia abajo (excepto último) */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: `${CIRCLE / 2 - 1}px`,
                  top: `${CIRCLE}px`,
                  bottom: 0,
                  width: '1px',
                  background: '#C8C4BC',
                }} />
              )}

              {/* Círculo */}
              <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: `${CIRCLE}px`, height: `${CIRCLE}px`, borderRadius: '50%',
                  background: '#2A2A2A', color: '#FAFAF8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700,
                }}>
                  {step.num}
                </div>
              </div>

              {/* Contenido */}
              <div style={{ paddingTop: '8px', flex: 1 }}>
                <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#AAAAAA', marginBottom: '10px' }}>
                  {step.status}
                </p>
                <div className="flex items-baseline gap-2 flex-wrap mb-3">
                  <h3 style={{ fontSize: 'clamp(22px, 6vw, 32px)', fontWeight: 700, color: '#2A2A2A', lineHeight: 1.1, margin: 0 }}>
                    {step.name}
                  </h3>
                  <span style={{
                    fontSize: '10px', fontWeight: 500, color: '#AAAAAA',
                    border: '1px solid #C8C4BC', padding: '2px 9px', borderRadius: '999px', whiteSpace: 'nowrap',
                  }}>
                    {step.duration}
                  </span>
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#888888', marginBottom: '12px' }}>
                  {step.desc}
                </p>
                <div className="flex flex-col gap-1">
                  {step.delivers.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '10px', color: '#AAAAAA' }}>→</span>
                      <span style={{ fontSize: '12px', color: '#666666' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
