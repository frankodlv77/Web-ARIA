import { useLenis } from './hooks/useLenis'
import PageLoader from './components/PageLoader'
import Cursor from './components/Cursor'
import GrainOverlay from './components/GrainOverlay'
import Nav from './components/Nav'
import Hero from './components/Hero'
import AriaChat from './components/AriaChat'
import Servicios from './components/Servicios'
import Proceso from './components/Proceso'
import TechStrip from './components/TechStrip'
import PorQueKova from './components/PorQueKova'
import Contacto from './components/Contacto'
import WhatsAppBtn from './components/WhatsAppBtn'

export default function App() {
  useLenis()

  return (
    <>
      <PageLoader />
      <Cursor />
      <GrainOverlay />
      <Nav />
      <main>
        <AriaChat />
        <Hero />
        <Servicios />
        <Proceso />
        <TechStrip />
        <PorQueKova />
        <Contacto />
      </main>
      <WhatsAppBtn />
    </>
  )
}
