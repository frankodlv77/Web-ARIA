import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* ARIA — círculo, overflow hidden = cero bordes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              overflow: 'hidden',
              flexShrink: 0,
              marginBottom: '28px',
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

          {/* KOVA + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{ textAlign: 'center', padding: '0 24px 56px', position: 'relative', zIndex: 2, background: '#ffffff' }}
          >
            <p
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(44px, 9vw, 88px)',
                color: '#0A0A0A',
                letterSpacing: '-2px',
                lineHeight: 1,
                margin: 0,
              }}
            >
              KOVA
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              style={{
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#888888',
                marginTop: '10px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Automatización · IA · Marketing
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
