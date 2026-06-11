import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const SERVICES = [
  {
    num: '01',
    name: 'Inteligencia Artificial',
    desc: 'Agentes y workflows que toman decisiones, responden clientes y procesan información sin intervención humana.',
  },
  {
    num: '02',
    name: 'Automatización',
    desc: 'Conectamos tus herramientas y eliminamos el trabajo manual. Cada proceso repetitivo es candidato a automatizar.',
  },
  {
    num: '03',
    name: 'Marketing Digital',
    desc: 'Estrategia, contenido y performance alineados a tus objetivos de negocio. Sin vanity metrics.',
  },
  {
    num: '04',
    name: 'Desarrollo Digital',
    desc: 'Webs y apps que convierten. Diseño con intención, código limpio, velocidad real.',
  },
]

function ServiceCard({ s, i }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-t border-kova-dark/10 cursor-pointer"
      style={{
        padding: '40px 0 40px 20px',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
      }}
    >
      {/* Left orange border */}
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: '2px',
          background: '#E8501A',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      <span className="text-kova-accent text-xs font-medium tracking-[0.2em] mb-4 block">
        {s.num}
      </span>
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-kova-dark">
        {s.name}
      </h3>

      {/* Description — slides up on hover */}
      <div
        style={{
          overflow: 'hidden',
          maxHeight: hovered ? '120px' : '0px',
          marginTop: hovered ? '12px' : '0px',
          transition: 'max-height 0.3s ease, margin-top 0.3s ease',
        }}
      >
        <p
          className="text-kova-gray text-sm md:text-base leading-relaxed"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {s.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function Servicios() {
  const imgRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-20px', '20px'])

  return (
    <section id="servicios" className="bg-kova-bg overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-kova-gray text-xs tracking-[0.3em] uppercase mb-4">Lo que hacemos</p>

          {/* Orange line — grows left to right */}
          <motion.div
            className="h-px mb-6"
            style={{ background: '#E8501A' }}
            initial={{ width: 0 }}
            whileInView={{ width: '40px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <h2 className="font-serif text-4xl md:text-6xl font-bold text-kova-dark max-w-2xl leading-tight">
            Cuatro líneas.<br />Un solo objetivo.
          </h2>
        </motion.div>
      </div>

      {/* Full-width image with subtle parallax */}
      <div
        ref={imgRef}
        className="w-full h-[45vh] md:h-[60vh] overflow-hidden"
      >
        <motion.img
          src="/services.png"
          alt="Infraestructura KOVA"
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
