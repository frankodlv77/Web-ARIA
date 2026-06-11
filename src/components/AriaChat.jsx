import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const BG = '#ffffff'

function stripMarkdown(t) {
  return t.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')
}

const GREETING =
  'Hola, soy ARIA. Puedo ayudarte a hacer crecer tu negocio — con automatización, marketing, SEO o marca personal. ¿Qué hace tu negocio y cuál es tu mayor desafío ahora mismo?'

const STATS = [
  { val: '200+', label: 'Automatizaciones' },
  { val: '50+',  label: 'Empresas' },
  { val: '24h',  label: 'Respuesta' },
  { val: '0',    label: 'Trabajo manual' },
]

const FOMO = [
  'ARIA está analizando un negocio en Buenos Aires...',
  'ARIA detectó 3 procesos automatizables en los últimos minutos...',
  'ARIA respondió 47 consultas esta semana...',
  'ARIA identificó una oportunidad de ahorro para una empresa hoy...',
  'ARIA está procesando una consulta ahora mismo...',
]

export default function AriaChat() {
  const [messages, setMessages]   = useState([])
  const [input, setInput]         = useState('')
  const [typing, setTyping]       = useState(false)
  const [history, setHistory]     = useState([])
  const [greeted, setGreeted]     = useState(false)
  const [fomoIdx, setFomoIdx]     = useState(0)
  const [fomoVis, setFomoVis]     = useState(true)
  const messagesRef               = useRef(null)
  const sectionRef                = useRef(null)

  const scrollBottom = () => {
    if (messagesRef.current)
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }
  useEffect(() => { scrollBottom() }, [messages, typing])

  const typeAgent = async (text) => {
    const s = stripMarkdown(text)
    const id = Date.now() + Math.random()
    setMessages(prev => [...prev, { id, role: 'agent', text: '' }])
    for (let i = 1; i <= s.length; i++) {
      await new Promise(r => setTimeout(r, 22))
      setMessages(prev => prev.map(m => m.id === id ? { ...m, text: s.slice(0, i) } : m))
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      setFomoVis(false)
      setTimeout(() => { setFomoIdx(i => (i + 1) % FOMO.length); setFomoVis(true) }, 500)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !greeted) {
        setGreeted(true)
        setTimeout(() => typeAgent(GREETING), 600)
      }
    }, { threshold: 0.2 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [greeted])

  const send = async () => {
    const text = input.trim()
    if (!text || typing) return
    const hist = [...history, { role: 'user', content: text }]
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }])
    setHistory(hist)
    setInput('')
    setTyping(true)
    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: hist }),
      })
      if (!res.ok) throw new Error()
      const data  = await res.json()
      const reply = data.content || 'Disculpá, hubo un error. Escribime por WhatsApp.'
      setHistory(prev => [...prev, { role: 'assistant', content: reply }])
      setTyping(false)
      await typeAgent(reply)
    } catch {
      setTyping(false)
      await typeAgent('Tuve un problema técnico. Escribime al WhatsApp enseguida.')
    }
  }

  /* ─── stagger helpers ─── */
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section
      ref={sectionRef}
      id="aria"
      className="relative overflow-hidden"
      style={{ background: BG, minHeight: '100vh' }}
    >
      {/* ═══════════════════════════════════════════════════
          GRID: left (ARIA) / right (content)
      ═══════════════════════════════════════════════════ */}
      <div className="lg:grid lg:grid-cols-2" style={{ minHeight: '100vh' }}>

        {/* ── LEFT: ARIA image ────────────────────────────── */}
        <div className="relative overflow-hidden h-[350px] lg:h-auto" style={{ background: '#ffffff' }}>

          {/* Imagen: ancho 100% de la columna — sin gaps en los costados */}
          <motion.div
            className="absolute top-0 left-0 w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src="/aria2.png"
              alt="ARIA"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="lazy"
            />
          </motion.div>

          {/* Abajo: cubre el recorte inferior */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: '35%', background: 'linear-gradient(to top, #ffffff, transparent)' }}
          />
        </div>

        {/* ── RIGHT: content ──────────────────────────────── */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-10 lg:py-14">

          {/* Label: pulsing dot */}
          <motion.div {...fadeUp(0)} className="flex items-center gap-2.5 mb-5">
            <span
              className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
              style={{ animation: 'dot-pulse 2s ease-in-out infinite' }}
            />
            <span className="text-[10px] font-medium tracking-[0.3em] text-kova-gray uppercase">
              Agente IA · En línea
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            {...fadeUp(0.07)}
            className="font-display font-black uppercase leading-none mb-3"
            style={{ fontSize: 'clamp(30px, 4vw, 58px)', color: '#0A0A0A', letterSpacing: '-0.5px', lineHeight: 1.1 }}
          >
            Sistemas de IA<br />
            <span style={{ color: '#555555', fontWeight: 300 }}>que trabajan</span><br />
            por vos.
          </motion.h2>

          {/* Subline */}
          <motion.p
            {...fadeUp(0.13)}
            className="text-xs font-light mb-6"
            style={{ color: '#888888' }}
          >
            Automatización · Marketing · IA · Ventas · RRSS
          </motion.p>

          {/* Chat */}
          <motion.div
            {...fadeUp(0.18)}
            className="mb-5"
            style={{
              background: '#ffffff',
              border: '1px solid #e0e0e0',
              maxWidth: '460px',
            }}
          >
            {/* Chat header */}
            <div
              className="px-5 py-2.5 flex items-center gap-2"
              style={{ borderBottom: '1px solid #f0f0f0' }}
            >
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase" style={{ color: '#aaa' }}>
                ARIA · Responde en segundos
              </span>
            </div>

            {/* Messages */}
            <div
              ref={messagesRef}
              className="overflow-y-auto px-5 py-4 flex flex-col gap-3"
              style={{ height: '150px' }}
            >
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[82%] px-4 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: '#E8501A', color: '#fff' }
                        : { background: '#F8F7F4', color: '#0A0A0A', border: '1px solid #ebebeb' }
                    }
                  >
                    {msg.text}
                    {msg.text === '' && (
                      <span className="inline-block w-2 h-3.5 bg-current animate-pulse ml-0.5" />
                    )}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-2.5 flex gap-1.5 items-center"
                    style={{ background: '#F8F7F4', border: '1px solid #ebebeb' }}
                  >
                    {[0, 1, 2].map(i => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{ background: '#bbb', animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="px-5 py-3 flex gap-3 items-center"
              style={{ borderTop: '1px solid #f0f0f0' }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Contame sobre tu negocio..."
                className="flex-1 text-sm bg-transparent outline-none"
                style={{ color: '#0A0A0A' }}
              />
              <button
                onClick={send}
                disabled={typing || !input.trim()}
                className="text-sm text-white px-4 py-2 transition-colors disabled:opacity-30"
                style={{ background: '#E8501A' }}
                onMouseEnter={e => e.currentTarget.style.background = '#c43d12'}
                onMouseLeave={e => e.currentTarget.style.background = '#E8501A'}
              >
                →
              </button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            {...fadeUp(0.23)}
            className="grid grid-cols-4 gap-6"
            style={{ borderTop: '1px solid rgba(10,10,10,0.08)', paddingTop: '16px', maxWidth: '460px' }}
          >
            {STATS.map(s => (
              <div key={s.val}>
                <p className="font-serif text-xl font-bold leading-none mb-1" style={{ color: '#0A0A0A' }}>
                  {s.val}
                </p>
                <p className="text-[11px]" style={{ color: '#888' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* FOMO rotativo */}
          <div style={{ maxWidth: '460px', marginTop: '10px', minHeight: '16px' }}>
            <p
              className="text-[11px] font-sans"
              style={{
                color: '#888',
                opacity: fomoVis ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              {FOMO[fomoIdx]}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
