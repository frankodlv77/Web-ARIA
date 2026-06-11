import { motion } from 'framer-motion'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Intro() {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: '#F8F7F4', padding: '100px 24px 80px' }}
    >
      {/* Top label */}
      <motion.div {...fade(0)} className="flex items-center gap-3 mb-8">
        <div className="w-6 h-px" style={{ background: '#0A0A0A' }} />
        <span
          className="text-[10px] font-semibold tracking-[0.35em] uppercase"
          style={{ color: '#888888' }}
        >
          Automatización · Marketing · IA
        </span>
        <div className="w-6 h-px" style={{ background: '#0A0A0A' }} />
      </motion.div>

      {/* Headline */}
      <motion.h1
        {...fade(0.1)}
        className="font-display font-black uppercase leading-none mb-5"
        style={{
          fontSize: 'clamp(36px, 6.5vw, 92px)',
          letterSpacing: '-1px',
          color: '#0A0A0A',
          maxWidth: '860px',
        }}
      >
        Sistemas de IA
        <br />
        <span style={{ color: '#555555', fontWeight: 300 }}>que trabajan</span>
        <br />
        por vos.
      </motion.h1>

      {/* Subline */}
      <motion.p
        {...fade(0.22)}
        className="font-sans text-base md:text-lg font-light leading-relaxed mb-10"
        style={{ color: '#888888', maxWidth: '460px' }}
      >
        Automatizamos procesos, respondemos clientes y escalamos
        tu negocio — sin sumar personal, sin fricción.
      </motion.p>

      {/* CTA → ARIA */}
      <motion.a
        {...fade(0.32)}
        href="#aria"
        className="flex flex-col items-center gap-2"
        style={{ textDecoration: 'none' }}
      >
        <span
          className="text-xs font-semibold tracking-[0.28em] uppercase"
          style={{ color: '#0A0A0A' }}
        >
          Hablá con ARIA ahora
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: '#0A0A0A', fontSize: '18px', lineHeight: 1 }}
        >
          ↓
        </motion.div>
      </motion.a>

      {/* Bottom gradient into ARIA white */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '60px', background: 'linear-gradient(to bottom, transparent, #ffffff)' }}
      />
    </section>
  )
}
