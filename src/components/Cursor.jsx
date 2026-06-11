import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const target  = useRef({ x: -100, y: -100 })
  const hovered = useRef(false)
  const rafId   = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = e => { target.current = { x: e.clientX, y: e.clientY } }
    const onOver = e => {
      hovered.current = !!e.target.closest('a, button, input, textarea, [data-cursor]')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12)
      const ring = ringRef.current
      if (ring) {
        const size = hovered.current ? 40 : 20
        ring.style.transform     = `translate(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px)`
        ring.style.width         = `${size}px`
        ring.style.height        = `${size}px`
        ring.style.borderColor       = hovered.current ? '#E8501A' : '#0A0A0A'
        ring.style.backgroundColor   = hovered.current ? 'rgba(232,80,26,0.15)' : 'transparent'
      }
      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        border: '1.5px solid #0A0A0A',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.22s ease, height 0.22s ease, border-color 0.22s ease, background-color 0.22s ease',
        willChange: 'transform',
      }}
    />
  )
}
