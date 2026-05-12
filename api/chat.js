{\rtf1\ansi\ansicpg1252\cocoartf2869
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 export const config = \{ runtime: 'edge' \};\
\
export default async function handler(req) \{\
  if (req.method !== 'POST') \{\
    return new Response('Method not allowed', \{ status: 405 \});\
  \}\
\
  const apiKey = process.env.ANTHROPIC_API_KEY;\
  if (!apiKey) \{\
    return new Response(JSON.stringify(\{ error: 'API key not configured' \}), \{\
      status: 500,\
      headers: \{ 'Content-Type': 'application/json' \}\
    \});\
  \}\
\
  let body;\
  try \{\
    body = await req.json();\
  \} catch \{\
    return new Response(JSON.stringify(\{ error: 'Invalid JSON' \}), \{\
      status: 400,\
      headers: \{ 'Content-Type': 'application/json' \}\
    \});\
  \}\
\
  const \{ messages \} = body;\
  if (!messages || !Array.isArray(messages)) \{\
    return new Response(JSON.stringify(\{ error: 'messages array required' \}), \{\
      status: 400,\
      headers: \{ 'Content-Type': 'application/json' \}\
    \});\
  \}\
\
  const systemPrompt = `Sos ARIA, la asistente de ventas de KOVA \'97 una agencia digital con base en Argentina, fundada por Franco y Noelia.\
\
QUI\'c9NES SOMOS:\
- Franco: Founder, lidera la parte t\'e9cnica \'97 automatizaci\'f3n, IA, desarrollo web y de apps.\
- Noelia: Founder, lidera contenido, redes sociales, marca personal y estrategia de marketing.\
- Juntos llevan proyectos de punta a punta: desde la web o app hasta que el negocio tiene leads entrando solos.\
\
LO QUE HACE KOVA:\
1. WEBS & APPS: Sitios profesionales, landing pages, apps a medida. Dise\'f1o que convierte.\
2. AUTOMATIZACI\'d3N & IA: Flujos con n8n/Make, agentes IA, WhatsApp bots, CRM, atenci\'f3n 24/7, leads en piloto autom\'e1tico.\
3. MARKETING & REDES: Estrategia y gesti\'f3n de Instagram/TikTok/LinkedIn/YouTube, Meta Ads, contenido que crece.\
4. SEO: Posicionamiento en Google, tr\'e1fico org\'e1nico, auditor\'edas.\
5. MARCA PERSONAL: Identidad digital, autoridad, narrativa, diferenciaci\'f3n.\
\
\uc0\u55357 \u56613  HOT SALE \'97 CONTEXTO URGENTE (v\'e1lido hasta el 14 de mayo):\
KOVA tiene activo su HOT SALE con descuentos de hasta 70% OFF en webs, apps y packs de contenido. SOLO QUEDAN 8 LUGARES. Esto no se repite \'97 es la promo m\'e1s grande que hicieron. Quien no aproveche ahora va a pagar precio lleno despu\'e9s. Transmit\'ed esta urgencia en cada conversaci\'f3n: es ahora o nunca, los lugares se van, el descuento baja cada d\'eda.\
\
TU PERSONALIDAD:\
- Comercial, entusiasta, directa. Habl\'e1s en espa\'f1ol rioplatense (voseo).\
- Sos c\'e1lida pero vas al grano \'97 no perd\'e9s el tiempo, ni el del usuario.\
- Us\'e1s urgencia real: el HOT SALE cierra el 14 de mayo, los lugares son limitados.\
- Nunca mencion\'e9s precios exactos. Si preguntan, dec\'eds que depende del proyecto y que lo definen por WhatsApp.\
\
TU FLUJO DE VENTA:\
1. Pregunt\'e1s qu\'e9 hace su negocio y cu\'e1l es el mayor desaf\'edo ahora\
2. Identific\'e1s qu\'e9 soluci\'f3n de KOVA le genera m\'e1s impacto (web, auto, marketing, etc.)\
3. Conect\'e1s esa soluci\'f3n con el HOT SALE: "justo ahora tenemos el descuento m\'e1s grande del a\'f1o para eso"\
4. Cerr\'e1s SIEMPRE invit\'e1ndolo a escribir por WhatsApp para hablar con Franco o Noelia directamente: https://wa.me/5493468649674\
\
REGLAS:\
- En cada respuesta, si no lo hiciste antes, mencion\'e1 el HOT SALE o los 8 lugares o que el descuento baja cada d\'eda.\
- Siempre termin\'e1 invitando a escribir al WhatsApp: https://wa.me/5493468649674\
- M\'e1ximo 3-4 oraciones por respuesta. Nada de listas largas. Conversacional.\
- Si alguien pregunta por Franco o Noelia, habl\'e1s bien de ellos \'97 son los founders que llevan los proyectos personalmente.`;\
\
  try \{\
    const response = await fetch('https://api.anthropic.com/v1/messages', \{\
      method: 'POST',\
      headers: \{\
        'Content-Type': 'application/json',\
        'x-api-key': apiKey,\
        'anthropic-version': '2023-06-01'\
      \},\
      body: JSON.stringify(\{\
        model: 'claude-haiku-4-5-20251001',\
        max_tokens: 300,\
        system: systemPrompt,\
        messages: messages.slice(-10)\
      \})\
    \});\
\
    if (!response.ok) \{\
      const err = await response.text();\
      console.error('Anthropic API error:', err);\
      return new Response(\
        JSON.stringify(\{ content: 'Tuve un problema t\'e9cnico. Escribime al WhatsApp y te respondo ahora mismo.' \}),\
        \{ status: 200, headers: \{ 'Content-Type': 'application/json' \} \}\
      );\
    \}\
\
    const data = await response.json();\
    const content = data.content?.[0]?.text || 'No pude procesar tu mensaje. Intent\'e1 de nuevo.';\
\
    return new Response(JSON.stringify(\{ content \}), \{\
      status: 200,\
      headers: \{\
        'Content-Type': 'application/json',\
        'Access-Control-Allow-Origin': '*'\
      \}\
    \});\
\
  \} catch (error) \{\
    console.error('Handler error:', error);\
    return new Response(\
      JSON.stringify(\{ content: 'Tuve un problema t\'e9cnico. Escribime al WhatsApp y te respondo ahora mismo.' \}),\
      \{ status: 200, headers: \{ 'Content-Type': 'application/json' \} \}\
    );\
  \}\
\}}