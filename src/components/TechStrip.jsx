import { useState } from 'react'

const GRAY = '#888888'

const LOGOS = [
  {
    name: 'n8n',
    color: '#EA4B71',
    el: (
      <svg height="22" viewBox="0 0 72 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="n8n">
        <circle cx="11" cy="11" r="11"/>
        <circle cx="36" cy="11" r="11"/>
        <circle cx="61" cy="11" r="11"/>
        <rect x="21.5" y="9" width="9" height="4" rx="2"/>
        <rect x="46.5" y="9" width="9" height="4" rx="2"/>
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    color: '#000000',
    el: (
      <svg height="28" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="OpenAI">
        <path d="M14 0a1.9 1.9 0 011.9 1.9v4.85a1.9 1.9 0 01-3.8 0V1.9A1.9 1.9 0 0114 0zm6.546 3.454a1.9 1.9 0 012.687 0 1.9 1.9 0 010 2.687l-3.43 3.43a1.9 1.9 0 01-2.687-2.688l3.43-3.43zM28 14a1.9 1.9 0 01-1.9 1.9h-4.85a1.9 1.9 0 010-3.8h4.85A1.9 1.9 0 0128 14zm-3.454 6.546a1.9 1.9 0 010 2.687 1.9 1.9 0 01-2.687 0l-3.43-3.43a1.9 1.9 0 012.688-2.687l3.43 3.43zM14 28a1.9 1.9 0 01-1.9-1.9v-4.85a1.9 1.9 0 013.8 0v4.85A1.9 1.9 0 0114 28zm-6.546-3.454a1.9 1.9 0 01-2.687 0 1.9 1.9 0 010-2.687l3.43-3.43a1.9 1.9 0 012.687 2.688l-3.43 3.43zM0 14a1.9 1.9 0 011.9-1.9h4.85a1.9 1.9 0 010 3.8H1.9A1.9 1.9 0 010 14zm3.454-6.546a1.9 1.9 0 010-2.687 1.9 1.9 0 012.687 0l3.43 3.43a1.9 1.9 0 01-2.688 2.687l-3.43-3.43z"/>
      </svg>
    ),
  },
  {
    name: 'Meta',
    color: '#0082FB',
    el: (
      <svg height="22" viewBox="0 0 90 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Meta">
        <path d="M5 18C5 10.5 9 6 14 6c4 0 7 2.5 10.5 8C28 19 31.5 24.5 36 24.5c4.5 0 7.5-4.5 7.5-10.5C43.5 9 41 6 38 6c-2 0-3.5 1-5 2.5l-3-4C32.5 2 35 0 39 0c6.5 0 12 5.5 12 14 0 9-5 16-13 16-6 0-10-4.5-14-11C21 13 18 8.5 14 8.5c-4 0-6 4-6 9.5C8 23 10 26.5 13 26.5c2.5 0 4.5-1.5 6.5-4l2.5 4.5C19.5 30 16.5 32 13 32 8 32 5 26 5 18z"/>
      </svg>
    ),
  },
  {
    name: 'Google',
    color: '#4285F4',
    el: (
      <svg height="26" viewBox="0 0 26 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
        <path d="M13 5.2A7.8 7.8 0 0120.5 9l-2.9 2.9A4 4 0 0013 9.2a4.8 4.8 0 00-4.8 4.8 4.8 4.8 0 004.8 4.8 4.2 4.2 0 004.3-3H13v-3.8h8.2c.1.5.2 1 .2 1.6C21.4 19.1 17.8 22 13 22A9 9 0 014 13 9 9 0 0113 4c2.5 0 4.7.9 6.4 2.4L17 8.8A5.7 5.7 0 0013 7a6 6 0 00-6 6 6 6 0 006 6z"/>
        <path d="M13 13h8.4v3.8H13V13z"/>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    color: '#000000',
    el: (
      <svg height="22" viewBox="0 0 76 66" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Vercel">
        <path d="M37.5 0L75 65H0L37.5 0Z"/>
      </svg>
    ),
  },
  {
    name: 'Supabase',
    color: '#3ECF8E',
    el: (
      <svg height="26" viewBox="0 0 24 26" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="Supabase">
        <path d="M13.5 0L2 15h9l-1.5 11L22 10h-9.5L13.5 0z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    el: (
      <svg height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
]

function Logo({ logo }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      className="flex items-center justify-center px-10 flex-shrink-0"
      style={{
        color: hov ? logo.color : GRAY,
        transition: 'color 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      title={logo.name}
    >
      {logo.el}
    </div>
  )
}

export default function TechStrip() {
  const items = [...LOGOS, ...LOGOS]

  return (
    <section style={{ background: '#F8F7F4', padding: '32px 0', overflow: 'hidden' }}>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: 'marquee 36s linear infinite',
        }}
      >
        {items.map((logo, i) => (
          <Logo key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </section>
  )
}
