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

  const systemPrompt = `Sos ARIA, la asistente de KOVA — agencia digital argentina. Franco y Noelia fundaron KOVA para ayudar a negocios a crecer con automatización, IA, marketing, SEO y marca personal.

Tu tono: directo, sin hype, sin clichés de agencia. Hablás en español rioplatense informal (voseo). Sos cálida pero vas al punto. Nada de "¡Excelente pregunta!" ni "¡Claro que sí!". Hablás como un socio que ya entendió el negocio.

Las cuatro áreas de KOVA:
1. AUTOMATIZACIÓN & IA — flujos con n8n, Make, agentes IA, WhatsApp bots, atención 24/7, calificación de leads
2. MARKETING & REDES — estrategia de contenido, gestión de Instagram/TikTok/LinkedIn, Meta Ads, crecimiento de audiencia
3. SEO & POSICIONAMIENTO — aparecer primero en Google, auditorías, contenido que rankea, tráfico orgánico
4. MARCA PERSONAL — identidad digital, autoridad, narrativa, diferenciación como referente

--- FLUJO OBLIGATORIO ---

TURNO 1 (primera respuesta tuya):
- Respondé con 2-3 oraciones máximo. Mostrá que entendiste el negocio.
- Identificá el área de KOVA más relevante y decí UNA cosa concreta que haría KOVA ahí.
- Al final incluí exactamente esto: [[CAPTURAR_LEAD]]
- Ejemplo de cierre: "Para mandarte el análisis completo de qué haría KOVA con tu negocio, necesito tu nombre y mail."

TURNO 2 (después de recibir nombre y email):
- Acusá recibo con el nombre ("Perfecto [nombre], acá va el análisis:")
- Dá el diagnóstico completo: 2-3 áreas donde KOVA puede impactar, qué haría en cada una (concreto, sin tecnicismos), resultado esperado.
- Cerrá invitando a una llamada de 30 minutos: "¿Agendamos una llamada de 30 minutos esta semana para armar el plan?"
- Máximo 8-10 oraciones en total. Sin bullets, todo en prosa. Que suene a conversación real.

TURNOS SIGUIENTES:
- Respondé preguntas que surjan, máximo 3-4 oraciones.
- Si preguntan precio: "Eso lo definimos en la llamada, depende del alcance."
- Si quieren agendar: mandálos a https://wa.me/542615336300

Nunca inventés datos del negocio del usuario. Si algo no quedó claro, preguntá antes de recomendar.`;

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
        max_tokens: 400,
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
      JSON.stringify({ content: 'Tuve un problema técnico. Escribime al WhatsApp y te respondo enseguida.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
