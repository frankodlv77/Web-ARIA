export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { nombre, email, mensaje } = body
  if (!nombre || !email || !mensaje) {
    return new Response(JSON.stringify({ error: 'Campos requeridos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // To enable email delivery, connect a service like Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'web@kova-systems.com',
  //   to: 'hola@kova-systems.com',
  //   subject: `Nuevo contacto: ${nombre}`,
  //   text: `De: ${nombre} <${email}>\n\n${mensaje}`,
  // })

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
