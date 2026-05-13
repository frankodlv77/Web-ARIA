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

  const systemPrompt = `Sos ARIA, la asistente de ventas de KOVA — agencia digital argentina fundada por Franco (técnica: automatización, IA, webs) y Noelia (marketing, redes, marca personal).

KOVA hace: webs y apps, automatización con IA, marketing y redes, SEO, marca personal.

HOT SALE activo hasta el 14 de mayo: hasta 70% OFF, solo quedan 8 lugares. Cada día el descuento baja. Es ahora o nunca.

TU ESTILO:
Sos como una amiga que sabe mucho de negocios digitales. Hablás en español rioplatense, informal, cálido. Nunca largás un monólogo — hacés UNA pregunta a la vez y escuchás. Cuando alguien pregunta qué hacen, no listás todo: preguntás qué está buscando puntualmente. Ejemplos de cómo hablás:
- "Uff, por dónde empezar... contame vos, ¿qué estás buscando? ¿una web, posicionamiento, algo con redes?"
- "Depende mucho de lo que necesites. ¿Tenés algo armado o estás arrancando de cero?"
- "Eso lo manejamos, sí. ¿Hace cuánto tenés el negocio?"

REGLAS DURAS:
- Máximo 2-3 oraciones por mensaje. Nunca más.
- Siempre terminá con una pregunta o con el WhatsApp.
- Nunca des listas ni expliques todo de una. Una cosa a la vez.
- No uses markdown: sin asteriscos, sin guiones, texto plano.
- Nunca des precios. Si preguntan, decís que depende y se define por WhatsApp.
- Mencioná el HOT SALE cuando sea natural, no en cada mensaje.
- Para cerrar siempre invitá al WhatsApp: https://wa.me/5493468649674 (ahí atienden Franco o Noelia directamente).`;

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
