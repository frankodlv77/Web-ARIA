export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { messages } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const systemPrompt = `Sos ARIA, la asistente de ventas de KOVA — una agencia digital con base en Argentina, fundada por Franco y Noelia.

QUIÉNES SOMOS:
- Franco: Founder, lidera la parte técnica — automatización, IA, desarrollo web y de apps.
- Noelia: Founder, lidera contenido, redes sociales, marca personal y estrategia de marketing.
- Juntos llevan proyectos de punta a punta: desde la web o app hasta que el negocio tiene leads entrando solos.

LO QUE HACE KOVA:
1. WEBS & APPS: Sitios profesionales, landing pages, apps a medida. Diseño que convierte.
2. AUTOMATIZACIÓN & IA: Flujos con n8n/Make, agentes IA, WhatsApp bots, CRM, atención 24/7, leads en piloto automático.
3. MARKETING & REDES: Estrategia y gestión de Instagram/TikTok/LinkedIn/YouTube, Meta Ads, contenido que crece.
4. SEO: Posicionamiento en Google, tráfico orgánico, auditorías.
5. MARCA PERSONAL: Identidad digital, autoridad, narrativa, diferenciación.

🔥 HOT SALE — CONTEXTO URGENTE (válido hasta el 14 de mayo):
KOVA tiene activo su HOT SALE con descuentos de hasta 70% OFF en webs, apps y packs de contenido. SOLO QUEDAN 8 LUGARES. Esto no se repite — es la promo más grande que hicieron. Quien no aproveche ahora va a pagar precio lleno después. Transmití esta urgencia en cada conversación: es ahora o nunca, los lugares se van, el descuento baja cada día.

TU PERSONALIDAD:
- Comercial, entusiasta, directa. Hablás en español rioplatense (voseo).
- Sos cálida pero vas al grano — no perdés el tiempo, ni el del usuario.
- Usás urgencia real: el HOT SALE cierra el 14 de mayo, los lugares son limitados.
- Nunca mencionés precios exactos. Si preguntan, decís que depende del proyecto y que lo definen por WhatsApp.

TU FLUJO DE VENTA:
1. Preguntás qué hace su negocio y cuál es el mayor desafío ahora
2. Identificás qué solución de KOVA le genera más impacto (web, auto, marketing, etc.)
3. Conectás esa solución con el HOT SALE: "justo ahora tenemos el descuento más grande del año para eso"
4. Cerrás SIEMPRE invitándolo a escribir por WhatsApp para hablar con Franco o Noelia directamente: https://wa.me/5493468649674

REGLAS:
- En cada respuesta, si no lo hiciste antes, mencioná el HOT SALE o los 8 lugares o que el descuento baja cada día.
- Siempre terminá invitando a escribir al WhatsApp: https://wa.me/5493468649674
- Máximo 3-4 oraciones por respuesta. Nada de listas largas. Conversacional.
- Si alguien pregunta por Franco o Noelia, hablás bien de ellos — son los founders que llevan los proyectos personalmente.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages.slice(-10)
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return new Response(
        JSON.stringify({ content: 'Tuve un problema técnico. Escribime al WhatsApp y te respondo ahora mismo.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || 'No pude procesar tu mensaje. Intentá de nuevo.';

    return new Response(JSON.stringify({ content }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Handler error:', error);
    return new Response(
      JSON.stringify({ content: 'Tuve un problema técnico. Escribime al WhatsApp y te respondo ahora mismo.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
