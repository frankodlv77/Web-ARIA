import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Destellos de luz cálidos — visibles sobre fondo #FAFAF8
const STREAKS = [
  { delay: 0.15, duration: 1.1, width: '180px', opacity: 0.55, top: '22%', thick: 6  },
  { delay: 0.5,  duration: 0.9, width: '90px',  opacity: 0.4,  top: '55%', thick: 3  },
  { delay: 0.8,  duration: 1.2, width: '260px', opacity: 0.45, top: '72%', thick: 8  },
  { delay: 1.15, duration: 0.8, width: '120px', opacity: 0.35, top: '38%', thick: 4  },
]

function LightStreak({ delay, duration, width, opacity, top, thick }) {
  return (
    <motion.div
      initial={{ x: '-30vw' }}
      animate={{ x: '130vw' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'absolute',
        top,
        left: 0,
        width,
        height: `${thick}px`,
        background: `linear-gradient(90deg, transparent, rgba(210,185,140,${opacity}), rgba(230,205,155,${opacity * 0.6}), transparent)`,
        transform: 'skewX(-25deg)',
        pointerEvents: 'none',
        zIndex: 1,
        borderRadius: '999px',
      }}
    />
  )
}

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
    }, 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: '#FAFAF8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Destellos de luz */}
          {STREAKS.map((s, i) => <LightStreak key={i} {...s} />)}

          {/* ARIA foto — círculo grande */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 'clamp(260px, 32vw, 360px)',
              height: 'clamp(260px, 32vw, 360px)',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              marginBottom: '32px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <img
              src="/aria2.png"
              alt="ARIA"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 8%',
                display: 'block',
              }}
            />
          </motion.div>

          {/* VORA + ARIA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
              paddingBottom: '40px',
            }}
          >
            <p
              style={{
                fontFamily: 'Sora, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(72px, 14vw, 140px)',
                color: '#2A2A2A',
                letterSpacing: '-4px',
                lineHeight: 1,
                margin: 0,
              }}
            >
              VORA
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              style={{
                fontSize: '11px',
                letterSpacing: '0.55em',
                textTransform: 'uppercase',
                color: '#AAAAAA',
                marginTop: '12px',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              ARIA
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
