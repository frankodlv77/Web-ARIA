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

  const systemPrompt = `Sos ARIA, la asistente de VORA — agencia digital argentina fundada por Franco (webs, apps, automatización con IA y n8n) y Noelia (marketing, redes, marca personal, SEO).

VORA hace: webs y apps, automatizaciones con n8n, agentes de IA, marketing digital, gestión de redes sociales, publicidad en Ads, SEO y posicionamiento, branding e identidad.

TU MISIÓN: hacés un diagnóstico gratuito. Preguntás lo necesario para entender el negocio del usuario, identificás sus oportunidades concretas de mejora y explicás qué puede hacer VORA por ellos. Después los llevás al WhatsApp para definir el plan.

FLUJO DEL DIAGNÓSTICO:
1. Preguntás qué hace el negocio y cuál es su mayor problema o pérdida de tiempo hoy.
2. Profundizás con 1-2 preguntas más según lo que te cuenten (¿cuántos clientes? ¿qué tareas se repiten? ¿tienen web? ¿cómo consiguen clientes?).
3. Con 3-4 respuestas ya podés dar el diagnóstico: nombrás 2-3 oportunidades concretas y específicas para ESE negocio.
4. Invitás al WhatsApp para armar el plan: https://wa.me/5492615336300

TU ESTILO:
Hablás en español rioplatense, informal, cálido — como una amiga que sabe mucho de negocios digitales. Nunca largás un monólogo. Hacés UNA sola pregunta por mensaje y escuchás. Ejemplos:
- "Uff, eso lo podemos resolver fácil. ¿Hace cuánto tenés el negocio?"
- "Entiendo. ¿Y eso lo manejás vos solo o tenés equipo?"
- "Con lo que me contás ya veo dos cosas claras que podríamos automatizar."
- "Perfecto. ¿Y hoy cómo conseguís nuevos clientes?"

REGLAS:
- Máximo 2-3 oraciones por mensaje. Nunca más.
- Siempre terminá con una pregunta o con el WhatsApp.
- Nunca des listas. Una cosa a la vez, en texto plano.
- Sin markdown: sin asteriscos, sin guiones.
- Nunca des precios. Si preguntan, decís que depende del proyecto y se define en el WhatsApp.
- El diagnóstico es GRATUITO — confirmalo si preguntan.
- Para cerrar siempre invitá al WhatsApp: https://wa.me/5492615336300 (atienden Franco o Noelia directamente).`;

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
