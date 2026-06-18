import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const PHRASES = [
  { main: 'Tu tiempo',    accent: 'vale.' },
  { main: 'ARIA',         accent: 'no descansa.' },
  { main: 'Automatizá.',  accent: 'Escalá.' },
  { main: 'Esto es',      accent: 'VORA.' },
]

export default function AriaManifesto() {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Mobile: zoom dramático 1.0 → 1.8 / Desktop: sutil 1.0 → 1.12
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.0, isMobile ? 1.8 : 1.12])
  const ariaScale = useSpring(rawScale, { stiffness: isMobile ? 40 : 60, damping: isMobile ? 15 : 20 })

  // Phrase 0: 0% → 25%
  const op0 = useTransform(scrollYProgress, [0, 0.08, 0.2, 0.25], [0, 1, 1, 0])
  const y0  = useTransform(scrollYProgress, [0, 0.08], [36, 0])

  // Phrase 1: 25% → 50%
  const op1 = useTransform(scrollYProgress, [0.25, 0.33, 0.45, 0.5], [0, 1, 1, 0])
  const y1  = useTransform(scrollYProgress, [0.25, 0.33], [36, 0])

  // Phrase 2: 50% → 75%
  const op2 = useTransform(scrollYProgress, [0.5, 0.58, 0.7, 0.75], [0, 1, 1, 0])
  const y2  = useTransform(scrollYProgress, [0.5, 0.58], [36, 0])

  // Phrase 3: 75% → 100%
  const op3 = useTransform(scrollYProgress, [0.75, 0.83, 0.95, 1.0], [0, 1, 1, 0])
  const y3  = useTransform(scrollYProgress, [0.75, 0.83], [36, 0])

  // Scroll hint desaparece rápido
  const hintOp = useTransform(scrollYProgress, [0, 0.07], [1, 0])

  const phrases = [
    { opacity: op0, y: y0 },
    { opacity: op1, y: y1 },
    { opacity: op2, y: y2 },
    { opacity: op3, y: y3 },
  ]

  return (
    // 280vh — cada frase ~70vh, no se siente lento
    <section ref={containerRef} style={{ height: '280vh', position: 'relative' }}>

      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#F0EDE6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        {/* ARIA — muy sutil de fondo, paleta natural */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          scale: ariaScale,
          transformOrigin: 'center 30%',
        }}>
          <img
            src="/aria2.png"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 32%',
              opacity: 0.07,
              display: 'block',
            }}
          />
        </motion.div>

        {/* Frases */}
        {PHRASES.map((phrase, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '100%',
              textAlign: 'center',
              padding: '0 clamp(24px, 8vw, 140px)',
              opacity: phrases[i].opacity,
              y: phrases[i].y,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(52px, 9.5vw, 130px)',
              lineHeight: 1.05,
              letterSpacing: 'clamp(-2px, -0.025em, -4px)',
              margin: 0,
            }}>
              <span style={{ color: '#2A2A2A', display: 'block' }}>
                {phrase.main}
              </span>
              <span style={{ color: 'rgba(42,42,42,0.2)', display: 'block' }}>
                {phrase.accent}
              </span>
            </p>
          </motion.div>
        ))}

        {/* Scroll hint */}
        <motion.div style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          x: '-50%',
          opacity: hintOp,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontSize: '9px',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(42,42,42,0.25)',
          }}>
            Scroll
          </span>
          <motion.div
            animate={{ scaleY: [1, 0.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px', height: '44px',
              background: 'rgba(42,42,42,0.18)',
              transformOrigin: 'top',
            }}
          />
        </motion.div>

        {/* Puntos indicadores — abajo derecha */}
        <div style={{
          position: 'absolute', bottom: '44px', right: '44px',
          display: 'flex', gap: '8px', alignItems: 'center',
        }}>
          {PHRASES.map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '4px', height: '4px',
                borderRadius: '50%',
                background: '#2A2A2A',
                opacity: phrases[i].opacity,
              }}
            />
          ))}
        </div>

        {/* Líneas decorativas sutiles */}
        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: '#E5E2DC' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px', background: '#E5E2DC' }} />

      </div>
    </section>
  )
}
