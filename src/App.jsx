import { motion, useScroll, useSpring } from 'framer-motion'
import { useLenis } from './hooks/useLenis'
import PageLoader from './components/PageLoader'
import Nav from './components/Nav'
import AriaChat from './components/AriaChat'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import AriaManifesto from './components/AriaManifesto'
import Proceso from './components/Proceso'
import Contacto from './components/Contacto'
import WhatsAppBtn from './components/WhatsAppBtn'

export default function App() {
  useLenis()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: '#2A2A2A',
          transformOrigin: '0%',
          scaleX,
          zIndex: 999998,
        }}
      />

      <PageLoader />
      <Nav />
      <main>
        <AriaChat />
        <Hero />
        <Servicios />
        <AriaManifesto />
        <Proceso />
        <Contacto />
      </main>
      <WhatsAppBtn />
    </>
  )
}
