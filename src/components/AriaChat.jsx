import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function stripMarkdown(t) {
  return t.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')
}

const GREETING =
  'Hola, soy ARIA. Puedo ayudarte a hacer crecer tu negocio — con automatización, marketing, SEO o marca personal. ¿Qué hace tu negocio y cuál es tu mayor desafío ahora mismo?'

const SUGGESTIONS = [
  'Automatizar mi atención al cliente',
  'Quiero una web para mi negocio',
  'Hacer crecer mis ventas con IA',
  'Gestionar mis redes sociales',
]

const FOMO = [
  'ARIA analizó 3 negocios en la última hora...',
  'ARIA detectó procesos automatizables esta semana...',
  'ARIA está respondiendo consultas ahora mismo...',
  'ARIA identificó una oportunidad de crecimiento hoy...',
]

const AVATAR_STYLE = {
  background: 'linear-gradient(135deg, #1A1A1A 0%, #4A4A4A 100%)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexShrink: 0,
}

export default function AriaChat() {
  const [messages,  setMessages]  = useState([])
  const [input,     setInput]     = useState('')
  const [typing,    setTyping]    = useState(false)
  const [history,   setHistory]   = useState([])
  const [greeted,   setGreeted]   = useState(false)
  const [showSugg,  setShowSugg]  = useState(true)
  const [fomoIdx,   setFomoIdx]   = useState(0)
  const [fomoVis,   setFomoVis]   = useState(true)
  const messagesRef                = useRef(null)
  const sectionRef                 = useRef(null)

  const scrollBottom = () => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }
  useEffect(() => { scrollBottom() }, [messages, typing])

  const typeAgent = async (text) => {
    const s  = stripMarkdown(text)
    const id = Date.now() + Math.random()
    setMessages(prev => [...prev, { id, role: 'agent', text: '' }])
    for (let i = 1; i <= s.length; i++) {
      await new Promise(r => setTimeout(r, 16))
      setMessages(prev => prev.map(m => m.id === id ? { ...m, text: s.slice(0, i) } : m))
    }
  }

  useEffect(() => {
    const id = setInterval(() => {
      setFomoVis(false)
      setTimeout(() => { setFomoIdx(i => (i + 1) % FOMO.length); setFomoVis(true) }, 400)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !greeted) {
        setGreeted(true)
        setTimeout(() => typeAgent(GREETING), 700)
      }
    }, { threshold: 0.2 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [greeted])

  const send = async (text) => {
    const t = (text ?? input).trim()
    if (!t || typing) return
    setShowSugg(false)
    const hist = [...history, { role: 'user', content: t }]
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: t }])
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

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport:   { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section ref={sectionRef} id="aria" className="relative lg:overflow-hidden lg:h-screen">
      <div className="flex flex-col lg:flex-row lg:h-full">

        {/* ── LEFT: Imagen ── */}
        <motion.div
          className="relative flex-shrink-0"
          style={{ background: '#FAFAF8', overflow: 'hidden' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Una sola imagen — mobile: 55vh ancho completo / desktop: 100vh ancho auto */}
          <img src="/aria2.png" alt="ARIA"
            className="block w-full h-[55vh] lg:h-screen lg:w-auto object-cover object-top"
            loading="lazy"
          />
          {/* Fade inferior mobile — difumina corte sin tapar cara */}
          <div className="absolute bottom-0 inset-x-0 pointer-events-none lg:hidden"
            style={{ height: '22%', background: 'linear-gradient(to top, #F5F2EB 5%, transparent)' }} />
          {/* Fade inferior desktop — hacia fondo del contenedor imagen */}
          <div className="absolute bottom-0 inset-x-0 pointer-events-none hidden lg:block"
            style={{ height: '30%', background: 'linear-gradient(to top, #FAFAF8, transparent)' }} />
          {/* Fade derecho — solo desktop, difumina el corte con el panel del chat */}
          <div className="absolute top-0 right-0 bottom-0 pointer-events-none hidden lg:block"
            style={{ width: '45%', background: 'linear-gradient(to right, transparent, #F5F2EB)' }} />
        </motion.div>

        {/* ── RIGHT: Contenido ── */}
        <div
          className="flex-1 flex flex-col justify-center overflow-y-auto py-14 lg:py-16"
          style={{ background: '#F5F2EB' }}
        >
          <div className="w-full max-w-[480px] mx-auto px-8 lg:px-10">

            {/* Titular */}
            <motion.div {...fadeUp(0)} className="mb-8">
              <h2 className="font-bold"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: '#2A2A2A', lineHeight: 1.2 }}>
                Diseñada para hacer<br />avanzar tu negocio.
              </h2>
            </motion.div>

            {/* ── Chat widget ── */}
            <motion.div {...fadeUp(0.1)}>
              <div style={{
                border: '1px solid #D8D4CD',
                background: '#FFFFFF',
                overflow: 'hidden',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
              }}>

                {/* Header del chat */}
                <div style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid #EDEBE7',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  background: '#FAFAF8',
                }}>
                  <div style={{
                    ...AVATAR_STYLE,
                    width: '38px', height: '38px', borderRadius: '50%',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                  }}>
                    <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>A</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1 }}>ARIA</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                      <span style={{
                        width: '6px', height: '6px', borderRadius: '50%',
                        background: '#22C55E', flexShrink: 0,
                        animation: 'dot-pulse 2s ease-in-out infinite',
                      }} />
                      <p style={{ fontSize: '10px', color: '#AAAAAA', letterSpacing: '0.03em' }}>
                        En línea · Responde en segundos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Área de mensajes */}
                <div
                  ref={messagesRef}
                  className="overflow-y-auto flex flex-col gap-3"
                  style={{ height: '380px', padding: '16px', background: '#FAFAF8' }}
                >
                  {messages.length === 0 && !typing && (
                    <p style={{ fontSize: '13px', color: '#DDDDDD' }}>Iniciando conversación...</p>
                  )}

                  {messages.map(msg => (
                    msg.role === 'user' ? (
                      <div key={msg.id} className="flex justify-end">
                        <div style={{
                          background: '#1A1A1A',
                          color: '#FAFAF8',
                          padding: '10px 15px',
                          fontSize: '14px',
                          lineHeight: 1.6,
                          maxWidth: '78%',
                          borderRadius: '14px 14px 2px 14px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                        }}>
                          {msg.text}
                        </div>
                      </div>
                    ) : (
                      <div key={msg.id} className="flex items-start gap-2">
                        <div style={{
                          ...AVATAR_STYLE,
                          width: '26px', height: '26px', borderRadius: '50%',
                          marginTop: '2px',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                        }}>
                          <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>A</span>
                        </div>
                        <div style={{
                          background: '#FFFFFF',
                          border: '1px solid #EDEBE7',
                          boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                          color: '#2A2A2A',
                          padding: '10px 14px',
                          fontSize: '14px',
                          lineHeight: 1.65,
                          maxWidth: '82%',
                          borderRadius: '2px 14px 14px 14px',
                        }}>
                          {msg.text}
                          {msg.text === '' && (
                            <span className="inline-block w-0.5 h-4 bg-current animate-pulse ml-0.5 align-middle" />
                          )}
                        </div>
                      </div>
                    )
                  ))}

                  {typing && (
                    <div className="flex items-start gap-2">
                      <div style={{
                        ...AVATAR_STYLE,
                        width: '26px', height: '26px', borderRadius: '50%',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      }}>
                        <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>A</span>
                      </div>
                      <div style={{
                        background: '#FFFFFF', border: '1px solid #EDEBE7',
                        boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                        padding: '10px 14px', borderRadius: '2px 14px 14px 14px',
                        display: 'flex', gap: '5px', alignItems: 'center',
                      }}>
                        {[0,1,2].map(i => (
                          <span key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                            style={{ background: '#CCCCCC', animationDelay: `${i*0.15}s` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sugerencias */}
                <AnimatePresence>
                  {showSugg && messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        padding: '10px 14px',
                        borderTop: '1px solid #EDEBE7',
                        display: 'flex', flexWrap: 'wrap', gap: '7px',
                        background: '#FAFAF8',
                      }}
                    >
                      {SUGGESTIONS.map(s => (
                        <button key={s} onClick={() => send(s)}
                          style={{
                            fontSize: '12px', padding: '6px 14px',
                            border: '1px solid #E5E2DC',
                            background: '#FFFFFF', color: '#555555',
                            borderRadius: '999px', cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#1A1A1A'
                            e.currentTarget.style.color = '#FAFAF8'
                            e.currentTarget.style.borderColor = '#1A1A1A'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = '#FFFFFF'
                            e.currentTarget.style.color = '#555555'
                            e.currentTarget.style.borderColor = '#E5E2DC'
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '12px 14px',
                  borderTop: '1px solid #EDEBE7',
                  background: '#FFFFFF',
                }}>
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                    placeholder="Escribí tu consulta..."
                    style={{
                      flex: 1, fontSize: '14px', color: '#2A2A2A',
                      background: '#F5F3EF',
                      border: '1px solid #E5E2DC',
                      borderRadius: '20px',
                      padding: '8px 14px',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => send()}
                    disabled={typing || !input.trim()}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: '#1A1A1A', color: '#FAFAF8',
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      opacity: (typing || !input.trim()) ? 0.2 : 1,
                      transition: 'opacity 0.15s ease',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>
                </div>

              </div>

              {/* FOMO ticker */}
              <div className="mt-4 flex items-center gap-2"
                style={{ opacity: fomoVis ? 1 : 0, transition: 'opacity 0.5s ease', minHeight: '20px' }}>
                <span style={{
                  width: '7px', height: '7px', borderRadius: '50%',
                  background: '#22C55E', flexShrink: 0,
                  animation: 'dot-pulse 2s ease-in-out infinite',
                }} />
                <p style={{ fontSize: '12px', color: '#666666', fontStyle: 'italic' }}>
                  {FOMO[fomoIdx]}
                </p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  )
}
