import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function WordReveal({ text, delay, style }) {
  const words = text.split(' ')
  return (
    <span className="block" style={style}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block' }}>
          <span style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.06em' }}>
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* Transition from ARIA (white) into hero */}
      <div
        className="absolute top-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: '120px', background: 'linear-gradient(to bottom, #ffffff, transparent)' }}
      />

      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.12, transformOrigin: 'center' }}>
        <img src="/hero.png" alt="" className="w-full h-full object-cover" loading="eager" />
      </motion.div>

      {/* Dark overlays */}
      <div className="absolute inset-0" style={{ background: 'rgba(8,8,8,0.72)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full py-32">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-8 h-px bg-white/25" />
          <span className="text-white/45 text-xs font-medium tracking-[0.38em] uppercase">
            Buenos Aires · Argentina
          </span>
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display uppercase mb-12"
          style={{
            fontSize: 'clamp(32px, 6vw, 86px)',
            lineHeight: 1.1,
            letterSpacing: '2px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          <WordReveal
            text="TU OPERACIÓN,"
            delay={0.3}
            style={{ color: '#ffffff', fontWeight: 900 }}
          />
          <WordReveal
            text="EN PILOTO"
            delay={0.48}
            style={{ color: '#888888', fontWeight: 300 }}
          />
          <WordReveal
            text="AUTOMÁTICO."
            delay={0.66}
            style={{ color: '#ffffff', fontWeight: 900 }}
          />
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-lg md:text-xl font-light max-w-lg leading-relaxed mb-14"
          style={{ color: '#cccccc', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
        >
          Construimos sistemas de IA y automatización para que tu negocio
          funcione solo — sin sumar gente, sin fricción.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 bg-white text-kova-dark text-xs font-semibold tracking-[0.18em] uppercase px-10 py-4 hover:bg-white/90 transition-all duration-300"
          >
            Hablemos <span>→</span>
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.75)' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >
            Ver servicios →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3"
      >
        <motion.div
          className="w-px bg-white/20"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 1, delay: 1.6 }}
        />
        <span className="text-white/20 text-[10px] tracking-[0.28em] uppercase">Scroll</span>
      </motion.div>
    </section>
  )
}
